import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const endpoint = new URL(process.argv[2] ?? "https://anuime.vercel.app/mcp");
const client = new Client({ name: "anuime-remote-verifier", version: "1.0.0" });
const transport = new StreamableHTTPClientTransport(endpoint);
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

try {
  await client.connect(transport);
  const tools = await client.listTools();
  const advertisedTools = tools.tools.map((tool) => tool.name).toSorted();
  const expectedTools = calls.map((call) => call.name).toSorted();

  if (JSON.stringify(advertisedTools) !== JSON.stringify(expectedTools)) {
    throw new Error(
      `Unexpected tool contract.\nExpected: ${expectedTools.join(", ")}\nReceived: ${advertisedTools.join(", ")}`,
    );
  }

  const results = await Promise.all(
    calls.map(async (call) => ({ call, result: await client.callTool(call) })),
  );

  for (const { call, result } of results) {
    if (result.isError || !result.structuredContent) {
      throw new Error(`${call.name} failed: ${JSON.stringify(result.content)}`);
    }

    console.log(`✓ ${call.name}`);
  }

  const resultByTool = new Map(
    results.map(({ call, result }) => [call.name, result.structuredContent]),
  );
  assert(resultByTool.get("list_components")?.count === 63, "Expected 63 component entries.");
  assert(
    resultByTool
      .get("get_component")
      ?.files?.some(
        (file) => file.path === "anuime-checkbox.tsx" && file.content.includes("AnuimeCheckbox"),
      ),
    "Expected authored checkbox source from get_component.",
  );
  assert(resultByTool.get("list_characters")?.count === 3, "Expected three characters.");
  assert(
    resultByTool.get("get_character")?.character === "kira",
    "Expected the Kira character pack.",
  );
  assert(resultByTool.get("kira")?.character === "kira", "Expected the Kira persona.");
  assert(resultByTool.get("mochi")?.character === "mochi", "Expected the Mochi persona.");
  assert(resultByTool.get("atlas")?.character === "atlas", "Expected the Atlas persona.");
  assert(
    resultByTool.get("cast")?.schemaVersion === "anuime.cast.v2" &&
      resultByTool.get("cast")?.assignments?.["/dashboard"] === "kira",
    "Expected a schema-valid cast.",
  );
  assert(
    resultByTool.get("anuime_review")?.compliant === false,
    "Expected the Kira rounded-full violation.",
  );
  assert(
    resultByTool
      .get("anuime_review")
      ?.violations?.some(
        (violation) =>
          violation.ruleId === "cross-contamination.mochi-in-kira" &&
          violation.severity === "cross-contamination",
      ),
    "Expected the scoped Mochi-in-Kira cross-contamination violation.",
  );

  console.log(`Verified all ${calls.length} AnUIme tools at ${endpoint.href}`);
} finally {
  await client.close();
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
