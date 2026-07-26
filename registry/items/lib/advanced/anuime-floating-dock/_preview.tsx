"use client";

import { useState } from "react";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeFloatingDock } from "./anuime-floating-dock";

const items = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "search", label: "Search", icon: "⌕" },
  { id: "studio", label: "Studio", icon: "◇" },
] as const;

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  const [activeId, setActiveId] = useState("home");
  return (
    <AnuimeFloatingDock
      character={character}
      items={items}
      activeId={activeId}
      onSelect={setActiveId}
    />
  );
}
