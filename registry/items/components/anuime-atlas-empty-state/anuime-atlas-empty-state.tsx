import type { HTMLAttributes, ReactNode } from "react";

export type AnuimeAtlasEmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  action?: ReactNode;
};

export function AnuimeAtlasEmptyState({
  title = "No structures loaded",
  description = "The survey field is standing by.",
  action,
  className = "",
  ...props
}: AnuimeAtlasEmptyStateProps) {
  return (
    <div
      data-character="atlas"
      className={`xm grid justify-items-center text-center ${className}`}
      {...props}
    >
      <div
        aria-hidden="true"
        className="relative h-[78px] w-[130px] bg-[repeating-linear-gradient(0deg,transparent_0_15px,color-mix(in_oklab,var(--anuime-accent,var(--accent))_8%,transparent)_15px_16px),repeating-linear-gradient(90deg,transparent_0_15px,color-mix(in_oklab,var(--anuime-accent,var(--accent))_8%,transparent)_15px_16px)]"
      >
        <span className="absolute top-[34px] left-[60px] size-[9px] rotate-45 bg-[var(--anuime-accent,var(--accent))] motion-safe:animate-[apulse_2.4s_ease-in-out_infinite]" />
      </div>
      <h3 className="font-mono text-sm font-semibold tracking-[.08em] uppercase">{title}</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
      <style>{`@keyframes apulse{0%,100%{transform:rotate(45deg) scale(1);opacity:.5}50%{transform:rotate(45deg) scale(1.25);opacity:1}}@media (prefers-reduced-motion:reduce){.xm *{animation:none!important}}`}</style>
    </div>
  );
}
