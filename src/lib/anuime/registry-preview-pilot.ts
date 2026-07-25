export const registryPreviewPilotItems = [
  "anuime-breadcrumb",
  "anuime-checkbox",
  "anuime-data-table",
] as const;

export const registryPreviewCheckpointItems = [
  "anuime-alert",
  "anuime-badge",
  "anuime-button",
  "anuime-card",
  "anuime-dialog",
  "anuime-dropdown-menu",
  "anuime-input",
  "anuime-progress",
  "anuime-skeleton",
  "anuime-slider",
  "anuime-switch",
  "anuime-tabs",
  "anuime-toast",
  "anuime-toggle",
  "anuime-tooltip",
] as const;

export const registryPreviewExtendedItems = [
  "anuime-radio-group",
  "anuime-select",
  "anuime-combobox",
  "anuime-input-otp",
  "anuime-input-group",
  "anuime-field",
  "anuime-date-control",
  "anuime-calendar",
  "anuime-textarea",
  "anuime-popover",
  "anuime-hover-card",
  "anuime-context-menu",
  "anuime-menubar",
  "anuime-navigation-menu",
  "anuime-sidebar",
  "anuime-drawer",
  "anuime-sheet",
  "anuime-alert-dialog",
  "anuime-command-palette",
  "anuime-accordion",
  "anuime-collapsible",
  "anuime-separator",
  "anuime-aspect-ratio",
  "anuime-scroll-area",
  "anuime-button-group",
  "anuime-toolbar",
  "anuime-spinner",
  "anuime-empty-state",
  "anuime-pagination",
  "anuime-table",
  "anuime-avatar",
  "anuime-kbd",
  "anuime-typography",
] as const;

export const registryPreviewItems = [
  ...registryPreviewPilotItems,
  ...registryPreviewCheckpointItems,
  ...registryPreviewExtendedItems,
] as const;

export type RegistryPreviewItem = (typeof registryPreviewItems)[number];
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
    transitionMs: 250,
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

type ExtendedTreatment = {
  motifIds: string[];
  carrier: string;
  geometry: string;
};

const registryPreviewCoreConstruction = {
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
  "anuime-alert": {
    kira: {
      headline: "A sharp signal marker gives every alert an immediate point of entry.",
      provenance:
        "Law: kira.shard, carrier “error marker.” No original or Extended board claims a standalone alert; this approved derived mapping uses the narrow −18° shard only as the severity marker and preserves the existing alert anatomy.",
      lawIds: ["kira.shard"],
    },
    mochi: {
      headline: "A restrained gold signal brings warmth to status without turning ornamental.",
      provenance:
        "Law: mochi.star, carrier “error marker.” No original or Extended board claims a standalone alert; this approved derived mapping limits the small gold state marker to the alert’s leading severity position.",
      lawIds: ["mochi.star"],
    },
    atlas: {
      headline: "A vertical beam anchors the message like a measured system readout.",
      provenance:
        "Law: atlas.beam. No original or Extended board claims a standalone alert; this approved derived mapping applies the narrow cobalt beam only as the leading severity marker, keeping the surface load-bearing rather than decorative.",
      lawIds: ["atlas.beam", "atlas.load-bearing"],
    },
  },
  "anuime-badge": {
    kira: {
      headline: "A compact collar node turns status into a crisp, active signal.",
      provenance:
        "Law: kira.collar, carrier “active badge.” Geometry: 22px height, 4px corners, 9px inline padding, and a 7px outlined status node; the badge stays rectangular under kira.no-pills.",
      lawIds: ["kira.collar", "kira.no-pills"],
    },
    mochi: {
      headline: "A tiny pearl makes status feel precious, measured, and unmistakable.",
      provenance:
        "Law: mochi.pearl, carrier “status dots.” Geometry: 22px intentional capsule with 11px inline padding and a 6px gold pearl; this is the board-authored badge exception, not general pill geometry.",
      lawIds: ["mochi.pearl"],
    },
    atlas: {
      headline: "A certified core ring gives status the authority of a system seal.",
      provenance:
        "Law: atlas.core, carrier “certified badge.” Geometry: 22px height, 4px corners, 9px inline padding, and a compact outlined core rendered as structural linework.",
      lawIds: ["atlas.core", "atlas.load-bearing"],
    },
  },
  "anuime-button": {
    kira: {
      headline: "Focus locks onto the action with a collar ring and decisive circuit stem.",
      provenance:
        "Laws: kira.collar + kira.circuit, carriers “focus ring and stem” and “focus stem.” Geometry: 36px height, 5px corners, an accent focus ring, and a centered 1.5×8px descending stem.",
      lawIds: ["kira.collar", "kira.circuit"],
    },
    mochi: {
      headline: "The action settles into focus through a localized rose veil.",
      provenance:
        "Law: mochi.veil, carrier “bloom focus.” Geometry: 36px height, 10px corners, and a restrained rose focus veil extending 14px from the control; warmth remains feedback at the interaction point.",
      lawIds: ["mochi.veil", "mochi.warmth-as-feedback"],
    },
    atlas: {
      headline: "Four brackets dock around the action and make focus feel structural.",
      provenance:
        "Law: atlas.panel, carrier “dock focus.” Geometry: 36px height, 7px corners, a cobalt focus ring, and four 9×9px brackets seated 7px outside the control.",
      lawIds: ["atlas.panel", "atlas.selection-structural"],
    },
  },
  "anuime-card": {
    kira: {
      headline: "A quiet 114° sweep gives the surface direction without adding weight.",
      provenance:
        "Law: kira.fringe, carrier “card sweep.” Geometry: 8px corners with a full inset 114° accent gradient that withdraws to transparent by 34%; light stays in a restrained directional layer.",
      lawIds: ["kira.fringe", "kira.directional-angle"],
    },
    mochi: {
      headline: "A fine gold ribbon trims the surface with atelier restraint.",
      provenance:
        "Law: mochi.ribbon, carrier “card rule.” Geometry: 14px corners and a 1px gold rule inset 20px from both sides at restrained opacity.",
      lawIds: ["mochi.ribbon", "mochi.gracious-never-sweet"],
    },
    atlas: {
      headline: "A fading survey grid turns the card into a calm blueprint field.",
      provenance:
        "Law: atlas.grid, carrier “card grid.” Geometry: 9px corners with a 16px repeating cobalt grid confined to the top 64px and masked downward.",
      lawIds: ["atlas.grid", "atlas.load-bearing"],
    },
  },
  "anuime-dialog": {
    kira: {
      headline: "The dialog arrives as a focused violet plane cut by one directional sweep.",
      provenance:
        "Law: kira.fringe, carrier “dialog sweep.” Geometry: 8px corners, 22px padding, and a 114° accent gradient that clears by 30% of the panel.",
      lawIds: ["kira.fringe", "kira.directional-angle"],
    },
    mochi: {
      headline: "A soft veil quiets the room while a gold ribbon holds the conversation.",
      provenance:
        "Laws: mochi.veil + mochi.ribbon, carriers “dialog scrim” and structural gold rule. Geometry: 14px panel corners, 22px padding, a warm veil scrim, and a 1px top rule inset 20px.",
      lawIds: ["mochi.veil", "mochi.ribbon"],
    },
    atlas: {
      headline: "Cobalt brackets dock the dialog into place like a secured console.",
      provenance:
        "Law: atlas.panel, carrier “dialog corners.” Geometry: 9px panel corners, 22px padding, and 2px cobalt brackets seated at the panel corners.",
      lawIds: ["atlas.panel", "atlas.load-bearing"],
    },
  },
  "anuime-dropdown-menu": {
    kira: {
      headline: "A hairpin marks the active row with sharp, economical direction.",
      provenance:
        "Law: kira.hairpin, carrier “menu marker.” Geometry: the 32px hovered row receives a leading 9×10px open accent chevron inside a 6px menu surface.",
      lawIds: ["kira.hairpin"],
    },
    mochi: {
      headline: "A small crescent guides the eye through the menu with a gracious rhythm.",
      provenance:
        "Law: mochi.crescent, carrier “menu marker.” Geometry: the 32px hovered row receives a leading 10×10px rose crescent inside a 12px menu surface.",
      lawIds: ["mochi.crescent"],
    },
    atlas: {
      headline: "A survey diamond makes the active command read like a plotted coordinate.",
      provenance:
        "Law: atlas.grid, carrier “menu marker.” Geometry: the 32px hovered row receives a leading 6×6px cobalt survey diamond inside a 7px menu surface.",
      lawIds: ["atlas.grid"],
    },
  },
  "anuime-input": {
    kira: {
      headline: "Invalid input breaks cleanly with one incisive shard marker.",
      provenance:
        "Law: kira.shard, carrier “error marker.” Geometry: a 36px field with 5px corners; invalid feedback begins with a 4×8px shard skewed −18°.",
      lawIds: ["kira.shard"],
    },
    mochi: {
      headline: "A restrained four-point star makes correction feel clear, never severe.",
      provenance:
        "Law: mochi.star, carrier “error marker.” Geometry: a 36px field with 10px corners; invalid feedback begins with one small destructive four-point star.",
      lawIds: ["mochi.star", "mochi.gracious-never-sweet"],
    },
    atlas: {
      headline: "An inset lens frames the field while a narrow beam identifies failure.",
      provenance:
        "Laws: atlas.lens + atlas.beam, carriers “input inset” and error marker. Geometry: a 36px field with 7px corners, inset shadow, and a 2.5×11px vertical beam for invalid feedback.",
      lawIds: ["atlas.lens", "atlas.beam"],
    },
  },
  "anuime-progress": {
    kira: {
      headline: "Five circuit nodes turn progress into a connected sequence.",
      provenance:
        "Law: kira.circuit, carrier “progress nodes.” Geometry: a 3px track with five 7px nodes at 0, 25, 50, 75, and 100 percent.",
      lawIds: ["kira.circuit"],
    },
    mochi: {
      headline: "Five strung pearls make progress feel calm, tactile, and complete.",
      provenance:
        "Law: mochi.pearl, carrier “progress beads.” Geometry: a 2px gold track with five 8px beads; completed beads fill rose while pending beads retain a gold outline.",
      lawIds: ["mochi.pearl"],
    },
    atlas: {
      headline: "Ten strap segments measure progress with deliberate structural cadence.",
      provenance:
        "Law: atlas.strap, carrier “progress segments.” Geometry: ten equal 5px segments with 3px gaps; completed segments fill cobalt and pending segments retain the border fill.",
      lawIds: ["atlas.strap"],
    },
  },
  "anuime-skeleton": {
    kira: {
      headline: "Loading moves along the single 114° axis with sharp, controlled energy.",
      provenance:
        "Law: kira.fringe, carrier “skeleton shimmer.” Geometry: three compact bars with a 114° highlight sweep moving linearly over 1.8s.",
      lawIds: ["kira.fringe", "kira.directional-angle"],
    },
    mochi: {
      headline: "Loading settles like fabric—slow enough to feel warm, never sluggish.",
      provenance:
        "Law: mochi.drape, carrier “skeleton easing.” The three rounded bars use the authored 100° shimmer at 2.6s ease-in-out; this is where the fabric-settling duration belongs.",
      lawIds: ["mochi.drape", "mochi.motion-never-brisk"],
    },
    atlas: {
      headline: "A deliberate beam scans the placeholder with measured precision.",
      provenance:
        "Law: atlas.beam, carrier “skeleton shimmer.” Geometry: three compact bars with the authored 76° beam sweep moving linearly over 2.2s.",
      lawIds: ["atlas.beam", "atlas.beam-angle"],
    },
  },
  "anuime-slider": {
    kira: {
      headline: "A faceted kite makes the selected value feel precisely pinned.",
      provenance:
        "Law: kira.earring, carrier “slider thumb.” Geometry: a 12×12px square outline rotated 45° over a 3px track.",
      lawIds: ["kira.earring"],
    },
    mochi: {
      headline: "A gold-rimmed pearl carries the value with quiet tactile warmth.",
      provenance:
        "Law: mochi.pearl, carrier “slider thumb.” Geometry: a 14px circular surface thumb with a 1.5px gold rim over a 3px rose track.",
      lawIds: ["mochi.pearl"],
    },
    atlas: {
      headline: "A powered core ring fixes the value to a clear structural point.",
      provenance:
        "Law: atlas.core, carrier “slider thumb.” Geometry: a 14px circular thumb with a 2px cobalt rim and 4px centered core over a 3px track.",
      lawIds: ["atlas.core"],
    },
  },
  "anuime-switch": {
    kira: {
      headline: "A square buckle travels across the strap and makes state unmistakable.",
      provenance:
        "Law: kira.strap, carrier “switch.” Geometry: a 40×22px rectangular track with 5px corners and a 16px square buckle thumb with 3px corners.",
      lawIds: ["kira.strap", "kira.no-pills"],
    },
    mochi: {
      headline: "A gold-rimmed pearl slides through the clasp with gracious clarity.",
      provenance:
        "Laws: mochi.clasp + mochi.pearl, carriers “switch” and pearl state. Geometry: a 40×22px soft-rectangular clasp track and a 16px circular thumb with a 1.5px gold rim.",
      lawIds: ["mochi.clasp", "mochi.pearl"],
    },
    atlas: {
      headline: "A plated buckle docks across the track like a compact mechanical lock.",
      provenance:
        "Law: atlas.buckle, carrier “switch.” Geometry: a 40×22px track with 4px corners and a 16px plate thumb containing a centered 1.5×8px prong slot.",
      lawIds: ["atlas.buckle", "atlas.load-bearing"],
    },
  },
  "anuime-tabs": {
    kira: {
      headline: "An open hairpin locks beneath the active view with decisive direction.",
      provenance:
        "Law: kira.hairpin, carrier “tabs indicator.” Geometry: the active 30px trigger carries an open accent chevron centered 8px below.",
      lawIds: ["kira.hairpin"],
    },
    mochi: {
      headline: "A rose crescent rests beneath the active view with a softer cadence.",
      provenance:
        "Law: mochi.crescent, carrier “tabs indicator.” Geometry: the active 30px trigger carries a 12×6px crescent curve centered 8px below.",
      lawIds: ["mochi.crescent"],
    },
    atlas: {
      headline: "A cobalt strap seats the active view into the navigation structure.",
      provenance:
        "Law: atlas.strap, carrier “tabs band.” Geometry: the active 36px trigger carries a 2px cobalt band inset 8px beneath it.",
      lawIds: ["atlas.strap", "atlas.selection-structural"],
    },
  },
  "anuime-toast": {
    kira: {
      headline: "A single light shard gives the notification an incisive state signal.",
      provenance:
        "Law: kira.shard, carrier “toast marker.” Geometry: a 5×10px accent shard skewed −18° leads the 340px notification surface.",
      lawIds: ["kira.shard"],
    },
    mochi: {
      headline: "One gold star makes the moment feel warm, clear, and earned.",
      provenance:
        "Law: mochi.star, carrier “toast marker.” Geometry: one 12×12px gold four-point star leads the 340px notification; ornament remains limited to state.",
      lawIds: ["mochi.star", "mochi.gracious-never-sweet"],
    },
    atlas: {
      headline: "A vertical cobalt beam turns the notification into a precise readout.",
      provenance:
        "Law: atlas.beam, carrier “toast marker.” Geometry: a 2.5×16px cobalt beam leads the 340px notification surface.",
      lawIds: ["atlas.beam"],
    },
  },
  "anuime-toggle": {
    kira: {
      headline: "A compact strap frame makes the pressed state feel fastened in place.",
      provenance:
        "Law: kira.strap, carrier “toggle group.” Geometry: a 32px control with 5px corners; pressed state uses a stronger rectangular perimeter and inset surface ring.",
      lawIds: ["kira.strap", "kira.no-pills"],
    },
    mochi: {
      headline: "A fine gold clasp holds the pressed state with quiet confidence.",
      provenance:
        "Law: mochi.clasp, carrier “toggle group.” Geometry: a 32px control with 8px corners; pressed state receives the 1px gold clasp frame.",
      lawIds: ["mochi.clasp"],
    },
    atlas: {
      headline: "A mechanical buckle frame docks the pressed state into the control.",
      provenance:
        "Law: atlas.buckle, carrier “toggle group.” Geometry: a 32px control with 5px corners; pressed state uses a stronger structural perimeter and inset surface ring.",
      lawIds: ["atlas.buckle", "atlas.selection-structural"],
    },
  },
  "anuime-tooltip": {
    kira: {
      headline: "A faceted kite pointer pins the hint to its exact point of context.",
      provenance:
        "Law: kira.earring, carrier “tooltip pointer.” Geometry: an 8×8px square rotated 45° beneath a compact 4px-corner content surface.",
      lawIds: ["kira.earring"],
    },
    mochi: {
      headline: "A softened pointer keeps contextual help gentle and direct.",
      provenance:
        "Law: mochi.gracious-never-sweet. No artifact claims this tooltip pointer; geometry only. The 8×8px rotated pointer receives 2px soft corners beneath an 8px-corner content surface.",
      lawIds: ["mochi.gracious-never-sweet"],
    },
    atlas: {
      headline: "A double-frame lens makes contextual help read like a focused instrument.",
      provenance:
        "Law: atlas.lens, carrier “tooltip frame.” Geometry: a compact 4px-corner content surface with a surface separation line and borderStrong outer bezel.",
      lawIds: ["atlas.lens", "atlas.load-bearing"],
    },
  },
} as const satisfies Record<
  Exclude<RegistryPreviewItem, (typeof registryPreviewExtendedItems)[number]>,
  Record<RegistryPreviewCharacter, ConstructionNote>
>;

const extendedHeadlines = {
  "anuime-radio-group": {
    kira: "Collar rings and circuit cores make every choice snap into focus.",
    mochi: "Pearl choices settle into place with a fine gold clasp.",
    atlas: "Core rings and survey diamonds make selection exact.",
  },
  "anuime-select": {
    kira: "A sharp hairpin opens a compact, fastened selection field.",
    mochi: "A crescent cue opens the field with a gracious settling motion.",
    atlas: "A bracketed lens makes every selection feel instrument precise.",
  },
  "anuime-combobox": {
    kira: "A cyan trace finds the match while a hairpin claims the active result.",
    mochi: "Gold underlines the match and a crescent guides the active result.",
    atlas: "A measured lens plots matches like coordinates on a survey.",
  },
  "anuime-input-otp": {
    kira: "Four sharp cells lock into one precise verification sequence.",
    mochi: "A string of softly focused pearls makes verification feel effortless.",
    atlas: "Bracketed lens cells turn verification into a calibrated readout.",
  },
  "anuime-input-group": {
    kira: "One continuous strap keeps every field and addon tightly connected.",
    mochi: "Gold seams join the group with the finish of a tailored clasp.",
    atlas: "Buckle plates make the whole input assembly feel engineered as one.",
  },
  "anuime-field": {
    kira: "A crisp circuit rhythm leads cleanly from label to correction.",
    mochi: "A ruled rhythm keeps guidance warm, composed, and easy to follow.",
    atlas: "Structural bands make every label, control, and message line up.",
  },
  "anuime-date-control": {
    kira: "A faceted kite opens a date field built for fast precision.",
    mochi: "A gold crescent gives date selection a softer point of entry.",
    atlas: "A survey diamond turns the date field into a compact instrument.",
  },
  "anuime-calendar": {
    kira: "Hairpins, nodes, and faceted days make the month quick to scan.",
    mochi: "Crescents and pearls give the month a warm, graceful cadence.",
    atlas: "Bracket controls and survey marks make every date feel plotted.",
  },
  "anuime-textarea": {
    kira: "A directional fringe grip gives the writing field an incisive finish.",
    mochi: "A draped resize cue softens a field held by a quiet clasp.",
    atlas: "A measured beam grip completes the textarea’s instrument bezel.",
  },
  "anuime-popover": {
    kira: "A faceted pointer pins the popover to its exact source.",
    mochi: "A folded edge and gold rule make the popover feel gently placed.",
    atlas: "Panel brackets seat the popover like a secured utility surface.",
  },
  "anuime-hover-card": {
    kira: "A 114° corner sweep gives the floating card immediate direction.",
    mochi: "A quiet rose veil lets supporting detail arrive without interruption.",
    atlas: "A fading blueprint grid turns context into a compact field note.",
  },
  "anuime-context-menu": {
    kira: "Hairpins and circuit rules make contextual actions fast to parse.",
    mochi: "Crescents and gold dividers keep the menu gracious and clear.",
    atlas: "Survey markers organize every contextual action with measured weight.",
  },
  "anuime-menubar": {
    kira: "A connected strap makes the open command feel decisively owned.",
    mochi: "A tailored clasp and gold underline hold the active menu in place.",
    atlas: "A structural band makes the menubar read as one working system.",
  },
  "anuime-navigation-menu": {
    kira: "A hairpin leads into a viewport cut by Kira’s directional sweep.",
    mochi: "A crescent opens a navigation surface finished with a gold rule.",
    atlas: "A state band opens into a measured blueprint navigation field.",
  },
  "anuime-sidebar": {
    kira: "A live circuit rail turns navigation into a connected route.",
    mochi: "A pearl strand and gold edge make navigation feel carefully composed.",
    atlas: "Survey diamonds and a leading band make location unmistakable.",
  },
  "anuime-drawer": {
    kira: "A compact strap handle pulls the drawer in with decisive speed.",
    mochi: "A gold clasp lets the drawer settle into view like a soft drape.",
    atlas: "A segmented band handle gives the drawer deliberate mechanical weight.",
  },
  "anuime-sheet": {
    kira: "A directional fringe cuts the sheet cleanly from the viewport.",
    mochi: "A warm veil and gold edge let the sheet arrive like a curtain.",
    atlas: "A cobalt beam docks the sheet as a load-bearing panel.",
  },
  "anuime-alert-dialog": {
    kira: "One sharp shard gives the critical decision nowhere to hide.",
    mochi: "A restrained warning star keeps the decision serious but humane.",
    atlas: "Destructive brackets and a beam lock attention onto the decision.",
  },
  "anuime-command-palette": {
    kira: "A live input trace and hairpin marker make command search immediate.",
    mochi: "A pearl caret and gold rule make command search feel composed.",
    atlas: "A cobalt beam and survey marker turn commands into a precise console.",
  },
  "anuime-accordion": {
    kira: "Hairpins and circuit rules make every disclosure crisp and legible.",
    mochi: "Crescents open along fine gold rules with an easy settling rhythm.",
    atlas: "Bracket indicators and structural bands make depth explicit.",
  },
  "anuime-collapsible": {
    kira: "A hairpin reveals content along one clean circuit trace.",
    mochi: "A crescent opens content along a softly draped depth guide.",
    atlas: "A bracket opens onto a structural band that makes depth visible.",
  },
  "anuime-separator": {
    kira: "A precise circuit trace divides content without visual noise.",
    mochi: "A fine ribbon gives important divisions a warmer cadence.",
    atlas: "A structural band separates content with measured authority.",
  },
  "anuime-aspect-ratio": {
    kira: "A disciplined frame protects the media ratio and stays out of the way.",
    mochi: "A softly resolved frame lets the content remain the focus.",
    atlas: "A drawing-style frame makes the media boundary explicit.",
  },
  "anuime-scroll-area": {
    kira: "A fixed-gauge strap keeps scrolling compact and predictable.",
    mochi: "A cord-and-pearl thumb makes long surfaces feel lighter to navigate.",
    atlas: "A segmented structural thumb makes position easy to read.",
  },
  "anuime-button-group": {
    kira: "A single fastened strap turns related actions into one decisive control.",
    mochi: "Gold seams clasp related actions into a polished whole.",
    atlas: "A mechanical buckle frame makes action relationships explicit.",
  },
  "anuime-toolbar": {
    kira: "Connected plates and circuit dividers keep dense tools quick to scan.",
    mochi: "Clasped controls and gold rules make the toolbar feel carefully tailored.",
    atlas: "Buckle plates and structural dividers organize every working tool.",
  },
  "anuime-spinner": {
    kira: "A drawn collar arc keeps progress moving with directional precision.",
    mochi: "An orbit of pearls makes waiting feel calm and intentional.",
    atlas: "A rotating core and survey pulse make system activity unmistakable.",
  },
  "anuime-empty-state": {
    kira: "A drifting shard keeps an empty moment alive without filling the silence.",
    mochi: "A hanging crescent and quiet sparks make the empty moment feel hopeful.",
    atlas: "A dormant survey field holds the space until work returns.",
  },
  "anuime-pagination": {
    kira: "Circuit nodes and hairpin arrows turn every page into a clear step.",
    mochi: "Pearls and crescents give the page trail an easy, gracious rhythm.",
    atlas: "Band segments and brackets make progress through pages structural.",
  },
  "anuime-table": {
    kira: "Circuit status, sharp exceptions, and hairpin sorting make records fast to read.",
    mochi: "Gold rules, pearl status, and crescent sorting bring order with warmth.",
    atlas: "Survey states and structural rules turn data into a measured system.",
  },
  "anuime-avatar": {
    kira: "A compact portrait plate and live circuit node make presence immediate.",
    mochi: "A gold-rimmed pearl portrait makes presence feel personal and polished.",
    atlas: "A framed portrait plate and core ring make identity feel certified.",
  },
  "anuime-kbd": {
    kira: "A crisp key plate makes shortcuts feel fastened to the interface.",
    mochi: "A fine gold clasp turns the keycap into a polished prompt.",
    atlas: "A mechanical key frame gives shortcuts tactile structural weight.",
  },
  "anuime-typography": {
    kira: "A sharp type hierarchy keeps every message direct and fast.",
    mochi: "A graceful editorial hierarchy brings warmth without ornament.",
    atlas: "A measured type system makes every label and value feel authoritative.",
  },
} as const satisfies Record<
  (typeof registryPreviewExtendedItems)[number],
  Record<RegistryPreviewCharacter, string>
>;

const geometryOnlyLawIds = {
  kira: ["kira.light-in-lines"],
  mochi: ["mochi.gracious-never-sweet"],
  atlas: ["atlas.load-bearing"],
} as const satisfies Record<RegistryPreviewCharacter, readonly string[]>;

export function getExtendedComponentTreatment(
  item: (typeof registryPreviewExtendedItems)[number],
  character: RegistryPreviewCharacter,
): ExtendedTreatment {
  const componentEntry = Object.entries(components.components).find(
    ([componentName]) => `anuime-${componentName}` === item,
  );
  const characterTreatments: unknown = componentEntry?.[1];

  if (
    !characterTreatments ||
    typeof characterTreatments !== "object" ||
    !(character in characterTreatments)
  ) {
    throw new Error(`Missing Extended mapping for ${item}/${character}`);
  }

  const treatment: unknown = Reflect.get(characterTreatments, character);

  if (
    !treatment ||
    typeof treatment !== "object" ||
    !("motifIds" in treatment) ||
    !Array.isArray(treatment.motifIds) ||
    !treatment.motifIds.every((motifId) => typeof motifId === "string") ||
    !("carrier" in treatment) ||
    typeof treatment.carrier !== "string" ||
    !("geometry" in treatment) ||
    typeof treatment.geometry !== "string"
  ) {
    throw new Error(`Invalid Extended mapping for ${item}/${character}`);
  }

  return {
    motifIds: treatment.motifIds,
    carrier: treatment.carrier,
    geometry: treatment.geometry,
  };
}

function createExtendedConstruction(
  item: (typeof registryPreviewExtendedItems)[number],
): Record<RegistryPreviewCharacter, ConstructionNote> {
  const createNote = (character: RegistryPreviewCharacter): ConstructionNote => {
    const treatment = getExtendedComponentTreatment(item, character);
    const motifIds = treatment.motifIds;
    const geometryOnly = motifIds.length === 0;
    const lawIds = geometryOnly ? geometryOnlyLawIds[character] : motifIds;
    const lawLabel = motifIds.length === 1 ? "Law" : "Laws";

    return {
      headline: extendedHeadlines[item][character],
      provenance: geometryOnly
        ? `No artifact claims this; geometry only. Carrier: “${treatment.carrier}.” Geometry: ${treatment.geometry}`
        : `${lawLabel}: ${motifIds.join(" + ")}. Carrier: ${treatment.carrier} Geometry: ${treatment.geometry}`,
      lawIds,
    };
  };

  return {
    kira: createNote("kira"),
    mochi: createNote("mochi"),
    atlas: createNote("atlas"),
  };
}

const registryPreviewExtendedConstruction = {
  "anuime-radio-group": createExtendedConstruction("anuime-radio-group"),
  "anuime-select": createExtendedConstruction("anuime-select"),
  "anuime-combobox": createExtendedConstruction("anuime-combobox"),
  "anuime-input-otp": createExtendedConstruction("anuime-input-otp"),
  "anuime-input-group": createExtendedConstruction("anuime-input-group"),
  "anuime-field": createExtendedConstruction("anuime-field"),
  "anuime-date-control": createExtendedConstruction("anuime-date-control"),
  "anuime-calendar": createExtendedConstruction("anuime-calendar"),
  "anuime-textarea": createExtendedConstruction("anuime-textarea"),
  "anuime-popover": createExtendedConstruction("anuime-popover"),
  "anuime-hover-card": createExtendedConstruction("anuime-hover-card"),
  "anuime-context-menu": createExtendedConstruction("anuime-context-menu"),
  "anuime-menubar": createExtendedConstruction("anuime-menubar"),
  "anuime-navigation-menu": createExtendedConstruction("anuime-navigation-menu"),
  "anuime-sidebar": createExtendedConstruction("anuime-sidebar"),
  "anuime-drawer": createExtendedConstruction("anuime-drawer"),
  "anuime-sheet": createExtendedConstruction("anuime-sheet"),
  "anuime-alert-dialog": createExtendedConstruction("anuime-alert-dialog"),
  "anuime-command-palette": createExtendedConstruction("anuime-command-palette"),
  "anuime-accordion": createExtendedConstruction("anuime-accordion"),
  "anuime-collapsible": createExtendedConstruction("anuime-collapsible"),
  "anuime-separator": createExtendedConstruction("anuime-separator"),
  "anuime-aspect-ratio": createExtendedConstruction("anuime-aspect-ratio"),
  "anuime-scroll-area": createExtendedConstruction("anuime-scroll-area"),
  "anuime-button-group": createExtendedConstruction("anuime-button-group"),
  "anuime-toolbar": createExtendedConstruction("anuime-toolbar"),
  "anuime-spinner": createExtendedConstruction("anuime-spinner"),
  "anuime-empty-state": createExtendedConstruction("anuime-empty-state"),
  "anuime-pagination": createExtendedConstruction("anuime-pagination"),
  "anuime-table": createExtendedConstruction("anuime-table"),
  "anuime-avatar": createExtendedConstruction("anuime-avatar"),
  "anuime-kbd": createExtendedConstruction("anuime-kbd"),
  "anuime-typography": createExtendedConstruction("anuime-typography"),
} satisfies Record<
  (typeof registryPreviewExtendedItems)[number],
  Record<RegistryPreviewCharacter, ConstructionNote>
>;

export const registryPreviewConstruction = {
  ...registryPreviewCoreConstruction,
  ...registryPreviewExtendedConstruction,
} satisfies Record<RegistryPreviewItem, Record<RegistryPreviewCharacter, ConstructionNote>>;

export function isRegistryPreviewItem(value: string): value is RegistryPreviewItem {
  return registryPreviewItems.some((item) => item === value);
}
import components from "../../../design-spec/components.json";
