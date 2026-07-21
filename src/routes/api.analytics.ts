import { createFileRoute } from "@tanstack/react-router";

import { parseProductEvent } from "@/lib/analytics";

const windowMs = 60_000;
const maxEventsPerWindow = 120;
let windowStartedAt = Date.now();
let eventCount = 0;

export const Route = createFileRoute("/api/analytics")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (Number(request.headers.get("content-length") ?? 0) > 1024) {
          return Response.json({ accepted: false }, { status: 413 });
        }
        const now = Date.now();
        if (now - windowStartedAt >= windowMs) {
          windowStartedAt = now;
          eventCount = 0;
        }
        if (eventCount >= maxEventsPerWindow) {
          return Response.json(
            { accepted: false },
            { status: 429, headers: { "retry-after": "60" } },
          );
        }
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ accepted: false }, { status: 400 });
        }
        const event = parseProductEvent(body);
        if (!event) return Response.json({ accepted: false }, { status: 400 });
        eventCount += 1;
        console.info("anuime.product_event", event);
        return Response.json(
          { accepted: true },
          { status: 202, headers: { "cache-control": "no-store" } },
        );
      },
    },
  },
});
