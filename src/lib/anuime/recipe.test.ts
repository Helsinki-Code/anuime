import { describe, expect, it } from "vitest";

import {
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
    const result = resolveAnuimeRecipe({
      ...createAnuimeRecipe("kira"),
      shapeSystem: "mochi",
      structureSystem: "atlas",
      density: "spacious",
    });
    expect(result.primary).toContain("rounded-[10px]");
    expect(result.primary).toContain("min-h-12");
    expect(result.surface).toContain("--anuime-border-strong");
  });
});
