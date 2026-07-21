"use client";

import { useRef, type ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeDialogProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  triggerLabel?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function AnuimeDialog({
  character = "kira",
  recipe,
  triggerLabel = "Open dialog",
  title,
  description,
  children,
}: AnuimeDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <>
      <button
        type="button"
        className={`px-4 py-2 text-sm font-bold ${styles.primary}`}
        onClick={() => ref.current?.showModal()}
      >
        {triggerLabel}
      </button>
      <dialog
        ref={ref}
        className={`m-auto w-[min(32rem,calc(100%-2rem))] p-0 backdrop:bg-black/70 ${styles.surface}`}
      >
        <div className="p-6">
          <div className={`font-mono text-xs tracking-[0.18em] uppercase ${styles.accent}`}>
            AnUIme transmission
          </div>
          <h2 className="mt-3 text-2xl font-semibold">{title}</h2>
          {description ? <p className="mt-2 text-sm leading-6 opacity-70">{description}</p> : null}
          {children ? <div className="mt-5">{children}</div> : null}
          <form method="dialog" className="mt-6 flex justify-end">
            <button className={`px-4 py-2 text-sm font-bold ${styles.secondary}`}>Close</button>
          </form>
        </div>
      </dialog>
    </>
  );
}
