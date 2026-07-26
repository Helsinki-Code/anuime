"use client";

import { useState } from "react";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeStickyRail } from "./anuime-sticky-rail";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "construction", label: "Construction" },
  { id: "usage", label: "Usage" },
] as const;

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  const [activeId, setActiveId] = useState("overview");
  return (
    <AnuimeStickyRail
      character={character}
      items={sections}
      activeId={activeId}
      onSelect={setActiveId}
      className="w-52"
    />
  );
}
