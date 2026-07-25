import { describe, expect, it } from "vitest";

import { castCharacters, getPersonaPack, listCharacters } from "../src/personas.js";
import { CastResultSchema, PersonaPackSchema } from "../src/schema.js";

describe("AnUIme persona packs", () => {
  it.each(["kira", "mochi", "atlas"] as const)(
    "%s is schema-valid, compact, and complete",
    (character) => {
      const pack = getPersonaPack(character);

      expect(PersonaPackSchema.parse(pack)).toEqual(pack);
      expect(pack.estimatedTokens).toBeLessThanOrEqual(1500);
      expect(pack.motifLaws).toHaveLength(7);
      expect(pack.componentCli.workhorseItems).toHaveLength(51);
      expect(pack.componentCli.expressiveItems).toHaveLength(4);
      expect(pack.tokenLadders.light["--background"]).toMatch(/^#/u);
      expect(pack.tokenLadders.dark["--background"]).toMatch(/^#/u);
      expect(pack.goldenDirective).toBe(
        "Install what exists in the registry; hand-write only what doesn't, under these laws.",
      );
    },
  );

  it("lists exactly the three canonical characters", () => {
    expect(listCharacters().map((character) => character.id)).toEqual(["kira", "mochi", "atlas"]);
  });

  it("casts path assignments without averaging their systems", () => {
    const assignments = {
      "/dashboard": "kira",
      "/dashboard/settings": "kira",
      "/marketing": "atlas",
    } as const;
    const result = castCharacters(assignments, "Build a settings page");

    expect(CastResultSchema.parse(result)).toEqual(result);
    expect(result.assignments).toEqual(assignments);
    expect(result.assignments["/dashboard/settings"]).toBe("kira");
    expect(result.personaPacks.map((pack) => pack.character)).toEqual(["kira", "atlas"]);
    expect(result.compositionRules.join(" ")).toContain("structural owner");
    expect(result.compositionRules.join(" ")).toContain("do not average");
    expect(result.compositionRules).toHaveLength(5);
  });

  it("rejects a cast whose assignments resolve to one distinct character", () => {
    expect(() =>
      castCharacters({
        "/dashboard": "kira",
        "/settings": "kira",
      }),
    ).toThrow("cast requires at least two distinct characters.");
  });
});
