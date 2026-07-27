"use client";

import { AnuimeAvatar } from "@/components/ui/anuime-avatar";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBentoCard } from "@/components/ui/anuime-bento-card";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeNodeMap } from "@/components/ui/anuime-node-map";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeContactDirectorySectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeContactDirectorySection({
  character = "kira",
  className = "",
}: AnuimeContactDirectorySectionProps) {
  return (
    <section
      data-anuime-section="anuime-contact-directory-section"
      data-anuime-category="contact"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-6xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            contact
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Talk to the team closest to the problem.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Map questions to real owners, specialties, and available channels.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Contact Directory"
              title="Talk to the team closest to the problem."
              description="Map questions to real owners, specialties, and available channels."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-avatar">
            <AnuimeAvatar character={character} fallback="AN" alt="AnUIme team" status="online" />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Contact Directory</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Find the right team</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-bento-card">
            <AnuimeBentoCard
              character={character}
              eyebrow="Contact Directory"
              title="Talk to the team closest to the problem."
              size="lg"
            >
              Map questions to real owners, specialties, and available channels.
            </AnuimeBentoCard>
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-node-map">
            <AnuimeNodeMap
              character={character}
              nodes={[
                { id: "source", label: "Source", x: 16, y: 52, active: true },
                { id: "process", label: "Process", x: 50, y: 26 },
                { id: "outcome", label: "Outcome", x: 84, y: 62 },
              ]}
              links={[
                ["source", "process"],
                ["process", "outcome"],
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
