"use client";

import type { HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeCommandDockItem = {
  id: string;
  label: string;
  shortcut?: string;
};

export type AnuimeCommandDockProps = Omit<HTMLAttributes<HTMLElement>, "onSelect"> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  commands: readonly AnuimeCommandDockItem[];
  activeId: string;
  onSelect?: (id: string) => void;
};

export function AnuimeCommandDock({
  character = "kira",
  recipe,
  commands,
  activeId,
  onSelect,
  className = "",
  ...props
}: AnuimeCommandDockProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;

  return (
    <nav
      data-character={system}
      data-anuime-component="command-dock"
      aria-label="Command dock"
      className={`relative grid border border-border bg-[var(--anuime-elevated,var(--popover))] p-1 ${
        system === "kira"
          ? "rounded-[5px]"
          : system === "mochi"
            ? "rounded-[10px]"
            : "rounded-[7px]"
      } ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className={`absolute top-2 bottom-2 left-4 w-px ${
          system === "mochi"
            ? "bg-[var(--anuime-accent,var(--accent))]"
            : system === "atlas"
              ? "w-0.5 bg-border"
              : "bg-border"
        }`}
      />
      {commands.map((command) => {
        const active = command.id === activeId;
        return (
          <button
            key={command.id}
            type="button"
            aria-current={active ? "true" : undefined}
            className={`relative flex min-h-10 items-center gap-3 px-4 pl-7 text-left text-sm text-foreground transition-colors motion-reduce:transition-none ${
              system === "kira"
                ? "duration-[240ms]"
                : system === "mochi"
                  ? "duration-[250ms]"
                  : "duration-[180ms]"
            } ${active ? "bg-[var(--anuime-surface,var(--muted))]" : ""}`}
            onClick={() => onSelect?.(command.id)}
          >
            <CommandMark character={system} active={active} />
            <span className="flex-1">{command.label}</span>
            {command.shortcut ? (
              <kbd className="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                {command.shortcut}
              </kbd>
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}

function CommandMark({
  character,
  active,
}: {
  character: "kira" | "mochi" | "atlas";
  active: boolean;
}) {
  if (character === "kira") {
    return (
      <span
        aria-hidden="true"
        className={`absolute left-3 h-2.5 w-2 border-r border-b ${
          active ? "border-[var(--anuime-accent,var(--accent))]" : "border-border"
        }`}
      />
    );
  }
  if (character === "mochi") {
    return (
      <span
        aria-hidden="true"
        className={`absolute left-2.5 size-3 rounded-full border-r-2 ${
          active ? "border-[var(--anuime-accent,var(--accent))]" : "border-border"
        }`}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`absolute left-2.5 size-2 rotate-45 border ${
        active
          ? "border-[var(--anuime-accent,var(--accent))] bg-[var(--anuime-accent,var(--accent))]"
          : "border-border"
      }`}
    />
  );
}
