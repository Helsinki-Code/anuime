"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeBlogGridSection } from "./anuime-blog-grid-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeBlogGridSection character={character} />;
}
