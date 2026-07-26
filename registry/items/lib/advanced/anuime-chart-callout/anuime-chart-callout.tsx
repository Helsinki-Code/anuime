"use client";

import { useState, type ButtonHTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeChartCalloutProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label: string;
  value: string;
  detail?: string;
  defaultOpen?: boolean;
};

export function AnuimeChartCallout({
  character = "kira",
  recipe,
  label,
  value,
  detail,
  defaultOpen = false,
  className = "",
  ...props
}: AnuimeChartCalloutProps) {
  const system = resolveAnuimeRecipe(recipe, character).recipe.structureSystem;
  const [open, setOpen] = useState(defaultOpen);
  const duration = system === "kira" ? "240ms" : system === "mochi" ? "250ms" : "180ms";

  return (
    <button
      type="button"
      data-character={system}
      data-anuime-component="chart-callout"
      aria-expanded={open}
      className={`relative min-w-44 border border-border bg-[var(--anuime-elevated,var(--popover))] p-4 text-left text-foreground shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
      onClick={() => setOpen((valueNow) => !valueNow)}
      {...props}
    >
      {system === "kira" ? (
        <>
          <span
            aria-hidden="true"
            className="absolute top-3 -left-1 h-4 w-1 skew-x-[-18deg] border-l-2 border-[var(--anuime-accent,var(--accent))]"
          />
          <span
            aria-hidden="true"
            className="absolute top-8 -left-2 size-4 rounded-full border border-[var(--anuime-accent,var(--accent))]"
          />
        </>
      ) : system === "mochi" ? (
        <>
          <svg
            aria-hidden="true"
            className="absolute top-3 -left-2 size-4 text-[var(--anuime-accent,var(--accent))]"
            viewBox="0 0 12 12"
          >
            <path
              d="M6 0C6.6 4.2 7.8 5.4 12 6C7.8 6.6 6.6 7.8 6 12C5.4 7.8 4.2 6.6 0 6C4.2 5.4 5.4 4.2 6 0Z"
              fill="currentColor"
            />
          </svg>
          <span
            aria-hidden="true"
            className="absolute top-9 -left-1 size-2 rounded-full bg-[var(--anuime-accent,var(--accent))]"
          />
        </>
      ) : (
        <>
          <span
            aria-hidden="true"
            className="absolute top-4 -left-1 size-3 rotate-45 rounded-[1px] bg-[var(--anuime-accent,var(--accent))]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-2 border-t-2 border-l-2 border-[var(--anuime-accent,var(--accent))]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-2 border-r-2 border-b-2 border-[var(--anuime-accent,var(--accent))]"
          />
        </>
      )}
      <span className="block text-xs font-medium text-muted-foreground">{label}</span>
      <span className={`mt-1 block text-xl font-bold ${system === "mochi" ? "font-serif" : ""}`}>
        {value}
      </span>
      <span
        className={`grid motion-safe:transition-[grid-template-rows,opacity] motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        style={{ transitionDuration: duration }}
      >
        <span className="overflow-hidden pt-2 text-sm text-muted-foreground">{detail}</span>
      </span>
    </button>
  );
}
