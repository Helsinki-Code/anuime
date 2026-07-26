"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCodeWindow } from "./anuime-code-window";

const code = `export function Signal() {
  return <AnuimeButton>Send</AnuimeButton>
}`;

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeCodeWindow character={character} code={code} className="w-full max-w-lg" />;
}
