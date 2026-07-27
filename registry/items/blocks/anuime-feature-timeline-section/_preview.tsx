"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeFeatureTimelineSection } from "./anuime-feature-timeline-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeFeatureTimelineSection character={character} />;
}
