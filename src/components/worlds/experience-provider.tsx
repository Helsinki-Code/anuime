import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import {
  defaultExperiencePreferences,
  parseExperiencePreferences,
  resolveExperience,
} from "@/lib/anuime/worlds";
import type { ExperiencePreferences } from "@/lib/anuime/worlds";

const storageKey = "anuime.experience.v1";
interface ExperienceContextValue {
  preferences: ExperiencePreferences;
  update: (patch: Partial<Omit<ExperiencePreferences, "version">>) => void;
  resolved: ReturnType<typeof resolveExperience>;
  reducedMotion: boolean;
  storageUnavailable: boolean;
  reportSlowGraphics: () => void;
}
const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState(defaultExperiencePreferences);
  const [ready, setReady] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(false);
  const [lowPerformance, setLowPerformance] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setPreferences(parseExperiencePreferences(JSON.parse(raw)));
    } catch {
      setStorageUnavailable(true);
    }
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(motion.matches);
    const syncVisibility = () => setVisible(document.visibilityState === "visible");
    const syncStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      try {
        setPreferences(
          parseExperiencePreferences(event.newValue ? JSON.parse(event.newValue) : null),
        );
      } catch {
        setStorageUnavailable(true);
      }
    };
    syncMotion();
    syncVisibility();
    setReady(true);
    motion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    window.addEventListener("storage", syncStorage);
    return () => {
      motion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  const update = useCallback((patch: Partial<Omit<ExperiencePreferences, "version">>) => {
    setPreferences((previous) => parseExperiencePreferences({ ...previous, ...patch, version: 1 }));
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(preferences));
    } catch {
      setStorageUnavailable(true);
    }
  }, [preferences, ready]);

  const reportSlowGraphics = useCallback(() => setLowPerformance(true), []);
  const value = useMemo(
    () => ({
      preferences,
      update,
      reducedMotion,
      storageUnavailable,
      reportSlowGraphics,
      resolved: resolveExperience(preferences, {
        reducedMotion,
        graphics: ready,
        visible,
        lowPerformance,
      }),
    }),
    [
      preferences,
      update,
      reducedMotion,
      storageUnavailable,
      reportSlowGraphics,
      ready,
      visible,
      lowPerformance,
    ],
  );
  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const value = useContext(ExperienceContext);
  if (!value) throw new Error("World stages require ExperienceProvider.");
  return value;
}

export function ExperienceControls() {
  const { preferences, update, reducedMotion, storageUnavailable } = useExperience();
  return (
    <div className="world-experience-controls">
      <label>
        Experience
        <select
          value={preferences.mode}
          onChange={(event) =>
            update(parseExperiencePreferences({ ...preferences, mode: event.target.value }))
          }
        >
          <option value="cinematic">Cinematic</option>
          <option value="balanced">Balanced</option>
          <option value="still">Still</option>
        </select>
      </label>
      <button
        type="button"
        aria-pressed={preferences.paused}
        onClick={() => update({ paused: !preferences.paused })}
      >
        {preferences.paused ? "Resume scenery" : "Pause scenery"}
      </button>
      <button
        type="button"
        aria-pressed={preferences.characterVisible}
        onClick={() => update({ characterVisible: !preferences.characterVisible })}
      >
        {preferences.characterVisible ? "Hide character" : "Show character"}
      </button>
      {reducedMotion && <span>Still artwork follows your reduced-motion setting.</span>}
      {storageUnavailable && (
        <span role="status">Preferences apply here, but could not be saved on this device.</span>
      )}
    </div>
  );
}
