"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCopyButton } from "./anuime-copy-button";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeCopyButton character={character} value="npx shadcn@latest add anuime" />;
}
