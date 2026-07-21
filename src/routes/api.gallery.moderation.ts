import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { listGalleryEntries, moderateGalleryEntry } from "@/lib/anuime/gallery-repository.server";

export const Route = createFileRoute("/api/gallery/moderation")({
  server: {
    handlers: {
      GET: ({ request }) => {
        if (!isModerator(request)) return Response.json({ error: "Forbidden" }, { status: 403 });
        return Response.json(
          { entries: listGalleryEntries("pending") },
          { headers: { "cache-control": "no-store" } },
        );
      },
      POST: async ({ request }) => {
        if (!isModerator(request)) return Response.json({ error: "Forbidden" }, { status: 403 });
        const body = z
          .object({
            entryId: z.string().optional(),
            status: z.enum(["approved", "rejected", "removed"]).optional(),
          })
          .parse(await request.json());
        if (
          !body.entryId ||
          !body.status ||
          !["approved", "rejected", "removed"].includes(body.status)
        )
          return Response.json({ error: "Invalid moderation action" }, { status: 422 });
        moderateGalleryEntry(body.entryId, body.status);
        return new Response(null, { status: 204 });
      },
    },
  },
});

function isModerator(request: Request) {
  const expected = process.env.ANUIME_MODERATOR_TOKEN;
  return Boolean(expected && request.headers.get("authorization") === `Bearer ${expected}`);
}
