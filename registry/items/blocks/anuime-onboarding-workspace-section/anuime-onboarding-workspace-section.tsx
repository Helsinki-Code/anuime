"use client";

import { AnuimeAlert } from "@/components/ui/anuime-alert";
import { AnuimeAvatar } from "@/components/ui/anuime-avatar";
import { AnuimeBentoCard } from "@/components/ui/anuime-bento-card";
import { AnuimeBorderTraceButton } from "@/components/ui/anuime-border-trace-button";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeRadioGroup } from "@/components/ui/anuime-radio-group";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeOnboardingWorkspaceSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeOnboardingWorkspaceSection({
  character = "kira",
  className = "",
}: AnuimeOnboardingWorkspaceSectionProps) {
  return (
    <section
      data-anuime-section="anuime-onboarding-workspace-section"
      data-anuime-category="onboarding"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-5xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            onboarding
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Shape the workspace around the work.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Collect team structure and defaults before the first real project begins.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Onboarding Workspace"
              title="Shape the workspace around the work."
              description="Collect team structure and defaults before the first real project begins."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-radio-group">
            <AnuimeRadioGroup
              character={character}
              legend="Choose an option"
              defaultValue="recommended"
              options={[
                { value: "recommended", label: "Recommended" },
                { value: "custom", label: "Custom" },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-avatar">
            <AnuimeAvatar character={character} fallback="AN" alt="AnUIme team" status="online" />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Create workspace</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-alert">
            <AnuimeAlert
              character={character}
              title="Context preserved"
              description="Collect team structure and defaults before the first real project begins."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-bento-card">
            <AnuimeBentoCard
              character={character}
              eyebrow="Onboarding Workspace"
              title="Shape the workspace around the work."
              size="lg"
            >
              Collect team structure and defaults before the first real project begins.
            </AnuimeBentoCard>
          </div>
          <div className="min-w-0" data-composes="anuime-border-trace-button">
            <AnuimeBorderTraceButton character={character}>
              Create workspace
            </AnuimeBorderTraceButton>
          </div>
        </div>
      </div>
    </section>
  );
}
