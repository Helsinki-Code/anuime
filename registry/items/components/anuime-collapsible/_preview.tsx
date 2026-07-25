"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCollapsible } from "./anuime-collapsible";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeCollapsible character={character} />;
}
