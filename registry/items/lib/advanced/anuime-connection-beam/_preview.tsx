"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeConnectionBeam } from "./anuime-connection-beam";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeConnectionBeam character={character} start="API" end="UI" className="w-full max-w-lg" />
  );
}
