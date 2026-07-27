"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimePricingCardsSection } from "./anuime-pricing-cards-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimePricingCardsSection character={character} />;
}
