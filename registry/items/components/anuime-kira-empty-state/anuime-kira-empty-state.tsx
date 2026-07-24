import type { HTMLAttributes, ReactNode } from "react";

export type AnuimeKiraEmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  action?: ReactNode;
};

export function AnuimeKiraEmptyState({
  title = "Nothing here yet",
  description = "The circuit is quiet.",
  action,
  className = "",
  ...props
}: AnuimeKiraEmptyStateProps) {
  return (
    <div
      data-character="kira"
      className={`xm grid justify-items-center text-center ${className}`}
      {...props}
    >
      <div aria-hidden="true" className="relative h-[74px] w-[130px]">
        <span className="absolute top-[22px] left-[26px] h-7 w-16 rounded-full bg-[radial-gradient(ellipse,var(--anuime-secondary,var(--secondary)),transparent_70%)] blur-md motion-safe:animate-[kfloat_3.2s_ease-in-out_infinite]" />
        <span className="absolute top-3.5 left-[78px] h-[13px] w-[5px] -skew-x-[18deg] bg-[var(--anuime-accent,var(--accent))] motion-safe:animate-[kglow_2.6s_ease-in-out_infinite]" />
      </div>
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
      <style>{`@keyframes kfloat{0%,100%{transform:translate(0,0);opacity:.4}50%{transform:translate(8px,-7px);opacity:.75}}@keyframes kglow{0%,100%{opacity:.35}50%{opacity:.85}}@media (prefers-reduced-motion:reduce){.xm *{animation:none!important}}`}</style>
    </div>
  );
}
