"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeParallaxLayer } from "./anuime-parallax-layer";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeParallaxLayer
      character={character}
      layers={[
        { id: "frame", content: <div className="size-32 border border-border" /> },
        {
          id: "core",
          content: <div className="size-16 border border-[var(--anuime-accent,var(--accent))]" />,
        },
        { id: "label", content: <strong>Move through depth</strong> },
      ]}
    />
  );
}
