import type { DetailsHTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeCollapsibleProps = Omit<DetailsHTMLAttributes<HTMLDetailsElement>, "title"> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  title?: ReactNode;
  children?: ReactNode;
};

export function AnuimeCollapsible({
  character = "kira",
  recipe,
  title = "Reveal transmission",
  children = "Hidden details remain keyboard accessible through native disclosure semantics.",
  className = "",
  ...props
}: AnuimeCollapsibleProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "collapsible");
  return (
    <details
      data-character={styles.recipe.structureSystem}
      data-anuime-component="collapsible"
      className={`${styles.surface} overflow-hidden ${styles.typography} ${className}`}
      {...props}
    >
      <summary
        className={`${styles.surfacePadding} cursor-pointer list-none font-semibold marker:hidden`}
      >
        {title}
        <span aria-hidden="true" className={`${styles.marker} float-right mt-1`} />
      </summary>
      <div className={`${styles.surfacePadding} border-t text-sm opacity-80`}>{children}</div>
    </details>
  );
}
