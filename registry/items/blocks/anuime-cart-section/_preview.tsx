"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCartSection } from "./anuime-cart-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeCartSection character={character} />;
}
