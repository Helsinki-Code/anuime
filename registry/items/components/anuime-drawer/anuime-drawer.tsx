"use client";

import { useRef, type ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeDrawerProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  triggerLabel?: string;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  placement?: "bottom" | "left" | "right";
};

export function AnuimeDrawer({
  character = "kira",
  recipe,
  triggerLabel = "Open drawer",
  title = "Mission drawer",
  description = "A focused secondary workflow.",
  children,
  placement = "bottom",
}: AnuimeDrawerProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const styles = resolveAnuimeRecipe(recipe, character);
  const position =
    placement === "bottom"
      ? "mt-auto w-full max-w-none rounded-b-none"
      : placement === "left"
        ? "mr-auto h-full max-h-none rounded-l-none"
        : "ml-auto h-full max-h-none rounded-r-none";
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
        className={`${styles.surface} ${styles.surfacePadding} ${position} max-w-lg backdrop:bg-black/60`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="mt-1 text-sm opacity-70">{description}</p>
          </div>
          <button
            aria-label="Close drawer"
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

export function AnuimeBottomSheet(props: Omit<AnuimeDrawerProps, "placement">) {
  return <AnuimeDrawer placement="bottom" {...props} />;
}
