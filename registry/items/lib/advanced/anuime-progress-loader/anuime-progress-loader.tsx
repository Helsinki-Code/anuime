"use client";

import type { HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeProgressLoaderProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  value?: number;
  label?: string;
};

export function AnuimeProgressLoader({
  character = "atlas",
  recipe,
  value,
  label = "Loading progress",
  className = "",
  ...props
}: AnuimeProgressLoaderProps) {
  const system = resolveAnuimeRecipe(recipe, character).recipe.structureSystem;
  const percent = value === undefined ? undefined : Math.min(100, Math.max(0, value));
  const segments = 10;

  return (
    <div
      data-character={system}
      data-anuime-component="progress-loader"
      data-anuime-tier="expressive"
      data-anuime-context="waiting"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className={`w-full space-y-2 ${className}`}
      {...props}
    >
      <div
        className={`relative flex h-3 items-center ${
          system === "mochi"
            ? "gap-2 before:absolute before:right-0 before:left-0 before:h-px before:bg-border"
            : "gap-1"
        }`}
      >
        {Array.from({ length: segments }, (_, index) => {
          const filled = percent === undefined ? true : index < Math.round(percent / 10);
          return (
            <span
              key={index}
              aria-hidden="true"
              className={`anuime-progress-piece relative z-10 block border border-[var(--anuime-accent,var(--accent))] ${
                system === "atlas"
                  ? index === segments - 1
                    ? "size-2.5 rotate-45 rounded-[1px]"
                    : "h-2 flex-1 rounded-[1px]"
                  : system === "mochi"
                    ? "size-2.5 rounded-full"
                    : "size-2.5 rounded-[1px] after:absolute after:top-1/2 after:left-full after:h-px after:w-[calc(100%+0.25rem)] after:bg-border"
              } ${filled ? "bg-[var(--anuime-accent,var(--accent))]" : "bg-[var(--anuime-surface,var(--background))]"}`}
              style={{
                animationDelay: percent === undefined ? `${index * 80}ms` : undefined,
                animationDuration: percent === undefined ? "1150ms" : undefined,
                animationIterationCount: percent === undefined ? "infinite" : undefined,
              }}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        {percent === undefined ? null : <span>{Math.round(percent)}%</span>}
      </div>
      <style>{`
        @keyframes anuime-progress-wave { 0%,100% { opacity:.25 } 50% { opacity:1 } }
        .anuime-progress-piece { animation-name:anuime-progress-wave }
        @media (prefers-reduced-motion: reduce) { .anuime-progress-piece { animation:none; opacity:1 } }
      `}</style>
    </div>
  );
}
