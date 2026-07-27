"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCheckoutSection } from "./anuime-checkout-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeCheckoutSection character={character} />;
}
