"use client";

import { useEffect, useMemo, useState, type HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeScrambleTextProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  text: string;
  active?: boolean;
};

const fragments = {
  kira: "·▮",
  mochi: "",
  atlas: "0123456789",
} as const;

export function AnuimeScrambleText({
  character = "kira",
  recipe,
  text,
  active = true,
  className = "",
  ...props
}: AnuimeScrambleTextProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const [resolved, setResolved] = useState(active ? 0 : text.length);
  const glyphs = fragments[system];

  useEffect(() => {
    const reduced = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!active || reduced || system === "mochi") {
      setResolved(text.length);
      return undefined;
    }

    setResolved(0);
    const timer = globalThis.setInterval(
      () => {
        setResolved((current) => {
          if (current >= text.length) {
            globalThis.clearInterval(timer);
            return current;
          }
          return current + 1;
        });
      },
      system === "kira" ? 60 : 90,
    );
    return () => globalThis.clearInterval(timer);
  }, [active, system, text]);

  const display = useMemo(
    () =>
      Array.from(text)
        .map((letter, index) => {
          if (index < resolved || letter === " " || !glyphs) return letter;
          return glyphs[index % glyphs.length];
        })
        .join(""),
    [glyphs, resolved, text],
  );

  return (
    <span
      data-character={system}
      data-anuime-component="scramble-text"
      data-anuime-tier="expressive"
      data-anuime-context="transition"
      aria-label={text}
      className={`inline-flex items-center gap-2 text-foreground ${
        system === "mochi" ? "font-serif transition-opacity duration-[250ms] ease-out" : "font-mono"
      } ${className}`}
      {...props}
    >
      <span aria-hidden="true">{display}</span>
      {system === "kira" ? (
        <span
          aria-hidden="true"
          className="size-2 skew-x-[-18deg] bg-[var(--anuime-accent,var(--accent))]"
        />
      ) : null}
      {system === "atlas" ? (
        <span
          aria-hidden="true"
          className="size-2 rotate-45 border border-[var(--anuime-accent,var(--accent))]"
        />
      ) : null}
    </span>
  );
}
