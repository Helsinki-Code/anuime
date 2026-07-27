"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeTeamOrbitSection } from "./anuime-team-orbit-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeTeamOrbitSection character={character} />;
}
