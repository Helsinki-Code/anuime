import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { expect, test } from "@playwright/test";

test("the production app exposes the complete AnUIme MCP contract", async ({
  baseURL,
}, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "The HTTP protocol only needs one project run.");
  const endpoint = new URL("/mcp", baseURL);
  const client = new Client({ name: "anuime-browser-contract", version: "1.0.0" });
  const transport = new StreamableHTTPClientTransport(endpoint);

  try {
    await client.connect(transport);
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

    const persona = await client.callTool({ name: "atlas", arguments: {} });
    expect(persona.structuredContent).toMatchObject({
      schemaVersion: "anuime.persona.v2",
      character: "atlas",
    });
  } finally {
    await client.close();
  }
});
