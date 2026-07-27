"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeHeroSignalSection } from "./anuime-hero-signal-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeHeroSignalSection character={character} />;
}
