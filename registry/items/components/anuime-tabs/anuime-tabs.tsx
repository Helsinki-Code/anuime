"use client";

import { useId, useState, type KeyboardEvent } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeTab = { id: string; label: string; content: React.ReactNode };
export type AnuimeTabsProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  tabs: AnuimeTab[];
  defaultTab?: string;
};

export function AnuimeTabs({ character = "kira", recipe, tabs, defaultTab }: AnuimeTabsProps) {
  const baseId = useId();
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id ?? "");
  const styles = resolveAnuimeRecipe(recipe, character);
  const move = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    const tab = tabs[next];
    if (tab) {
      setActive(tab.id);
      document.getElementById(`${baseId}-tab-${tab.id}`)?.focus();
    }
  };
  return (
    <div className="w-full max-w-xl">
      <div role="tablist" aria-label="AnUIme sections" className="flex gap-2 border-b pb-2">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`${baseId}-tab-${tab.id}`}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`${baseId}-panel-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
            onClick={() => setActive(tab.id)}
            onKeyDown={(event) => move(event, index)}
            className={`px-4 py-2 text-sm font-semibold outline-none focus-visible:ring-2 ${active === tab.id ? styles.primary : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={active !== tab.id}
          className="py-5 text-sm leading-6"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
