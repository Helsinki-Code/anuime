"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeAccordion } from "./anuime-accordion";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeAccordion
      character={character}
      items={[
        {
          id: "power",
          title: "What is a construction map?",
          content: "A board artifact translated into repeatable geometry and a component job.",
        },
        {
          id: "motion",
          title: "Does it animate?",
          content: "Only when the recipe and user preference allow it.",
        },
      ]}
    />
  );
}
