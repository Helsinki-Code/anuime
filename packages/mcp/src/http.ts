import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

import { createAnuimeMcpServer } from "./server.js";

export async function handleMcpRequest(request: Request): Promise<Response> {
  const server = createAnuimeMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  await server.connect(transport);

  try {
    return await transport.handleRequest(request);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown MCP transport error.";
    return Response.json(
      {
        jsonrpc: "2.0",
        error: { code: -32603, message },
        id: null,
      },
      { status: 500 },
    );
  } finally {
    await server.close();
  }
}
