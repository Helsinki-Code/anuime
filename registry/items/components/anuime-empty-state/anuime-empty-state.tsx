import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeEmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

export function AnuimeEmptyState({
  character = "mochi",
  recipe,
  icon = "✦",
  title = "Nothing here yet",
  description = "Begin with one small action and this space will grow with you.",
  action,
  className = "",
  ...props
}: AnuimeEmptyStateProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "empty-state");
  return (
    <div
      data-character={styles.recipe.structureSystem}
      data-anuime-component="empty-state"
      className={`${styles.surface} ${styles.surfacePadding} text-center ${styles.typography} ${className}`}
      {...props}
    >
      <div
        aria-hidden="true"
        className={`${styles.accent} mx-auto flex min-h-12 items-center justify-center gap-2 text-3xl`}
      >
        <span className={styles.hollowNode} />
        {icon}
        <span className={styles.node} />
      </div>
      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      <div className="mx-auto mt-2 max-w-sm text-sm opacity-70">{description}</div>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
