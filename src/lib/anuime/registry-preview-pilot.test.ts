import { describe, expect, it } from "vitest";

import components from "../../../design-spec/components.json";
import laws from "../../../design-spec/laws.json";
import themes from "../../../design-spec/themes.json";
import {
  getExtendedComponentTreatment,
  registryPreviewCharacters,
  registryPreviewCheckpointItems,
  registryPreviewConstruction,
  registryPreviewExtendedItems,
  registryPreviewItems,
  registryPreviewPilotItems,
} from "./registry-preview-pilot";

describe("registry preview pilot source discipline", () => {
  it("uses the exact approved trace, general transition, and dock timings", () => {
    expect(registryPreviewCharacters.kira.transitionMs).toBe(
      themes.characters.kira.geometry.focusTraceMs,
    );
    expect(registryPreviewCharacters.mochi.transitionMs).toBe(
      themes.characters.mochi.geometry.generalTransitionMs,
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

    for (const item of registryPreviewItems) {
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

  it("preserves the first rollout checkpoint as the 15 non-Extended workhorses", () => {
    expect(registryPreviewCheckpointItems).toEqual([
      "anuime-alert",
      "anuime-badge",
      "anuime-button",
      "anuime-card",
      "anuime-dialog",
      "anuime-dropdown-menu",
      "anuime-input",
      "anuime-progress",
      "anuime-skeleton",
      "anuime-slider",
      "anuime-switch",
      "anuime-tabs",
      "anuime-toast",
      "anuime-toggle",
      "anuime-tooltip",
    ]);
    expect(
      registryPreviewCheckpointItems.filter((item) =>
        components.extendedBoardComponents.includes(item),
      ),
    ).toEqual([]);
  });

  it("expands the shared template to all 33 remaining Extended components", () => {
    expect(registryPreviewExtendedItems).toEqual(
      components.extendedBoardComponents.filter((item) => item !== "anuime-breadcrumb"),
    );
    expect(registryPreviewExtendedItems).toHaveLength(33);
    expect(registryPreviewItems).toHaveLength(51);
    expect(new Set(registryPreviewItems).size).toBe(51);
  });

  it("derives every Extended disclosure from the authoritative component mapping", () => {
    for (const item of registryPreviewExtendedItems) {
      for (const character of ["kira", "mochi", "atlas"] as const) {
        const mapping = getExtendedComponentTreatment(item, character);
        const note = registryPreviewConstruction[item][character];

        expect(note.provenance).toContain(mapping.geometry);
        expect(note.provenance).toContain(mapping.carrier);
        for (const motifId of mapping.motifIds) {
          expect(note.lawIds).toContain(motifId);
          expect(note.provenance).toContain(motifId);
        }
        expect(
          mapping.motifIds.length > 0 ||
            note.provenance.includes("No artifact claims this; geometry only."),
        ).toBe(true);
      }
    }
  });

  it("keeps Mochi's 2.6s settling duration on skeleton provenance only", () => {
    expect(registryPreviewCharacters.mochi.transitionMs).toBe(250);
    expect(registryPreviewConstruction["anuime-skeleton"].mochi.provenance).toContain("2.6s");
    expect(laws.characters.mochi.constraints).toContainEqual(
      expect.objectContaining({
        id: "mochi.motion-never-brisk",
        enforcement: expect.objectContaining({ skeletonDurationMs: 2600 }),
      }),
    );
  });
});
