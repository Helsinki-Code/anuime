"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeProductDetailSection } from "./anuime-product-detail-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeProductDetailSection character={character} />;
}
