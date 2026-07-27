"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimePricingComparisonSection } from "./anuime-pricing-comparison-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimePricingComparisonSection character={character} />;
}
