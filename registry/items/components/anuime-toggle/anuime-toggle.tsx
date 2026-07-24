"use client";

import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

type RecipeProps = { character?: AnuimeCharacter; recipe?: AnuimeRecipeV2 };

const toggleConstruction = {
  kira: "h-8 rounded-[5px] px-3.5",
  mochi: "h-8 rounded-[8px] px-4",
  atlas: "h-8 rounded-[5px] px-3.5",
} as const;
export type AnuimeToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> &
  RecipeProps & {
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
  };

export function AnuimeToggle({
  character = "kira",
  recipe,
  pressed,
  defaultPressed = false,
  onPressedChange,
  children = "Toggle",
  className = "",
  ...props
}: AnuimeToggleProps) {
  const [internal, setInternal] = useState(defaultPressed);
  const active = pressed ?? internal;
  const styles = resolveAnuimeRecipe(recipe, character, "toggle");
  const system = styles.recipe.structureSystem;
  return (
    <button
      type="button"
      aria-pressed={active}
      data-character={system}
      className={`border text-sm font-medium transition-colors outline-none ${
        active
          ? "border-[var(--anuime-border-strong,var(--input))] bg-secondary text-foreground shadow-[inset_0_0_0_1px_var(--anuime-surface,var(--background))]"
          : "border-transparent bg-transparent text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
      } ${toggleConstruction[system]} focus-visible:ring-[1.5px] focus-visible:ring-[var(--anuime-accent,var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
      onClick={() => {
        if (pressed === undefined) setInternal(!active);
        onPressedChange?.(!active);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export function AnuimeToggleGroup({
  character = "kira",
  recipe,
  label = "View",
  options = [
    { value: "grid", label: "Grid" },
    { value: "list", label: "List" },
  ],
  value,
  onValueChange,
}: RecipeProps & {
  label?: string;
  options?: { value: string; label: ReactNode }[];
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  const [internal, setInternal] = useState(value ?? options[0]?.value);
  const selected = value ?? internal;
  const styles = resolveAnuimeRecipe(recipe, character, "toggle");
  const system = styles.recipe.structureSystem;
  return (
    <div
      role="group"
      aria-label={label}
      data-character={system}
      className={`inline-flex gap-1 border p-1 ${
        system === "mochi"
          ? "rounded-[10px] border-[var(--anuime-secondary-accent,var(--border))]"
          : system === "atlas"
            ? "rounded-[7px] border-[var(--anuime-border-strong,var(--border))]"
            : "rounded-[6px] border-[var(--anuime-border-strong,var(--border))]"
      }`}
    >
      {options.map((option) => (
        <AnuimeToggle
          key={option.value}
          character={character}
          recipe={recipe}
          pressed={selected === option.value}
          onPressedChange={() => {
            setInternal(option.value);
            onValueChange?.(option.value);
          }}
        >
          {option.label}
        </AnuimeToggle>
      ))}
    </div>
  );
}
