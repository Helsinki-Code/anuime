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
  const styles = resolveAnuimeRecipe(recipe, character, "dropdown-menu");
  const system = styles.recipe.structureSystem;
  const construction = {
    kira: {
      menu: "w-[230px] rounded-[6px] p-1",
      row: "h-8 rounded-[4px] px-2.5",
      marker:
        "size-[9px] border-r-[1.5px] border-b-[1.5px] border-[var(--anuime-accent,var(--accent))] rotate-45",
    },
    mochi: {
      menu: "w-[230px] rounded-[12px] p-[5px]",
      row: "h-8 rounded-[8px] px-[11px]",
      marker:
        "h-2.5 w-2.5 rounded-full border-r-[1.5px] border-b-[1.5px] border-[var(--anuime-accent,var(--accent))] rotate-45",
    },
    atlas: {
      menu: "w-[230px] rounded-[7px] p-1",
      row: "h-8 rounded-[4px] px-2.5",
      marker: "size-1.5 rotate-45 bg-[var(--anuime-accent,var(--accent))]",
    },
  }[system];
  return (
    <details data-character={system} className="group relative inline-block">
      <summary
        className={`${styles.primary} ${styles.control} cursor-pointer list-none marker:hidden`}
      >
        {trigger}
        <span aria-hidden="true" className={`ml-2 inline-block ${construction.marker}`} />
      </summary>
      <div
        role="menu"
        aria-label={label}
        className={`${styles.surface} ${construction.menu} absolute right-0 z-40 mt-2 overflow-hidden shadow-[0_8px_24px_color-mix(in_oklab,var(--foreground)_18%,transparent)]`}
      >
        {items.map((item) => (
          <button
            key={item.id}
            role="menuitem"
            disabled={item.disabled}
            className={`flex w-full items-center text-left text-sm outline-none before:mr-2 before:block before:shrink-0 before:opacity-0 before:content-[''] hover:bg-secondary hover:before:opacity-100 focus-visible:bg-secondary focus-visible:before:opacity-100 disabled:opacity-50 ${construction.row} ${system === "kira" ? "before:size-[9px] before:rotate-45 before:border-r-[1.5px] before:border-b-[1.5px] before:border-[var(--anuime-accent,var(--accent))]" : system === "mochi" ? "before:size-2.5 before:rotate-45 before:rounded-full before:border-r-[1.5px] before:border-b-[1.5px] before:border-[var(--anuime-accent,var(--accent))]" : "before:size-1.5 before:rotate-45 before:bg-[var(--anuime-accent,var(--accent))]"}`}
            onClick={item.onSelect}
          >
            {item.label}
          </button>
        ))}
      </div>
    </details>
  );
}
