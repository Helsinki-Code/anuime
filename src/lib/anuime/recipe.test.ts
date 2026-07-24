import { describe, expect, it } from "vitest";

import {
  anuimeComponentConstructionMap,
  createAnuimeRecipe,
  decodeAnuimeRecipe,
  encodeAnuimeRecipe,
  resolveAnuimeRecipe,
  validateAnuimeRecipe,
} from "./recipe";

describe("AnUIme recipe v2", () => {
  it("round trips the canonical recipe", () => {
    const recipe = createAnuimeRecipe("mochi");
    expect(decodeAnuimeRecipe(encodeAnuimeRecipe(recipe))).toEqual(recipe);
  });

  it("accepts only explicitly versioned v2 URLs", () => {
    expect(decodeAnuimeRecipe("atlas.kira.mochi.atlas.compact")).toBeNull();
    expect(decodeAnuimeRecipe("kira.kira.kira.kira.comfortable.expressive")).toBeNull();
  });

  it("rejects malformed and unknown recipes", () => {
    expect(decodeAnuimeRecipe("unknown.kira.kira.kira.compact.calm")).toBeNull();
    expect(decodeAnuimeRecipe("v2.kira.kira.kira.kira.compact.calm.system.extra")).toBeNull();
    expect(validateAnuimeRecipe({ version: 2 })).toHaveLength(1);
  });

  it("lets a recipe take precedence over the character shorthand", () => {
    const result = resolveAnuimeRecipe(createAnuimeRecipe("mochi"), "atlas");
    expect(result.recipe.colorSystem).toBe("mochi");
    expect(result.primary).toContain("bg-primary");
  });

  it("resolves mixed dimensions independently", () => {
    const result = resolveAnuimeRecipe(
      {
        ...createAnuimeRecipe("kira"),
        shapeSystem: "mochi",
        structureSystem: "atlas",
        density: "spacious",
      },
      "kira",
      "button",
    );
    expect(result.control).toContain("rounded-[10px]");
    expect(result.control).toContain("min-h-12");
    expect(result.surface).toContain("--anuime-border-strong");
    expect(result.primary).toContain("outline-offset-4");
  });

  it("maps every v2 catalog component to an explicit motif carrier", () => {
    expect(Object.keys(anuimeComponentConstructionMap)).toHaveLength(51);
    for (const construction of Object.values(anuimeComponentConstructionMap)) {
      expect(["specified", "derived"]).toContain(construction.specification);
      expect(construction.carrier.length).toBeGreaterThan(2);
    }
  });

  it("keeps all mixed systems within the bounded construction laws", () => {
    const characters = ["kira", "mochi", "atlas"] as const;
    for (const colorSystem of characters) {
      for (const shapeSystem of characters) {
        for (const structureSystem of characters) {
          for (const motionSystem of characters) {
            const result = resolveAnuimeRecipe(
              {
                ...createAnuimeRecipe("kira"),
                colorSystem,
                shapeSystem,
                structureSystem,
                motionSystem,
              },
              "kira",
              "badge",
            );
            expect(result.control).not.toContain("rounded-full");
            expect(result.primary).toContain("bg-primary");
            expect(result.construction?.carrier).toBe("status-ring");
          }
        }
      }
    }
  });
});
