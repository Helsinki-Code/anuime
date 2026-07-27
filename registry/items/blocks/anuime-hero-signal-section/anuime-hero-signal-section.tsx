"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBorderTraceButton } from "@/components/ui/anuime-border-trace-button";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeButtonGroup } from "@/components/ui/anuime-button-group";
import { AnuimeLineGridBackground } from "@/components/ui/anuime-line-grid-background";
import { AnuimeLineReveal } from "@/components/ui/anuime-line-reveal";
import { AnuimeTypography } from "@/components/ui/anuime-typography";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeHeroSignalSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeHeroSignalSection({
  character = "kira",
  className = "",
}: AnuimeHeroSignalSectionProps) {
  return (
    <section
      data-anuime-section="anuime-hero-signal-section"
      data-anuime-category="hero"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <AnuimeLineGridBackground character={character} className="w-full">
        <div className="mx-auto grid min-h-[38rem] max-w-7xl content-center gap-8 p-6 md:p-10">
          <header id="overview" className="grid max-w-4xl gap-4">
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              hero
            </p>
            <AnuimeLineReveal character={character} className="text-3xl font-bold sm:text-5xl">
              Interfaces should say who they are.
            </AnuimeLineReveal>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Lead with a precise promise, immediate proof, and a next step with visible intent.
            </p>
          </header>
          <div
            id="details"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
          >
            <div className="min-w-0" data-composes="anuime-badge">
              <AnuimeBadge character={character}>Hero Signal</AnuimeBadge>
            </div>
            <div className="min-w-0" data-composes="anuime-button">
              <AnuimeButton character={character}>Build with character</AnuimeButton>
            </div>
            <div className="min-w-0" data-composes="anuime-button-group">
              <AnuimeButtonGroup character={character} />
            </div>
            <div className="min-w-0" data-composes="anuime-typography">
              <AnuimeTypography character={character} />
            </div>
            <div className="min-w-0" data-composes="anuime-border-trace-button">
              <AnuimeBorderTraceButton character={character}>
                Build with character
              </AnuimeBorderTraceButton>
            </div>
          </div>
        </div>
      </AnuimeLineGridBackground>
    </section>
  );
}
