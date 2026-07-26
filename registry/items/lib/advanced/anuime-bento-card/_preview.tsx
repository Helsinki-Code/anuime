"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeBentoCard } from "./anuime-bento-card";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <div className="grid w-full max-w-2xl grid-cols-2 gap-3">
      <AnuimeBentoCard character={character} eyebrow="01" title="Compose" size="lg">
        Build from real registry primitives.
      </AnuimeBentoCard>
      <AnuimeBentoCard character={character} eyebrow="02" title="Install" size="sm">
        Ship one law-driven unit.
      </AnuimeBentoCard>
    </div>
  );
}
