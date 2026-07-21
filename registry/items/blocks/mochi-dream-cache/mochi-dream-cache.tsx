"use client";

import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimePopover } from "@/components/ui/anuime-popover";
import { AnuimeProgress } from "@/components/ui/anuime-progress";
import { createAnuimeRecipe, type AnuimeRecipeV2 } from "@/lib/anuime-recipe";

export function MochiDreamCache({
  recipe = createAnuimeRecipe("mochi"),
}: {
  recipe?: AnuimeRecipeV2;
}) {
  return (
    <section className="rounded-[2rem] border border-pink-300 bg-pink-50 p-6 text-pink-950 shadow-xl dark:bg-pink-950 dark:text-pink-50">
      <p className="font-mono text-xs tracking-[0.2em] text-pink-500 uppercase">
        Mochi · Dream Cache
      </p>
      <div className="mt-4 grid gap-5 lg:grid-cols-2">
        <AnuimeCard
          recipe={recipe}
          eyebrow="Step 2 of 3"
          title="Give your project a little personality."
          description="A warm onboarding block keeps help close without interrupting progress."
          action={<AnuimeButton recipe={recipe}>Continue creating</AnuimeButton>}
        />
        <div className="grid content-between gap-5 rounded-3xl border border-pink-300/60 bg-white/60 p-5 dark:bg-pink-900/30">
          <AnuimeProgress recipe={recipe} label="Your setup" value={66} />
          <AnuimePopover
            recipe={recipe}
            trigger="Open a helpful charm"
            title="Dream Cache suggestion"
          >
            You can change this later. Start with the name your collaborators already use.
          </AnuimePopover>
        </div>
      </div>
    </section>
  );
}
