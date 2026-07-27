"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeStatsGridSection } from "./anuime-stats-grid-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeStatsGridSection character={character} />;
}
