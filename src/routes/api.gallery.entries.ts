import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { readGallerySession } from "@/lib/anuime/gallery-auth.server";
import { createGalleryEntry, listGalleryEntries } from "@/lib/anuime/gallery-repository.server";

export const Route = createFileRoute("/api/gallery/entries")({
  server: {
    handlers: {
      GET: () =>
        Response.json(
          { entries: listGalleryEntries("approved") },
          { headers: { "cache-control": "public, max-age=60" } },
        ),
      POST: async ({ request }) => {
        const userId = readGallerySession(request);
        if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const text = await request.text();
        if (text.length > 12_000)
          return Response.json({ error: "Payload too large" }, { status: 413 });
        try {
          const body = z
            .object({ submit: z.boolean().optional() })
            .passthrough()
            .parse(JSON.parse(text));
          const submit = body.submit === true;
          if (submit && process.env.ANUIME_GALLERY_PUBLISH_ENABLED !== "true") {
            return Response.json({ error: "Publishing is closed" }, { status: 403 });
          }
          return Response.json(createGalleryEntry(userId, body, submit), { status: 201 });
        } catch {
          return Response.json({ error: "Invalid gallery entry" }, { status: 422 });
        }
      },
    },
  },
});
