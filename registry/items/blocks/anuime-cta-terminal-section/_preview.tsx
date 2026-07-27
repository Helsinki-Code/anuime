"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCtaTerminalSection } from "./anuime-cta-terminal-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeCtaTerminalSection character={character} />;
}
