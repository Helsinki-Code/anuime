"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeBorderTraceButton } from "./anuime-border-trace-button";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeBorderTraceButton character={character}>Focus the perimeter</AnuimeBorderTraceButton>
  );
}
