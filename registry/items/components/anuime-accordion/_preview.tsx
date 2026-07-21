"use client";

import { AnuimeAccordion } from "./anuime-accordion";

export function Preview() {
  return (
    <AnuimeAccordion
      items={[
        {
          id: "power",
          title: "What is Gridforge?",
          content: "A structural ability that makes hierarchy inspectable.",
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
