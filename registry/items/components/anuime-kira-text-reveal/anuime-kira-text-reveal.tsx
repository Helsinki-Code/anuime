import type { HTMLAttributes } from "react";

export type AnuimeKiraTextRevealProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  children?: string;
};

export function AnuimeKiraTextReveal({
  children = "Circuit online",
  className = "",
  ...props
}: AnuimeKiraTextRevealProps) {
  return (
    <span
      data-character="kira"
      className={`xm relative inline-grid text-xl font-semibold tracking-[.03em] uppercase ${className}`}
      {...props}
    >
      <span aria-hidden="true" className="col-start-1 row-start-1 opacity-25">
        {children}
      </span>
      <span className="col-start-1 row-start-1 motion-safe:animate-[kreveal_1.7s_ease-out_infinite]">
        {children}
      </span>
      <style>{`@keyframes kreveal{0%{clip-path:inset(0 100% 0 0)}70%,100%{clip-path:inset(0 0 0 0)}}@media (prefers-reduced-motion:reduce){.xm *{animation:none!important}}`}</style>
    </span>
  );
}
