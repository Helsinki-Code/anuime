"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeFaqAccordionSection } from "./anuime-faq-accordion-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeFaqAccordionSection character={character} />;
}
