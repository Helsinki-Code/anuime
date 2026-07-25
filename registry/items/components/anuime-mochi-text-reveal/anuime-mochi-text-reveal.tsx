import type { HTMLAttributes } from "react";

export type AnuimeMochiTextRevealProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  words?: [string, string, string];
};

const bloomSlots = ["first", "second", "third"] as const;

export function AnuimeMochiTextReveal({
  words = ["Make", "something", "lovely"],
  className = "",
  ...props
}: AnuimeMochiTextRevealProps) {
  return (
    <span
      data-character="mochi"
      className={`xm inline-flex gap-2 font-serif text-[23px] font-semibold ${className}`}
      {...props}
    >
      <span className="sr-only">{words.join(" ")}</span>
      {words.map((word, index) => (
        <span
          key={bloomSlots[index]}
          aria-hidden="true"
          className="motion-safe:animate-[mbloomword_1.7s_ease-in-out_infinite]"
          style={{ animationDelay: `${index * 160}ms` }}
        >
          {word}
        </span>
      ))}
      <style>{`@keyframes mbloomword{0%,100%{filter:blur(6px);transform:translateY(3px)}30%,70%{filter:blur(0);transform:translateY(0)}}@media (prefers-reduced-motion:reduce){.xm *{animation:none!important}}`}</style>
    </span>
  );
}
