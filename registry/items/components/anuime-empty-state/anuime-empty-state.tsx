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
      className={`${styles.surface} ${styles.surfacePadding} text-center ${className}`}
      {...props}
    >
      <div aria-hidden="true" className={`${styles.accent} mx-auto text-3xl`}>
        {icon}
      </div>
      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      <div className="mx-auto mt-2 max-w-sm text-sm opacity-70">{description}</div>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
