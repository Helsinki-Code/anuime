"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeFaqSearchSection } from "./anuime-faq-search-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeFaqSearchSection character={character} />;
}
