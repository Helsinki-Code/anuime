"use client";

import { useEffect, useState, type HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeScrollProgressProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  value?: number;
  label?: string;
};

export function AnuimeScrollProgress({
  character = "kira",
  recipe,
  value,
  label = "Reading progress",
  className = "",
  ...props
}: AnuimeScrollProgressProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const [scrollValue, setScrollValue] = useState(value ?? 0);
  const safeValue = Math.max(0, Math.min(100, value ?? scrollValue));

  useEffect(() => {
    if (value !== undefined) {
      setScrollValue(value);
      return undefined;
    }
    const update = () => {
      const max = document.documentElement.scrollHeight - globalThis.innerHeight;
      setScrollValue(max > 0 ? (globalThis.scrollY / max) * 100 : 0);
    };
    update();
    globalThis.addEventListener("scroll", update, { passive: true });
    return () => globalThis.removeEventListener("scroll", update);
  }, [value]);

  return (
    <div
      data-character={system}
      data-anuime-component="scroll-progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(safeValue)}
      className={`relative w-full ${className}`}
      {...props}
    >
      {system === "atlas" ? (
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: 10 }, (_, index) => (
            <span
              key={index}
              className={`linear h-1.5 rounded-[1px] border transition-colors duration-[180ms] motion-reduce:transition-none ${
                safeValue >= (index + 1) * 10
                  ? "border-[var(--anuime-accent,var(--accent))] bg-[var(--anuime-accent,var(--accent))]"
                  : "border-border"
              }`}
            />
          ))}
        </div>
      ) : (
        <div className="relative h-2">
          <span className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-border" />
          <span
            className={`absolute top-1/2 left-0 h-px -translate-y-1/2 bg-[var(--anuime-accent,var(--accent))] transition-[width] motion-reduce:transition-none ${
              system === "kira" ? "duration-[240ms]" : "duration-[250ms] ease-out"
            }`}
            style={{ width: `${safeValue}%` }}
          />
          {Array.from({ length: 5 }, (_, index) => {
            const station = index * 25;
            const active = safeValue >= station;
            return (
              <span
                key={station}
                className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 ${
                  system === "kira"
                    ? "size-1.5"
                    : `rounded-full ${index < 2 ? "size-2" : "size-1.5"}`
                } ${active ? "bg-[var(--anuime-accent,var(--accent))]" : "border border-border bg-[var(--anuime-surface,var(--background))]"}`}
                style={{ left: `${station}%` }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
