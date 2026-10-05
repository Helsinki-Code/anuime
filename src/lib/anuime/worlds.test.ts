import { existsSync } from "node:fs";

import { describe, expect, it } from "vitest";

import {
  defaultExperiencePreferences,
  getCharacterAsset,
  parseExperiencePreferences,
  resolveExperience,
  worldCssVariables,
  worldIds,
  worlds,
} from "./worlds";

const capable = { reducedMotion: false, graphics: true, visible: true, lowPerformance: false };

describe("world contracts", () => {
  it("references existing source assets for all three identities without claiming rigging", () => {
    for (const id of worldIds) {
      const world = worlds[id];
      for (const path of [
        world.assets.portrait,
        world.assets.reference,
        world.assets.character.source.src,
      ]) {
        expect(existsSync(`public${path}`)).toBe(true);
      }
      expect(world.assets.character.clips).toEqual({});
      expect(getCharacterAsset(world, "low")).toBeNull();
      expect(getCharacterAsset(world, "high")).toBeNull();
    }
  });

  it("authors separate lighting and palettes but consistent geometry for each theme", () => {
    for (const world of Object.values(worlds)) {
      const day = worldCssVariables(world, "light");
      const night = worldCssVariables(world, "dark");
      expect(day["--world-sky"]).not.toBe(night["--world-sky"]);
      expect(day["--world-radius"]).toBe(night["--world-radius"]);
      expect(world.lighting.light).not.toEqual(world.lighting.dark);
    }
  });

  it("does not silently load a large desktop model on mobile", () => {
    const world = structuredClone(worlds.kira);
    world.assets.character.desktop = { src: "/desktop.glb", version: "1", status: "approved" };
    expect(getCharacterAsset(world, "high")?.src).toBe("/desktop.glb");
    expect(getCharacterAsset(world, "low")).toBeNull();
  });
});

describe("experience preferences", () => {
  it("defaults to cinematic with sound off", () => {
    expect(defaultExperiencePreferences()).toMatchObject({ mode: "cinematic", sound: false });
  });

  it("rejects unknown versions and invalid types from storage", () => {
    expect(parseExperiencePreferences({ version: 2, sound: true })).toEqual(
      defaultExperiencePreferences(),
    );
    expect(
      parseExperiencePreferences({ version: 1, mode: "fast", paused: "false", quality: 3 }),
    ).toEqual(defaultExperiencePreferences());
    expect(parseExperiencePreferences(null)).toEqual(defaultExperiencePreferences());
    expect(
      parseExperiencePreferences({ version: 1, mode: "balanced", characterVisible: false }).mode,
    ).toBe("balanced");
  });

  it("honors reduced motion without destroying the saved preference", () => {
    const preferences = defaultExperiencePreferences();
    expect(resolveExperience(preferences, { ...capable, reducedMotion: true })).toMatchObject({
      mode: "still",
      animate: false,
      cameraTravel: false,
    });
    expect(preferences.mode).toBe("cinematic");
    expect(resolveExperience(preferences, capable).animate).toBe(true);
  });

  it("stops hidden rendering and sound, and suppresses motion while paused", () => {
    const preferences = { ...defaultExperiencePreferences(), sound: true };
    expect(resolveExperience(preferences, { ...capable, visible: false })).toMatchObject({
      render3d: false,
      animate: false,
      sound: false,
    });
    expect(resolveExperience({ ...preferences, paused: true }, capable)).toMatchObject({
      animate: false,
      cameraTravel: false,
      sound: false,
    });
  });

  it("falls back without graphics and lowers quality under sustained performance pressure", () => {
    const preferences = { ...defaultExperiencePreferences(), quality: "high" as const };
    expect(resolveExperience(preferences, { ...capable, graphics: false })).toMatchObject({
      render3d: false,
      mode: "still",
    });
    expect(resolveExperience(preferences, { ...capable, lowPerformance: true }).quality).toBe(
      "low",
    );
  });
});
