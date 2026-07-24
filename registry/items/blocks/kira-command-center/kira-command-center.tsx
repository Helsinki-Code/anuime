"use client";

import { useState } from "react";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeKbd } from "@/components/ui/anuime-kbd";
import { AnuimeProgress } from "@/components/ui/anuime-progress";
import { createAnuimeRecipe, resolveAnuimeRecipe, type AnuimeRecipeV2 } from "@/lib/anuime-recipe";

export type KiraCommandCenterProps = {
  recipe?: AnuimeRecipeV2;
  mission?: string;
  commands?: { id: string; label: string; shortcut: string }[];
  trace?: string[];
};

export function KiraCommandCenter({
  recipe = createAnuimeRecipe("kira"),
  mission = "Ship the next decisive release.",
  commands = [
    { id: "preview", label: "Open preview", shortcut: "P" },
    { id: "checks", label: "Run launch checks", shortcut: "T" },
    { id: "deploy", label: "Deploy production", shortcut: "D" },
  ],
  trace = ["Registry validated", "Visual matrix stable", "Production target ready"],
}: KiraCommandCenterProps) {
  const [overdrive, setOverdrive] = useState(false);
  const styles = resolveAnuimeRecipe(recipe, "kira");
  return (
    <section
      data-character="kira"
      className={`${styles.surface} ${styles.surfacePadding} grid gap-5 lg:grid-cols-[13rem_minmax(0,1fr)_17rem]`}
    >
      <nav aria-label="Signal Rail" className="grid content-start gap-2">
        <p className={`${styles.accent} font-mono text-xs tracking-[0.18em] uppercase`}>
          Signal Rail
        </p>
        {commands.map((command) => (
          <button
            key={command.id}
            className={`${styles.shapeControl} flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-[var(--anuime-subtle-hover,var(--secondary))] focus-visible:ring-2`}
          >
            <span>{command.label}</span>
            <AnuimeKbd recipe={recipe}>{command.shortcut}</AnuimeKbd>
          </button>
        ))}
      </nav>
      <div
        className={`${styles.surface} ${styles.surfacePadding} motion-safe:animate-in motion-safe:fade-in`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <AnuimeBadge recipe={recipe}>Target Lock</AnuimeBadge>
          <AnuimeBadge recipe={recipe} tone={overdrive ? "warning" : "success"}>
            {overdrive ? "Overdrive" : "Stable"}
          </AnuimeBadge>
        </div>
        <h2 className="mt-5 text-3xl font-bold tracking-tight">{mission}</h2>
        <p className="mt-3 text-sm opacity-70">
          Signal Cut isolates the next action while the full command chain remains keyboard
          reachable.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <AnuimeButton recipe={recipe}>Execute next move</AnuimeButton>
          <button
            className={`${styles.secondary} ${styles.control}`}
            aria-pressed={overdrive}
            onClick={() => setOverdrive((value) => !value)}
          >
            Toggle Overdrive
          </button>
        </div>
        <div className="mt-6">
          <AnuimeProgress recipe={recipe} label="Combo Chain" value={overdrive ? 92 : 68} />
        </div>
      </div>
      <aside>
        <p className={`${styles.accent} font-mono text-xs tracking-[0.18em] uppercase`}>
          Signal Trace
        </p>
        <ol className="mt-3 grid gap-3 text-sm">
          {trace.map((entry, index) => (
            <li key={entry} className="flex gap-2">
              <span aria-hidden="true" className={styles.accent}>
                0{index + 1}
              </span>
              <span>{entry}</span>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
}
