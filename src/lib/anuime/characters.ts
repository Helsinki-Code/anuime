export const characterIds = ["kira", "mochi", "atlas"] as const;

export type CharacterId = (typeof characterIds)[number];
export type Density = "compact" | "comfortable" | "spacious";
export type MotionLevel = "still" | "calm" | "expressive";

export type CharacterSystem = {
  id: CharacterId;
  name: string;
  role: string;
  tagline: string;
  description: string;
  bestFor: string[];
  accent: string;
  glow: string;
  story: string;
  silhouette: string;
  keyArt: { webp: string; png: string; alt: string };
  tokens: { surface: string; radius: string; motion: string };
  specialty: {
    name: string;
    invocation: string;
    promise: string;
    mechanics: string[];
    signatureComponent: "command-palette" | "popover" | "accordion";
    designBible?: { avif: string; webp: string; png: string };
  };
};

export const characterSystems: Record<CharacterId, CharacterSystem> = {
  kira: {
    id: "kira",
    name: "Kira",
    role: "Neon Ronin",
    tagline: "Precision at the speed of light.",
    description:
      "Angular geometry, electric cyan, decisive contrast, and quick signal-like motion.",
    bestFor: ["Developer tools", "Gaming", "Product launches"],
    accent: "#22d3ee",
    glow: "#8b5cf6",
    story:
      "Kira turns noisy systems into decisive signals. She represents interfaces that reward speed without sacrificing clarity.",
    silhouette: "Angular cropped layers, a high asymmetric collar, and narrow signal-line accents.",
    keyArt: {
      webp: "/characters/kira-key-art.webp",
      png: "/characters/kira-key-art.png",
      alt: "Kira, an original cyber ronin in a practical charcoal outfit with cyan signal lighting.",
    },
    tokens: {
      surface: "Charcoal signal glass",
      radius: "Angular 6px cuts",
      motion: "150ms decisive ease-out",
    },
    specialty: {
      name: "Signal Cut",
      invocation: "Cut the noise. Keep the next move.",
      promise: "Kira isolates the one action that matters and makes it reachable at command speed.",
      mechanics: [
        "Keyboard-first command paths",
        "One visually dominant next action",
        "Fast focus transitions without decorative delay",
      ],
      signatureComponent: "command-palette",
      designBible: {
        avif: "/characters/kira-signal-cut-sheet.avif",
        webp: "/characters/kira-signal-cut-sheet.webp",
        png: "/characters/kira-signal-cut-sheet.png",
      },
    },
  },
  mochi: {
    id: "mochi",
    name: "Mochi",
    role: "Dream Familiar",
    tagline: "Soft edges. Bright beginnings.",
    description: "Warm pastels, generous shapes, friendly feedback, and gentle buoyant motion.",
    bestFor: ["Communities", "Creator tools", "Onboarding"],
    accent: "#f472b6",
    glow: "#fbbf24",
    story:
      "Mochi makes unfamiliar workflows feel safe to begin. She represents generous guidance, playful feedback, and optimistic momentum.",
    silhouette: "Rounded cape layers, soft utility volumes, and orbiting charm geometry.",
    keyArt: {
      webp: "/characters/mochi-key-art.webp",
      png: "/characters/mochi-key-art.png",
      alt: "Mochi, an original dream familiar in a cream and rose creator outfit with warm orbiting charms.",
    },
    tokens: {
      surface: "Warm rose paper",
      radius: "Pill and 24px curves",
      motion: "300ms buoyant ease-out",
    },
    specialty: {
      name: "Dream Cache",
      invocation: "Keep a little help for the exact moment.",
      promise:
        "Mochi stores guidance, recovery, and tiny rewards until the interface needs warmth.",
      mechanics: [
        "Contextual help beside the active task",
        "Friendly error recovery and empty states",
        "Optional micro-rewards that respect reduced motion",
      ],
      signatureComponent: "popover",
      designBible: {
        avif: "/characters/mochi-dream-cache-sheet.avif",
        webp: "/characters/mochi-dream-cache-sheet.webp",
        png: "/characters/mochi-dream-cache-sheet.png",
      },
    },
  },
  atlas: {
    id: "atlas",
    name: "Atlas",
    role: "Mecha Architect",
    tagline: "Every system has a structure.",
    description:
      "Modular surfaces, technical grids, steel blue, and engineered mechanical transitions.",
    bestFor: ["Dashboards", "Productivity", "Data products"],
    accent: "#60a5fa",
    glow: "#94a3b8",
    story:
      "Atlas exposes the structure beneath complex work. He represents reliable hierarchy, legible data, and engineered calm.",
    silhouette:
      "Long modular coat, rectangular shoulder modules, and a grounded architectural stance.",
    keyArt: {
      webp: "/characters/atlas-key-art.webp",
      png: "/characters/atlas-key-art.png",
      alt: "Atlas, an original mecha architect in a modular slate coat holding a blue drafting display.",
    },
    tokens: {
      surface: "Midnight steel",
      radius: "Engineered 2px corners",
      motion: "200ms mechanical linear",
    },
    specialty: {
      name: "Gridforge",
      invocation: "Give every complex thing a place.",
      promise:
        "Atlas reveals the framework beneath dense work and snaps information into legible modules.",
      mechanics: [
        "Inspectable hierarchy and progressive disclosure",
        "Dense data that preserves scanning rhythm",
        "Composable layout modules with predictable alignment",
      ],
      signatureComponent: "accordion",
      designBible: {
        avif: "/characters/atlas-gridforge-sheet.avif",
        webp: "/characters/atlas-gridforge-sheet.webp",
        png: "/characters/atlas-gridforge-sheet.png",
      },
    },
  },
};

export function isCharacterId(value: string): value is CharacterId {
  return characterIds.some((id) => id === value);
}
