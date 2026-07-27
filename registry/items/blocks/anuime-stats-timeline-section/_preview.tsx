"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeStatsTimelineSection } from "./anuime-stats-timeline-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeStatsTimelineSection character={character} />;
}
