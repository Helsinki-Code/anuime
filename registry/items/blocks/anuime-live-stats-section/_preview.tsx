"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeLiveStatsSection } from "./anuime-live-stats-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeLiveStatsSection character={character} />;
}
