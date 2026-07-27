"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeStatusOverviewSection } from "./anuime-status-overview-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeStatusOverviewSection character={character} />;
}
