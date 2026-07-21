import type { ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeMenubarItem = {
  id: string;
  label: string;
  items: { id: string; label: string; shortcut?: string; onSelect?: () => void }[];
};
export type AnuimeMenubarProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label?: string;
  items?: AnuimeMenubarItem[];
  endContent?: ReactNode;
};

export function AnuimeMenubar({
  character = "atlas",
  recipe,
  label = "Application menu",
  items = [
    {
      id: "file",
      label: "File",
      items: [
        { id: "new", label: "New project", shortcut: "⌘N" },
        { id: "open", label: "Open…", shortcut: "⌘O" },
      ],
    },
    { id: "view", label: "View", items: [{ id: "grid", label: "Gridforge" }] },
  ],
  endContent,
}: AnuimeMenubarProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <nav aria-label={label} className={`${styles.surface} flex items-center gap-1 p-1`}>
      {items.map((menu) => (
        <details key={menu.id} className="group relative">
          <summary
            className={`${styles.shapeControl} cursor-pointer list-none px-3 py-2 text-sm font-semibold marker:hidden hover:bg-white/10`}
          >
            {menu.label}
          </summary>
          <div
            role="menu"
            className={`${styles.surface} absolute left-0 z-40 mt-1 min-w-52 p-1 shadow-xl`}
          >
            {menu.items.map((item) => (
              <button
                key={item.id}
                role="menuitem"
                className="flex w-full items-center justify-between gap-5 px-3 py-2 text-left text-sm hover:bg-white/10 focus-visible:ring-2"
                onClick={item.onSelect}
              >
                <span>{item.label}</span>
                {item.shortcut ? (
                  <span className="font-mono text-xs opacity-60">{item.shortcut}</span>
                ) : null}
              </button>
            ))}
          </div>
        </details>
      ))}
      {endContent ? <div className="ml-auto">{endContent}</div> : null}
    </nav>
  );
}
