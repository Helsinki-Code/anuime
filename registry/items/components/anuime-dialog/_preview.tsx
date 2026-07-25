"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeDialog } from "./anuime-dialog";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeDialog
      character={character}
      title="Initialize system?"
      description="Your current recipe is valid and ready for installation."
      triggerLabel="Open transmission"
    >
      <p className="text-sm">All accessibility and compatibility checks passed.</p>
    </AnuimeDialog>
  );
}
