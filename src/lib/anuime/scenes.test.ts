import { describe, expect, it } from "vitest";

import { createAnuimeRecipe } from "./recipe";
import { editScene, recordScene, redoScene, undoScene } from "./scene-editor";
import { createScene, createSection, importScene, sceneFromLegacy, validateScene } from "./scenes";
import type { SceneCatalog, SceneComponentNode, SceneDocumentV1 } from "./scenes";

const catalog: SceneCatalog = {
  "anuime-button": {
    registryName: "anuime-button",
    title: "Button",
    maturity: "beta",
    props: {
      label: { type: "string", label: "Label", required: true, maxLength: 100 },
      disabled: { type: "boolean", label: "Disabled" },
    },
    defaultProps: { label: "Continue" },
    states: ["default", "loading"],
    slots: {},
    dependencies: [],
    examples: [],
  },
  "anuime-card": {
    registryName: "anuime-card",
    title: "Card",
    maturity: "stable",
    props: {},
    defaultProps: {},
    states: ["default"],
    slots: { actions: { accepts: ["anuime-button"], maxChildren: 2 } },
    dependencies: [],
    examples: [],
    allowedStructureSystems: ["atlas"],
  },
};
function button(id = "button-1"): SceneComponentNode {
  return {
    id,
    kind: "component",
    component: "anuime-button",
    props: { label: "Continue" },
    state: "default",
    slots: {},
  };
}
function scene(): SceneDocumentV1 {
  return {
    ...createScene("atlas", "project-1"),
    sections: [createSection("section-1", [button()])],
  };
}
const codes = (value: unknown) => validateScene(value, catalog).errors.map((error) => error.code);

describe("portable scene validation", () => {
  it("round trips complete scenes and retains attribution", () => {
    const value = scene();
    value.attribution = [{ name: "Original creator", url: "https://example.com", license: "MIT" }];
    expect(importScene(JSON.stringify(value), catalog).document).toEqual(value);
    expect(validateScene(value, catalog).warnings[0].code).toBe("component-maturity");
  });
  it("rejects corrupt JSON, future versions, and extra document fields", () => {
    expect(importScene("{", catalog).valid).toBe(false);
    expect(codes({ ...scene(), version: 99 })).toContain("invalid-document");
    expect(codes({ ...scene(), script: "alert(1)" })).toContain("invalid-document");
  });
  it("rejects callbacks, prototype keys, accessors, cycles, and non-finite data", () => {
    const value = scene();
    expect(codes({ ...value, callback: () => {} })).toContain("unsafe-data");
    expect(
      importScene(
        JSON.stringify(value).replace('"props":{"label":"Continue"}', '"props":{"__proto__":{}}'),
        catalog,
      ).valid,
    ).toBe(false);
    expect(codes({ ...value, value: Infinity })).toContain("unsafe-data");
    const cycle: Record<string, unknown> = {};
    cycle.self = cycle;
    expect(codes(cycle)).toContain("unsafe-data");
    let called = false;
    const accessor = Object.defineProperty({}, "name", {
      get() {
        called = true;
        return "bad";
      },
    });
    expect(codes(accessor)).toContain("unsafe-data");
    expect(called).toBe(false);
  });
  it("checks supported props, state, and component names", () => {
    const value = scene();
    const node = button();
    value.sections[0].children = [{ ...node, props: { onClick: "evil" }, state: "unknown" }];
    expect(codes(value)).toEqual(
      expect.arrayContaining(["unsupported-prop", "required-prop", "unsupported-state"]),
    );
    value.sections[0].children = [{ ...node, props: { label: 42 } }];
    expect(codes(value)).toContain("invalid-prop");
    value.sections[0].children = [{ ...node, component: "toString" }];
    expect(codes(value)).toContain("unknown-component");
  });
  it("checks unique IDs, top-level sections, and responsive layout bounds", () => {
    const value = scene();
    value.sections[0].children.push(button());
    expect(codes(value)).toContain("duplicate-id");
    expect(codes({ ...scene(), sections: [button()] })).toContain("section-required");
    const grid = scene();
    grid.sections[0].layout.columns.mobile = 5;
    expect(codes(grid)).toContain("invalid-document");
    grid.sections[0].layout.columns.mobile = 2;
    expect(codes(grid)).toContain("stack-columns");
  });
  it("enforces approved slots and compatibility beyond recipe syntax", () => {
    const value = scene();
    value.sections[0].children = [
      { ...button("card-1"), component: "anuime-card", props: {}, slots: { actions: [button()] } },
    ];
    expect(validateScene(value, catalog).valid).toBe(true);
    value.recipe.structureSystem = "mochi";
    expect(codes(value)).toContain("incompatible-structure");
    const node = value.sections[0].children[0];
    if (node.kind === "component") node.slots = { nope: [button()] };
    expect(codes(value)).toContain("unsupported-slot");
  });
  it("bounds file size and scene complexity", () => {
    expect(importScene(" ".repeat(1_000_001), catalog).errors[0].code).toBe("size-limit");
    const value = scene();
    value.sections = [
      createSection(
        "one",
        Array.from({ length: 200 }, (_, i) => button(`node-${i}`)),
      ),
    ];
    expect(codes(value)).toContain("node-limit");
    let nested = createSection("level-10");
    for (let i = 9; i >= 1; i--) nested = createSection(`level-${i}`, [nested]);
    value.sections = [nested];
    expect(codes(value)).toContain("depth-limit");
  });
  it("preserves a mixed recipe and state when migrating old links", () => {
    const recipe = {
      ...createAnuimeRecipe("mochi"),
      shapeSystem: "atlas" as const,
      motionSystem: "kira" as const,
      mode: "light" as const,
    };
    const result = sceneFromLegacy(
      { recipe, component: "anuime-button", state: "loading" },
      catalog,
      "legacy",
    );
    expect(result.document?.recipe).toEqual(recipe);
    expect(result.document?.sections[0].children[0]).toMatchObject({
      state: "loading",
      props: { label: "Continue" },
    });
  });
});

describe("transactional scene editing", () => {
  it("duplicates subtrees with fresh IDs and never mutates the original", () => {
    const original = scene();
    let counter = 0;
    const result = editScene(
      original,
      { type: "duplicate", id: "section-1", nextId: () => `copy-${++counter}` },
      catalog,
    );
    expect(result.changed).toBe(true);
    expect(result.document.sections[1].children[0].id).toBe("copy-2");
    expect(original.sections).toHaveLength(1);
    expect(
      editScene(
        original,
        { type: "duplicate", id: "section-1", nextId: () => "collision" },
        catalog,
      ).changed,
    ).toBe(false);
  });
  it("moves and removes nodes with the same transaction used by pointer and keyboard controls", () => {
    const original = scene();
    original.sections[0].children.push(button("button-2"));
    const moved = editScene(
      original,
      { type: "move", id: "button-1", target: { parentId: "section-1" }, index: 1 },
      catalog,
    );
    expect(moved.document.sections[0].children.map((node) => node.id)).toEqual([
      "button-2",
      "button-1",
    ]);
    const removed = editScene(moved.document, { type: "remove", id: "button-1" }, catalog);
    expect(removed.document.sections[0].children).toHaveLength(1);
  });
  it("rejects moving a parent inside itself, unsupported properties, and invalid insertion", () => {
    const original = scene();
    for (const edit of [
      { type: "move" as const, id: "section-1", target: { parentId: "section-1" }, index: 0 },
      { type: "props" as const, id: "button-1", props: { label: 4 } },
      { type: "insert" as const, target: { parentId: null }, index: 0, node: button("new") },
    ]) {
      const result = editScene(original, edit, catalog);
      expect(result.changed).toBe(false);
      expect(result.document).toBe(original);
    }
  });
  it("supports undo/redo and clears redo on a new edit", () => {
    const original = scene();
    const updated = editScene(
      original,
      { type: "props", id: "button-1", props: { label: "Deploy" } },
      catalog,
    ).document;
    const history = recordScene({ past: [], present: original, future: [] }, updated);
    expect(undoScene(history).present).toEqual(original);
    expect(redoScene(undoScene(history)).present).toEqual(updated);
    expect(recordScene(undoScene(history), { ...original, name: "Changed" }).future).toHaveLength(
      0,
    );
  });
});
