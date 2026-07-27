"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBorderTraceButton } from "@/components/ui/anuime-border-trace-button";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeButtonGroup } from "@/components/ui/anuime-button-group";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeFramedBackground } from "@/components/ui/anuime-framed-background";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeCtaBannerSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeCtaBannerSection({
  character = "kira",
  className = "",
}: AnuimeCtaBannerSectionProps) {
  return (
    <section
      data-anuime-section="anuime-cta-banner-section"
      data-anuime-category="cta"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <AnuimeFramedBackground character={character} className="w-full">
        <div className="mx-auto grid max-w-6xl gap-8 p-6 md:p-10">
          <header id="overview" className="mx-auto grid max-w-3xl gap-4 text-center">
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              cta
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              The next move should be obvious.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Close the page with one focused proposition and two clearly ranked actions.
            </p>
          </header>
          <div
            id="details"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
          >
            <div className="min-w-0" data-composes="anuime-card">
              <AnuimeCard
                character={character}
                eyebrow="CTA Banner"
                title="The next move should be obvious."
                description="Close the page with one focused proposition and two clearly ranked actions."
              />
            </div>
            <div className="min-w-0" data-composes="anuime-button">
              <AnuimeButton character={character}>Start building</AnuimeButton>
            </div>
            <div className="min-w-0" data-composes="anuime-button-group">
              <AnuimeButtonGroup character={character} />
            </div>
            <div className="min-w-0" data-composes="anuime-badge">
              <AnuimeBadge character={character}>CTA Banner</AnuimeBadge>
            </div>
            <div className="min-w-0" data-composes="anuime-border-trace-button">
              <AnuimeBorderTraceButton character={character}>
                Start building
              </AnuimeBorderTraceButton>
            </div>
          </div>
        </div>
      </AnuimeFramedBackground>
    </section>
  );
}
