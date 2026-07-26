import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

import { handleMcpRequest } from "./http.js";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 3333;

export async function startLocalMcpServer(
  options: {
    host?: string;
    port?: number;
  } = {},
) {
  const host = options.host ?? DEFAULT_HOST;
  const port = options.port ?? DEFAULT_PORT;
  const server = createServer(async (request, response) => {
    try {
      await routeRequest(request, response, host, port);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown local server error.";
      response.writeHead(500, { "content-type": "application/json" });
      response.end(JSON.stringify({ error: message }));
    }
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, () => {
      server.off("error", reject);
      resolve();
    });
  });

  return server;
}

async function routeRequest(
  request: IncomingMessage,
  response: ServerResponse,
  host: string,
  port: number,
): Promise<void> {
  const url = new URL(request.url ?? "/", `http://${host}:${port}`);

  if (url.pathname === "/health") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(
      JSON.stringify({
        status: "ok",
        service: "anuime-mcp",
        version: "2.0.1",
        transport: "streamable-http",
      }),
    );
    return;
  }

  if (url.pathname !== "/mcp") {
    response.writeHead(404, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  const body = await readRequestBody(request);
  const webRequest = new Request(url, {
    method: request.method,
    headers: request.headers as HeadersInit,
    ...(body.length > 0 ? { body: body.toString("utf8") } : {}),
  });
  const webResponse = await handleMcpRequest(webRequest);

  response.writeHead(webResponse.status, Object.fromEntries(webResponse.headers.entries()));
  response.end(Buffer.from(await webResponse.arrayBuffer()));
}

async function readRequestBody(request: IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

const isEntrypoint =
  process.argv[1] &&
  new URL(import.meta.url).pathname === new URL(`file://${process.argv[1]}`).pathname;

if (isEntrypoint) {
  const port = Number.parseInt(process.env.PORT ?? `${DEFAULT_PORT}`, 10);
  const host = process.env.HOST ?? DEFAULT_HOST;
  const localServer = await startLocalMcpServer({ host, port });

  console.log(`AnUIme MCP listening at http://${host}:${port}/mcp`);

  const shutdown = () => {
    localServer.close(() => process.exit(0));
  };
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}
