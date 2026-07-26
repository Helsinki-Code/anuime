"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeSignalCard } from "./anuime-signal-card";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeSignalCard
      character={character}
      label="Deploy signal"
      title="All systems nominal"
      description="Seven services are reporting healthy state."
      status="healthy"
    />
  );
}
