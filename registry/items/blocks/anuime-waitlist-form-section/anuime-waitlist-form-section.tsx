"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeField } from "@/components/ui/anuime-field";
import { AnuimeInput } from "@/components/ui/anuime-input";
import { AnuimeLoadingButton } from "@/components/ui/anuime-loading-button";
import { AnuimeRadialFieldBackground } from "@/components/ui/anuime-radial-field-background";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeWaitlistFormSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeWaitlistFormSection({
  character = "kira",
  className = "",
}: AnuimeWaitlistFormSectionProps) {
  return (
    <section
      data-anuime-section="anuime-waitlist-form-section"
      data-anuime-category="waitlist"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <AnuimeRadialFieldBackground character={character} className="w-full">
        <div className="mx-auto grid max-w-5xl gap-8 p-6 md:p-10">
          <header id="overview" className="mx-auto grid max-w-3xl gap-4 text-center">
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              waitlist
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              Reserve a place with clear expectations.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Explain the value, collect one useful signal, and state what happens after signup.
            </p>
          </header>
          <div
            id="details"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
          >
            <div className="min-w-0" data-composes="anuime-card">
              <AnuimeCard
                character={character}
                eyebrow="Waitlist Form"
                title="Reserve a place with clear expectations."
                description="Explain the value, collect one useful signal, and state what happens after signup."
              />
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
            <div className="min-w-0" data-composes="anuime-button">
              <AnuimeButton character={character}>Join early access</AnuimeButton>
            </div>
            <div className="min-w-0" data-composes="anuime-badge">
              <AnuimeBadge character={character}>Waitlist Form</AnuimeBadge>
            </div>
            <div className="min-w-0" data-composes="anuime-loading-button">
              <AnuimeLoadingButton character={character} loading={false}>
                Join early access
              </AnuimeLoadingButton>
            </div>
          </div>
        </div>
      </AnuimeRadialFieldBackground>
    </section>
  );
}
