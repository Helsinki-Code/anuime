"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeToast } from "./anuime-toast";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeToast
      character={character}
      status="success"
      title="Recipe installed"
      description="Kira Button is now part of your project."
    />
  );
}
