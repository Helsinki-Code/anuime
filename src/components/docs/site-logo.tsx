import * as React from "react";

import { cn } from "../../lib/utils";

type SiteLogoProps = React.ComponentProps<"span"> & {
  compact?: boolean;
};

export function SiteLogo({ className, compact = false, ...props }: SiteLogoProps) {
  const imageClassName = cn(
    "pointer-events-none absolute select-none",
    compact
      ? "inset-y-0 -left-1 h-full w-auto max-w-none"
      : "inset-0 size-full object-contain object-left",
  );

  return (
    <span
      role="img"
      aria-label="AnUIme"
      className={cn(
        "relative inline-block h-8 shrink-0 overflow-hidden",
        compact ? "w-10" : "w-36",
        className,
      )}
      {...props}
    >
      <img
        src="/logo/light_theme_logo_site.png"
        alt=""
        width="1600"
        height="384"
        draggable={false}
        aria-hidden="true"
        className={cn(imageClassName, "dark:hidden")}
      />
      <img
        src="/logo/dark_theme_logo_site.png"
        alt=""
        width="1600"
        height="374"
        draggable={false}
        aria-hidden="true"
        className={cn(imageClassName, "hidden dark:block")}
      />
    </span>
  );
}
