"use client";

import { useState } from "react";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCommandDock } from "./anuime-command-dock";

const commands = [
  { id: "search", label: "Search registry", shortcut: "⌘K" },
  { id: "cast", label: "Cast characters", shortcut: "⌘⇧C" },
  { id: "review", label: "Review source", shortcut: "⌘R" },
] as const;

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  const [activeId, setActiveId] = useState("search");
  return (
    <AnuimeCommandDock
      character={character}
      commands={commands}
      activeId={activeId}
      onSelect={setActiveId}
      className="w-72"
    />
  );
}
