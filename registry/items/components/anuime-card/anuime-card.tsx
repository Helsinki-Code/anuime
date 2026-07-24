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
  const styles = resolveAnuimeRecipe(recipe, character, "card");
  const system = styles.recipe.structureSystem;
  const signatureLayer = {
    kira: "bg-[linear-gradient(114deg,color-mix(in_oklab,var(--anuime-accent,var(--accent))_7%,transparent)_0%,transparent_34%)]",
    mochi: "",
    atlas:
      "bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--anuime-accent,var(--accent))_6%,transparent),transparent_64px),repeating-linear-gradient(0deg,transparent_0_15px,color-mix(in_oklab,var(--anuime-accent,var(--accent))_6%,transparent)_15px_16px),repeating-linear-gradient(90deg,transparent_0_15px,color-mix(in_oklab,var(--anuime-accent,var(--accent))_6%,transparent)_15px_16px)]",
  }[system];
  return (
    <article
      data-character={system}
      className={`w-full max-w-md overflow-hidden p-5 shadow-[0_1px_2px_color-mix(in_oklab,var(--foreground)_8%,transparent)] ${signatureLayer} ${styles.surface} ${className}`}
      {...props}
    >
      {eyebrow ? (
        <p className={`font-mono text-xs tracking-[0.2em] uppercase ${styles.accent}`}>{eyebrow}</p>
      ) : null}
      <h3
        className={`mt-3 font-semibold tracking-tight ${
          system === "mochi" ? "font-serif text-[19px]" : "text-xl"
        }`}
      >
        {title}
      </h3>
      {description ? <p className="mt-3 text-sm leading-6 opacity-70">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </article>
  );
}
