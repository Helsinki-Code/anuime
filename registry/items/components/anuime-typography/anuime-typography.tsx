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
  return (
    <div className={`grid gap-3 ${className}`} {...props}>
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
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <h2
      className={`${styles.accent} text-3xl font-bold tracking-tight text-balance ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}
export function AnuimeText({
  children = "Production-owned interface copy with a clear reading rhythm.",
  className = "",
  ...props
}: TypographyProps) {
  return (
    <p className={`max-w-prose text-base leading-7 opacity-80 ${className}`} {...props}>
      {children}
    </p>
  );
}
export function AnuimeLead({
  children = "A concise introduction for an important section.",
  className = "",
  ...props
}: TypographyProps) {
  return (
    <p className={`max-w-2xl text-xl leading-8 opacity-75 ${className}`} {...props}>
      {children}
    </p>
  );
}
export function AnuimeCode({
  children = "npx shadcn@latest add …",
  className = "",
  ...props
}: TypographyProps) {
  return (
    <code
      className={`rounded bg-black/10 px-1.5 py-1 font-mono text-sm dark:bg-white/10 ${className}`}
      {...props}
    >
      {children}
    </code>
  );
}
