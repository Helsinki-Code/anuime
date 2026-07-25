"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeTooltip } from "./anuime-tooltip";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeTooltip character={character} label="A contextual system hint">
      <button className="rounded-[var(--anuime-control-radius,6px)] border px-4 py-2">
        Focus me
      </button>
    </AnuimeTooltip>
  );
}
