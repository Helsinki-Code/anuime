"use client";

import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

type RecipeProps = { character?: AnuimeCharacter; recipe?: AnuimeRecipeV2 };
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
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`${active ? styles.primary : styles.secondary} ${styles.control} outline-none focus-visible:ring-2 ${className}`}
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
  return (
    <div role="group" aria-label={label} className="inline-flex gap-1">
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
