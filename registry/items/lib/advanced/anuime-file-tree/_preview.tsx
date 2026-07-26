"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeFileTree } from "./anuime-file-tree";

const nodes = [
  {
    id: "app",
    label: "app",
    children: [
      { id: "components", label: "components", children: [{ id: "button", label: "button.tsx" }] },
      { id: "page", label: "page.tsx" },
    ],
  },
] as const;

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeFileTree
      character={character}
      nodes={nodes}
      defaultExpanded={["app", "components"]}
      className="w-72"
    />
  );
}
