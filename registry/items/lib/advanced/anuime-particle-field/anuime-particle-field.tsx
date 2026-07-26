"use client";

import type { HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeParticleFieldProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  density?: "quiet" | "standard";
};

const positions = [
  ["12%", "18%"],
  ["29%", "72%"],
  ["46%", "35%"],
  ["64%", "82%"],
  ["77%", "24%"],
  ["89%", "61%"],
  ["18%", "52%"],
  ["58%", "12%"],
] as const;

export function AnuimeParticleField({
  character = "kira",
  recipe,
  density = "standard",
  className = "",
  children,
  ...props
}: AnuimeParticleFieldProps) {
  const system = resolveAnuimeRecipe(recipe, character).recipe.structureSystem;
  const particles = positions.slice(0, density === "quiet" ? 5 : 8);
  return (
    <div
      data-character={system}
      data-anuime-component="particle-field"
      data-anuime-tier="expressive"
      data-anuime-context="ambient waiting"
      className={`relative min-h-52 w-full overflow-hidden border border-border bg-[var(--anuime-surface,var(--background))] ${className}`}
      {...props}
    >
      {particles.map(([left, top], index) => (
        <span
          key={`${left}-${top}`}
          aria-hidden="true"
          className={`anuime-particle absolute border border-[var(--anuime-accent,var(--accent))] ${
            system === "atlas"
              ? "size-2 rotate-45 rounded-[1px]"
              : system === "mochi"
                ? "size-2 rounded-full"
                : index === 0
                  ? "h-3 w-1 skew-x-[-18deg]"
                  : "size-1.5 rounded-[1px]"
          }`}
          style={{
            left,
            top,
            animationDelay: `${index * 120}ms`,
            animationDuration: index % 2 === 0 ? "2600ms" : "3200ms",
          }}
        />
      ))}
      {system === "kira" ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[34%] left-[34%] h-px w-16 rotate-[114deg] border-t border-border"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[58%] left-[54%] h-px w-12 rotate-[114deg] border-t border-border"
          />
        </>
      ) : null}
      {system === "mochi" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-8 rounded-[var(--anuime-panel-radius,16px)] border border-[var(--anuime-accent,var(--accent))] opacity-20"
        />
      ) : system === "atlas" ? (
        <span
          aria-hidden="true"
          className="anuime-particle absolute top-1/2 left-1/2 size-4 rounded-full border-2 border-[var(--anuime-accent,var(--accent))]"
          style={{ animationDuration: "2400ms" }}
        />
      ) : null}
      <div className="relative z-10">{children}</div>
      <style>{`
        @keyframes anuime-particle-breathe { 0%,100% { opacity:.25 } 50% { opacity:.8 } }
        .anuime-particle { animation:anuime-particle-breathe ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) { .anuime-particle { animation:none; opacity:.55 } }
      `}</style>
    </div>
  );
}
