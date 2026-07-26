"use client";

import type { CSSProperties, HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeConfettiFieldProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  active?: boolean;
};

const offsets = [-42, -28, -14, 0, 14, 28, 42] as const;
const mochiOffsets = [-28, -14, 0, 14, 28] as const;

export function AnuimeConfettiField({
  character = "atlas",
  recipe,
  active = true,
  className = "",
  children,
  ...props
}: AnuimeConfettiFieldProps) {
  const system = resolveAnuimeRecipe(recipe, character).recipe.structureSystem;
  const fragments = system === "mochi" ? mochiOffsets : offsets;
  return (
    <div
      data-character={system}
      data-anuime-component="confetti-field"
      data-anuime-tier="expressive"
      data-anuime-context="success"
      className={`relative min-h-52 w-full overflow-hidden ${className}`}
      {...props}
    >
      {active
        ? fragments.map((offset, index) => {
            const kiraDistance = offset === 0 ? 56 : offset * 1.5;
            const x = system === "kira" ? Math.cos((114 * Math.PI) / 180) * kiraDistance : offset;
            const y =
              system === "kira"
                ? Math.sin((114 * Math.PI) / 180) * kiraDistance
                : system === "mochi"
                  ? 72
                  : 64 + Math.abs(offset) * 0.35;
            return (
              <span
                key={offset}
                aria-hidden="true"
                className="anuime-confetti absolute top-1/2 left-1/2"
                style={
                  {
                    "--anuime-confetti-x": `${x}px`,
                    "--anuime-confetti-y": `${y}px`,
                    animationDelay: `${index * 45}ms`,
                  } as CSSProperties
                }
              >
                {system === "kira" ? (
                  <span className="block h-4 w-1 skew-x-[-18deg] border-l-2 border-[var(--anuime-accent,var(--accent))]" />
                ) : system === "atlas" ? (
                  <span
                    className={`block border-[var(--anuime-accent,var(--accent))] ${
                      index % 2 === 0 ? "size-2 rotate-45 border-2" : "h-4 w-1.5 border-l-2"
                    }`}
                  />
                ) : index === 0 ? (
                  <svg
                    data-motif="mochi-star"
                    className="size-3 text-[var(--anuime-accent,var(--accent))]"
                    viewBox="0 0 12 12"
                  >
                    <path
                      d="M6 0C6.6 4.2 7.8 5.4 12 6C7.8 6.6 6.6 7.8 6 12C5.4 7.8 4.2 6.6 0 6C4.2 5.4 5.4 4.2 6 0Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <span className="block h-4 w-px border-l border-[var(--anuime-accent,var(--accent))]" />
                )}
              </span>
            );
          })
        : null}
      <div className="relative z-10">{children}</div>
      <style>{`
        @keyframes anuime-confetti-once { 0% { opacity:0; transform:translate(-50%,-10%) } 25% { opacity:1 } 100% { opacity:0; transform:translate(calc(-50% + var(--anuime-confetti-x)),var(--anuime-confetti-y)) } }
        .anuime-confetti { animation:anuime-confetti-once 1200ms ease-out 1 forwards }
        @media (prefers-reduced-motion: reduce) { .anuime-confetti { animation:none; opacity:.65; transform:translate(calc(-50% + var(--anuime-confetti-x)),0) } }
      `}</style>
    </div>
  );
}
