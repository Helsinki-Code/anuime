import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";

import { castCharacters, getPersonaPack, listCharacters } from "./personas.js";
import {
  getInstallCommand,
  getRegistryItem,
  listComponentItems,
  listRegistryItems,
} from "./repository.js";
import { reviewCode } from "./review.js";
import { CharacterIdSchema, PersonaPackSchema, ReviewResultSchema } from "./schema.js";

const RegistrySummarySchema = z.object({
  name: z.string(),
  type: z.string(),
  title: z.string(),
  description: z.string(),
  installCommand: z.string(),
});

const RegistryFileSchema = z.object({
  path: z.string(),
  content: z.string(),
});

const CharacterSummarySchema = z.object({
  id: CharacterIdSchema,
  adjective: z.string(),
  themeItem: z.string(),
  personaTool: CharacterIdSchema,
});

const CastResultSchema = z.object({
  schemaVersion: z.literal("anuime.cast.v1"),
  characters: z.array(CharacterIdSchema).min(2).max(3),
  intent: z.string().optional(),
  compositionRules: z.array(z.string()),
  personaPacks: z.array(PersonaPackSchema).min(2).max(3),
});

export function createAnuimeMcpServer(): McpServer {
  const server = new McpServer({
    name: "anuime",
    title: "AnUIme MCP",
    version: "2.0.0",
    description: "Character-aware registry, persona, composition, and deterministic review tools.",
  });

  server.registerTool(
    "list_components",
    {
      title: "List AnUIme components",
      description:
        "List the 51 character-aware workhorses and 12 character Expressive Moments in registry v2.",
      inputSchema: {},
      outputSchema: {
        count: z.number().int(),
        components: z.array(RegistrySummarySchema),
      },
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async () => {
      const components = listComponentItems().map(toRegistrySummary);
      return toolResult({ count: components.length, components });
    },
  );

  server.registerTool(
    "get_component",
    {
      title: "Get an AnUIme registry item",
      description:
        "Return registry metadata, dependencies, exact install command, and authored source files for an item.",
      inputSchema: {
        name: z.string().min(1).describe("Registry item name, for example anuime-checkbox."),
      },
      outputSchema: {
        name: z.string(),
        type: z.string(),
        title: z.string(),
        description: z.string(),
        kind: z.string(),
        localRegistryDependencies: z.array(z.string()),
        installCommand: z.string(),
        files: z.array(RegistryFileSchema),
      },
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async ({ name }) => {
      const item = getRegistryItem(name);
      if (!item) throw new Error(`Unknown AnUIme registry item: ${name}`);
      return toolResult(item);
    },
  );

  server.registerTool(
    "get_install_command",
    {
      title: "Get an AnUIme install command",
      description: "Build one shadcn CLI command for one or more existing AnUIme registry items.",
      inputSchema: {
        items: z.array(z.string().min(1)).min(1).max(20),
      },
      outputSchema: {
        items: z.array(z.string()),
        command: z.string(),
      },
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async ({ items }) => {
      const knownNames = new Set(listRegistryItems().map((item) => item.name));
      const unknown = items.filter((item) => !knownNames.has(item));
      if (unknown.length > 0) {
        throw new Error(`Unknown AnUIme registry item(s): ${unknown.join(", ")}`);
      }
      return toolResult({ items, command: getInstallCommand(items) });
    },
  );

  server.registerTool(
    "list_characters",
    {
      title: "List AnUIme characters",
      description: "List the three canonical character systems and their persona tools.",
      inputSchema: {},
      outputSchema: {
        count: z.literal(3),
        characters: z.array(CharacterSummarySchema).length(3),
      },
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async () => toolResult({ count: 3 as const, characters: listCharacters() }),
  );

  server.registerTool(
    "get_character",
    {
      title: "Get an AnUIme character",
      description: "Return the schema-validated, versioned persona pack for a character.",
      inputSchema: { character: CharacterIdSchema },
      outputSchema: PersonaPackSchema.shape,
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async ({ character }) => toolResult(getPersonaPack(character)),
  );

  for (const character of CharacterIdSchema.options) {
    server.registerTool(
      character,
      {
        title: `${capitalize(character)} persona`,
        description: `Return the compact ${capitalize(character)} v2 persona pack.`,
        inputSchema: {},
        outputSchema: PersonaPackSchema.shape,
        annotations: { readOnlyHint: true, idempotentHint: true },
      },
      async () => toolResult(getPersonaPack(character)),
    );
  }

  server.registerTool(
    "cast",
    {
      title: "Compose AnUIme characters",
      description:
        "Return persona packs and lawful multi-character composition rules without averaging character geometries.",
      inputSchema: {
        characters: z.array(CharacterIdSchema).min(2).max(3),
        intent: z.string().max(500).optional(),
      },
      outputSchema: CastResultSchema.shape,
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async ({ characters, intent }) => toolResult(castCharacters(characters, intent)),
  );

  server.registerTool(
    "anuime_review",
    {
      title: "Review AnUIme code",
      description:
        "Deterministically lint submitted JSX/CSS against one character's v2 geometry, token, tier, and motion laws.",
      inputSchema: {
        character: CharacterIdSchema,
        code: z.string().min(1).max(200_000),
        context: z.enum(["workhorse", "expressive"]).default("workhorse"),
      },
      outputSchema: ReviewResultSchema.shape,
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async ({ character, code, context }) => toolResult(reviewCode(character, code, context)),
  );

  return server;
}

function toRegistrySummary(item: ReturnType<typeof listComponentItems>[number]) {
  return {
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    installCommand: item.installCommand,
  };
}

function toolResult<T extends object>(value: T) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
    structuredContent: value,
  };
}

function capitalize(value: string): string {
  return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
}
