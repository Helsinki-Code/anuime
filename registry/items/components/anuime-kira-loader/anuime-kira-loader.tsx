import type { HTMLAttributes } from "react";

export type AnuimeKiraLoaderProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
};

export function AnuimeKiraLoader({
  label = "Loading",
  className = "",
  ...props
}: AnuimeKiraLoaderProps) {
  return (
    <div
      role="status"
      data-character="kira"
      className={`xm relative h-16 w-[150px] overflow-hidden ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute top-[44%] h-4 w-16 -skew-x-[24deg] bg-[linear-gradient(90deg,transparent,var(--anuime-accent,var(--accent)))] motion-safe:animate-[kslash_1.15s_ease-in-out_infinite]"
      />
      <span
        aria-hidden="true"
        className="absolute top-4 left-[40%] h-3 w-[5px] -skew-x-[18deg] bg-[var(--anuime-accent,var(--accent))] motion-safe:animate-[kshardfade_1.15s_ease-in-out_.12s_infinite]"
      />
      <span
        aria-hidden="true"
        className="absolute top-[34px] left-[56%] h-[9px] w-1 -skew-x-[18deg] bg-[var(--anuime-accent,var(--accent))] motion-safe:animate-[kshardfade_1.15s_ease-in-out_.26s_infinite]"
      />
      <span className="sr-only">{label}</span>
      <style>{`@keyframes kslash{0%{transform:translateX(-150%) skewX(-24deg);opacity:0}20%{opacity:1}55%{opacity:1}100%{transform:translateX(150%) skewX(-24deg);opacity:0}}@keyframes kshardfade{0%,100%{opacity:0;transform:translate(0,0) skewX(-18deg)}40%{opacity:.9}70%{opacity:0;transform:translate(9px,-7px) skewX(-18deg)}}@media (prefers-reduced-motion:reduce){.xm *{animation:none!important}}`}</style>
    </div>
  );
}
