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
  const styles = resolveAnuimeRecipe(recipe, character, "tabs");
  const system = styles.recipe.structureSystem;
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
    <div data-character={system} className="w-full max-w-xl">
      <div
        role="tablist"
        aria-label="AnUIme sections"
        className={`flex ${
          system === "atlas"
            ? "gap-1 border-b"
            : system === "mochi"
              ? "gap-0.5 rounded-[10px] bg-secondary p-[3px]"
              : "gap-0.5 rounded-[6px] bg-secondary p-[3px]"
        }`}
      >
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
            className={`relative px-4 text-sm font-semibold outline-none ${
              system === "atlas"
                ? "h-9 rounded-none"
                : system === "mochi"
                  ? "h-[30px] rounded-[8px]"
                  : "h-[30px] rounded-[4px]"
            } ${
              active === tab.id
                ? system === "atlas"
                  ? "text-foreground after:absolute after:right-2 after:bottom-0 after:left-2 after:h-0.5 after:bg-[var(--anuime-accent,var(--accent))] after:content-['']"
                  : "bg-[var(--anuime-surface,var(--card))] text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            } focus-visible:ring-[1.5px] focus-visible:ring-[var(--anuime-accent,var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
          >
            {tab.label}
            {active === tab.id && system !== "atlas" ? (
              <span
                aria-hidden="true"
                className={`absolute left-1/2 -translate-x-1/2 ${
                  system === "mochi"
                    ? "-bottom-1 h-1.5 w-3 rounded-b-full border-b-[1.5px] border-[var(--anuime-accent,var(--accent))]"
                    : "-bottom-1 size-2 rotate-45 border-r-[1.5px] border-b-[1.5px] border-[var(--anuime-accent,var(--accent))]"
                }`}
              />
            ) : null}
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
