"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCalendar } from "./anuime-calendar";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeCalendar character={character} />;
}
