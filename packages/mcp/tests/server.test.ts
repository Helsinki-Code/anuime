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
