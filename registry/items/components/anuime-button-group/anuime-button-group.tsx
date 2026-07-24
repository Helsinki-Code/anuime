import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

type RecipeProps = { character?: AnuimeCharacter; recipe?: AnuimeRecipeV2 };

export function AnuimeButtonGroup({
  character = "kira",
  recipe,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & RecipeProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "button-group");
  return (
    <div
      role="group"
      className={`inline-flex overflow-hidden border ${styles.shapeControl} [&>button]:rounded-none [&>button+button]:border-l ${className}`}
      {...props}
    />
  );
}

export function AnuimeButtonGroupItem({
  character = "kira",
  recipe,
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & RecipeProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "button-group");
  return (
    <button
      type={type}
      className={`${styles.secondary} ${styles.control} border-0 outline-none focus-visible:ring-2 focus-visible:ring-inset ${className}`}
      {...props}
    />
  );
}

export function AnuimeSplitButton({
  character = "kira",
  recipe,
  children = "Deploy",
  menuLabel = "More deploy options",
  onPrimary,
  onMenu,
}: RecipeProps & {
  children?: ReactNode;
  menuLabel?: string;
  onPrimary?: () => void;
  onMenu?: () => void;
}) {
  const styles = resolveAnuimeRecipe(recipe, character, "button-group");
  return (
    <div role="group" className={`inline-flex overflow-hidden ${styles.shapeControl}`}>
      <button className={`${styles.primary} ${styles.control} rounded-none`} onClick={onPrimary}>
        {children}
      </button>
      <button
        aria-label={menuLabel}
        className={`${styles.primary} min-w-10 rounded-none border-l border-current/20`}
        onClick={onMenu}
      >
        ▾
      </button>
    </div>
  );
}
