import { getCanonicalRegistryItemUrl } from "../site-config";
import previews from "./generated-preview-sources.json";
import { sceneCatalog } from "./scene-catalog";
import { validateScene } from "./scenes";
import type { SceneDocumentV1, SceneNode } from "./scenes";
import { worlds } from "./worlds";

export interface SceneSourceExport {
  source: string;
  css: string;
  installCommand: string;
  packages: string[];
  registryItems: string[];
  scene: SceneDocumentV1;
  instructions: string;
}
const previewMap: Record<string, (typeof previews)[keyof typeof previews]> = previews;
const expression = (value: unknown) => `{${JSON.stringify(value ?? "")}}`;

/** Emits trusted component templates; imported scene values only become JSON literals. */
export function exportSceneSource(input: SceneDocumentV1): SceneSourceExport {
  const validated = validateScene(input, sceneCatalog);
  if (!validated.document)
    throw new Error(validated.errors.map((error) => error.message).join(" "));
  const scene = validated.document;
  const imports = new Map<string, Set<string>>();
  const registry = new Set<string>(["anuime-recipe", `anuime-theme-${scene.recipe.colorSystem}`]);
  const packages = new Set<string>();
  const functions = new Map<string, string>();
  let hasAction = false;
  const addImport = (module: string, name: string) => {
    const names = imports.get(module) ?? new Set<string>();
    names.add(name);
    imports.set(module, names);
  };
  const component = (name: string, symbol: string) => {
    registry.add(name);
    addImport(`@/components/ui/${name}`, symbol);
  };
  addImport("@/lib/anuime-recipe", "type AnuimeRecipeV2");
  const render = (node: SceneNode): string => {
    if (node.kind !== "component") {
      const gap = { none: 0, small: 8, medium: 16, large: 28 }[node.layout.gap];
      addImport("react", "type CSSProperties");
      const style = JSON.stringify({
        "--scene-mobile-columns": node.layout.columns.mobile,
        "--scene-tablet-columns": node.layout.columns.tablet,
        "--scene-desktop-columns": node.layout.columns.desktop,
        gap,
      });
      return `<section aria-label=${expression(node.label)} className="scene-layout" style={${style} as CSSProperties}>${node.children.map(render).join("\n")}</section>`;
    }
    switch (node.component) {
      case "button": {
        component("anuime-button", "AnuimeButton");
        hasAction = true;
        return `<AnuimeButton recipe={recipe} variant=${expression(node.state === "secondary" ? "secondary" : "primary")} disabled={${node.state === "disabled" || node.state === "loading"}} onClick={() => handleAction(${JSON.stringify(node.id)}, ${JSON.stringify(node.props.label)})}>${expression(node.state === "loading" ? "Working…" : node.props.label)}</AnuimeButton>`;
      }
      case "input":
        component("anuime-input", "AnuimeInput");
        return `<AnuimeInput recipe={recipe} label=${expression(node.props.label)} placeholder=${expression(node.props.placeholder)} hint=${expression(node.props.hint)} disabled={${node.state === "disabled"}} ${node.state === "error" ? 'error="Check this value and try again."' : ""} />`;
      case "card":
        component("anuime-card", "AnuimeCard");
        return `<AnuimeCard recipe={recipe} title=${expression(node.props.title)} description=${expression(node.props.description)} eyebrow=${expression(node.props.eyebrow)} action={<div className="flex flex-wrap gap-2">${(node.slots.action ?? []).map(render).join("\n")}</div>} />`;
      case "typography":
        component("anuime-typography", "AnuimeHeading");
        component("anuime-typography", "AnuimeText");
        return `<div><AnuimeHeading recipe={recipe}>${expression(node.props.title)}</AnuimeHeading><AnuimeText recipe={recipe}>${expression(node.props.text)}</AnuimeText></div>`;
      default: {
        const preview = previewMap[node.component];
        if (!preview) throw new Error(`No source adapter for ${node.component}.`);
        for (const entry of preview.imports)
          for (const name of entry.names) addImport(entry.module, name);
        preview.registry.forEach((name) => registry.add(name));
        preview.packages.forEach((name) => packages.add(name));
        let functionName = functions.get(node.component);
        if (!functionName) {
          functionName = `Preview${functions.size}`;
          functions.set(node.component, functionName);
        }
        return `<${functionName} recipe={recipe} previewState=${expression(node.state)} />`;
      }
    }
  };
  const markup = scene.sections.map(render).join("\n");
  if (hasAction) addImport("react", "useState");
  const fonts = worlds[scene.recipe.colorSystem].typography.packages;
  fonts.forEach((name) => packages.add(`${name}@5.3.0`));
  const functionsSource = [...functions]
    .map(([id, name]) => {
      const preview = previewMap[id];
      const keys = [preview.usesRecipe ? "recipe" : null, preview.usesState ? "previewState" : null]
        .filter(Boolean)
        .join(", ");
      return `function ${name}(${keys ? `{ ${keys} }: ` : "_props: "}{ recipe: AnuimeRecipeV2; previewState: string }) {\n${preview.body}\n}`;
    })
    .join("\n\n");
  const source = `"use client";\n${[...imports].map(([module, names]) => `import { ${[...names].join(", ")} } from ${JSON.stringify(module)};`).join("\n")}\nimport "./scene.css";\n\nconst recipe: AnuimeRecipeV2 = ${JSON.stringify(scene.recipe, null, 2)};\n\nexport interface SceneProps { onAction?: (event: { nodeId: string; label: string }) => void; }\n\nexport default function Scene(${hasAction ? "{ onAction }: SceneProps" : "_props: SceneProps"}) {\n${hasAction ? 'const [message, setMessage] = useState("");\nfunction handleAction(nodeId: string, label: string) { setMessage(`${label} completed in the preview.`); onAction?.({ nodeId, label }); }' : "void recipe;"}\nreturn <div className=${expression(`anuime-exported-scene${scene.lighting === "dark" ? " dark" : ""}`)}>\n${markup}\n${hasAction ? '<p role="status">{message}</p>' : ""}\n</div>;\n}\n\n${functionsSource}\n`;
  const font = worlds[scene.recipe.colorSystem].typography;
  const css = `${fonts.map((name) => `@import "${name}";`).join("\n")}\n.anuime-exported-scene { container-type: inline-size; padding: 24px; background: var(--background); color: var(--foreground); font-family: "${font.body}", sans-serif; }\n.anuime-exported-scene .scene-layout { display: grid; grid-template-columns: repeat(var(--scene-mobile-columns), minmax(0, 1fr)); }\n.anuime-exported-scene .scene-layout > * { min-width: 0; }\n@container (min-width: 600px) { .anuime-exported-scene .scene-layout { grid-template-columns: repeat(var(--scene-tablet-columns), minmax(0, 1fr)); } }\n@container (min-width: 1000px) { .anuime-exported-scene .scene-layout { grid-template-columns: repeat(var(--scene-desktop-columns), minmax(0, 1fr)); } }\n`;
  const registryItems = [...registry].toSorted();
  const installCommand = `npx shadcn@latest add ${registryItems.map(getCanonicalRegistryItemUrl).join(" ")}`;
  return {
    source,
    css,
    installCommand,
    registryItems,
    packages: [...packages].toSorted(),
    scene,
    instructions:
      "Install the listed registry items in a React project configured for shadcn and Tailwind. Add Scene.tsx and scene.css together, install the listed font packages, and render <Scene onAction={({ nodeId, label }) => { /* connect your application here */ }} />. Components using sample-data adapters retain their preview data. The optional world renderer and asset export are not included yet.",
  };
}
