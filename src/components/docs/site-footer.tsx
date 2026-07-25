import { IconArrowUpRight, IconBrandGithub, IconSparkles } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

import { siteConfig } from "../../lib/site-config";
import { SiteLogo } from "./site-logo";

const footerLinkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-muted/20">
      <div className="anuime-grid border-b">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-10">
          <div className="flex items-center gap-4">
            <span className="grid size-10 place-items-center rounded-xl border bg-background shadow-sm">
              <IconSparkles className="size-4" />
            </span>
            <div>
              <p className="font-semibold">Build with a character. Ship with a system.</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                51 workhorses, 12 expressive moments, and one agent-ready registry.
              </p>
            </div>
          </div>
          <Link
            to="/studio"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-85"
          >
            Open Studio <IconArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-screen-2xl gap-10 px-5 py-12 sm:px-7 md:grid-cols-[1.25fr_0.75fr_0.75fr_0.9fr] lg:px-10 lg:py-16">
        <div className="max-w-sm">
          <Link to="/" aria-label={`${siteConfig.name} home`}>
            <SiteLogo className="h-11 w-48" />
          </Link>
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Original character-driven design systems translated into accessible React source you can
            inspect, install, and own.
          </p>
          <a
            href={siteConfig.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
          >
            <IconBrandGithub className="size-4" /> Helsinki-Code/anuime
            <IconArrowUpRight className="size-3.5" />
          </a>
        </div>

        <FooterGroup title="Product">
          <Link to="/studio" className={footerLinkClass}>
            Studio
          </Link>
          <Link to="/gallery" className={footerLinkClass}>
            Examples
          </Link>
          <Link to="/$section" params={{ section: "components" }} className={footerLinkClass}>
            Components
          </Link>
          <Link to="/characters" className={footerLinkClass}>
            Characters
          </Link>
        </FooterGroup>

        <FooterGroup title="Learn">
          <Link to="/docs" className={footerLinkClass}>
            Documentation
          </Link>
          <Link to="/design-philosophy" className={footerLinkClass}>
            Design philosophy
          </Link>
          <Link to="/docs/$slug" params={{ slug: "accessibility" }} className={footerLinkClass}>
            Accessibility
          </Link>
          <Link to="/docs/$slug" params={{ slug: "agents" }} className={footerLinkClass}>
            Agent guide
          </Link>
        </FooterGroup>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.14em] uppercase">Agents</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Connect compatible tools to the AnUIme MCP server.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border bg-background">
            <p className="border-b px-3 py-2 font-mono text-[9px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
              Streamable HTTP
            </p>
            <code className="block overflow-x-auto p-3 font-mono text-[10px]">
              anuime.vercel.app/mcp
            </code>
          </div>
          <Link
            to="/docs/$slug"
            params={{ slug: "mcp" }}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
          >
            MCP setup <IconArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-10">
          <p>© 2026 AnUIme. Open-source components with an original point of view.</p>
          <p>Character identity is expressed through geometry, not borrowed IP.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-semibold tracking-[0.14em] uppercase">{title}</h2>
      <nav className="mt-4 grid gap-3" aria-label={`${title} footer links`}>
        {children}
      </nav>
    </div>
  );
}
