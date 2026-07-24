import type { HTMLAttributes } from "react";

export type AnuimeMochiLoaderProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
};

export function AnuimeMochiLoader({
  label = "Loading",
  className = "",
  ...props
}: AnuimeMochiLoaderProps) {
  return (
    <div
      role="status"
      data-character="mochi"
      className={`xm relative size-[70px] ${className}`}
      {...props}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 motion-safe:animate-[mspin_1.15s_linear_infinite]"
      >
        <span className="absolute top-0 left-[31px] size-[9px] rounded-full bg-[var(--anuime-secondary,var(--secondary))]" />
        <span className="absolute top-[31px] right-0 size-2 rounded-full bg-[var(--anuime-secondary,var(--secondary))] opacity-70" />
        <span className="absolute bottom-0 left-[32px] size-[7px] rounded-full bg-[var(--anuime-secondary,var(--secondary))] opacity-45" />
        <span className="absolute top-8 left-0 size-1.5 rounded-full bg-[var(--anuime-secondary,var(--secondary))] opacity-30" />
      </div>
      <span
        aria-hidden="true"
        className="absolute top-[29px] left-[29px] size-3 rotate-45 bg-[var(--anuime-accent,var(--accent))] [clip-path:polygon(50%_0,61%_39%,100%_50%,61%_61%,50%_100%,39%_61%,0_50%,39%_39%)] motion-safe:animate-[msparkle_1.15s_ease-in-out_infinite]"
      />
      <span className="sr-only">{label}</span>
      <style>{`@keyframes mspin{to{transform:rotate(360deg)}}@keyframes msparkle{0%,100%{opacity:.2;transform:scale(.5)}50%{opacity:1;transform:scale(1)}}@media (prefers-reduced-motion:reduce){.xm *{animation:none!important}}`}</style>
    </div>
  );
}
