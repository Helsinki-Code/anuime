"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeConfettiField } from "@/components/ui/anuime-confetti-field";
import { AnuimeSuccessBurst } from "@/components/ui/anuime-success-burst";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeOnboardingCompleteSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeOnboardingCompleteSection({
  character = "kira",
  className = "",
}: AnuimeOnboardingCompleteSectionProps) {
  return (
    <section
      data-anuime-section="anuime-onboarding-complete-section"
      data-anuime-category="onboarding"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-5xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            onboarding
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Setup complete. Context preserved.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Celebrate with restraint, summarize what changed, and point to the first useful task.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Onboarding Complete"
              title="Setup complete. Context preserved."
              description="Celebrate with restraint, summarize what changed, and point to the first useful task."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Onboarding Complete</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Enter workspace</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-success-burst">
            <AnuimeSuccessBurst character={character} className="mx-auto" />
          </div>
          <div className="min-w-0" data-composes="anuime-confetti-field">
            <AnuimeConfettiField character={character}>
              <strong>Completion confirmed</strong>
            </AnuimeConfettiField>
          </div>
        </div>
      </div>
    </section>
  );
}
