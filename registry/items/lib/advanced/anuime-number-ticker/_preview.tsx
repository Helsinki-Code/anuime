"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeNumberTicker } from "./anuime-number-ticker";

export function Preview({ character = "atlas" }: { character?: AnuimeCharacter }) {
  return <AnuimeNumberTicker character={character} from={0} value={2418} className="text-3xl" />;
}
