"use client";

import { useId, useState, type ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimePopoverProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  trigger: ReactNode;
  title: string;
  children: ReactNode;
};

export function AnuimePopover({
  character = "kira",
  recipe,
  trigger,
  title,
  children,
}: AnuimePopoverProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const styles = resolveAnuimeRecipe(recipe, character, "popover");
  return (
    <div
      data-character={styles.recipe.structureSystem}
      data-anuime-component="popover"
      className={`relative inline-block ${styles.typography}`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className={styles.secondary}
      >
        {trigger}
      </button>
      {open ? (
        <section
          id={id}
          aria-label={title}
          className={`absolute top-full left-0 z-40 mt-2 w-72 ${styles.surface} ${styles.surfacePadding}`}
        >
          <span
            aria-hidden="true"
            className={`${styles.hollowNode} absolute -top-1 left-6 bg-[var(--anuime-surface,var(--popover))]`}
          />
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold">{title}</h2>
            <button
              type="button"
              aria-label="Close popover"
              onClick={() => setOpen(false)}
              className="rounded-[4px] px-2 py-1 text-xs hover:bg-secondary"
            >
              Close
            </button>
          </div>
          <div className="mt-3 text-sm text-muted-foreground">{children}</div>
        </section>
      ) : null}
    </div>
  );
}
