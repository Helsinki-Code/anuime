"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeTraceCard } from "./anuime-trace-card";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeTraceCard
      character={character}
      title="Focus the boundary"
      description="Tab to this card to see its authored focus construction."
      footer={<span className="text-sm font-semibold">Keyboard ready</span>}
    />
  );
}
