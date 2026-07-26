"use client";

import { useEffect, useState, type HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeTypewriterProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  text: string;
  active?: boolean;
  durationMs?: number;
  context?: "waiting" | "transition";
};

const carets = {
  kira: "h-4 w-px bg-[var(--anuime-accent,var(--accent))] after:absolute after:-right-1 after:bottom-0 after:size-1.5 after:rounded-full after:border after:border-[var(--anuime-accent,var(--accent))] after:content-['']",
  mochi:
    "h-px w-4 bg-[var(--anuime-secondary-accent,var(--border))] after:absolute after:right-0 after:-top-1 after:size-2.5 after:rounded-full after:border after:border-[var(--anuime-secondary-accent,var(--border))] after:bg-[var(--anuime-surface,var(--background))] after:content-['']",
  atlas: "h-4 w-1 bg-[var(--anuime-accent,var(--accent))]",
} as const;

export function AnuimeTypewriter({
  character = "kira",
  recipe,
  text,
  active = true,
  durationMs = 1700,
  context = "waiting",
  className = "",
  ...props
}: AnuimeTypewriterProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const [length, setLength] = useState(active ? 0 : text.length);

  useEffect(() => {
    if (!active || globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setLength(text.length);
      return undefined;
    }
    setLength(0);
    const stepMs = Math.max(16, durationMs / Math.max(1, text.length));
    const timer = globalThis.setInterval(() => {
      setLength((current) => {
        if (current >= text.length) {
          globalThis.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, stepMs);
    return () => globalThis.clearInterval(timer);
  }, [active, durationMs, text]);

  return (
    <span
      data-character={system}
      data-anuime-component="typewriter"
      data-anuime-tier="expressive"
      data-anuime-context={context}
      className={`inline-flex items-center gap-2 font-mono text-foreground ${className}`}
      {...props}
    >
      <span aria-live="polite" aria-atomic="true">
        {text.slice(0, length)}
      </span>
      <span aria-hidden="true" className={`relative inline-block shrink-0 ${carets[system]}`} />
    </span>
  );
}
