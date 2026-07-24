import type { HTMLAttributes } from "react";

export type AnuimeAtlasSuccessProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
};

export function AnuimeAtlasSuccess({
  label = "Success",
  className = "",
  ...props
}: AnuimeAtlasSuccessProps) {
  return (
    <div
      role="status"
      data-character="atlas"
      className={`xm relative size-16 ${className}`}
      {...props}
    >
      <svg aria-hidden="true" viewBox="0 0 64 64" className="absolute inset-0 size-16">
        <circle
          cx="32"
          cy="32"
          r="16"
          fill="none"
          stroke="var(--anuime-accent,var(--accent))"
          strokeWidth="2.5"
          strokeDasharray="101"
          className="motion-safe:animate-[adraw_1.2s_ease-out_1_both]"
        />
      </svg>
      <span className="absolute top-0 left-0 size-3 border-t-2 border-l-2 border-[var(--anuime-accent,var(--accent))] motion-safe:animate-[aconvTL_1.2s_ease-out_1_both]" />
      <span className="absolute top-0 right-0 size-3 border-t-2 border-r-2 border-[var(--anuime-accent,var(--accent))] motion-safe:animate-[aconvTR_1.2s_ease-out_1_both]" />
      <span className="absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-[var(--anuime-accent,var(--accent))] motion-safe:animate-[aconvBL_1.2s_ease-out_1_both]" />
      <span className="absolute right-0 bottom-0 size-3 border-r-2 border-b-2 border-[var(--anuime-accent,var(--accent))] motion-safe:animate-[aconvBR_1.2s_ease-out_1_both]" />
      <span className="sr-only">{label}</span>
      <style>{`@keyframes adraw{0%{stroke-dashoffset:101}60%,100%{stroke-dashoffset:0}}@keyframes aconvTL{0%{transform:translate(-12px,-12px);opacity:0}35%,100%{transform:translate(0,0);opacity:1}}@keyframes aconvTR{0%{transform:translate(12px,-12px);opacity:0}35%,100%{transform:translate(0,0);opacity:1}}@keyframes aconvBL{0%{transform:translate(-12px,12px);opacity:0}35%,100%{transform:translate(0,0);opacity:1}}@keyframes aconvBR{0%{transform:translate(12px,12px);opacity:0}35%,100%{transform:translate(0,0);opacity:1}}@media (prefers-reduced-motion:reduce){.xm *{animation:none!important}}`}</style>
    </div>
  );
}
