import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  children?: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger";
};

const tones = {
  neutral: "border-border bg-secondary text-secondary-foreground",
  success:
    "border-[color-mix(in_oklab,var(--anuime-accent,var(--accent))_30%,transparent)] bg-[color-mix(in_oklab,var(--anuime-accent,var(--accent))_10%,transparent)] text-[var(--anuime-accent-foreground,var(--foreground))]",
  warning:
    "border-[color-mix(in_oklab,var(--anuime-secondary-accent,var(--accent))_40%,transparent)] bg-[color-mix(in_oklab,var(--anuime-secondary-accent,var(--accent))_12%,transparent)] text-[var(--anuime-secondary-accent-foreground,var(--foreground))]",
  danger: "border-destructive/40 bg-destructive/10 text-destructive",
} as const;

const badgeConstruction = {
  kira: "h-[22px] rounded-[4px] px-[9px] font-medium",
  mochi: "h-[22px] rounded-full px-[11px] font-semibold",
  atlas: "h-[22px] rounded-[4px] px-[9px] font-medium",
} as const;

const statusConstruction = {
  kira: "size-[7px] rounded-full border border-current bg-transparent",
  mochi:
    "size-1.5 rounded-full border border-[var(--anuime-secondary-accent,var(--border))] bg-[var(--anuime-secondary-accent,var(--accent))]",
  atlas: "size-[7px] rotate-45 border border-current bg-transparent",
} as const;

export function AnuimeBadge({
  character = "kira",
  recipe,
  children = "Ready",
  tone = "neutral",
  className = "",
  ...props
}: AnuimeBadgeProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "badge");
  const system = styles.recipe.structureSystem;
  return (
    <span
      data-character={system}
      className={`inline-flex items-center border text-xs ${badgeConstruction[system]} ${tones[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export function AnuimeStatusIndicator({
  character = "kira",
  recipe,
  label = "Online",
  tone = "success",
  ...props
}: Omit<AnuimeBadgeProps, "children"> & { label?: string }) {
  const styles = resolveAnuimeRecipe(recipe, character, "badge");
  const system = styles.recipe.structureSystem;
  return (
    <AnuimeBadge character={character} recipe={recipe} tone={tone} {...props}>
      <span aria-hidden="true" className={`mr-1.5 ${statusConstruction[system]}`} />
      {label}
    </AnuimeBadge>
  );
}
