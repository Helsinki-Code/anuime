"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCareersListSection } from "./anuime-careers-list-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeCareersListSection character={character} />;
}
