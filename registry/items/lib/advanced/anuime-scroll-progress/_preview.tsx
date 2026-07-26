"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeScrollProgress } from "./anuime-scroll-progress";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeScrollProgress character={character} value={64} className="w-72" />;
}
