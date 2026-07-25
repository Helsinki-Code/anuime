"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeAlertDialog } from "./anuime-alert-dialog";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeAlertDialog character={character} />;
}
