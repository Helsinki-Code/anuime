import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

import ts from "typescript";

const path = new URL("../src/components/studio/component-preview.tsx", import.meta.url);
const text = await readFile(path, "utf8");
const source = ts.createSourceFile(
  path.pathname,
  text,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);
const imports = source.statements.filter(ts.isImportDeclaration);
const externalModules = [
  ...new Set(
    imports
      .map((item) => item.moduleSpecifier.text)
      .filter((name) => !name.startsWith(".") && !name.startsWith("@/")),
  ),
];
const versions = new Map(
  await Promise.all(
    externalModules.map(async (name) => {
      const json = JSON.parse(
        await readFile(new URL(`../node_modules/${name}/package.json`, import.meta.url), "utf8"),
      );
      return [name, json.version];
    }),
  ),
);
const fn = source.statements.find(
  (node) => ts.isFunctionDeclaration(node) && node.name?.text === "ComponentPreview",
);
const statement = fn.body.statements.find(ts.isSwitchStatement);
const manifest = {};
for (const clause of statement.caseBlock.clauses) {
  if (!ts.isCaseClause(clause) || !ts.isStringLiteral(clause.expression)) continue;
  const identifiers = new Set();
  const visit = (node) => {
    if (ts.isIdentifier(node)) identifiers.add(node.text);
    ts.forEachChild(node, visit);
  };
  clause.statements.forEach(visit);
  const required = [];
  const registry = new Set();
  const packages = new Set();
  for (const declaration of imports) {
    const bindings = declaration.importClause?.namedBindings;
    if (!bindings || !ts.isNamedImports(bindings)) continue;
    const names = bindings.elements
      .filter((element) => identifiers.has(element.name.text))
      .map((element) => element.getText(source));
    if (!names.length) continue;
    let module = declaration.moduleSpecifier.text;
    const match = module.match(/registry\/items\/(components|blocks)\/([^/]+)\/[^/]+$/);
    if (match) {
      registry.add(match[2]);
      module = `@/components/${match[1] === "blocks" ? "blocks" : "ui"}/${match[2]}`;
    } else if (!module.startsWith(".")) {
      const version = versions.get(module);
      if (typeof version !== "string") throw new Error(`Missing package version for ${module}`);
      packages.add(`${module}@${version}`);
    } else throw new Error(`Unsupported preview dependency: ${module}`);
    required.push({ module, names });
  }
  manifest[clause.expression.text] = {
    body: clause.statements.map((node) => node.getText(source)).join("\n"),
    imports: required,
    registry: [...registry],
    packages: [...packages],
    usesRecipe: identifiers.has("recipe"),
    usesState: identifiers.has("previewState"),
  };
}
const output = new URL("../src/lib/anuime/generated-preview-sources.json", import.meta.url);
await writeFile(output, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Generated export adapters for ${Object.keys(manifest).length} component previews.`);

await writeFile(
  new URL("../src/lib/anuime/generated-preview-source-hash.json", import.meta.url),
  JSON.stringify({ sha256: createHash("sha256").update(text).digest("hex") }) + "\n",
);
