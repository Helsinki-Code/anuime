"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeSelect } from "./anuime-select";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeSelect
      character={character}
      label="Choose your familiar"
      options={[
        { value: "kira", label: "Kira — Incisive" },
        { value: "mochi", label: "Mochi — Gracious" },
        { value: "atlas", label: "Atlas — Engineered" },
      ]}
      hint="You can mix individual dimensions later."
    />
  );
}
