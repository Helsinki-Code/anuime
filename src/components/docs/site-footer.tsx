import { IconArrowUpRight, IconHeart } from "@tabler/icons-react";

import { siteConfig } from "../../lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-10">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-3 px-4 py-7 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <p className="inline-flex items-center gap-1.5">
          Built with <IconHeart className="size-3.5 text-fuchsia-500" aria-label="care" /> for
          expressive interfaces.
        </p>
        <a
          href={siteConfig.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Open source on GitHub
          <IconArrowUpRight className="ml-[1px] inline-block size-3 translate-y-[-1px]" />
        </a>
      </div>
    </footer>
  );
}
