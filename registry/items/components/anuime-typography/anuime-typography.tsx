import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

type TypographyProps = HTMLAttributes<HTMLElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  children?: ReactNode;
};

export function AnuimeTypography({
  character = "kira",
  recipe,
  children,
  className = "",
  ...props
}: TypographyProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "typography");
  return (
    <div
      data-character={styles.recipe.structureSystem}
      data-anuime-component="typography"
      className={`grid gap-3 ${styles.typography} ${className}`}
      {...props}
    >
      <AnuimeHeading character={character} recipe={recipe}>
        Character-driven typography
      </AnuimeHeading>
      <AnuimeText>{children}</AnuimeText>
    </div>
  );
}
export function AnuimeHeading({
  character = "kira",
  recipe,
  children = "Where characters become systems.",
  className = "",
  ...props
}: TypographyProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "typography");
  const system = styles.recipe.structureSystem;
  return (
    <h2
      data-character={system}
      className={`${styles.accent} text-3xl tracking-tight text-balance ${system === "mochi" ? "font-serif font-semibold" : "font-sans font-bold"} ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}
export function AnuimeText({
  character = "kira",
  recipe,
  children = "Production-owned interface copy with a clear reading rhythm.",
  className = "",
  ...props
}: TypographyProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "typography");
  return (
    <p
      className={`max-w-prose text-base leading-7 opacity-80 ${styles.typography} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}
export function AnuimeLead({
  character = "kira",
  recipe,
  children = "A concise introduction for an important section.",
  className = "",
  ...props
}: TypographyProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "typography");
  return (
    <p
      className={`max-w-2xl text-xl leading-8 opacity-75 ${styles.typography} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}
export function AnuimeCode({
  character = "kira",
  recipe,
  children = "npx shadcn@latest add …",
  className = "",
  ...props
}: TypographyProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "typography");
  return (
    <code
      data-character={styles.recipe.structureSystem}
      className={`rounded-[4px] bg-secondary px-1.5 py-1 font-mono text-sm ${className}`}
      {...props}
    >
      {children}
    </code>
  );
}
