"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBeamBackground } from "@/components/ui/anuime-beam-background";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeTerminalWindow } from "@/components/ui/anuime-terminal-window";
import { AnuimeTypewriter } from "@/components/ui/anuime-typewriter";
import { AnuimeTypography } from "@/components/ui/anuime-typography";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeHeroTerminalSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeHeroTerminalSection({
  character = "kira",
  className = "",
}: AnuimeHeroTerminalSectionProps) {
  return (
    <section
      data-anuime-section="anuime-hero-terminal-section"
      data-anuime-category="hero"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <AnuimeBeamBackground character={character} className="w-full">
        <div className="mx-auto grid min-h-[38rem] max-w-7xl content-center gap-8 p-6 md:p-10">
          <header id="overview" className="grid max-w-4xl gap-4">
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              hero
            </p>
            <AnuimeTypewriter
              character={character}
              text="Install the point of view."
              className="text-3xl font-bold sm:text-5xl"
            />
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Let real commands and real output carry the opening argument for developers.
            </p>
          </header>
          <div
            id="details"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
          >
            <div className="min-w-0" data-composes="anuime-badge">
              <AnuimeBadge character={character}>Hero Terminal</AnuimeBadge>
            </div>
            <div className="min-w-0" data-composes="anuime-button">
              <AnuimeButton character={character}>Copy install command</AnuimeButton>
            </div>
            <div className="min-w-0" data-composes="anuime-typography">
              <AnuimeTypography character={character} />
            </div>
            <div className="min-w-0 lg:col-span-2" data-composes="anuime-terminal-window">
              <AnuimeTerminalWindow
                character={character}
                entries={[
                  {
                    command: "npx shadcn@latest add anuime-hero-terminal-section",
                    output: "Installed composed section and dependencies.",
                  },
                  { command: "vp test run", output: "Composition checks passed." },
                ]}
              />
            </div>
          </div>
        </div>
      </AnuimeBeamBackground>
    </section>
  );
}
