"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeHeroTerminalSection } from "./anuime-hero-terminal-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeHeroTerminalSection character={character} />;
}
