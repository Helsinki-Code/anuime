"use client";

import { useState } from "react";

import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeEmptyState } from "@/components/ui/anuime-empty-state";
import { AnuimeProgress } from "@/components/ui/anuime-progress";
import { createAnuimeRecipe, resolveAnuimeRecipe, type AnuimeRecipeV2 } from "@/lib/anuime-recipe";

export type MochiCreatorCompanionProps = {
  recipe?: AnuimeRecipeV2;
  creatorName?: string;
  savedCharms?: string[];
};

export function MochiCreatorCompanion({
  recipe = createAnuimeRecipe("mochi"),
  creatorName = "Starlight",
  savedCharms = ["Draft recovery", "Gentle checklist", "Launch note"],
}: MochiCreatorCompanionProps) {
  const [rewarded, setRewarded] = useState(false);
  const styles = resolveAnuimeRecipe(recipe, "mochi");
  return (
    <section
      className={`${styles.surface} ${styles.surfacePadding} grid gap-5 lg:grid-cols-[minmax(0,1fr)_19rem]`}
    >
      <div>
        <p className={`${styles.accent} text-sm font-bold`}>Dream Cache · Comfort Guide</p>
        <h2 className="mt-3 text-3xl font-bold">Welcome back, {creatorName}.</h2>
        <p className="mt-2 max-w-xl text-sm opacity-70">
          Your Memory Charm restored the last safe working context. Nothing changed without your
          approval.
        </p>
        <div className="mt-6">
          <AnuimeProgress recipe={recipe} label="Creator journey" value={rewarded ? 100 : 72} />
        </div>
        <div className="mt-6">
          <AnuimeEmptyState
            recipe={recipe}
            title={rewarded ? "Reward Bloom unlocked!" : "Your next idea is ready"}
            description={
              rewarded
                ? "A calm milestone acknowledgement—motion remains optional."
                : "Open a cached helper or begin from a friendly blank canvas."
            }
            action={
              <AnuimeButton recipe={recipe} onClick={() => setRewarded(true)}>
                {rewarded ? "Bloom saved" : "Complete milestone"}
              </AnuimeButton>
            }
          />
        </div>
      </div>
      <aside className={`${styles.surface} ${styles.surfacePadding}`}>
        <h3 className="font-bold">Dream Pocket</h3>
        <div className="mt-3 grid gap-2">
          {savedCharms.map((charm) => (
            <button key={charm} className={`${styles.secondary} ${styles.control} text-left`}>
              {charm}
            </button>
          ))}
        </div>
        <details className="mt-5">
          <summary className="cursor-pointer font-semibold">Recovery Cloud</summary>
          <p className="mt-2 text-sm opacity-70">
            If publishing fails, the draft stays local and the next recovery step is explained.
          </p>
        </details>
      </aside>
    </section>
  );
}
