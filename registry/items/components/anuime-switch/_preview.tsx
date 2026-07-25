"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeSwitch } from "./anuime-switch";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <div className="border border-[var(--border)] bg-[var(--anuime-surface)] p-6">
      <AnuimeSwitch
        character={character}
        label="Keep the signal active"
        description="The selected character carries the same accessible switch anatomy."
        defaultChecked
      />
    </div>
  );
}
