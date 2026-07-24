"use client";

import { useRef, type ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeSheetProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  side?: "left" | "right";
  triggerLabel?: string;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
};

export function AnuimeSheet({
  character = "atlas",
  recipe,
  side = "right",
  triggerLabel = "Open sheet",
  title = "System inspector",
  description = "Inspect context without leaving the current task.",
  children,
}: AnuimeSheetProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const styles = resolveAnuimeRecipe(recipe, character, "sheet");
  return (
    <>
      <button
        className={`${styles.primary} ${styles.control}`}
        onClick={() => ref.current?.showModal()}
      >
        {triggerLabel}
      </button>
      <dialog
        ref={ref}
        className={`${styles.surface} ${styles.surfacePadding} ${side === "left" ? "mr-auto rounded-l-none" : "ml-auto rounded-r-none"} h-full max-h-none w-full max-w-md backdrop:bg-foreground/30`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="mt-1 text-sm opacity-70">{description}</p>
          </div>
          <button
            aria-label="Close sheet"
            className={`${styles.secondary} min-h-9 px-3`}
            onClick={() => ref.current?.close()}
          >
            ×
          </button>
        </div>
        {children ? <div className="mt-6">{children}</div> : null}
      </dialog>
    </>
  );
}
