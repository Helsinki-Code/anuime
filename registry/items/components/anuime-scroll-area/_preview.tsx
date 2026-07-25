"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeScrollArea } from "./anuime-scroll-area";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeScrollArea character={character} />;
}
