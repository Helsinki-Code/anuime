"use client";

import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeDockItem = {
  id: string;
  label: string;
  icon?: ReactNode;
};

export type AnuimeFloatingDockProps = Omit<HTMLAttributes<HTMLElement>, "onSelect"> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  items: readonly AnuimeDockItem[];
  activeId: string;
  onSelect?: (id: string) => void;
};

const duration = {
  kira: "duration-[240ms]",
  mochi: "duration-[250ms]",
  atlas: "duration-[180ms]",
} as const;

export function AnuimeFloatingDock({
  character = "kira",
  recipe,
  items,
  activeId,
  onSelect,
  className = "",
  ...props
}: AnuimeFloatingDockProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;

  return (
    <nav
      data-character={system}
      data-anuime-component="floating-dock"
      aria-label="Quick navigation"
      className={`inline-flex border border-border bg-[var(--anuime-elevated,var(--popover))] p-1 shadow-sm ${
        system === "kira"
          ? "rounded-[5px]"
          : system === "mochi"
            ? "rounded-[10px]"
            : "rounded-[7px]"
      } ${className}`}
      {...props}
    >
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            aria-current={active ? "page" : undefined}
            className={`group relative grid min-h-10 min-w-10 place-items-center gap-1 px-2 text-xs text-foreground transition-colors motion-reduce:transition-none ${duration[system]} ${
              active ? "bg-[var(--anuime-surface,var(--muted))]" : ""
            } ${system === "kira" ? "rounded-[4px]" : system === "mochi" ? "rounded-[8px]" : "rounded-[5px]"}`}
            onClick={() => onSelect?.(item.id)}
          >
            {item.icon ?? <span aria-hidden="true">{item.label.slice(0, 1)}</span>}
            <span className="sr-only">{item.label}</span>
            {active ? <ActiveDockMark character={system} /> : null}
          </button>
        );
      })}
    </nav>
  );
}

function ActiveDockMark({ character }: { character: "kira" | "mochi" | "atlas" }) {
  if (character === "kira") {
    return (
      <span
        aria-hidden="true"
        className="absolute -bottom-0.5 left-1/2 size-2 -translate-x-1/2 rounded-full border border-[var(--anuime-accent,var(--accent))]"
      >
        <span className="absolute top-full left-1/2 h-1 w-px bg-[var(--anuime-accent,var(--accent))]" />
      </span>
    );
  }
  if (character === "mochi") {
    return (
      <span
        aria-hidden="true"
        className="absolute inset-x-1 bottom-0 h-px bg-[var(--anuime-accent,var(--accent))] shadow-[0_-3px_8px_var(--anuime-accent,var(--accent))]"
      />
    );
  }
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute top-0 left-0 size-2 border-t-2 border-l-2 border-[var(--anuime-accent,var(--accent))]" />
      <span className="absolute top-0 right-0 size-2 border-t-2 border-r-2 border-[var(--anuime-accent,var(--accent))]" />
      <span className="absolute bottom-0 left-0 size-2 border-b-2 border-l-2 border-[var(--anuime-accent,var(--accent))]" />
      <span className="absolute right-0 bottom-0 size-2 border-r-2 border-b-2 border-[var(--anuime-accent,var(--accent))]" />
    </span>
  );
}
