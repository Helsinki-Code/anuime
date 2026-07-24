import type { HTMLAttributes } from "react";

export type AnuimeAtlasTextRevealProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  children?: string;
};

export function AnuimeAtlasTextReveal({
  children = "STRUCTURE LOCKED",
  className = "",
  ...props
}: AnuimeAtlasTextRevealProps) {
  return (
    <span
      data-character="atlas"
      className={`xm relative inline-grid overflow-visible font-mono text-[15px] font-medium tracking-[.08em] ${className}`}
      {...props}
    >
      <span aria-hidden="true" className="col-start-1 row-start-1 text-muted-foreground opacity-35">
        {children}
      </span>
      <span className="col-start-1 row-start-1 motion-safe:animate-[areveal_1.7s_ease-out_infinite]">
        {children}
      </span>
      <span className="absolute -inset-x-1 top-0 h-0.5 bg-[var(--anuime-accent,var(--accent))] opacity-0 motion-safe:animate-[ascan_1.7s_linear_infinite]" />
      <style>{`@keyframes areveal{0%{clip-path:inset(0 100% 0 0)}65%,100%{clip-path:inset(0 0 0 0)}}@keyframes ascan{0%{transform:translateY(-6px);opacity:0}12%{opacity:1}85%{opacity:.7}100%{transform:translateY(30px);opacity:0}}@media (prefers-reduced-motion:reduce){.xm *{animation:none!important}}`}</style>
    </span>
  );
}
