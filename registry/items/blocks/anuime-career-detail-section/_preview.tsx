"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCareerDetailSection } from "./anuime-career-detail-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeCareerDetailSection character={character} />;
}
