# AnUIme MCP

Local, stateless Streamable HTTP MCP server for the AnUIme v2 registry and character systems.

```sh
./node_modules/.bin/tsc -p packages/mcp/tsconfig.json
node packages/mcp/dist/local.js
```

The local endpoint is `http://127.0.0.1:3333/mcp` and the health endpoint is
`http://127.0.0.1:3333/health`. Set `PORT` to use another port.

`handleMcpRequest(request)` in `@anuime/mcp/http` is the Web Standards request handler intended for
a Vercel function adapter. It uses the official SDK's stateless Streamable HTTP transport. This
package deliberately contains no deployment or publication configuration while the Phase 3 review
gate is open.
