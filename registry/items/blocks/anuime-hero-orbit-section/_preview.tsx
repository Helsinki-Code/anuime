"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeHeroOrbitSection } from "./anuime-hero-orbit-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeHeroOrbitSection character={character} />;
}
