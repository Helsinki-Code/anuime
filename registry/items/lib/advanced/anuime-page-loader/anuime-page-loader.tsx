"use client";

import type { HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimePageLoaderProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label?: string;
};

function KiraLoader() {
  return (
    <span aria-hidden="true" className="relative block h-16 w-[150px]">
      <span className="anuime-kira-blade absolute top-2 left-[44%] h-12 w-4 skew-x-[-24deg] border-r-2 border-[var(--anuime-accent,var(--accent))]" />
      <span className="anuime-kira-shard absolute top-4 left-[40%] h-3 w-[5px] skew-x-[-18deg] bg-[var(--anuime-accent,var(--accent))]" />
      <span className="anuime-kira-shard anuime-delay-260 absolute top-[34px] left-[56%] h-[9px] w-1 skew-x-[-18deg] bg-[var(--anuime-accent,var(--accent))]" />
    </span>
  );
}

function MochiLoader() {
  const pearls = [
    "left-[31px] top-0 size-[9px]",
    "right-0 top-[31px] size-2 opacity-70",
    "bottom-0 left-[31px] size-[7px] opacity-45",
    "left-0 top-[32px] size-1.5 opacity-30",
  ];
  return (
    <span aria-hidden="true" className="anuime-mochi-orbit relative block size-[70px]">
      {pearls.map((classes) => (
        <span
          key={classes}
          className={`absolute rounded-full bg-[var(--anuime-accent,var(--accent))] ${classes}`}
        />
      ))}
      <svg
        className="anuime-mochi-star absolute top-[29px] left-[29px] size-3 text-[var(--anuime-accent,var(--accent))]"
        viewBox="0 0 12 12"
      >
        <path
          d="M6 0C6.6 4.2 7.8 5.4 12 6C7.8 6.6 6.6 7.8 6 12C5.4 7.8 4.2 6.6 0 6C4.2 5.4 5.4 4.2 6 0Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

function AtlasLoader() {
  return (
    <span aria-hidden="true" className="relative block size-[72px]">
      <span className="anuime-atlas-ring absolute top-5 left-5 size-8 rounded-full border-2 border-border border-t-[var(--anuime-accent,var(--accent))]" />
      <span className="anuime-atlas-core absolute top-[31px] left-[31px] size-[10px] rotate-45 rounded-[1px] bg-[var(--anuime-accent,var(--accent))]" />
      {[
        ["anuime-atlas-bracket-tl", "left-1 top-1 border-l-2 border-t-2"],
        ["anuime-atlas-bracket-tr", "right-1 top-1 border-r-2 border-t-2"],
        ["anuime-atlas-bracket-bl", "bottom-1 left-1 border-b-2 border-l-2"],
        ["anuime-atlas-bracket-br", "bottom-1 right-1 border-b-2 border-r-2"],
      ].map(([motionClass, classes]) => (
        <span
          key={classes}
          className={`${motionClass} absolute size-3 border-[var(--anuime-accent,var(--accent))] ${classes}`}
        />
      ))}
    </span>
  );
}

export function AnuimePageLoader({
  character = "kira",
  recipe,
  label = "Loading",
  className = "",
  ...props
}: AnuimePageLoaderProps) {
  const system = resolveAnuimeRecipe(recipe, character).recipe.structureSystem;
  return (
    <div
      data-character={system}
      data-anuime-component="page-loader"
      data-anuime-tier="expressive"
      data-anuime-context="waiting transition"
      role="status"
      aria-label={label}
      className={`grid min-h-32 w-full place-items-center text-foreground ${className}`}
      {...props}
    >
      {system === "kira" ? <KiraLoader /> : system === "mochi" ? <MochiLoader /> : <AtlasLoader />}
      <span className="sr-only">{label}</span>
      <style>{`
        @keyframes anuime-kira-slash { 0%,100% { transform: translateX(-22px) skewX(-24deg); opacity:.25 } 50% { transform: translateX(22px) skewX(-24deg); opacity:1 } }
        @keyframes anuime-fade { 0%,100% { opacity:.2 } 50% { opacity:1 } }
        @keyframes anuime-spin { to { transform:rotate(360deg) } }
        @keyframes anuime-pulse { 50% { transform:scale(1.15) rotate(45deg) } }
        @keyframes anuime-seat-tl { 0%,100% { transform:translate(-6px,-6px); opacity:.35 } 50% { transform:translate(0,0); opacity:1 } }
        @keyframes anuime-seat-tr { 0%,100% { transform:translate(6px,-6px); opacity:.35 } 50% { transform:translate(0,0); opacity:1 } }
        @keyframes anuime-seat-bl { 0%,100% { transform:translate(-6px,6px); opacity:.35 } 50% { transform:translate(0,0); opacity:1 } }
        @keyframes anuime-seat-br { 0%,100% { transform:translate(6px,6px); opacity:.35 } 50% { transform:translate(0,0); opacity:1 } }
        .anuime-kira-blade { animation:anuime-kira-slash 1150ms ease-in-out infinite }
        .anuime-kira-shard { animation:anuime-fade 1150ms ease-in-out 120ms infinite }
        .anuime-delay-260 { animation-delay:260ms }
        .anuime-mochi-orbit { animation:anuime-spin 1150ms linear infinite }
        .anuime-mochi-star { animation:anuime-fade 1150ms ease-in-out infinite }
        .anuime-atlas-ring { animation:anuime-spin 1000ms linear infinite }
        .anuime-atlas-core { animation:anuime-pulse 1150ms ease-in-out infinite }
        .anuime-atlas-bracket-tl { animation:anuime-seat-tl 1150ms ease-in-out infinite }
        .anuime-atlas-bracket-tr { animation:anuime-seat-tr 1150ms ease-in-out infinite }
        .anuime-atlas-bracket-bl { animation:anuime-seat-bl 1150ms ease-in-out infinite }
        .anuime-atlas-bracket-br { animation:anuime-seat-br 1150ms ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) {
          .anuime-kira-blade,.anuime-kira-shard,.anuime-mochi-orbit,.anuime-mochi-star,.anuime-atlas-ring,.anuime-atlas-core,.anuime-atlas-bracket-tl,.anuime-atlas-bracket-tr,.anuime-atlas-bracket-bl,.anuime-atlas-bracket-br { animation:none; opacity:1 }
        }
      `}</style>
    </div>
  );
}
