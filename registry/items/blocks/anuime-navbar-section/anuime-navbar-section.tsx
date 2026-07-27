"use client";

import { AnuimeAvatar } from "@/components/ui/anuime-avatar";
import { AnuimeBorderTraceButton } from "@/components/ui/anuime-border-trace-button";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeDropdownMenu } from "@/components/ui/anuime-dropdown-menu";
import { AnuimeNavigationMenu } from "@/components/ui/anuime-navigation-menu";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeNavbarSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeNavbarSection({
  character = "kira",
  className = "",
}: AnuimeNavbarSectionProps) {
  return (
    <section
      data-anuime-section="anuime-navbar-section"
      data-anuime-category="nav"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <AnuimeNavigationMenu
          character={character}
          items={[
            { label: "Overview", href: "#overview" },
            { label: "Details", href: "#details" },
            { label: "Support", href: "#support" },
          ]}
        />
        <header id="overview" className="grid max-w-2xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">nav</p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Primary navigation with a clear center.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Keep routes, account context, and the highest-value action in one stable bar.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Open Studio</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-dropdown-menu">
            <AnuimeDropdownMenu character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-avatar">
            <AnuimeAvatar character={character} fallback="AN" alt="AnUIme team" status="online" />
          </div>
          <div className="min-w-0" data-composes="anuime-border-trace-button">
            <AnuimeBorderTraceButton character={character}>Open Studio</AnuimeBorderTraceButton>
          </div>
        </div>
      </div>
    </section>
  );
}
