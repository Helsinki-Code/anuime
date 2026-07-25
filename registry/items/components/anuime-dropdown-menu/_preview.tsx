"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeDropdownMenu } from "./anuime-dropdown-menu";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeDropdownMenu character={character} />;
}
