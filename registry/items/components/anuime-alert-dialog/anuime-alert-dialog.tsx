"use client";

import { useRef, type ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeAlertDialogProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  triggerLabel?: string;
  title?: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void;
};

export function AnuimeAlertDialog({
  character = "kira",
  recipe,
  triggerLabel = "Open confirmation",
  title = "Confirm this action?",
  description = "This decision requires explicit confirmation.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
}: AnuimeAlertDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const styles = resolveAnuimeRecipe(recipe, character, "alert-dialog");
  const system = styles.recipe.structureSystem;
  return (
    <>
      <button
        className={`${styles.primary} ${styles.control}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        {triggerLabel}
      </button>
      <dialog
        ref={dialogRef}
        data-character={system}
        data-anuime-component="alert-dialog"
        className={`${styles.surface} ${styles.surfacePadding} m-auto max-w-md backdrop:bg-foreground/30`}
      >
        <h2 className={`text-lg font-bold ${destructive ? styles.errorMarker : ""}`}>{title}</h2>
        <div className="mt-2 text-sm opacity-80">{description}</div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            className={`${styles.secondary} ${styles.control}`}
            onClick={() => dialogRef.current?.close()}
          >
            {cancelLabel}
          </button>
          <button
            className={`${destructive ? "bg-destructive text-destructive-foreground hover:bg-[var(--anuime-destructive-hover,var(--destructive))]" : styles.primary} ${styles.control}`}
            onClick={() => {
              onConfirm?.();
              dialogRef.current?.close();
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </dialog>
    </>
  );
}
