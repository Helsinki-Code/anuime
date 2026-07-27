"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeNumberTicker } from "@/components/ui/anuime-number-ticker";
import { AnuimeParticleField } from "@/components/ui/anuime-particle-field";
import { AnuimeSuccessBurst } from "@/components/ui/anuime-success-burst";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeWaitlistSuccessSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeWaitlistSuccessSection({
  character = "kira",
  className = "",
}: AnuimeWaitlistSuccessSectionProps) {
  return (
    <section
      data-anuime-section="anuime-waitlist-success-section"
      data-anuime-category="waitlist"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-5xl gap-8 p-6 md:p-10">
        <header id="overview" className="mx-auto grid max-w-3xl gap-4 text-center">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            waitlist
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            You are on the list—and know what comes next.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Confirm position, timing, and the next meaningful way to stay involved.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Waitlist Success"
              title="You are on the list—and know what comes next."
              description="Confirm position, timing, and the next meaningful way to stay involved."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Waitlist Success</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Share early access</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-number-ticker">
            <AnuimeNumberTicker
              character={character}
              from={0}
              value={2418}
              className="text-3xl font-bold"
            />
          </div>
          <div className="min-w-0" data-composes="anuime-success-burst">
            <AnuimeSuccessBurst character={character} className="mx-auto" />
          </div>
          <div className="min-w-0" data-composes="anuime-particle-field">
            <AnuimeParticleField character={character}>
              <strong>Access confirmed</strong>
            </AnuimeParticleField>
          </div>
        </div>
      </div>
    </section>
  );
}
