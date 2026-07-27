"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeLoadingButton } from "@/components/ui/anuime-loading-button";
import { AnuimeSuccessBurst } from "@/components/ui/anuime-success-burst";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeCtaSuccessSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeCtaSuccessSection({
  character = "kira",
  className = "",
}: AnuimeCtaSuccessSectionProps) {
  return (
    <section
      data-anuime-section="anuime-cta-success-section"
      data-anuime-category="cta"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-6xl gap-8 p-6 md:p-10">
        <header id="overview" className="mx-auto grid max-w-3xl gap-4 text-center">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">cta</p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Your build is ready for its next chapter.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Confirm completion first, then offer the most useful follow-up action.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="CTA Success"
              title="Your build is ready for its next chapter."
              description="Confirm completion first, then offer the most useful follow-up action."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Open the result</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>CTA Success</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-success-burst">
            <AnuimeSuccessBurst character={character} className="mx-auto" />
          </div>
          <div className="min-w-0" data-composes="anuime-loading-button">
            <AnuimeLoadingButton character={character} loading={false}>
              Open the result
            </AnuimeLoadingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
