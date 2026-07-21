"use client";

import { useState, type FormEvent } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeAuthPanelProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  title?: string;
  description?: string;
  onSubmit?: (values: { email: string; password: string }) => void | Promise<void>;
};

export function AnuimeAuthPanel({
  character = "mochi",
  recipe,
  title = "Welcome back, senpai.",
  description = "Continue your character-driven build.",
  onSubmit,
}: AnuimeAuthPanelProps) {
  const [loading, setLoading] = useState(false);
  const styles = resolveAnuimeRecipe(recipe, character);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    setLoading(true);
    try {
      await onSubmit?.({
        email: typeof email === "string" ? email : "",
        password: typeof password === "string" ? password : "",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className={`mx-auto w-full max-w-md ${styles.surface} ${styles.surfacePadding}`}>
      <div className={`font-mono text-xs tracking-[0.18em] uppercase ${styles.accent}`}>
        AnUIme access
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 text-sm leading-6 opacity-70">{description}</p>
      <form className="mt-7 grid gap-4" onSubmit={(event) => void submit(event)}>
        <label className="grid gap-2 text-sm font-medium">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`h-11 border px-4 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.field}`}
            placeholder="you@example.com"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={8}
            className={`h-11 border px-4 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.field}`}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className={`mt-2 h-11 px-4 text-sm font-bold disabled:opacity-50 ${styles.primary}`}
        >
          {loading ? "Opening portal…" : "Enter Studio"}
        </button>
      </form>
      <p className="mt-5 text-center text-xs opacity-60">
        Authentication provider not included. Connect your own secure handler.
      </p>
    </section>
  );
}
