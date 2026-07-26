"use client";

import { useEffect, useState, type HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeNumberTickerProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  value: number;
  from?: number;
  durationMs?: number;
  format?: (value: number) => string;
  context?: "transition" | "success";
};

const markers = {
  kira: "size-2 rounded-full border border-[var(--anuime-accent,var(--accent))]",
  mochi:
    "size-2.5 rounded-full border border-[var(--anuime-secondary-accent,var(--border))] bg-[var(--anuime-surface,var(--background))]",
  atlas: "size-2 rotate-45 bg-[var(--anuime-accent,var(--accent))]",
} as const;

export function AnuimeNumberTicker({
  character = "atlas",
  recipe,
  value,
  from = 0,
  durationMs = 1700,
  format = (number) => Math.round(number).toLocaleString(),
  context = "transition",
  className = "",
  ...props
}: AnuimeNumberTickerProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return undefined;
    }
    let frame = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / durationMs);
      setDisplay(from + (value - from) * progress);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [durationMs, from, value]);

  return (
    <span
      data-character={system}
      data-anuime-component="number-ticker"
      data-anuime-tier="expressive"
      data-anuime-context={context}
      className={`inline-flex items-center gap-3 font-mono font-bold text-foreground tabular-nums ${className}`}
      {...props}
    >
      <span aria-live="polite" aria-atomic="true">
        {format(display)}
      </span>
      <span aria-hidden="true" className={markers[system]} />
    </span>
  );
}
