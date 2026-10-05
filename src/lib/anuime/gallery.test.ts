import { describe, expect, test } from "vitest";

import { createGalleryScene } from "./gallery";

describe("gallery scene remixes", () => {
  test("creates a complete scene from a curated example", () => {
    const scene = createGalleryScene("signal-launch");
    expect(scene?.name).toBe("Signal Launch");
    expect(
      scene?.sections[0]?.children.map((node) => node.kind === "component" && node.component),
    ).toEqual(["button", "card", "command-palette"]);
    expect(scene?.world).toBe("kira");
  });

  test("preserves the example recipe and lighting", () => {
    const scene = createGalleryScene("soft-start");
    expect(scene?.recipe.density).toBe("spacious");
    expect(scene?.lighting).toBe("light");
    expect(scene?.attribution[0]?.name).toBe("AnUIme Team");
  });

  test("rejects unknown examples", () => {
    expect(createGalleryScene("missing-example")).toBeNull();
  });
});
