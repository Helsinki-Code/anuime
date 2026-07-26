"use client";

import { useEffect, useState, type HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeWordCycleProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  words: readonly string[];
  intervalMs?: number;
  autoPlay?: boolean;
  showControls?: boolean;
};

const markers = {
  kira: "size-2.5 rotate-45 border-r-[1.5px] border-b-[1.5px]",
  mochi: "size-2.5 rounded-full border-r-2 border-b-2",
  atlas: "h-1 w-4 rounded-[1px]",
} as const;

export function AnuimeWordCycle({
  character = "kira",
  recipe,
  words,
  intervalMs = 1700,
  autoPlay = true,
  showControls = true,
  className = "",
  ...props
}: AnuimeWordCycleProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const safeWords = words.length > 0 ? words : ["AnUIme"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const timer = globalThis.setInterval(() => {
      setIndex((current) => (current + 1) % safeWords.length);
    }, intervalMs);
    return () => globalThis.clearInterval(timer);
  }, [autoPlay, intervalMs, safeWords.length]);

  const move = (direction: number) => {
    setIndex((current) => (current + direction + safeWords.length) % safeWords.length);
  };

  return (
    <span
      data-character={system}
      data-anuime-component="word-cycle"
      data-anuime-tier="expressive"
      data-anuime-context="transition"
      className={`inline-flex items-center gap-3 text-foreground ${className}`}
      {...props}
    >
      <span
        aria-live="polite"
        aria-atomic="true"
        className={`font-bold ${system === "mochi" ? "font-serif" : "font-sans"}`}
      >
        {safeWords[index]}
      </span>
      <span
        aria-hidden="true"
        className={`${markers[system]} border-[var(--anuime-accent,var(--accent))] bg-[var(--anuime-accent,var(--accent))]`}
      />
      {showControls ? (
        <span className="inline-flex overflow-hidden rounded-[var(--anuime-control-radius,6px)] border border-border">
          <button
            type="button"
            aria-label="Previous word"
            className="min-h-8 px-2 text-foreground hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => move(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next word"
            className="min-h-8 border-l border-border px-2 text-foreground hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => move(1)}
          >
            ›
          </button>
        </span>
      ) : null}
    </span>
  );
}
