"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeFaqCategoriesSection } from "./anuime-faq-categories-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeFaqCategoriesSection character={character} />;
}
