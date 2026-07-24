import type { HTMLAttributes } from "react";

export type AnuimeAtlasLoaderProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
};

export function AnuimeAtlasLoader({
  label = "Loading",
  className = "",
  ...props
}: AnuimeAtlasLoaderProps) {
  return (
    <div
      role="status"
      data-character="atlas"
      className={`xm relative size-[72px] ${className}`}
      {...props}
    >
      <span className="absolute top-0 left-0 size-3 border-t-2 border-l-2 border-[var(--anuime-accent,var(--accent))] motion-safe:animate-[aconvTL_1.15s_ease-in-out_infinite]" />
      <span className="absolute top-0 right-0 size-3 border-t-2 border-r-2 border-[var(--anuime-accent,var(--accent))] motion-safe:animate-[aconvTR_1.15s_ease-in-out_infinite]" />
      <span className="absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-[var(--anuime-accent,var(--accent))] motion-safe:animate-[aconvBL_1.15s_ease-in-out_infinite]" />
      <span className="absolute right-0 bottom-0 size-3 border-r-2 border-b-2 border-[var(--anuime-accent,var(--accent))] motion-safe:animate-[aconvBR_1.15s_ease-in-out_infinite]" />
      <span className="absolute top-5 left-5 size-8 rounded-full border-2 border-[color-mix(in_oklab,var(--anuime-accent,var(--accent))_24%,transparent)] border-t-[var(--anuime-accent,var(--accent))] motion-safe:animate-[aspin_1s_linear_infinite]" />
      <span className="absolute top-[31px] left-[31px] size-2.5 rotate-45 bg-[var(--anuime-accent,var(--accent))] motion-safe:animate-[apulse_1.15s_ease-in-out_infinite]" />
      <span className="sr-only">{label}</span>
      <style>{`@keyframes aspin{to{transform:rotate(360deg)}}@keyframes apulse{0%,100%{transform:rotate(45deg) scale(1);opacity:.5}50%{transform:rotate(45deg) scale(1.25);opacity:1}}@keyframes aconvTL{0%,100%{transform:translate(-12px,-12px);opacity:0}35%,80%{transform:translate(0,0);opacity:1}}@keyframes aconvTR{0%,100%{transform:translate(12px,-12px);opacity:0}35%,80%{transform:translate(0,0);opacity:1}}@keyframes aconvBL{0%,100%{transform:translate(-12px,12px);opacity:0}35%,80%{transform:translate(0,0);opacity:1}}@keyframes aconvBR{0%,100%{transform:translate(12px,12px);opacity:0}35%,80%{transform:translate(0,0);opacity:1}}@media (prefers-reduced-motion:reduce){.xm *{animation:none!important}}`}</style>
    </div>
  );
}
