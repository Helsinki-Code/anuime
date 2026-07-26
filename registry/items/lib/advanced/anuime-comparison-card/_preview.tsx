"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeComparisonCard } from "./anuime-comparison-card";

export function Preview({ character = "mochi" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeComparisonCard
      character={character}
      eyebrow="Recommended"
      title="Studio"
      price="$24"
      selected
      features={[
        { label: "Three character systems" },
        { label: "Six theme variants" },
        { label: "Private deployment", included: false },
      ]}
    />
  );
}
