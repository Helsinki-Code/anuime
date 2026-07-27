"use client";

import { AnuimeAccordion } from "@/components/ui/anuime-accordion";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBentoCard } from "@/components/ui/anuime-bento-card";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeTabs } from "@/components/ui/anuime-tabs";
import { AnuimeTraceCard } from "@/components/ui/anuime-trace-card";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeFaqCategoriesSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeFaqCategoriesSection({
  character = "kira",
  className = "",
}: AnuimeFaqCategoriesSectionProps) {
  return (
    <section
      data-anuime-section="anuime-faq-categories-section"
      data-anuime-category="faq"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-5xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">faq</p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Start with the kind of help you need.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Group answers by intent before opening the detail inside each category.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-tabs">
            <AnuimeTabs
              character={character}
              tabs={[
                {
                  id: "overview",
                  label: "Overview",
                  content:
                    "Group answers by intent before opening the detail inside each category.",
                },
                {
                  id: "details",
                  label: "Details",
                  content: "Every dependency remains visible and inspectable.",
                },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="FAQ Categories"
              title="Start with the kind of help you need."
              description="Group answers by intent before opening the detail inside each category."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-accordion">
            <AnuimeAccordion
              character={character}
              items={[
                {
                  id: "purpose",
                  title: "What is included?",
                  content:
                    "Group answers by intent before opening the detail inside each category.",
                },
                {
                  id: "next",
                  title: "What happens next?",
                  content: "Choose the next action when the context is clear.",
                },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>FAQ Categories</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-bento-card">
            <AnuimeBentoCard
              character={character}
              eyebrow="FAQ Categories"
              title="Start with the kind of help you need."
              size="lg"
            >
              Group answers by intent before opening the detail inside each category.
            </AnuimeBentoCard>
          </div>
          <div className="min-w-0" data-composes="anuime-trace-card">
            <AnuimeTraceCard
              character={character}
              title="Start with the kind of help you need."
              description="Group answers by intent before opening the detail inside each category."
              footer={<span className="text-sm font-semibold">Choose a category</span>}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
