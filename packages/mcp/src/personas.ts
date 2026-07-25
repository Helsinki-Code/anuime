import { listComponentItems, readDesignSpec } from "./repository.js";
import {
  type CharacterId,
  CharacterIdSchema,
  type PersonaPack,
  PersonaPackSchema,
} from "./schema.js";

type ThemeSpec = {
  specVersion: string;
  characters: Record<
    CharacterId,
    {
      characterAdjective: string;
      geometry: {
        controlHeightPx: number;
        compactControlHeightPx: number;
        radiusLadderPx: Record<string, number>;
        directionalAxisDeg?: number;
        transitionStyle: string;
        generalTransitionMs: number;
      };
      themes: Record<"light" | "dark", { declaredTokens: { name: string; value: string }[] }>;
    }
  >;
};

type LawSpec = {
  characters: Record<
    CharacterId,
    {
      motifLaws: {
        id: string;
        artifact: string;
        geometry: { name: string; prototype: string };
        componentCarriers: string[];
      }[];
      constraints: { id: string; rule: string }[];
      forbidden: string[];
    }
  >;
};

type MotionSpec = {
  characters: Record<
    CharacterId,
    {
      expressiveMoments: Record<
        "loader" | "textReveal" | "success" | "empty",
        { name: string; tier: string; reducedMotionFallback: string }
      >;
    }
  >;
};

const characterFocus: Record<CharacterId, string> = {
  kira: "Collar ring plus descending circuit stem; trace the perimeter in 240ms, then settle.",
  mochi: "Rose veil localized at the interaction point; breathe gently, then settle.",
  atlas: "Four panel brackets converge and dock around the selected control in 180ms.",
};

const expressiveRegistrySuffix = {
  loader: "loader",
  textReveal: "text-reveal",
  success: "success",
  empty: "empty-state",
} as const;

const expressiveKind = {
  loader: "loader",
  textReveal: "text-reveal",
  success: "success",
  empty: "empty-state",
} as const;

export function listCharacters(): {
  id: CharacterId;
  adjective: string;
  themeItem: string;
  personaTool: CharacterId;
}[] {
  const themes = readDesignSpec<ThemeSpec>("themes.json");
  return CharacterIdSchema.options.map((id) => ({
    id,
    adjective: themes.characters[id].characterAdjective,
    themeItem: `anuime-theme-${id}`,
    personaTool: id,
  }));
}

export function getPersonaPack(character: CharacterId): PersonaPack {
  const themes = readDesignSpec<ThemeSpec>("themes.json");
  const laws = readDesignSpec<LawSpec>("laws.json");
  const motion = readDesignSpec<MotionSpec>("motion.json");
  const characterThemes = themes.characters[character];
  const characterLaws = laws.characters[character];
  const workhorseItems = listComponentItems()
    .map((item) => item.name)
    .filter(
      (name) =>
        !/^anuime-(?:kira|mochi|atlas)-(?:loader|text-reveal|success|empty-state)$/u.test(name),
    );
  const expressiveItems = Object.values(expressiveRegistrySuffix).map(
    (suffix) => `anuime-${character}-${suffix}`,
  );
  const momentEntries = Object.entries(motion.characters[character].expressiveMoments) as [
    keyof typeof expressiveRegistrySuffix,
    { name: string; tier: string; reducedMotionFallback: string },
  ][];
  const preliminary = {
    schemaVersion: "anuime.persona.v2" as const,
    specVersion: themes.specVersion,
    character,
    adjective: characterThemes.characterAdjective,
    goldenDirective:
      "Install what exists in the registry; hand-write only what doesn't, under these laws." as const,
    tokenLadders: {
      light: Object.fromEntries(
        characterThemes.themes.light.declaredTokens.map(({ name, value }) => [name, value]),
      ),
      dark: Object.fromEntries(
        characterThemes.themes.dark.declaredTokens.map(({ name, value }) => [name, value]),
      ),
    },
    motifLaws: characterLaws.motifLaws.map((law) => ({
      id: law.id,
      artifact: law.artifact,
      geometry: `${law.geometry.name}: ${law.geometry.prototype}`,
      carriers: law.componentCarriers,
    })),
    forbidden: [
      ...characterLaws.forbidden,
      ...characterLaws.constraints.map((constraint) => `${constraint.id}: ${constraint.rule}`),
    ],
    layoutPhysics: {
      ...characterThemes.geometry,
      focusMechanism: characterFocus[character],
    },
    componentCli: {
      commandTemplate: "npx shadcn@latest add https://anuime.vercel.app/r/{registry-item}.json",
      themeItem: `anuime-theme-${character}`,
      workhorseItems,
      expressiveItems,
    },
    expressiveMoments: {
      allowedOnlyFor: ["waiting", "transition", "success", "empty/waiting ambient"],
      reducedMotionRule:
        "Every expressive implementation must include @media (prefers-reduced-motion: reduce), disable animation, and preserve a recognizable static state.",
      items: momentEntries.map(([kind, moment]) => ({
        kind: expressiveKind[kind],
        registryItem: `anuime-${character}-${expressiveRegistrySuffix[kind]}`,
        usage: `${moment.name}; tier ${moment.tier}; reduced motion: ${moment.reducedMotionFallback}`,
      })),
    },
  };
  const estimatedTokens = Math.ceil(JSON.stringify(preliminary).length / 4);

  return PersonaPackSchema.parse({ ...preliminary, estimatedTokens });
}

export function castCharacters(
  characters: CharacterId[],
  intent?: string,
): {
  schemaVersion: "anuime.cast.v1";
  characters: CharacterId[];
  intent?: string;
  compositionRules: string[];
  personaPacks: PersonaPack[];
} {
  const uniqueCharacters = [...new Set(characters)];
  if (uniqueCharacters.length < 2) {
    throw new Error("cast requires at least two distinct characters.");
  }

  return {
    schemaVersion: "anuime.cast.v1",
    characters: uniqueCharacters,
    ...(intent ? { intent } : {}),
    compositionRules: [
      "Assign one character as the structural owner of each component; do not average geometries.",
      "A secondary character may contribute tokenized state or accent roles only where both persona laws permit it.",
      "Keep workhorses abstract. Persona power assemblies remain limited to waiting and transition states.",
      "Install every available registry primitive before hand-writing gaps.",
      "Run anuime_review once per structural owner and resolve every error before shipping.",
    ],
    personaPacks: uniqueCharacters.map(getPersonaPack),
  };
}
