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
    <section
      data-character="kira"
      className="grid gap-5 rounded-[8px] border border-[var(--anuime-border-strong,var(--border))] bg-[var(--anuime-surface,var(--card))] p-5 text-foreground shadow-[0_16px_40px_-28px_color-mix(in_oklab,var(--foreground)_35%,transparent)] lg:grid-cols-[1fr_22rem]"
    >
      <div className="flex min-h-72 flex-col justify-between border-l-2 border-[var(--anuime-accent,var(--accent))] pl-5">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-[var(--anuime-accent,var(--accent))] uppercase">
            Kira · Signal Cut
          </p>
          <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight">{mission}</h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
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
