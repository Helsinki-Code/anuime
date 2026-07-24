"use client";

import { useId, useState, type ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeTooltipProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label: string;
  children: ReactNode;
};

export function AnuimeTooltip({ character = "kira", recipe, label, children }: AnuimeTooltipProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const styles = resolveAnuimeRecipe(recipe, character, "tooltip");
  const system = styles.recipe.structureSystem;
  return (
    <span
      data-character={system}
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span
        aria-describedby={id}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="inline-flex outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        {children}
      </span>
      <span
        id={id}
        role="tooltip"
        hidden={!visible}
        className={`absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-64 -translate-x-1/2 bg-foreground text-background shadow-xl ${
          system === "mochi" ? "rounded-[8px] px-3 py-1.5" : "rounded-[4px] px-[11px] py-1.5"
        } ${system === "atlas" ? "ring-1 ring-[var(--anuime-border-strong,var(--border))] ring-offset-1 ring-offset-[var(--anuime-surface,var(--background))]" : ""}`}
      >
        {label}
        <span
          aria-hidden="true"
          className={`absolute top-full left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-foreground ${
            system === "mochi" ? "rounded-[2px]" : "rounded-none"
          }`}
        />
      </span>
    </span>
  );
}
