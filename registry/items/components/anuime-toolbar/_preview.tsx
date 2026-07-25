"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeToolbar } from "./anuime-toolbar";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeToolbar character={character} />;
}
