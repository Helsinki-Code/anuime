"use client";

import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCommandPalette } from "@/components/ui/anuime-command-palette";
import { createAnuimeRecipe, type AnuimeRecipeV2 } from "@/lib/anuime-recipe";

export type KiraSignalDeckProps = {
  recipe?: AnuimeRecipeV2;
  mission?: string;
  primaryAction?: string;
};

export function KiraSignalDeck({
  recipe = createAnuimeRecipe("kira"),
  mission = "Ship the release without losing focus.",
  primaryAction = "Activate Signal Cut",
}: KiraSignalDeckProps) {
  return (
    <section className="grid gap-5 rounded-xl border border-cyan-400/30 bg-zinc-950 p-5 text-zinc-50 shadow-2xl lg:grid-cols-[1fr_22rem]">
      <div className="flex min-h-72 flex-col justify-between border-l-2 border-cyan-300 pl-5">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-cyan-300 uppercase">
            Kira · Signal Cut
          </p>
          <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight">{mission}</h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-400">
            One decisive action is elevated. Everything else remains reachable through the command
            deck.
          </p>
        </div>
        <AnuimeButton recipe={recipe}>{primaryAction}</AnuimeButton>
      </div>
      <AnuimeCommandPalette
        recipe={recipe}
        commands={[
          { id: "preview", label: "Open release preview", group: "Mission", shortcut: "P" },
          { id: "tests", label: "Run launch checks", group: "Mission", shortcut: "T" },
          { id: "rollback", label: "Review rollback plan", group: "Safety", shortcut: "R" },
        ]}
      />
    </section>
  );
}
