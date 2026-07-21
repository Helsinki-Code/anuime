import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeCardProps = HTMLAttributes<HTMLElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function AnuimeCard({
  character = "kira",
  recipe,
  eyebrow,
  title,
  description,
  action,
  className = "",
  ...props
}: AnuimeCardProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <article
      className={`w-full max-w-md overflow-hidden ${styles.surface} ${styles.surfacePadding} ${className}`}
      {...props}
    >
      {eyebrow ? (
        <p className={`font-mono text-xs tracking-[0.2em] uppercase ${styles.accent}`}>{eyebrow}</p>
      ) : null}
      <h3 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h3>
      {description ? <p className="mt-3 text-sm leading-6 opacity-70">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </article>
  );
}
