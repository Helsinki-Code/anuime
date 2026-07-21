import type { ButtonHTMLAttributes, HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

type RecipeProps = { character?: AnuimeCharacter; recipe?: AnuimeRecipeV2 };
export function AnuimeToolbar({
  character = "atlas",
  recipe,
  label = "Editor tools",
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & RecipeProps & { label?: string }) {
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <div
      role="toolbar"
      aria-label={label}
      className={`${styles.surface} flex flex-wrap items-center gap-1 p-1 ${className}`}
      {...props}
    />
  );
}
export function AnuimeToolbarButton({
  character = "atlas",
  recipe,
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & RecipeProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <button
      type={type}
      className={`${styles.shapeControl} min-h-9 px-3 text-sm font-semibold hover:bg-white/10 focus-visible:ring-2 ${className}`}
      {...props}
    />
  );
}
