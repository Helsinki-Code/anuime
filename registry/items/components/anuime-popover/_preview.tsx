"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimePopover } from "./anuime-popover";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimePopover character={character} trigger="Open contextual note" title="Construction note">
      Context arrives without hiding the current task.
    </AnuimePopover>
  );
}
