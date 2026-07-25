"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeMenubar } from "./anuime-menubar";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeMenubar character={character} />;
}
