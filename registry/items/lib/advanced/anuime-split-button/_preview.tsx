"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeSplitButton } from "./anuime-split-button";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeSplitButton
      character={character}
      label="Deploy"
      options={[
        { id: "preview", label: "Deploy preview" },
        { id: "production", label: "Deploy production" },
      ]}
    />
  );
}
