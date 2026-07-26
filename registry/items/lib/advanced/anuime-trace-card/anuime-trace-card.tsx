import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeTraceCardProps = HTMLAttributes<HTMLElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  interactive?: boolean;
};

const traces = {
  kira: {
    frame:
      "before:absolute before:top-1/2 before:left-[-50%] before:h-px before:w-[200%] before:rotate-[114deg] before:bg-[var(--anuime-accent,var(--accent))] before:opacity-0 before:transition-opacity before:duration-[240ms] before:content-[''] focus-within:before:opacity-100 focus:before:opacity-100",
    marker: "right-4 top-4 h-px w-4 rotate-[114deg] bg-[var(--anuime-accent,var(--accent))]",
  },
  mochi: {
    frame:
      "before:absolute before:top-0 before:right-5 before:left-5 before:h-px before:bg-[var(--anuime-secondary-accent,var(--border))] before:content-[''] focus-within:shadow-[0_0_0_6px_var(--anuime-surface,var(--background))] focus:ring-[1.5px] focus:ring-[var(--anuime-accent,var(--accent))] focus:ring-offset-2 focus:ring-offset-background",
    marker:
      "right-5 top-[-4px] size-2 rounded-full border border-[var(--anuime-secondary-accent,var(--border))] bg-[var(--anuime-surface,var(--background))]",
  },
  atlas: {
    frame:
      "focus-within:outline focus-within:outline-1 focus-within:outline-offset-4 focus-within:outline-[var(--anuime-accent,var(--accent))] focus:outline focus:outline-1 focus:outline-offset-4 focus:outline-[var(--anuime-accent,var(--accent))]",
    marker:
      "right-3 top-3 size-4 border-t-2 border-r-2 border-[var(--anuime-accent,var(--accent))]",
  },
} as const;

export function AnuimeTraceCard({
  character = "kira",
  recipe,
  title,
  description,
  footer,
  interactive = true,
  className = "",
  ...props
}: AnuimeTraceCardProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const construction = traces[system];

  return (
    <article
      data-character={system}
      data-anuime-component="trace-card"
      tabIndex={interactive ? 0 : undefined}
      className={`relative overflow-hidden outline-none ${styles.surface} ${styles.surfacePadding} ${construction.frame} ${className}`}
      {...props}
    >
      <span aria-hidden="true" className={`pointer-events-none absolute ${construction.marker}`} />
      <h3 className={`text-xl font-bold ${system === "mochi" ? "font-serif" : ""}`}>{title}</h3>
      {description ? (
        <div className="mt-3 text-sm leading-6 text-muted-foreground">{description}</div>
      ) : null}
      {footer ? <div className="mt-6 border-t border-border pt-4">{footer}</div> : null}
    </article>
  );
}
