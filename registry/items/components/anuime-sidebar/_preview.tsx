"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeSidebar } from "./anuime-sidebar";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeSidebar character={character} />;
}
