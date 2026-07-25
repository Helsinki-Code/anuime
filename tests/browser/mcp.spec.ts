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

    const calls = [
      { name: "list_components", arguments: {} },
      { name: "get_component", arguments: { name: "anuime-checkbox" } },
      {
        name: "get_install_command",
        arguments: { items: ["anuime-theme-kira", "anuime-checkbox"] },
      },
      { name: "list_characters", arguments: {} },
      { name: "get_character", arguments: { character: "kira" } },
      { name: "kira", arguments: {} },
      { name: "mochi", arguments: {} },
      { name: "atlas", arguments: {} },
      {
        name: "cast",
        arguments: {
          assignments: {
            "/dashboard": "kira",
            "/marketing": "atlas",
          },
          intent: "Build a production settings surface.",
        },
      },
      {
        name: "anuime_review",
        arguments: {
          character: "kira",
          scopeCharacter: "kira",
          code: '<button className="rounded-full mochi-pearl-thumb">Deploy</button>',
          context: "workhorse",
        },
      },
    ];

    const results = await Promise.all(
      calls.map(async (call) => ({ call, result: await client.callTool(call) })),
    );

    for (const { call, result } of results) {
      expect(result.isError, `${call.name} returned an MCP error`).not.toBe(true);
      expect(result.structuredContent, `${call.name} omitted structured content`).toBeTruthy();
    }

    const components = await client.callTool({ name: "list_components", arguments: {} });
    expect(components.structuredContent).toMatchObject({ count: 63 });

    const component = await client.callTool({
      name: "get_component",
      arguments: { name: "anuime-checkbox" },
    });
    expect(component.structuredContent).toMatchObject({
      name: "anuime-checkbox",
      files: expect.arrayContaining([
        expect.objectContaining({
          path: "anuime-checkbox.tsx",
          content: expect.stringContaining("AnuimeCheckbox"),
        }),
      ]),
    });

    const review = await client.callTool({
      name: "anuime_review",
      arguments: {
        character: "kira",
        scopeCharacter: "kira",
        code: '<button className="rounded-full mochi-pearl-thumb">Deploy</button>',
        context: "workhorse",
      },
    });
    expect(review.structuredContent).toMatchObject({
      schemaVersion: "anuime.review.v1",
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
  } finally {
    await client.close();
  }
});
