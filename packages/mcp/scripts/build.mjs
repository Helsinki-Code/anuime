import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import ts from "typescript";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = join(packageRoot, "src");
const outputRoot = join(packageRoot, "dist");

if (basename(outputRoot) !== "dist" || dirname(outputRoot) !== packageRoot) {
  throw new Error(`Refusing to replace unexpected build directory: ${outputRoot}`);
}

rmSync(outputRoot, { force: true, recursive: true });
mkdirSync(outputRoot, { recursive: true });

const sourceFiles = readdirSync(sourceRoot)
  .filter((fileName) => fileName.endsWith(".ts"))
  .toSorted();

for (const fileName of sourceFiles) {
  const sourcePath = join(sourceRoot, fileName);
  const outputPath = join(outputRoot, fileName.replace(/\.ts$/u, ".js"));
  const source = readFileSync(sourcePath, "utf8");
  const result = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      sourceMap: true,
      target: ts.ScriptTarget.ES2023,
    },
    fileName: sourcePath,
    reportDiagnostics: true,
  });
  const errors = result.diagnostics?.filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );

  if (errors?.length) {
    throw new Error(
      errors
        .map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"))
        .join("\n"),
    );
  }

  writeFileSync(outputPath, result.outputText);
  if (result.sourceMapText) {
    writeFileSync(`${outputPath}.map`, result.sourceMapText);
  }
}

console.log(`Built ${sourceFiles.length} AnUIme MCP modules into packages/mcp/dist.`);
