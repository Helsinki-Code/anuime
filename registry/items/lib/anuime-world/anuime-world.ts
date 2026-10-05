/** Renderer-independent world contracts. Ordinary controls do not depend on Three.js. */
export const worldIds = ["kira", "mochi", "atlas"] as const;
export type WorldId = (typeof worldIds)[number];
export const characterCues = ["idle", "greeting", "attention", "confirmation", "recovery"] as const;
export type CharacterCue = (typeof characterCues)[number];
export type ExperienceMode = "cinematic" | "balanced" | "still";
export type WorldTheme = "light" | "dark";

export interface ExperiencePreferences {
  version: 1;
  mode: ExperienceMode;
  characterVisible: boolean;
  quality: "auto" | "low" | "high";
  paused: boolean;
  sound: boolean;
}

export interface WorldPalette {
  sky: string;
  horizon: string;
  surface: string;
  structure: string;
  accent: string;
  secondary: string;
  text: string;
}

export interface WorldAsset {
  src: string;
  version: string;
  status: "source" | "draft" | "approved";
}

export interface WorldDefinition {
  version: 1;
  id: WorldId;
  name: string;
  character: string;
  description: string;
  location: string;
  flagship: { name: string; task: string; action: string; confirmation: string };
  typography: { body: string; display: string; technical: string; packages: readonly string[] };
  geometry: { radius: number; motif: string; panel: string };
  palettes: Record<WorldTheme, WorldPalette>;
  lighting: Record<WorldTheme, { key: string; ambient: number; fog: string }>;
  assets: {
    portrait: string;
    reference: string;
    /** Existing artwork is a temporary fallback until environment posters pass art review. */
    fallback: WorldAsset;
    character: {
      source: WorldAsset;
      desktop: WorldAsset | null;
      mobile: WorldAsset | null;
      clips: Partial<Record<CharacterCue, string>>;
      expressions: Partial<Record<"neutral" | "focused" | "pleased" | "concerned", string>>;
    };
    environment: WorldAsset | null;
  };
  motion: { entryMs: number; feedbackMs: number; description: string };
}

const technicalFont = "JetBrains Mono Variable";
const technicalPackage = "@fontsource-variable/jetbrains-mono";

function assets(id: WorldId, reference: string): WorldDefinition["assets"] {
  return {
    portrait: `/characters/${id}-key-art.webp`,
    reference: `/characters/${reference}.webp`,
    fallback: { src: `/characters/${id}-key-art.webp`, version: "1", status: "draft" },
    character: {
      source: { src: `/characters/3d-models/${id}-3d-model.glb`, version: "1", status: "source" },
      desktop: null,
      mobile: null,
      clips: {},
      expressions: {},
    },
    environment: null,
  };
}

export const worlds: Record<WorldId, WorldDefinition> = {
  kira: {
    version: 1,
    id: "kira",
    name: "Signal District",
    character: "Kira",
    description: "Above the rain, every signal has a purpose.",
    location: "Rooftop command station",
    flagship: {
      name: "Mission Control",
      task: "Prepare a release, review its signals, and deploy.",
      action: "Deploy release",
      confirmation: "Release deployed. All signals clear.",
    },
    typography: {
      body: "Space Grotesk Variable",
      display: "Space Grotesk Variable",
      technical: technicalFont,
      packages: ["@fontsource-variable/space-grotesk", technicalPackage],
    },
    geometry: { radius: 4, motif: "signal-cut", panel: "Angular frames with cyan circuit focus" },
    palettes: {
      light: {
        sky: "#c7c5e7",
        horizon: "#eae7f4",
        surface: "#f7f5ff",
        structure: "#80779e",
        accent: "#663bb7",
        secondary: "#087e8b",
        text: "#231b38",
      },
      dark: {
        sky: "#100e24",
        horizon: "#3c285e",
        surface: "#1c1730",
        structure: "#64517f",
        accent: "#b99af7",
        secondary: "#74e3ec",
        text: "#f5f1ff",
      },
    },
    lighting: {
      light: { key: "#fff0dc", ambient: 1.3, fog: "#c7c5e7" },
      dark: { key: "#bdb7ff", ambient: 0.65, fog: "#100e24" },
    },
    assets: assets("kira", "kira-signal-cut-sheet"),
    motion: {
      entryMs: 650,
      feedbackMs: 140,
      description: "Short decisive traces; rain and distant city signals",
    },
  },
  mochi: {
    version: 1,
    id: "mochi",
    name: "Dream Atelier",
    character: "Mochi",
    description: "A quiet place to give your next idea a little magic.",
    location: "Moon garden studio",
    flagship: {
      name: "Creative Sanctuary",
      task: "Collect an idea, shape a project, and publish your work.",
      action: "Publish collection",
      confirmation: "Your collection is ready to share.",
    },
    typography: {
      body: "Karla Variable",
      display: "Cormorant Garamond Variable",
      technical: technicalFont,
      packages: [
        "@fontsource-variable/karla",
        "@fontsource-variable/cormorant-garamond",
        technicalPackage,
      ],
    },
    geometry: {
      radius: 14,
      motif: "dream-cache",
      panel: "Folded ivory panels with pearl progress and rose feedback",
    },
    palettes: {
      light: {
        sky: "#e7d5e3",
        horizon: "#faf0de",
        surface: "#fff9f0",
        structure: "#b9a58c",
        accent: "#934c6c",
        secondary: "#857050",
        text: "#422d42",
      },
      dark: {
        sky: "#231a30",
        horizon: "#63445e",
        surface: "#332338",
        structure: "#977988",
        accent: "#f2afc5",
        secondary: "#dcc59f",
        text: "#fff4e9",
      },
    },
    lighting: {
      light: { key: "#fff1d6", ambient: 1.5, fog: "#e7d5e3" },
      dark: { key: "#eadcff", ambient: 0.85, fog: "#231a30" },
    },
    assets: assets("mochi", "mochi-dream-cache-sheet"),
    motion: {
      entryMs: 850,
      feedbackMs: 180,
      description: "Soft unfolding panels; floating keepsakes and fabric",
    },
  },
  atlas: {
    version: 1,
    id: "atlas",
    name: "Architect Hangar",
    character: "Atlas",
    description: "Make room for systems that hold together.",
    location: "Workshop observation deck",
    flagship: {
      name: "Operations Deck",
      task: "Inspect service health, prioritize a queue, and resolve a task.",
      action: "Resolve task",
      confirmation: "Task resolved. Systems operating normally.",
    },
    typography: {
      body: "Archivo Variable",
      display: "Archivo Variable",
      technical: technicalFont,
      packages: ["@fontsource-variable/archivo", technicalPackage],
    },
    geometry: {
      radius: 2,
      motif: "gridforge",
      panel: "Docked panels, ruled grids, and cobalt instrumentation",
    },
    palettes: {
      light: {
        sky: "#c4d4e0",
        horizon: "#e9eff1",
        surface: "#f2f5f6",
        structure: "#8194a9",
        accent: "#215db5",
        secondary: "#53738a",
        text: "#192c42",
      },
      dark: {
        sky: "#0c1929",
        horizon: "#233f60",
        surface: "#16263c",
        structure: "#506b8d",
        accent: "#83b5ff",
        secondary: "#9ebacd",
        text: "#edf4ff",
      },
    },
    lighting: {
      light: { key: "#e6f3ff", ambient: 1.4, fog: "#c4d4e0" },
      dark: { key: "#a8cbff", ambient: 0.75, fog: "#0c1929" },
    },
    assets: assets("atlas", "atlas-gridforge-sheet"),
    motion: {
      entryMs: 700,
      feedbackMs: 120,
      description: "Measured docking transitions; slow machinery and drafting displays",
    },
  },
};

export function isWorldId(value: unknown): value is WorldId {
  return typeof value === "string" && worldIds.some((id) => id === value);
}

export function defaultExperiencePreferences(): ExperiencePreferences {
  return {
    version: 1,
    mode: "cinematic",
    characterVisible: true,
    quality: "auto",
    paused: false,
    sound: false,
  };
}

/** Accept only known, correctly typed fields from untrusted storage or imports. */
export function parseExperiencePreferences(value: unknown): ExperiencePreferences {
  const result = defaultExperiencePreferences();
  if (!value || typeof value !== "object" || Array.isArray(value)) return result;
  const input: Record<string, unknown> = Object.fromEntries(Object.entries(value));
  if (input.version !== 1) return result;
  if (input.mode === "cinematic" || input.mode === "balanced" || input.mode === "still")
    result.mode = input.mode;
  if (input.quality === "auto" || input.quality === "low" || input.quality === "high")
    result.quality = input.quality;
  for (const key of ["characterVisible", "paused", "sound"] as const) {
    if (typeof input[key] === "boolean") result[key] = input[key];
  }
  return result;
}

/** Capability and accessibility constraints override preferences without overwriting them. */
export function resolveExperience(
  preferences: ExperiencePreferences,
  capabilities: {
    reducedMotion: boolean;
    graphics: boolean;
    visible: boolean;
    lowPerformance: boolean;
  },
) {
  const mode = capabilities.reducedMotion || !capabilities.graphics ? "still" : preferences.mode;
  const animate = mode !== "still" && !preferences.paused && capabilities.visible;
  return {
    mode,
    animate,
    render3d: capabilities.graphics && mode !== "still" && capabilities.visible,
    cameraTravel: animate && mode === "cinematic",
    quality:
      capabilities.lowPerformance || preferences.quality === "low" || mode === "balanced"
        ? ("low" as const)
        : ("high" as const),
    characterVisible: preferences.characterVisible,
    sound: preferences.sound && capabilities.visible && !preferences.paused,
  };
}

/** Use only reviewed runtime assets. High-poly source files are never selected implicitly. */
export function getCharacterAsset(
  world: WorldDefinition,
  quality: "low" | "high",
): WorldAsset | null {
  const asset = quality === "low" ? world.assets.character.mobile : world.assets.character.desktop;
  return asset?.status === "approved" ? asset : null;
}

export function worldCssVariables(
  world: WorldDefinition,
  theme: WorldTheme,
): Record<`--world-${string}`, string> {
  const palette = world.palettes[theme];
  return {
    "--world-sky": palette.sky,
    "--world-horizon": palette.horizon,
    "--world-surface": palette.surface,
    "--world-structure": palette.structure,
    "--world-accent": palette.accent,
    "--world-secondary": palette.secondary,
    "--world-text": palette.text,
    "--world-radius": `${world.geometry.radius}px`,
    "--world-font": `"${world.typography.body}", sans-serif`,
    "--world-display-font": `"${world.typography.display}", ${world.id === "mochi" ? "serif" : "sans-serif"}`,
    "--world-mono-font": `"${world.typography.technical}", monospace`,
    "--world-feedback-duration": `${world.motion.feedbackMs}ms`,
  };
}
