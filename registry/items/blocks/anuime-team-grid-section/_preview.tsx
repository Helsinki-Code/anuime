"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeTeamGridSection } from "./anuime-team-grid-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeTeamGridSection character={character} />;
}
