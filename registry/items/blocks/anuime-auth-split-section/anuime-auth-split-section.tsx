"use client";

import { AnuimeBorderTraceButton } from "@/components/ui/anuime-border-trace-button";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeField } from "@/components/ui/anuime-field";
import { AnuimeInput } from "@/components/ui/anuime-input";
import { AnuimeRadialFieldBackground } from "@/components/ui/anuime-radial-field-background";
import { AnuimeTraceCard } from "@/components/ui/anuime-trace-card";
import { AnuimeTypography } from "@/components/ui/anuime-typography";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeAuthSplitSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeAuthSplitSection({
  character = "kira",
  className = "",
}: AnuimeAuthSplitSectionProps) {
  return (
    <section
      data-anuime-section="anuime-auth-split-section"
      data-anuime-category="auth"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <AnuimeRadialFieldBackground character={character} className="w-full">
        <div className="mx-auto grid max-w-6xl gap-8 p-6 md:p-10">
          <header id="overview" className="grid max-w-2xl gap-4">
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              auth
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              Access on one side. Product truth on the other.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Pair a compact credential flow with useful proof of what waits beyond it.
            </p>
          </header>
          <div
            id="details"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
          >
            <div className="min-w-0" data-composes="anuime-card">
              <AnuimeCard
                character={character}
                eyebrow="Auth Split"
                title="Access on one side. Product truth on the other."
                description="Pair a compact credential flow with useful proof of what waits beyond it."
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
              <AnuimeButton character={character}>Continue to AnUIme</AnuimeButton>
            </div>
            <div className="min-w-0" data-composes="anuime-typography">
              <AnuimeTypography character={character} />
            </div>
            <div className="min-w-0" data-composes="anuime-trace-card">
              <AnuimeTraceCard
                character={character}
                title="Access on one side. Product truth on the other."
                description="Pair a compact credential flow with useful proof of what waits beyond it."
                footer={<span className="text-sm font-semibold">Continue to AnUIme</span>}
              />
            </div>
            <div className="min-w-0" data-composes="anuime-border-trace-button">
              <AnuimeBorderTraceButton character={character}>
                Continue to AnUIme
              </AnuimeBorderTraceButton>
            </div>
          </div>
        </div>
      </AnuimeRadialFieldBackground>
    </section>
  );
}
