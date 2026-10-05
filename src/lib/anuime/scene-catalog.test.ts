import { describe, expect, it } from "vitest";

import { createAnuimeRecipe } from "./recipe";
import { createStarterScene, sceneCatalog } from "./scene-catalog";
import { sceneFromLegacy, validateScene } from "./scenes";
import { componentCatalog, registryComponentIds } from "./studio";

describe("Studio scene adapters", () => {
  it("retains every existing component and preview state in legacy scene migration", () => {
    for (const component of registryComponentIds) {
      expect(sceneCatalog[component].registryName).toBe(componentCatalog[component].registryName);
      for (const state of componentCatalog[component].states) {
        const result = sceneFromLegacy(
          { recipe: createAnuimeRecipe("mochi"), component, state },
          sceneCatalog,
          "legacy",
        );
        expect(result.errors).toEqual([]);
        expect(result.document?.sections[0].children[0]).toMatchObject({ component, state });
      }
    }
  });
  it("validates all three complete starter compositions including their action slot", () => {
    for (const world of ["kira", "mochi", "atlas"] as const) {
      const scene = createStarterScene(world, `starter-${world}`);
      expect(validateScene(scene, sceneCatalog).errors).toEqual([]);
      expect(scene.sections[0].children).toHaveLength(3);
      expect(scene.world).toBe(world);
    }
  });
  it("classifies the canonical catalog from the shared extended-component list", () => {
    expect(sceneCatalog.button.maturity).toBe("stable");
    expect(sceneCatalog.accordion.maturity).toBe("beta");
    expect(
      Object.values(sceneCatalog).every((definition) => definition.maturity !== "experimental"),
    ).toBe(true);
  });
});
