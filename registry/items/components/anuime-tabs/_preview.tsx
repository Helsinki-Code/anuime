"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeTabs } from "./anuime-tabs";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeTabs
      character={character}
      tabs={[
        {
          id: "brief",
          label: "Brief",
          content: "Build an interface with a decisive visual identity.",
        },
        {
          id: "tokens",
          label: "Tokens",
          content: "Color, shape, structure, and motion remain explicit.",
        },
        { id: "code", label: "Code", content: "Install readable React and TypeScript source." },
      ]}
    />
  );
}
