"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeAuthSplitSection } from "./anuime-auth-split-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeAuthSplitSection character={character} />;
}
