"use client";

import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCopyButton } from "@/components/ui/anuime-copy-button";
import { AnuimeInput } from "@/components/ui/anuime-input";
import { AnuimeKbd } from "@/components/ui/anuime-kbd";
import { AnuimeTerminalWindow } from "@/components/ui/anuime-terminal-window";
import { AnuimeTypewriter } from "@/components/ui/anuime-typewriter";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeCtaTerminalSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeCtaTerminalSection({
  character = "kira",
  className = "",
}: AnuimeCtaTerminalSectionProps) {
  return (
    <section
      data-anuime-section="anuime-cta-terminal-section"
      data-anuime-category="cta"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-6xl gap-8 p-6 md:p-10">
        <header id="overview" className="mx-auto grid max-w-3xl gap-4 text-center">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">cta</p>
          <AnuimeTypewriter
            character={character}
            text="One command from idea to source."
            className="text-3xl font-bold sm:text-5xl"
          />
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Turn developer intent into a copyable installation path with visible output.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Copy the command</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-input">
            <AnuimeInput
              character={character}
              label="Work email"
              hint="We will only use this for the requested follow-up."
              placeholder="you@company.com"
            />
          </div>
          <div className="min-w-0" data-composes="anuime-kbd">
            <AnuimeKbd character={character}>⌘ K</AnuimeKbd>
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-terminal-window">
            <AnuimeTerminalWindow
              character={character}
              entries={[
                {
                  command: "npx shadcn@latest add anuime-cta-terminal-section",
                  output: "Installed composed section and dependencies.",
                },
                { command: "vp test run", output: "Composition checks passed." },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-copy-button">
            <AnuimeCopyButton
              character={character}
              value="npx shadcn@latest add https://anuime.vercel.app/r/anuime-cta-terminal-section.json"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
