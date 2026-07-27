"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeProductGridSection } from "./anuime-product-grid-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeProductGridSection character={character} />;
}
