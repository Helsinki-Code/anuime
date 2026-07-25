"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCard } from "./anuime-card";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeCard
      character={character}
      eyebrow="Signal 07"
      title="Deploy at first light."
      description="A sharp surface built from accessible semantic tokens."
      action={
        <button className="rounded-[5px] bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
          Activate
        </button>
      }
    />
  );
}
