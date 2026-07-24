import type { HTMLAttributes, ReactNode } from "react";

export type AnuimeMochiEmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  action?: ReactNode;
};

export function AnuimeMochiEmptyState({
  title = "No reservations tonight",
  description = "There is room for something lovely.",
  action,
  className = "",
  ...props
}: AnuimeMochiEmptyStateProps) {
  return (
    <div
      data-character="mochi"
      className={`xm grid justify-items-center text-center ${className}`}
      {...props}
    >
      <div aria-hidden="true" className="relative h-[78px] w-[120px]">
        <span className="absolute top-2 left-[45px] size-[30px] rounded-full bg-[var(--anuime-secondary,var(--secondary))] opacity-80 after:absolute after:-top-1 after:left-2 after:size-[30px] after:rounded-full after:bg-background" />
        <span className="absolute top-10 left-[38px] size-1 rotate-45 bg-[var(--anuime-accent,var(--accent))] motion-safe:animate-[mfall_2.4s_ease-in_.1s_infinite]" />
        <span className="absolute top-9 left-[72px] size-[3px] rotate-45 bg-[var(--anuime-secondary,var(--secondary))] motion-safe:animate-[mfall_2.4s_ease-in_.8s_infinite]" />
      </div>
      <h3 className="font-serif text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
      <style>{`@keyframes mfall{0%{transform:translateY(-6px);opacity:0}30%{opacity:1}100%{transform:translateY(18px);opacity:0}}@media (prefers-reduced-motion:reduce){.xm *{animation:none!important}}`}</style>
    </div>
  );
}
