import type { HTMLAttributes } from "react";

export type AnuimeKiraSuccessProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
};

export function AnuimeKiraSuccess({
  label = "Success",
  className = "",
  ...props
}: AnuimeKiraSuccessProps) {
  return (
    <div
      role="status"
      data-character="kira"
      className={`xm inline-grid place-items-center ${className}`}
      {...props}
    >
      <svg aria-hidden="true" viewBox="0 0 56 56" className="size-14 overflow-visible">
        <path d="M12 40 34 14" fill="none" stroke="currentColor" strokeWidth="2" opacity=".2" />
        <polyline
          points="16,30 25,39 42,16"
          fill="none"
          stroke="var(--anuime-accent,var(--accent))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="64"
          className="motion-safe:animate-[kdraw_1.2s_ease-out_1_both]"
        />
      </svg>
      <span className="sr-only">{label}</span>
      <style>{`@keyframes kdraw{0%{stroke-dashoffset:64}55%,100%{stroke-dashoffset:0}}@media (prefers-reduced-motion:reduce){.xm *{animation:none!important}}`}</style>
    </div>
  );
}
