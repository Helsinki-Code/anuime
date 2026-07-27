"use client";

import { AnuimeAvatar } from "@/components/ui/anuime-avatar";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeOrbitMap } from "@/components/ui/anuime-orbit-map";
import { AnuimeRadialFieldBackground } from "@/components/ui/anuime-radial-field-background";
import { AnuimeWordCycle } from "@/components/ui/anuime-word-cycle";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeHeroOrbitSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeHeroOrbitSection({
  character = "kira",
  className = "",
}: AnuimeHeroOrbitSectionProps) {
  return (
    <section
      data-anuime-section="anuime-hero-orbit-section"
      data-anuime-category="hero"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <AnuimeRadialFieldBackground character={character} className="w-full">
        <div className="mx-auto grid min-h-[38rem] max-w-7xl content-center gap-8 p-6 md:p-10">
          <header id="overview" className="grid max-w-4xl gap-4">
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              hero
            </p>
            <AnuimeWordCycle
              character={character}
              words={["precise", "gracious", "structural"]}
              className="text-3xl font-bold sm:text-5xl"
            />
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Introduce the cast as connected roles instead of interchangeable themes.
            </p>
          </header>
          <div
            id="details"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
          >
            <div className="min-w-0" data-composes="anuime-badge">
              <AnuimeBadge character={character}>Hero Orbit</AnuimeBadge>
            </div>
            <div className="min-w-0" data-composes="anuime-button">
              <AnuimeButton character={character}>Meet the characters</AnuimeButton>
            </div>
            <div className="min-w-0" data-composes="anuime-avatar">
              <AnuimeAvatar character={character} fallback="AN" alt="AnUIme team" status="online" />
            </div>
            <div className="min-w-0 lg:col-span-2" data-composes="anuime-orbit-map">
              <AnuimeOrbitMap character={character} className="mx-auto" />
            </div>
          </div>
        </div>
      </AnuimeRadialFieldBackground>
    </section>
  );
}
