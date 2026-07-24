import type { HTMLAttributes } from "react";

export type AnuimeMochiSuccessProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
};

export function AnuimeMochiSuccess({
  label = "Success",
  className = "",
  ...props
}: AnuimeMochiSuccessProps) {
  return (
    <div
      role="status"
      data-character="mochi"
      className={`xm inline-grid place-items-center ${className}`}
      {...props}
    >
      <svg aria-hidden="true" viewBox="0 0 56 56" className="size-14 overflow-visible">
        <path
          d="M28 6C31 19 37 25 48 28C37 31 31 37 28 50C25 37 19 31 8 28C19 25 25 19 28 6Z"
          fill="var(--anuime-accent,var(--accent))"
          className="origin-center motion-safe:animate-[mblossom_1.2s_ease-out_1_both]"
        />
      </svg>
      <span className="sr-only">{label}</span>
      <style>{`@keyframes mblossom{0%{transform:scale(0) rotate(-35deg)}60%{transform:scale(1.15) rotate(5deg)}100%{transform:scale(1) rotate(0)}}@media (prefers-reduced-motion:reduce){.xm *{animation:none!important}}`}</style>
    </div>
  );
}
