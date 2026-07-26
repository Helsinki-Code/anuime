"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeChartCallout } from "./anuime-chart-callout";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeChartCallout
      character={character}
      label="Conversion"
      value="24.8%"
      detail="Up 4.2 points this period."
    />
  );
}
