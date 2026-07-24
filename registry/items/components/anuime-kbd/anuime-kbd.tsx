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
  return (
    <kbd
      className={`${styles.shapeControl} ${styles.secondary} inline-flex min-h-0 items-center border-b-2 px-2 py-1 font-mono text-xs font-bold ${className}`}
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
