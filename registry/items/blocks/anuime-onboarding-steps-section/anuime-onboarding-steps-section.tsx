"use client";

import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeField } from "@/components/ui/anuime-field";
import { AnuimeInput } from "@/components/ui/anuime-input";
import { AnuimeLoadingButton } from "@/components/ui/anuime-loading-button";
import { AnuimeProgress } from "@/components/ui/anuime-progress";
import { AnuimeTimelineFlow } from "@/components/ui/anuime-timeline-flow";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeOnboardingStepsSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeOnboardingStepsSection({
  character = "kira",
  className = "",
}: AnuimeOnboardingStepsSectionProps) {
  return (
    <section
      data-anuime-section="anuime-onboarding-steps-section"
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
            A clear path from account to useful.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Turn setup into owned steps with visible progress and recoverable choices.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Onboarding Steps"
              title="A clear path from account to useful."
              description="Turn setup into owned steps with visible progress and recoverable choices."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-progress">
            <AnuimeProgress character={character} label="Completion" value={68} />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Continue setup</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-field">
            <AnuimeField
              character={character}
              label="Work email"
              description="Used only for this request."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-input">
            <AnuimeInput
              character={character}
              label="Work email"
              hint="We will only use this for the requested follow-up."
              placeholder="you@company.com"
            />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-timeline-flow">
            <AnuimeTimelineFlow
              character={character}
              currentId="active"
              items={[
                { id: "planned", title: "Planned", detail: "Scope and owner confirmed" },
                { id: "active", title: "Active", detail: "Work is in progress" },
                { id: "complete", title: "Complete", detail: "Outcome verified" },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-loading-button">
            <AnuimeLoadingButton character={character} loading={false}>
              Continue setup
            </AnuimeLoadingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
