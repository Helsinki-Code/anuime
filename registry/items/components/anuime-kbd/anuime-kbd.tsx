import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeKbdProps = HTMLAttributes<HTMLElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  children?: ReactNode;
};

export function AnuimeKbd({
  character = "kira",
  recipe,
  children = "⌘ K",
  className = "",
  ...props
}: AnuimeKbdProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "kbd");
  const system = styles.recipe.structureSystem;
  return (
    <kbd
      data-character={system}
      data-anuime-component="kbd"
      className={`${styles.shapeControl} ${styles.secondary} ${styles.control} inline-flex items-center px-2 py-0 font-mono text-xs font-bold ${system === "kira" ? "border-t-2 border-b" : system === "mochi" ? "border border-[var(--anuime-secondary-accent,var(--border))]" : "border-t border-b-2"} ${className}`}
      {...props}
    >
      {children}
    </kbd>
  );
}

export function AnuimeShortcutHint({
  keys = ["⌘", "K"],
  label = "Open command palette",
  ...props
}: Omit<AnuimeKbdProps, "children"> & { keys?: string[]; label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5" aria-label={`${label}: ${keys.join(" ")}`}>
      {keys.map((key) => (
        <AnuimeKbd key={key} aria-hidden="true" {...props}>
          {key}
        </AnuimeKbd>
      ))}
    </span>
  );
}
