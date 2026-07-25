import { describe, expect, it } from "vitest";

import components from "../../../design-spec/components.json";
import laws from "../../../design-spec/laws.json";
import themes from "../../../design-spec/themes.json";
import {
  registryPreviewCharacters,
  registryPreviewConstruction,
  registryPreviewPilotItems,
} from "./registry-preview-pilot";

describe("registry preview pilot source discipline", () => {
  it("uses the exact approved trace, bloom, and dock timings", () => {
    expect(registryPreviewCharacters.kira.transitionMs).toBe(
      themes.characters.kira.geometry.focusTraceMs,
    );
    expect(registryPreviewCharacters.mochi.transitionMs).toBe(
      themes.characters.mochi.geometry.bloomAmbientMs,
    );
    expect(registryPreviewCharacters.atlas.transitionMs).toBe(
      themes.characters.atlas.geometry.dockFocusMs,
    );
  });

  it("uses only frame motifs declared by the character laws", () => {
    for (const character of ["kira", "mochi", "atlas"] as const) {
      expect(laws.characters[character].motifLaws.map((law) => law.id)).toContain(
        registryPreviewCharacters[character].frameLaw,
      );
    }
  });

  it("cites only declared motif laws or constraints in construction disclosures", () => {
    const declaredLawIds = new Set(
      Object.values(laws.characters).flatMap((character) =>
        character.motifLaws
          .map((law) => law.id)
          .concat(character.constraints.map((constraint) => constraint.id)),
      ),
    );

    for (const item of registryPreviewPilotItems) {
      for (const note of Object.values(registryPreviewConstruction[item])) {
        for (const lawId of note.lawIds) expect(declaredLawIds.has(lawId)).toBe(true);
      }
    }
  });

  it("keeps the pilot limited to the three requested component mappings", () => {
    expect(registryPreviewPilotItems).toEqual([
      "anuime-breadcrumb",
      "anuime-checkbox",
      "anuime-data-table",
    ]);
    expect(components.components.breadcrumb).toBeDefined();
    expect(components.components.checkbox).toBeDefined();
    expect(components.components["data-table"]).toBeDefined();
  });
});
