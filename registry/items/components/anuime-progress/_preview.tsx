"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeProgress } from "./anuime-progress";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <div className="border border-[var(--border)] bg-[var(--anuime-surface)] p-6">
      <AnuimeProgress character={character} label="Deployment sequence" value={68} />
    </div>
  );
}
