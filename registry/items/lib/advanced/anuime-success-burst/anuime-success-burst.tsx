"use client";

import type { HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeSuccessBurstProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  active?: boolean;
  label?: string;
};

export function AnuimeSuccessBurst({
  character = "mochi",
  recipe,
  active = true,
  label = "Success",
  className = "",
  ...props
}: AnuimeSuccessBurstProps) {
  const system = resolveAnuimeRecipe(recipe, character).recipe.structureSystem;
  return (
    <div
      data-character={system}
      data-anuime-component="success-burst"
      data-anuime-tier="expressive"
      data-anuime-context="success"
      role="status"
      aria-label={label}
      className={`grid size-20 place-items-center ${className}`}
      {...props}
    >
      {system === "kira" ? (
        <span className="relative block size-14">
          <svg
            aria-hidden="true"
            className={active ? "anuime-success-kira size-14" : "size-14"}
            viewBox="0 0 56 56"
          >
            <path d="M12 40L34 14" className="stroke-border" strokeWidth="2" />
            <path
              d="M16 30L25 39L42 16"
              fill="none"
              className="stroke-[var(--anuime-accent,var(--accent))]"
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>
          <span
            aria-hidden="true"
            className="anuime-success-fragment absolute top-1 right-1 h-3 w-1 skew-x-[-18deg] bg-[var(--anuime-accent,var(--accent))]"
          />
          <span
            aria-hidden="true"
            className="anuime-success-fragment absolute bottom-1 left-2 h-2 w-1 skew-x-[-18deg] border-l border-[var(--anuime-accent,var(--accent))]"
          />
        </span>
      ) : system === "mochi" ? (
        <svg
          aria-hidden="true"
          data-motif="mochi-star"
          className={active ? "anuime-success-mochi size-14" : "size-14"}
          viewBox="0 0 56 56"
        >
          <path
            d="M28 6C30.2 20.6 35.4 25.8 50 28C35.4 30.2 30.2 35.4 28 50C25.8 35.4 20.6 30.2 6 28C20.6 25.8 25.8 20.6 28 6Z"
            fill="var(--anuime-accent,var(--accent))"
          />
        </svg>
      ) : (
        <span
          aria-hidden="true"
          className={`relative block size-16 ${active ? "anuime-success-atlas" : ""}`}
        >
          <span className="absolute inset-4 rounded-full border-[2.5px] border-[var(--anuime-accent,var(--accent))]" />
          {[
            "left-0 top-0 border-l-2 border-t-2",
            "right-0 top-0 border-r-2 border-t-2",
            "bottom-0 left-0 border-b-2 border-l-2",
            "bottom-0 right-0 border-b-2 border-r-2",
          ].map((classes) => (
            <span
              key={classes}
              className={`absolute size-3 border-[var(--anuime-accent,var(--accent))] ${classes}`}
            />
          ))}
          <span className="absolute top-1/2 -left-1 size-2 rotate-45 rounded-[1px] bg-[var(--anuime-accent,var(--accent))]" />
          <span className="absolute top-1/2 -right-1 size-2 rotate-45 rounded-[1px] border border-[var(--anuime-accent,var(--accent))]" />
        </span>
      )}
      <span className="sr-only">{label}</span>
      <style>{`
        @keyframes anuime-kira-draw { 0% { opacity:.25; stroke-dasharray:64; stroke-dashoffset:64 } 100% { opacity:1; stroke-dasharray:64; stroke-dashoffset:0 } }
        @keyframes anuime-kira-fragment { 0% { opacity:0; transform:scale(.2) skewX(-18deg) } 70% { opacity:1; transform:scale(1.12) skewX(-18deg) } 100% { transform:scale(1) skewX(-18deg) } }
        @keyframes anuime-mochi-blossom { 0% { opacity:0; transform:scale(.2) } 70% { opacity:1; transform:scale(1.12) } 100% { transform:scale(1) } }
        @keyframes anuime-atlas-lock { 0% { opacity:.25; transform:scale(1.2) } 100% { opacity:1; transform:scale(1) } }
        .anuime-success-kira path:last-child { animation:anuime-kira-draw 1200ms ease-out 1 forwards }
        .anuime-success-fragment { animation:anuime-kira-fragment 1200ms ease-out 1 forwards }
        .anuime-success-mochi { animation:anuime-mochi-blossom 1200ms ease-out 1 forwards; transform-origin:center }
        .anuime-success-atlas { animation:anuime-atlas-lock 1200ms ease-out 1 forwards }
        @media (prefers-reduced-motion: reduce) { .anuime-success-kira path:last-child,.anuime-success-fragment,.anuime-success-mochi,.anuime-success-atlas { animation:none; opacity:1; transform:none; stroke-dashoffset:0 } }
      `}</style>
    </div>
  );
}
