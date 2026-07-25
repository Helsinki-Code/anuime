"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeTypography } from "./anuime-typography";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeTypography character={character} />;
}
