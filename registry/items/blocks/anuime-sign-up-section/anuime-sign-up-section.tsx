"use client";

import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeCheckbox } from "@/components/ui/anuime-checkbox";
import { AnuimeField } from "@/components/ui/anuime-field";
import { AnuimeInput } from "@/components/ui/anuime-input";
import { AnuimeInputGroup } from "@/components/ui/anuime-input-group";
import { AnuimeLineGridBackground } from "@/components/ui/anuime-line-grid-background";
import { AnuimeLoadingButton } from "@/components/ui/anuime-loading-button";
import { AnuimeProgress } from "@/components/ui/anuime-progress";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeSignUpSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeSignUpSection({
  character = "kira",
  className = "",
}: AnuimeSignUpSectionProps) {
  return (
    <section
      data-anuime-section="anuime-sign-up-section"
      data-anuime-category="auth"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <AnuimeLineGridBackground character={character} className="w-full">
        <div className="mx-auto grid max-w-6xl gap-8 p-6 md:p-10">
          <header id="overview" className="grid max-w-2xl gap-4">
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              auth
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              Create a workspace worth returning to.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Collect only what setup needs, show progress, and make terms impossible to miss.
            </p>
          </header>
          <div
            id="details"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
          >
            <div className="min-w-0" data-composes="anuime-card">
              <AnuimeCard
                character={character}
                eyebrow="Sign Up"
                title="Create a workspace worth returning to."
                description="Collect only what setup needs, show progress, and make terms impossible to miss."
              />
            </div>
            <div className="min-w-0" data-composes="anuime-field">
              <AnuimeField
                character={character}
                label="Work email"
                description="Used only for this request."
              />
            </div>
            <div className="min-w-0" data-composes="anuime-input">
              <AnuimeInput
                character={character}
                label="Work email"
                hint="We will only use this for the requested follow-up."
                placeholder="you@company.com"
              />
            </div>
            <div className="min-w-0" data-composes="anuime-input-group">
              <AnuimeInputGroup character={character} />
            </div>
            <div className="min-w-0" data-composes="anuime-checkbox">
              <AnuimeCheckbox
                character={character}
                label="Keep me informed"
                description="Send relevant updates about this decision."
                defaultChecked
              />
            </div>
            <div className="min-w-0" data-composes="anuime-button">
              <AnuimeButton character={character}>Create workspace</AnuimeButton>
            </div>
            <div className="min-w-0" data-composes="anuime-progress">
              <AnuimeProgress character={character} label="Completion" value={68} />
            </div>
            <div className="min-w-0" data-composes="anuime-loading-button">
              <AnuimeLoadingButton character={character} loading={false}>
                Create workspace
              </AnuimeLoadingButton>
            </div>
          </div>
        </div>
      </AnuimeLineGridBackground>
    </section>
  );
}
