import type { FieldsetHTMLAttributes, HTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

type RecipeProps = { character?: AnuimeCharacter; recipe?: AnuimeRecipeV2 };
export type AnuimeFieldProps = HTMLAttributes<HTMLDivElement> &
  RecipeProps & {
    label?: ReactNode;
    htmlFor?: string;
    description?: ReactNode;
    error?: ReactNode;
    required?: boolean;
  };

export function AnuimeField({
  character = "kira",
  recipe,
  label = "Field label",
  htmlFor,
  description,
  error,
  required,
  children,
  className = "",
  ...props
}: AnuimeFieldProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "field");
  return (
    <div className={`grid ${styles.gap} ${className}`} {...props}>
      <AnuimeLabel htmlFor={htmlFor} required={required}>
        {label}
      </AnuimeLabel>
      {children}
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : description ? (
        <p className="text-sm opacity-65">{description}</p>
      ) : null}
    </div>
  );
}

export function AnuimeLabel({
  required,
  children,
  className = "",
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label className={`text-sm font-semibold ${className}`} {...props}>
      {children}
      {required ? (
        <span aria-hidden="true" className="ml-1 text-destructive">
          *
        </span>
      ) : null}
    </label>
  );
}

export function AnuimeFieldset({
  character = "kira",
  recipe,
  legend = "Field group",
  className = "",
  children,
  ...props
}: FieldsetHTMLAttributes<HTMLFieldSetElement> & RecipeProps & { legend?: ReactNode }) {
  const styles = resolveAnuimeRecipe(recipe, character, "field");
  return (
    <fieldset
      className={`${styles.surface} ${styles.surfacePadding} grid ${styles.gap} ${className}`}
      {...props}
    >
      <legend className="px-2 font-bold">{legend}</legend>
      {children}
    </fieldset>
  );
}

export const AnuimeFormField = AnuimeField;
