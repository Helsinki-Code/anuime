import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import ts from "typescript";
import { describe, expect, it } from "vitest";

import previewSourceHash from "./generated-preview-source-hash.json";
import { createSceneComponent, createStarterScene } from "./scene-catalog";
import { exportSceneSource } from "./scene-export";
import { createScene, createSection } from "./scenes";
import { registryComponentIds } from "./studio";

const root = process.cwd();

describe("scene React source export", () => {
  it("keeps export templates synchronized with the actual preview source", () => {
    const source = readFileSync("src/components/studio/component-preview.tsx", "utf8");
    expect(createHash("sha256").update(source).digest("hex")).toBe(previewSourceHash.sha256);
  });
  it("includes nested actions, editable values, and dependencies for complete starters", () => {
    for (const world of ["kira", "mochi", "atlas"] as const) {
      const result = exportSceneSource(createStarterScene(world, "sample"));
      expect(result.source).toContain("handleAction");
      expect(result.registryItems).toEqual(
        expect.arrayContaining([
          "anuime-card",
          "anuime-button",
          "anuime-input",
          "anuime-typography",
          `anuime-theme-${world}`,
        ]),
      );
      expect(result.source).not.toContain("../../../registry");
      expect(result.css).toContain("@container");
    }
  });
  it("escapes imported text as data rather than JSX or executable expressions", () => {
    const scene = createStarterScene("kira", "escape");
    const node = scene.sections[0].children[0];
    if (node.kind === "component") node.props.title = '</h2><script>alert("x")</script>{evil()}';
    const result = exportSceneSource(scene);
    expect(result.source).toContain(JSON.stringify('</h2><script>alert("x")</script>{evil()}'));
  });
  it("type checks exports for every existing component and the three starter scenes", () => {
    const sources = new Map<string, string>();
    for (const id of registryComponentIds) {
      const scene = createScene("kira", `test-${id}`);
      scene.sections = [createSection("main", [createSceneComponent(id, "node")])];
      sources.set(
        resolve(root, `.scene-export-verification/${id}.tsx`),
        exportSceneSource(scene).source,
      );
    }
    for (const world of ["kira", "mochi", "atlas"] as const)
      sources.set(
        resolve(root, `.scene-export-verification/starter-${world}.tsx`),
        exportSceneSource(createStarterScene(world, "test")).source,
      );
    const cssDeclaration = resolve(root, ".scene-export-verification/styles.d.ts");
    sources.set(cssDeclaration, 'declare module "*.css" {}');
    const config = ts.parseConfigFileTextToJson(
      "tsconfig.json",
      readFileSync("tsconfig.json", "utf8"),
    );
    const options = ts.parseJsonConfigFileContent(config.config, ts.sys, root).options;
    const paths = { ...options.paths };
    for (const id of registryComponentIds) {
      const name = id === "auth-panel" ? "anuime-auth-panel" : `anuime-${id}`;
      paths[`@/components/${id === "auth-panel" ? "blocks" : "ui"}/${name}`] = [
        resolve(
          root,
          `registry/items/${id === "auth-panel" ? "blocks" : "components"}/${name}/${name}.tsx`,
        ),
      ];
    }
    const host = ts.createCompilerHost({ ...options, paths });
    const read = host.readFile.bind(host);
    const exists = host.fileExists.bind(host);
    const getSource = host.getSourceFile.bind(host);
    host.readFile = (file) => sources.get(file) ?? read(file);
    host.fileExists = (file) => sources.has(file) || exists(file);
    host.getSourceFile = (file, language, onError, shouldCreate) =>
      sources.has(file)
        ? ts.createSourceFile(file, sources.get(file) ?? "", language, true)
        : getSource(file, language, onError, shouldCreate);
    const program = ts.createProgram([...sources.keys()], { ...options, paths }, host);
    const errors = ts
      .getPreEmitDiagnostics(program)
      .filter((item) => item.category === ts.DiagnosticCategory.Error);
    expect(
      errors.map(
        (item) =>
          `${item.file?.fileName}: ${ts.flattenDiagnosticMessageText(item.messageText, " ")}`,
      ),
    ).toEqual([]);
  }, 30_000);
});
