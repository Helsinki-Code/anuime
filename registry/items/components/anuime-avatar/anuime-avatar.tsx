import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeAvatarProps = HTMLAttributes<HTMLSpanElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  size?: "sm" | "md" | "lg";
  status?: "online" | "busy" | "offline";
};

const sizes = { sm: "size-8 text-xs", md: "size-10 text-sm", lg: "size-14 text-base" } as const;
const statuses = {
  online: "bg-[var(--anuime-accent,var(--accent))]",
  busy: "bg-[var(--anuime-secondary-accent,var(--accent))]",
  offline: "bg-muted-foreground",
} as const;

export function AnuimeAvatar({
  character = "kira",
  recipe,
  src,
  alt = "",
  fallback = "AN",
  size = "md",
  status,
  className = "",
  ...props
}: AnuimeAvatarProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "avatar");
  const system = styles.recipe.structureSystem;
  return (
    <span
      data-character={system}
      className={`relative inline-flex shrink-0 ${className}`}
      {...props}
    >
      <span
        className={`${sizes[size]} ${styles.shapeControl} ${styles.surface} inline-flex items-center justify-center overflow-hidden font-bold`}
      >
        {src ? <img src={src} alt={alt} className="size-full object-cover" /> : fallback}
      </span>
      {status ? (
        <span
          className={`absolute right-0 bottom-0 size-3 border-2 border-background ${
            system === "atlas" ? "rotate-45 rounded-[1px]" : "rounded-full"
          } ${statuses[status]}`}
        >
          <span className="sr-only">{status}</span>
        </span>
      ) : null}
    </span>
  );
}

export function AnuimeAvatarGroup({
  children,
  label = "People",
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode; label?: string }) {
  return (
    <div
      aria-label={label}
      className={`flex -space-x-2 [&>span]:ring-2 [&>span]:ring-background ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export type AnuimeAvatarImageProps = ImgHTMLAttributes<HTMLImageElement>;
