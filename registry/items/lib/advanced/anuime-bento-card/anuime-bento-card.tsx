import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeBentoCardProps = HTMLAttributes<HTMLElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  eyebrow?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "min-h-40",
  md: "min-h-56",
  lg: "min-h-72",
} as const;

const joins = {
  kira: "after:absolute after:right-5 after:bottom-0 after:h-px after:w-10 after:-skew-x-[18deg] after:bg-[var(--anuime-accent,var(--accent))] after:content-['']",
  mochi:
    "after:absolute after:right-5 after:left-5 after:bottom-0 after:h-px after:bg-[var(--anuime-secondary-accent,var(--border))] after:content-['']",
  atlas:
    "after:absolute after:right-3 after:bottom-3 after:size-4 after:border-r-2 after:border-b-2 after:border-[var(--anuime-accent,var(--accent))] after:content-['']",
} as const;

export function AnuimeBentoCard({
  character = "kira",
  recipe,
  eyebrow,
  title,
  children,
  size = "md",
  className = "",
  ...props
}: AnuimeBentoCardProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;

  return (
    <article
      data-character={system}
      data-anuime-component="bento-card"
      className={`relative flex flex-col overflow-hidden ${styles.surface} ${styles.surfacePadding} ${sizes[size]} ${joins[system]} ${className}`}
      {...props}
    >
      {eyebrow ? (
        <p className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h3 className={`mt-3 text-xl font-bold ${system === "mochi" ? "font-serif" : ""}`}>
          {title}
        </h3>
      ) : null}
      {children ? <div className="mt-auto pt-6 text-sm text-foreground">{children}</div> : null}
    </article>
  );
}
