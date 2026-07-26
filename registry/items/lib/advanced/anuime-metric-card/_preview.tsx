"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeMetricCard } from "./anuime-metric-card";

export function Preview({ character = "atlas" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeMetricCard
      character={character}
      label="Active recipes"
      value="2,418"
      delta="+12.8%"
      direction="up"
    />
  );
}
