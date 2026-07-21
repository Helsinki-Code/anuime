import type { InputHTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeInputOtpProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "inputMode" | "pattern" | "maxLength"
> & { character?: AnuimeCharacter; recipe?: AnuimeRecipeV2; label?: string; length?: number };

export function AnuimeInputOtp({
  character = "kira",
  recipe,
  label = "Verification code",
  length = 6,
  className = "",
  ...props
}: AnuimeInputOtpProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <label className="grid gap-2 text-sm font-semibold">
      <span>{label}</span>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="[0-9]*"
        maxLength={length}
        aria-describedby="anuime-otp-hint"
        className={`${styles.field} w-full border text-center font-mono text-xl tracking-[0.65em] outline-none focus-visible:ring-2 ${className}`}
        {...props}
      />
      <span id="anuime-otp-hint" className="text-xs font-normal opacity-60">
        Enter the {length}-digit code.
      </span>
    </label>
  );
}
