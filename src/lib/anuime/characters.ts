export const characterIds = ["kira", "mochi", "atlas"] as const;

export type CharacterId = (typeof characterIds)[number];
export type Density = "compact" | "comfortable" | "spacious";
export type MotionLevel = "still" | "calm" | "expressive";

export type CharacterSystem = {
  id: CharacterId;
  name: string;
  adjective: string;
  themeName: string;
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
  motifLaws: {
    artifact: string;
    geometry: string;
    carrier: string;
  }[];
  boardCaption: string;
  specialty: {
    name: string;
    invocation: string;
    promise: string;
    mechanics: string[];
    signatureComponent: "checkbox" | "switch" | "progress";
    designBible?: { avif: string; webp: string; png: string };
  };
};

export const characterSystems: Record<CharacterId, CharacterSystem> = {
  kira: {
    id: "kira",
    name: "Kira",
    adjective: "Incisive",
    themeName: "Nocturne / Blade in daylight",
    role: "Blade-light system",
    tagline: "Light lives in lines.",
    description:
      "Hard-soft rectangles, violet mass, cyan hairlines, and one authored 114° directional axis.",
    bestFor: ["Decisive action", "Keyboard flows", "High-signal states"],
    accent: "#0aa3c2",
    glow: "#4fd8f0",
    story:
      "Kira converts seven artifacts from the board into repeatable geometry. Workhorse controls stay abstract; blade-light appears only while the system waits, transitions, or confirms.",
    silhouette:
      "Chevron, kite, circuit node, strap-buckle, collar ring, fringe diagonal, and light shard.",
    keyArt: {
      webp: "/characters/kira-key-art.webp",
      png: "/characters/kira-key-art.png",
      alt: "Kira, an original cyber ronin in a practical charcoal outfit with cyan signal lighting.",
    },
    tokens: {
      surface: "Violet paper / nocturne violet",
      radius: "3–8px hard-soft ladder",
      motion: "120ms decisive; 240ms focus trace",
    },
    motifLaws: [
      { artifact: "Hairpin", geometry: "Open chevron", carrier: "Checkbox check" },
      { artifact: "Earring", geometry: "Outlined kite", carrier: "Slider thumb" },
      { artifact: "Circuit", geometry: "Node line", carrier: "Progress and status" },
      { artifact: "Strap", geometry: "Buckle frame", carrier: "Switch and toggle" },
      { artifact: "Collar", geometry: "Ring + stem", carrier: "Focus trace" },
      { artifact: "Fringe", geometry: "114° diagonal", carrier: "Skeleton sweep" },
      { artifact: "Light shard", geometry: "−18° fragment", carrier: "Toast and error" },
    ],
    boardCaption:
      "Cyan is withdrawn to hairlines and state. The same geometry is drawn in daylight and emitted after dark.",
    specialty: {
      name: "Blade Trace",
      invocation: "A perimeter trace settles into the collar ring and stem.",
      promise:
        "Focus is precise and visible without turning the workhorse control into character illustration.",
      mechanics: [
        "Keyboard-first command paths",
        "One visually dominant next action",
        "Fast focus transitions without decorative delay",
      ],
      signatureComponent: "checkbox",
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
    adjective: "Gracious",
    themeName: "Atelier daylight / Dusk salon",
    role: "Bloom-orbit system",
    tagline: "Warmth is feedback.",
    description:
      "Warm ivory or plum mass, restrained rose state, champagne hairlines, and fabric-settling motion.",
    bestFor: ["Guided flows", "Gentle recovery", "Considered feedback"],
    accent: "#c2708a",
    glow: "#b08d57",
    story:
      "Mochi translates atelier artifacts into a restrained system that is gracious, never sweet. Ornament always carries state, structure, or feedback.",
    silhouette: "Clasp, pearl, crescent, star, ribbon, drape, and veil.",
    keyArt: {
      webp: "/characters/mochi-key-art.webp",
      png: "/characters/mochi-key-art.png",
      alt: "Mochi, an original dream familiar in a cream and rose creator outfit with warm orbiting charms.",
    },
    tokens: {
      surface: "Warm ivory / deep mauve",
      radius: "5–14px measured curves",
      motion: "250ms settling; 2.6s ambient bloom",
    },
    motifLaws: [
      { artifact: "Clasp", geometry: "Gold bar frame", carrier: "Switch and toggle" },
      { artifact: "Pearl", geometry: "Strung bead", carrier: "Progress and status" },
      { artifact: "Crescent", geometry: "Subtractive moon", carrier: "Menu marker" },
      { artifact: "Star", geometry: "Four-point sparkle", carrier: "Toast and error" },
      { artifact: "Ribbon", geometry: "Parallel gold rules", carrier: "Table and separator" },
      { artifact: "Drape", geometry: "Settling curve", carrier: "Surface radius" },
      { artifact: "Veil", geometry: "Localized radial wash", carrier: "Focus bloom" },
    ],
    boardCaption:
      "Rose is held for state and gold for fine structure. Dark mode comes from warm mauve, never black.",
    specialty: {
      name: "Pearl Clasp",
      invocation: "A gold-rimmed pearl seats inside a soft rectangular clasp.",
      promise:
        "The switch carries two board artifacts with no mascot styling or decorative excess.",
      mechanics: [
        "Contextual help beside the active task",
        "Friendly error recovery and empty states",
        "Optional micro-rewards that respect reduced motion",
      ],
      signatureComponent: "switch",
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
    adjective: "Engineered",
    themeName: "Engineering drawing / Blueprint luminescence",
    role: "HUD-assembly system",
    tagline: "Selection is a structural event.",
    description:
      "Cool paper or ink-navy volume, cobalt linework, load-bearing frames, and a deliberate 76° beam.",
    bestFor: ["Dense systems", "Structured data", "Inspectable hierarchy"],
    accent: "#2458c5",
    glow: "#5b8cff",
    story:
      "Atlas turns the board’s mechanical artifacts into structural carriers. Every line must dock, measure, frame, segment, or survey.",
    silhouette:
      "Buckle, strap band, panel bracket, survey diamond, lens bezel, beam, and core ring.",
    keyArt: {
      webp: "/characters/atlas-key-art.webp",
      png: "/characters/atlas-key-art.png",
      alt: "Atlas, an original mecha architect in a modular slate coat holding a blue drafting display.",
    },
    tokens: {
      surface: "Cool drawing paper / ink navy",
      radius: "2–9px structural ladder",
      motion: "180ms dock; 76° linear sweep",
    },
    motifLaws: [
      { artifact: "Buckle", geometry: "Pronged frame", carrier: "Switch and toggle" },
      { artifact: "Strap", geometry: "Segmented band", carrier: "Progress and tabs" },
      { artifact: "Panel", geometry: "Corner brackets", carrier: "Focus and dialog" },
      { artifact: "Grid", geometry: "Survey diamond", carrier: "Status and menus" },
      { artifact: "Lens", geometry: "Double-frame bezel", carrier: "Input and tooltip" },
      { artifact: "Beam", geometry: "76° paired ray", carrier: "Skeleton sweep" },
      { artifact: "Core", geometry: "Ring + powered point", carrier: "Slider and badge" },
    ],
    boardCaption:
      "Cobalt is drafted on paper and emitted from ink-navy structure. Ornament without a load-bearing job is forbidden.",
    specialty: {
      name: "Segmented Strap",
      invocation: "Ten measured segments expose progress as structure.",
      promise:
        "The progress component translates the strap band directly into an inspectable, accessible status.",
      mechanics: [
        "Inspectable hierarchy and progressive disclosure",
        "Dense data that preserves scanning rhythm",
        "Composable layout modules with predictable alignment",
      ],
      signatureComponent: "progress",
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
