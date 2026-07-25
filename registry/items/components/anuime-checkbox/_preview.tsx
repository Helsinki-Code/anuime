"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCheckbox } from "./anuime-checkbox";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <div className="border border-[var(--border)] bg-[var(--anuime-surface)] p-6 text-foreground">
      <AnuimeCheckbox
        character={character}
        label="Include release notes"
        description="Keep the project team informed when this ships."
        defaultChecked
      />
    </div>
  );
}
