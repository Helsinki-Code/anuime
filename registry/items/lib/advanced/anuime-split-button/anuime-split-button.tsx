"use client";

import { useState, type HTMLAttributes } from "react";

import { AnuimeButton } from "@/components/ui/anuime-button";
import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeSplitButtonOption = {
  id: string;
  label: string;
};

export type AnuimeSplitButtonProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label: string;
  options: readonly AnuimeSplitButtonOption[];
  onPrimary?: () => void;
  onSelect?: (option: AnuimeSplitButtonOption) => void;
};

export function AnuimeSplitButton({
  character = "kira",
  recipe,
  label,
  options,
  onPrimary,
  onSelect,
  className = "",
  ...props
}: AnuimeSplitButtonProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const [open, setOpen] = useState(false);

  return (
    <div
      data-character={system}
      data-anuime-component="split-button"
      className={`relative inline-flex ${className}`}
      {...props}
    >
      <AnuimeButton
        character={character}
        recipe={recipe}
        className="rounded-r-none border-r-0"
        onClick={onPrimary}
      >
        {label}
      </AnuimeButton>
      <AnuimeButton
        character={character}
        recipe={recipe}
        aria-label={`More ${label} actions`}
        aria-expanded={open}
        className="min-w-9 rounded-l-none border-l border-l-border px-2"
        onClick={() => setOpen((value) => !value)}
      >
        <DisclosureMark character={system} open={open} />
      </AnuimeButton>
      {open ? (
        <div
          role="menu"
          className={`absolute top-full right-0 z-20 mt-2 min-w-44 border border-border bg-[var(--anuime-elevated,var(--popover))] p-1 text-foreground shadow-sm ${
            system === "kira"
              ? "rounded-[5px]"
              : system === "mochi"
                ? "rounded-[10px]"
                : "rounded-[7px]"
          }`}
        >
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              role="menuitem"
              className="flex min-h-9 w-full items-center gap-2 px-3 text-left text-sm hover:bg-[var(--anuime-surface,var(--muted))] focus-visible:outline focus-visible:outline-2"
              onClick={() => {
                onSelect?.(option);
                setOpen(false);
              }}
            >
              <span className="size-1.5 bg-[var(--anuime-accent,var(--accent))]" />
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function DisclosureMark({
  character,
  open,
}: {
  character: "kira" | "mochi" | "atlas";
  open: boolean;
}) {
  const transition =
    character === "kira"
      ? "duration-[240ms]"
      : character === "mochi"
        ? "duration-[250ms]"
        : "duration-[180ms]";
  if (character === "mochi") {
    return (
      <span
        aria-hidden="true"
        className={`size-3 rounded-full border-r-2 border-[var(--anuime-accent,var(--accent))] transition-opacity ${transition} motion-reduce:transition-none ${
          open ? "border-b-2 opacity-100" : "border-t-2 opacity-80"
        }`}
      />
    );
  }
  if (character === "atlas") {
    return (
      <span
        aria-hidden="true"
        className={`size-3 border-t-2 border-l-2 border-[var(--anuime-accent,var(--accent))] transition-opacity ${transition} linear motion-reduce:transition-none ${
          open ? "border-r-2 opacity-100" : "border-b-2 opacity-80"
        }`}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`w-3 font-mono text-[var(--anuime-accent,var(--accent))] transition-opacity ${transition} motion-reduce:transition-none`}
    >
      {open ? "⌃" : "⌄"}
    </span>
  );
}
