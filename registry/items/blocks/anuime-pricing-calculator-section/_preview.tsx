"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimePricingCalculatorSection } from "./anuime-pricing-calculator-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimePricingCalculatorSection character={character} />;
}
