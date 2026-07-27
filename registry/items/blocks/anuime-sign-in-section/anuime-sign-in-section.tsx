"use client";

import { AnuimeAlert } from "@/components/ui/anuime-alert";
import { AnuimeBorderTraceButton } from "@/components/ui/anuime-border-trace-button";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeCheckbox } from "@/components/ui/anuime-checkbox";
import { AnuimeField } from "@/components/ui/anuime-field";
import { AnuimeFramedBackground } from "@/components/ui/anuime-framed-background";
import { AnuimeInput } from "@/components/ui/anuime-input";
import { AnuimeSeparator } from "@/components/ui/anuime-separator";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeSignInSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeSignInSection({
  character = "kira",
  className = "",
}: AnuimeSignInSectionProps) {
  return (
    <section
      data-anuime-section="anuime-sign-in-section"
      data-anuime-category="auth"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <AnuimeFramedBackground character={character} className="w-full">
        <div className="mx-auto grid max-w-6xl gap-8 p-6 md:p-10">
          <header id="overview" className="grid max-w-2xl gap-4">
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              auth
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              Welcome back to focused work.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              A calm sign-in path with explicit recovery, consent, and account context.
            </p>
          </header>
          <div
            id="details"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
          >
            <div className="min-w-0" data-composes="anuime-card">
              <AnuimeCard
                character={character}
                eyebrow="Sign In"
                title="Welcome back to focused work."
                description="A calm sign-in path with explicit recovery, consent, and account context."
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
            <div className="min-w-0" data-composes="anuime-checkbox">
              <AnuimeCheckbox
                character={character}
                label="Keep me informed"
                description="Send relevant updates about this decision."
                defaultChecked
              />
            </div>
            <div className="min-w-0" data-composes="anuime-button">
              <AnuimeButton character={character}>Sign in securely</AnuimeButton>
            </div>
            <div className="min-w-0" data-composes="anuime-separator">
              <AnuimeSeparator character={character} />
            </div>
            <div className="min-w-0" data-composes="anuime-alert">
              <AnuimeAlert
                character={character}
                title="Context preserved"
                description="A calm sign-in path with explicit recovery, consent, and account context."
              />
            </div>
            <div className="min-w-0" data-composes="anuime-border-trace-button">
              <AnuimeBorderTraceButton character={character}>
                Sign in securely
              </AnuimeBorderTraceButton>
            </div>
          </div>
        </div>
      </AnuimeFramedBackground>
    </section>
  );
}
