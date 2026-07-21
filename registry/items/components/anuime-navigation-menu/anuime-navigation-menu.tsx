"use client";

import { useState } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeNavigationItem = { label: string; href: string };
export type AnuimeNavigationMenuProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  brand?: string;
  brandHref?: string;
  items: AnuimeNavigationItem[];
  action?: React.ReactNode;
};

export function AnuimeNavigationMenu({
  character = "kira",
  recipe,
  brand = "AnUIme",
  brandHref = "/",
  items,
  action,
}: AnuimeNavigationMenuProps) {
  const [open, setOpen] = useState(false);
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <nav
      aria-label="Primary navigation"
      className={`w-full ${styles.surface} ${styles.surfacePadding}`}
    >
      <div className="flex items-center justify-between gap-4">
        <a href={brandHref} className={`font-bold ${styles.accent}`}>
          {brand}
        </a>
        <button
          type="button"
          className={`px-3 py-2 text-sm md:hidden ${styles.secondary}`}
          aria-expanded={open}
          aria-controls="anuime-mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          Menu
        </button>
        <div className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2 text-sm font-medium opacity-70 transition hover:bg-white/10 hover:opacity-100"
            >
              {item.label}
            </a>
          ))}
          {action}
        </div>
      </div>
      <div
        id="anuime-mobile-navigation"
        hidden={!open}
        className="mt-3 grid border-t pt-3 md:hidden"
      >
        {items.map((item) => (
          <a key={item.href} href={item.href} className="px-3 py-2 text-sm font-medium">
            {item.label}
          </a>
        ))}
        {action}
      </div>
    </nav>
  );
}
