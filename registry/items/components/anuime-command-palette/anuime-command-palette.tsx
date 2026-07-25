"use client";

import { useMemo, useRef, useState } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeCommand = {
  id: string;
  label: string;
  group?: string;
  shortcut?: string;
  onSelect?: () => void;
};
export type AnuimeCommandPaletteProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  commands: AnuimeCommand[];
  triggerLabel?: string;
};

export function AnuimeCommandPalette({
  character = "kira",
  recipe,
  commands,
  triggerLabel = "Open command palette",
}: AnuimeCommandPaletteProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const styles = resolveAnuimeRecipe(recipe, character, "command-palette");
  const system = styles.recipe.structureSystem;
  const results = useMemo(
    () =>
      commands.filter((command) =>
        `${command.group ?? ""} ${command.label}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [commands, query],
  );
  return (
    <>
      <button
        type="button"
        className={`px-4 py-2 text-sm font-bold ${styles.secondary}`}
        onClick={() => ref.current?.showModal()}
      >
        {triggerLabel}
        <kbd className="ml-3 opacity-60">⌘K</kbd>
      </button>
      <dialog
        ref={ref}
        data-character={system}
        data-anuime-component="command-palette"
        className={`m-auto w-[min(38rem,calc(100%-2rem))] p-0 backdrop:bg-foreground/30 ${styles.surface}`}
      >
        <div className="p-3">
          <label className="sr-only" htmlFor="anuime-command-query">
            Search commands
          </label>
          <input
            id="anuime-command-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type a command..."
            className={`h-12 w-full border px-4 outline-none focus-visible:ring-2 ${styles.field}`}
          />
          <ul className="mt-2 max-h-72 overflow-y-auto" role="listbox">
            {results.map((command) => (
              <li key={command.id}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-[var(--anuime-control-radius,6px)] px-3 py-3 text-left text-sm hover:bg-secondary"
                  onClick={() => {
                    command.onSelect?.();
                    ref.current?.close();
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden="true" className={styles.hollowNode} />
                    <span>
                      <span className="font-medium">{command.label}</span>
                      {command.group ? (
                        <span className="ml-2 text-xs opacity-50">{command.group}</span>
                      ) : null}
                    </span>
                  </span>
                  {command.shortcut ? <kbd className="opacity-50">{command.shortcut}</kbd> : null}
                </button>
              </li>
            ))}
            {results.length === 0 ? (
              <li className="px-3 py-8 text-center text-sm opacity-60">No commands found.</li>
            ) : null}
          </ul>
          <form method="dialog" className="mt-2 border-t pt-3 text-right">
            <button className="px-3 py-2 text-xs opacity-70">Close</button>
          </form>
        </div>
      </dialog>
    </>
  );
}
