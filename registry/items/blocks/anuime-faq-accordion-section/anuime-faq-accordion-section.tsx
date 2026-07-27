"use client";

import { AnuimeAccordion } from "@/components/ui/anuime-accordion";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeFramedBackground } from "@/components/ui/anuime-framed-background";
import { AnuimeStickyRail } from "@/components/ui/anuime-sticky-rail";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeFaqAccordionSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeFaqAccordionSection({
  character = "kira",
  className = "",
}: AnuimeFaqAccordionSectionProps) {
  return (
    <section
      data-anuime-section="anuime-faq-accordion-section"
      data-anuime-category="faq"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <AnuimeFramedBackground character={character} className="w-full">
        <div className="mx-auto grid max-w-5xl gap-8 p-6 md:p-10">
          <header id="overview" className="grid max-w-3xl gap-4">
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              faq
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              Straight answers, progressively disclosed.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Keep common questions calm, scannable, and easy to revisit.
            </p>
          </header>
          <div
            id="details"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
          >
            <div className="min-w-0" data-composes="anuime-accordion">
              <AnuimeAccordion
                character={character}
                items={[
                  {
                    id: "purpose",
                    title: "What is included?",
                    content: "Keep common questions calm, scannable, and easy to revisit.",
                  },
                  {
                    id: "next",
                    title: "What happens next?",
                    content: "Choose the next action when the context is clear.",
                  },
                ]}
              />
            </div>
            <div className="min-w-0" data-composes="anuime-button">
              <AnuimeButton character={character}>See all answers</AnuimeButton>
            </div>
            <div className="min-w-0" data-composes="anuime-badge">
              <AnuimeBadge character={character}>FAQ Accordion</AnuimeBadge>
            </div>
            <div className="min-w-0" data-composes="anuime-sticky-rail">
              <AnuimeStickyRail
                character={character}
                items={[
                  { id: "overview", label: "Overview" },
                  { id: "details", label: "Details" },
                  { id: "next", label: "Next step" },
                ]}
                activeId="overview"
                onSelect={() => undefined}
              />
            </div>
          </div>
        </div>
      </AnuimeFramedBackground>
    </section>
  );
}
