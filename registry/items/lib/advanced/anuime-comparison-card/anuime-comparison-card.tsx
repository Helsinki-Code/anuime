import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeComparisonFeature = {
  label: ReactNode;
  included?: boolean;
};

export type AnuimeComparisonCardProps = HTMLAttributes<HTMLElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  eyebrow?: ReactNode;
  title: ReactNode;
  price?: ReactNode;
  features: AnuimeComparisonFeature[];
  selected?: boolean;
  action?: ReactNode;
};

const markers = {
  kira: {
    included:
      "size-2.5 rotate-45 border-r-[1.5px] border-b-[1.5px] border-[var(--anuime-accent,var(--accent))]",
    excluded: "size-2 rounded-full border border-[var(--anuime-border-strong,var(--border))]",
    selected: "border-[var(--foreground)]",
  },
  mochi: {
    included:
      "size-2.5 rounded-full border-r-2 border-b-2 border-[var(--anuime-accent,var(--accent))]",
    excluded: "size-2.5 rounded-full border border-[var(--anuime-secondary-accent,var(--border))]",
    selected: "border-[var(--anuime-secondary-accent,var(--border))]",
  },
  atlas: {
    included: "size-2 rotate-45 bg-[var(--anuime-accent,var(--accent))]",
    excluded: "size-2 rotate-45 border border-[var(--anuime-accent,var(--accent))]",
    selected: "border-[var(--anuime-accent,var(--accent))]",
  },
} as const;

export function AnuimeComparisonCard({
  character = "kira",
  recipe,
  eyebrow,
  title,
  price,
  features,
  selected = false,
  action,
  className = "",
  ...props
}: AnuimeComparisonCardProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const construction = markers[system];

  return (
    <article
      data-character={system}
      data-anuime-component="comparison-card"
      data-selected={selected || undefined}
      className={`${styles.surface} ${styles.surfacePadding} ${selected ? construction.selected : ""} ${className}`}
      {...props}
    >
      {eyebrow ? (
        <p className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
          {eyebrow}
        </p>
      ) : null}
      <div className="mt-3 flex items-end justify-between gap-4">
        <h3 className={`text-xl font-bold ${system === "mochi" ? "font-serif" : ""}`}>{title}</h3>
        {price ? <strong className="font-mono text-lg">{price}</strong> : null}
      </div>
      <ul className="mt-6 grid gap-3 border-t border-border pt-5">
        {features.map((feature, index) => (
          <li
            key={typeof feature.label === "string" ? feature.label : index}
            className="flex items-center gap-3 text-sm"
          >
            <span
              aria-hidden="true"
              className={feature.included === false ? construction.excluded : construction.included}
            />
            <span
              className={feature.included === false ? "text-muted-foreground" : "text-foreground"}
            >
              {feature.label}
            </span>
            <span className="sr-only">
              {feature.included === false ? "Not included" : "Included"}
            </span>
          </li>
        ))}
      </ul>
      {action ? <div className="mt-6">{action}</div> : null}
    </article>
  );
}
