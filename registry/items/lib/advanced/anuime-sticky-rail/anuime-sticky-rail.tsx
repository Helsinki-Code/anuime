"use client";

import type { HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeStickyRailItem = {
  id: string;
  label: string;
};

export type AnuimeStickyRailProps = Omit<HTMLAttributes<HTMLElement>, "onSelect"> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  items: readonly AnuimeStickyRailItem[];
  activeId: string;
  onSelect?: (id: string) => void;
};

export function AnuimeStickyRail({
  character = "kira",
  recipe,
  items,
  activeId,
  onSelect,
  className = "",
  ...props
}: AnuimeStickyRailProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;

  return (
    <nav
      data-character={system}
      data-anuime-component="sticky-rail"
      aria-label="Page sections"
      className={`sticky top-6 grid gap-1 border-l border-border pl-4 ${className}`}
      {...props}
    >
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            aria-current={active ? "location" : undefined}
            className={`group relative min-h-9 px-2 text-left text-sm text-foreground transition-colors motion-reduce:transition-none ${
              system === "kira"
                ? "duration-[240ms]"
                : system === "mochi"
                  ? "duration-[250ms]"
                  : "duration-[180ms]"
            }`}
            onClick={() => onSelect?.(item.id)}
          >
            <RailMark character={system} active={active} />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

function RailMark({
  character,
  active,
}: {
  character: "kira" | "mochi" | "atlas";
  active: boolean;
}) {
  const color = active
    ? "border-[var(--anuime-accent,var(--accent))] bg-[var(--anuime-accent,var(--accent))]"
    : "border-border bg-[var(--anuime-surface,var(--background))]";
  if (character === "kira") {
    return (
      <span
        aria-hidden="true"
        className={`absolute top-1/2 -left-[21px] size-2 -translate-y-1/2 rounded-full border ${color}`}
      >
        {active ? (
          <span className="absolute top-1/2 left-full h-px w-4 origin-left rotate-[114deg] bg-[var(--anuime-accent,var(--accent))]" />
        ) : null}
      </span>
    );
  }
  if (character === "mochi") {
    return (
      <span
        aria-hidden="true"
        className={`absolute top-1/2 -left-[21px] h-4 w-3 -translate-y-1/2 rounded-b-full border-r border-b ${color}`}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`absolute top-1/2 -left-[21px] size-2.5 -translate-y-1/2 border-t-2 border-l-2 ${color}`}
    />
  );
}
