"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeMenuItem = {
  id: string;
  label: string;
  disabled?: boolean;
  destructive?: boolean;
  onSelect?: () => void;
};
export type AnuimeContextMenuProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  children?: ReactNode;
  label?: string;
  items?: AnuimeMenuItem[];
};

export function AnuimeContextMenu({
  character = "kira",
  recipe,
  children = "Right-click or press Shift+F10",
  label = "Context actions",
  items = [
    { id: "inspect", label: "Inspect signal" },
    { id: "duplicate", label: "Duplicate" },
    { id: "remove", label: "Remove", destructive: true },
  ],
}: AnuimeContextMenuProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "context-menu");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, []);
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if ((event.shiftKey && event.key === "F10") || event.key === "ContextMenu") {
      event.preventDefault();
      setOpen(true);
    }
    if (event.key === "Escape") setOpen(false);
  };
  return (
    <div
      ref={rootRef}
      data-character={styles.recipe.structureSystem}
      data-anuime-component="context-menu"
      className={`relative inline-block ${styles.typography}`}
    >
      <button
        type="button"
        className={`${styles.surface} ${styles.surfacePadding} cursor-context-menu text-left outline-none focus-visible:ring-2`}
        onContextMenu={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
      >
        {children}
      </button>
      {open ? (
        <div
          role="menu"
          aria-label={label}
          className={`${styles.surface} absolute top-full left-0 z-50 mt-2 min-w-48 overflow-hidden p-1 shadow-xl`}
        >
          {items.map((item) => (
            <button
              key={item.id}
              role="menuitem"
              disabled={item.disabled}
              className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm outline-none hover:bg-secondary focus-visible:bg-secondary disabled:opacity-50 ${item.destructive ? "text-destructive" : ""}`}
              onClick={() => {
                item.onSelect?.();
                setOpen(false);
              }}
            >
              <span aria-hidden="true" className={styles.hollowNode} />
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
