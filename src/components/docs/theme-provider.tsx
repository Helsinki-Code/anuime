import { ScriptOnce } from "@tanstack/react-router";
import * as React from "react";

const THEME_STORAGE_KEY = "theme";

export type Theme = "light" | "dark" | "system";

export type ThemeTransitionOrigin = {
  x: number;
  y: number;
};

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme, origin?: ThemeTransitionOrigin) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);
let transitionCleanupTimer: number | undefined;

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getResolvedTheme(theme: Theme) {
  return theme === "system" ? getSystemTheme() : theme;
}

function getStoredTheme(storageKey: string, defaultTheme: Theme): Theme {
  if (typeof window === "undefined") {
    return defaultTheme;
  }

  const storedTheme = window.localStorage.getItem(storageKey);

  return isTheme(storedTheme) ? storedTheme : defaultTheme;
}

function applyTheme(theme: Theme) {
  const resolvedTheme = getResolvedTheme(theme);
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);
  root.style.colorScheme = resolvedTheme;
  root.dataset.theme = theme;

  return resolvedTheme;
}

function getCurrentResolvedTheme(): "light" | "dark" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function prepareThemeTransition(resolvedTheme: "light" | "dark", origin?: ThemeTransitionOrigin) {
  const root = document.documentElement;
  const x = Math.min(window.innerWidth, Math.max(0, origin?.x ?? window.innerWidth - 28));
  const y = Math.min(window.innerHeight, Math.max(0, origin?.y ?? 28));

  root.style.setProperty("--theme-transition-x", `${x}px`);
  root.style.setProperty("--theme-transition-y", `${y}px`);
  root.dataset.themeTransition = resolvedTheme;
  root.classList.add("theme-switching");
}

function cleanupThemeTransition() {
  window.clearTimeout(transitionCleanupTimer);
  transitionCleanupTimer = undefined;

  const root = document.documentElement;
  root.classList.remove("theme-switching", "theme-view-transition", "theme-fallback-transition");
  delete root.dataset.themeTransition;
}

function getThemeScript(storageKey: string, defaultTheme: Theme) {
  const key = JSON.stringify(storageKey);
  const fallback = JSON.stringify(defaultTheme);

  return `(function(){try{var t=localStorage.getItem(${key});if(t!=='light'&&t!=='dark'&&t!=='system'){t=${fallback}}var d=matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(d?'dark':'light'):t;var e=document.documentElement;e.classList.remove('light','dark');e.classList.add(r);e.style.colorScheme=r;e.dataset.theme=t}catch(e){}})();`;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(
    defaultTheme === "dark" ? "dark" : "light",
  );
  const [mounted, setMounted] = React.useState(false);

  const setTheme = React.useCallback(
    (nextTheme: Theme, origin?: ThemeTransitionOrigin) => {
      window.localStorage.setItem(storageKey, nextTheme);
      const nextResolvedTheme = getResolvedTheme(nextTheme);
      const currentResolvedTheme = getCurrentResolvedTheme();
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const commitTheme = () => {
        setResolvedTheme(applyTheme(nextTheme));
        setThemeState(nextTheme);
      };

      cleanupThemeTransition();

      if (prefersReducedMotion || nextResolvedTheme === currentResolvedTheme) {
        commitTheme();
        return;
      }

      prepareThemeTransition(nextResolvedTheme, origin);

      if (typeof document.startViewTransition === "function" && !document.activeViewTransition) {
        document.documentElement.classList.add("theme-view-transition");
        const transition = document.startViewTransition(commitTheme);
        void transition.finished.catch(() => undefined).finally(cleanupThemeTransition);
      } else {
        document.documentElement.classList.add("theme-fallback-transition");
        commitTheme();
      }

      transitionCleanupTimer = window.setTimeout(cleanupThemeTransition, 900);
    },
    [storageKey],
  );

  React.useEffect(() => {
    const storedTheme = getStoredTheme(storageKey, defaultTheme);
    setThemeState(storedTheme);
    setResolvedTheme(getResolvedTheme(storedTheme));
    setMounted(true);
  }, [defaultTheme, storageKey]);

  React.useEffect(() => {
    if (!mounted) {
      return undefined;
    }

    setResolvedTheme(applyTheme(theme));

    let cleanup: (() => void) | undefined;

    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => setResolvedTheme(applyTheme("system"));

      media.addEventListener("change", handleChange);
      cleanup = () => media.removeEventListener("change", handleChange);
    }

    return cleanup;
  }, [theme, mounted]);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext value={value}>
      <ScriptOnce>{getThemeScript(storageKey, defaultTheme)}</ScriptOnce>
      {children}
    </ThemeContext>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
