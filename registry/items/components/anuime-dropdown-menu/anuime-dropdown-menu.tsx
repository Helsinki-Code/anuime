import type { ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeDropdownItem = {
  id: string;
  label: string;
  disabled?: boolean;
  onSelect?: () => void;
};
export type AnuimeDropdownMenuProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  trigger?: ReactNode;
  label?: string;
  items?: AnuimeDropdownItem[];
};

export function AnuimeDropdownMenu({
  character = "kira",
  recipe,
  trigger = "Open actions",
  label = "Actions",
  items = [
    { id: "edit", label: "Edit recipe" },
    { id: "share", label: "Share signal" },
  ],
}: AnuimeDropdownMenuProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <details className="group relative inline-block">
      <summary
        className={`${styles.primary} ${styles.control} cursor-pointer list-none marker:hidden`}
      >
        {trigger}
        <span aria-hidden="true" className="ml-2">
          ▾
        </span>
      </summary>
      <div
        role="menu"
        aria-label={label}
        className={`${styles.surface} absolute right-0 z-40 mt-2 min-w-48 overflow-hidden p-1 shadow-xl`}
      >
        {items.map((item) => (
          <button
            key={item.id}
            role="menuitem"
            disabled={item.disabled}
            className="block w-full px-3 py-2 text-left text-sm outline-none hover:bg-white/10 focus-visible:ring-2 disabled:opacity-50"
            onClick={item.onSelect}
          >
            {item.label}
          </button>
        ))}
      </div>
    </details>
  );
}
