"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeIncidentDetailSection } from "./anuime-incident-detail-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeIncidentDetailSection character={character} />;
}
