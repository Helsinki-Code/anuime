"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeFeatureComparisonSection } from "./anuime-feature-comparison-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeFeatureComparisonSection character={character} />;
}
