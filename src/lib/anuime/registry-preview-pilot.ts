export const registryPreviewPilotItems = [
  "anuime-breadcrumb",
  "anuime-checkbox",
  "anuime-data-table",
] as const;

export type RegistryPreviewPilotItem = (typeof registryPreviewPilotItems)[number];
export type RegistryPreviewCharacter = "kira" | "mochi" | "atlas";

export const registryPreviewCharacters = {
  kira: {
    label: "Kira",
    adjective: "Incisive",
    transitionMs: 240,
    transitionTiming: "ease-out",
    frameLaw: "kira.fringe",
    frameLabel: "114° fringe sweep",
  },
  mochi: {
    label: "Mochi",
    adjective: "Gracious",
    transitionMs: 2600,
    transitionTiming: "ease-in-out",
    frameLaw: "mochi.veil",
    frameLabel: "Veil-soft edge",
  },
  atlas: {
    label: "Atlas",
    adjective: "Monumental",
    transitionMs: 180,
    transitionTiming: "linear",
    frameLaw: "atlas.panel",
    frameLabel: "Panel brackets",
  },
} as const satisfies Record<
  RegistryPreviewCharacter,
  {
    label: string;
    adjective: string;
    transitionMs: number;
    transitionTiming: string;
    frameLaw: string;
    frameLabel: string;
  }
>;

type ConstructionNote = {
  headline: string;
  provenance: string;
  lawIds: readonly string[];
};

export const registryPreviewConstruction = {
  "anuime-breadcrumb": {
    kira: {
      headline: "Chevrons trace the path. The destination lands with full weight.",
      provenance:
        "Law: kira.hairpin. Carrier: “menu marker” in laws.json and path separator in components.json. Geometry: 1.5px hairpin separators rotated 90°; only the trailing crumb uses full foreground.",
      lawIds: ["kira.hairpin"],
    },
    mochi: {
      headline: "Crescents mark the way with a softer, more gracious rhythm.",
      provenance:
        "Law: mochi.crescent. Carrier: “menu marker” in laws.json and path separator in components.json. Geometry: 9px crescent separators; ancestors remain muted while the destination reaches full foreground.",
      lawIds: ["mochi.crescent"],
    },
    atlas: {
      headline: "Survey diamonds turn navigation into a precise coordinate trail.",
      provenance:
        "Law: atlas.grid. Carrier: “menu marker” in laws.json and path separator in components.json. Geometry: 5px hollow survey-diamond separators; the trail uses mono uppercase.",
      lawIds: ["atlas.grid"],
    },
  },
  "anuime-checkbox": {
    kira: {
      headline: "Kira signs the state change with one sharp cyan hairpin.",
      provenance:
        "Law: kira.hairpin, carrier “checkbox check.” The 16px square uses the nodeOrCheck radius (3px), a foreground fill, and a 10×8 accent mitered chevron.",
      lawIds: ["kira.hairpin"],
    },
    mochi: {
      headline: "A restrained rose state keeps the control gracious and clear.",
      provenance:
        "Law: mochi.gracious-never-sweet. No artifact claims this checkbox; geometry and color role only. The 16px square uses the declared 5px checkbox radius and rose only as selected-state feedback.",
      lawIds: ["mochi.gracious-never-sweet"],
    },
    atlas: {
      headline: "A compact cobalt plate makes selection feel switched on and structural.",
      provenance:
        "Law: atlas.load-bearing. No artifact claims this checkbox; geometry and color role only. The 16px structural square uses the 3px construction radius and cobalt only for the selected state.",
      lawIds: ["atlas.load-bearing"],
    },
  },
  "anuime-data-table": {
    kira: {
      headline: "Circuit nodes read healthy. A shard flags what needs attention.",
      provenance:
        "Laws: kira.circuit + kira.shard. Carriers: “status dots” and “degraded status marker.” Healthy rows use 7px accent nodes; degraded state uses the approved 5×10 destructive shard skewed −18°.",
      lawIds: ["kira.circuit", "kira.shard"],
    },
    mochi: {
      headline: "Gold trims the record while pearls carry every status.",
      provenance:
        "Laws: mochi.ribbon + mochi.pearl. Carriers: “table header” and “status dots.” The header closes with the gold rule; 6px rose, gold, or destructive pearls carry row state.",
      lawIds: ["mochi.ribbon", "mochi.pearl"],
    },
    atlas: {
      headline: "Survey diamonds hold status. Mono type keeps the record exact.",
      provenance:
        "Law: atlas.grid, carrier “status points.” Rows use 6×6 cobalt or destructive survey diamonds rotated 45°; the header follows the approved mono uppercase title-block treatment.",
      lawIds: ["atlas.grid"],
    },
  },
} as const satisfies Record<
  RegistryPreviewPilotItem,
  Record<RegistryPreviewCharacter, ConstructionNote>
>;

export function isRegistryPreviewPilotItem(value: string): value is RegistryPreviewPilotItem {
  return registryPreviewPilotItems.some((item) => item === value);
}
