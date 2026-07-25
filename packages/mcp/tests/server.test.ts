import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { afterEach, describe, expect, it } from "vitest";

import { createAnuimeMcpServer } from "../src/server.js";

const closeCallbacks: (() => Promise<void>)[] = [];

afterEach(async () => {
  await Promise.all(closeCallbacks.splice(0).map((close) => close()));
});

describe("AnUIme MCP protocol", () => {
  it("advertises the complete ten-tool contract", async () => {
    const { client } = await connectInMemory();
    const tools = await client.listTools();

    expect(tools.tools.map((tool) => tool.name).toSorted()).toEqual(
      [
        "anuime_review",
        "atlas",
        "cast",
        "get_character",
        "get_component",
        "get_install_command",
        "kira",
        "list_characters",
        "list_components",
        "mochi",
      ].toSorted(),
    );
    expect(tools.tools.every((tool) => tool.outputSchema)).toBe(true);
  });

  it("returns schema-valid structured persona content through MCP", async () => {
    const { client } = await connectInMemory();
    const result = await client.callTool({ name: "kira", arguments: {} });

    expect(result.isError).not.toBe(true);
    expect(result.structuredContent).toMatchObject({
      schemaVersion: "anuime.persona.v2",
      character: "kira",
      estimatedTokens: expect.any(Number),
    });
  });

  it("publishes consistently cased AnUIme component titles", async () => {
    const { client } = await connectInMemory();
    const result = await client.callTool({ name: "list_components", arguments: {} });
    const structuredContent = result.structuredContent as
      | { count: number; components: { title: string }[] }
      | undefined;

    expect(result.isError).not.toBe(true);
    expect(structuredContent?.count).toBe(63);
    expect(structuredContent?.components).toHaveLength(63);
    expect(structuredContent?.components.every(({ title }) => title.startsWith("AnUIme "))).toBe(
      true,
    );
  });

  it("returns deterministic structured review violations through MCP", async () => {
    const { client } = await connectInMemory();
    const result = await client.callTool({
      name: "anuime_review",
      arguments: {
        character: "atlas",
        code: '<button className="focus-visible:ring-2 bg-blue-500">Dock</button>',
      },
    });

    expect(result.isError).not.toBe(true);
    expect(result.structuredContent).toMatchObject({
      schemaVersion: "anuime.review.v1",
      character: "atlas",
      compliant: false,
    });
  });

  it("returns lookup-ready cast assignments through MCP", async () => {
    const { client } = await connectInMemory();
    const result = await client.callTool({
      name: "cast",
      arguments: {
        assignments: {
          "/dashboard": "kira",
          "/marketing": "mochi",
        },
        intent: "Build a multi-character application.",
      },
    });

    expect(result.isError).not.toBe(true);
    expect(result.structuredContent).toMatchObject({
      schemaVersion: "anuime.cast.v2",
      assignments: {
        "/dashboard": "kira",
        "/marketing": "mochi",
      },
      characters: ["kira", "mochi"],
    });
  });

  it("rejects a cast with only one distinct character through MCP", async () => {
    const { client } = await connectInMemory();
    const result = await client.callTool({
      name: "cast",
      arguments: {
        assignments: {
          "/dashboard": "kira",
          "/settings": "kira",
        },
      },
    });

    expect(result.isError).toBe(true);
    expect(JSON.stringify(result.content)).toContain(
      "cast requires at least two distinct characters.",
    );
  });

  it("returns cross-contamination violations for an assigned scope", async () => {
    const { client } = await connectInMemory();
    const result = await client.callTool({
      name: "anuime_review",
      arguments: {
        character: "kira",
        scopeCharacter: "kira",
        code: '<span className="mochi-pearl-thumb" />',
      },
    });

    expect(result.isError).not.toBe(true);
    expect(result.structuredContent).toMatchObject({
      character: "kira",
      scopeCharacter: "kira",
      compliant: false,
      violations: expect.arrayContaining([
        expect.objectContaining({
          ruleId: "cross-contamination.mochi-in-kira",
          severity: "cross-contamination",
        }),
      ]),
    });
  });
});

async function connectInMemory() {
  const server = createAnuimeMcpServer();
  const client = new Client({ name: "anuime-test", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

  await server.connect(serverTransport);
  await client.connect(clientTransport);
  closeCallbacks.push(async () => {
    await client.close();
    await server.close();
  });

  return { client, server };
}
