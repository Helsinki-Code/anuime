"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeReleaseDetailSection } from "./anuime-release-detail-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeReleaseDetailSection character={character} />;
}
