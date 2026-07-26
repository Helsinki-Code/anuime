"use client";

import type { HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeOrbitMapProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label?: string;
  stations?: readonly string[];
  active?: boolean;
};

const positions = [
  "left-1/2 top-2",
  "right-2 top-1/2",
  "bottom-2 left-1/2",
  "left-2 top-1/2",
] as const;
const crescentPositions = [
  "left-[38%] top-[18%]",
  "left-[62%] top-[28%]",
  "left-[68%] top-[52%]",
  "left-[56%] top-[75%]",
] as const;

export function AnuimeOrbitMap({
  character = "mochi",
  recipe,
  label = "Active orbit",
  stations = ["North", "East", "South", "West"],
  active = true,
  className = "",
  ...props
}: AnuimeOrbitMapProps) {
  const system = resolveAnuimeRecipe(recipe, character).recipe.structureSystem;
  const stationPositions = system === "mochi" ? crescentPositions : positions;

  return (
    <div
      data-character={system}
      data-anuime-component="orbit-map"
      data-anuime-tier="expressive"
      data-anuime-context="waiting ambient"
      role="status"
      aria-label={label}
      className={`relative grid aspect-square w-64 place-items-center rounded-[var(--anuime-panel-radius,8px)] border border-border bg-[var(--anuime-surface,var(--background))] ${className}`}
      {...props}
    >
      <span aria-hidden="true" className="absolute inset-8 rounded-full border border-border" />
      <span
        aria-hidden="true"
        className={`absolute inset-14 border-[var(--anuime-accent,var(--accent))] ${
          system === "atlas"
            ? "rotate-45 rounded-[1px] border"
            : system === "mochi"
              ? "rounded-full border-l-2"
              : "rounded-full border"
        }`}
      />
      <span
        aria-hidden="true"
        className={`size-4 border-2 border-[var(--anuime-accent,var(--accent))] ${
          system === "atlas"
            ? "rotate-45 rounded-[1px]"
            : system === "mochi"
              ? "rounded-full"
              : "rounded-[1px]"
        } ${active ? "bg-[var(--anuime-accent,var(--accent))]" : ""}`}
      />
      {stations.slice(0, 4).map((station, index) => (
        <span
          key={`${station}-${stationPositions[index]}`}
          title={station}
          aria-hidden="true"
          className={`anuime-orbit-station absolute ${stationPositions[index]} -translate-x-1/2 -translate-y-1/2 border border-[var(--anuime-accent,var(--accent))] bg-[var(--anuime-surface,var(--background))] ${
            system === "atlas"
              ? "size-3 rotate-45 rounded-[1px]"
              : system === "mochi"
                ? "size-3 rounded-full"
                : "size-3 rounded-[1px]"
          }`}
          style={{ animationDelay: `${index * 120}ms` }}
        />
      ))}
      <style>{`
        @keyframes anuime-orbit-breathe { 0%,100% { opacity:.3 } 50% { opacity:1 } }
        .anuime-orbit-station { animation:anuime-orbit-breathe 1150ms ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) { .anuime-orbit-station { animation:none; opacity:1 } }
      `}</style>
    </div>
  );
}
