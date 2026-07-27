"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBreadcrumb } from "@/components/ui/anuime-breadcrumb";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCodeDiff } from "@/components/ui/anuime-code-diff";
import { AnuimeCopyButton } from "@/components/ui/anuime-copy-button";
import { AnuimeLineReveal } from "@/components/ui/anuime-line-reveal";
import { AnuimeTypography } from "@/components/ui/anuime-typography";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeReleaseDetailSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeReleaseDetailSection({
  character = "kira",
  className = "",
}: AnuimeReleaseDetailSectionProps) {
  return (
    <section
      data-anuime-section="anuime-release-detail-section"
      data-anuime-category="changelog"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-5xl gap-8 p-6 md:p-10">
        <AnuimeBreadcrumb character={character} />
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            changelog
          </p>
          <AnuimeLineReveal character={character} className="text-3xl font-bold sm:text-5xl">
            What changed, why, and how to adopt it.
          </AnuimeLineReveal>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Pair release context with an inspectable diff and a copyable migration path.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Release Detail</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-typography">
            <AnuimeTypography character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Copy migration command</AnuimeButton>
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-code-diff">
            <AnuimeCodeDiff
              character={character}
              lines={[
                {
                  kind: "context",
                  content: "export function Experience() {",
                  oldLine: 1,
                  newLine: 1,
                },
                { kind: "removal", content: "  return <Generic />", oldLine: 2 },
                { kind: "addition", content: "  return <AnuimeSection />", newLine: 2 },
                { kind: "context", content: "}", oldLine: 3, newLine: 3 },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-copy-button">
            <AnuimeCopyButton
              character={character}
              value="npx shadcn@latest add https://anuime.vercel.app/r/anuime-release-detail-section.json"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
