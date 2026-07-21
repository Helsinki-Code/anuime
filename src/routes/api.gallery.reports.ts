import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { readGallerySession } from "@/lib/anuime/gallery-auth.server";
import { reportGalleryEntry } from "@/lib/anuime/gallery-repository.server";

export const Route = createFileRoute("/api/gallery/reports")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = z
            .object({ entryId: z.string().optional(), reason: z.string().optional() })
            .parse(await request.json());
          if (!body.entryId) throw new Error("Missing entry");
          reportGalleryEntry(body.entryId, readGallerySession(request), body.reason ?? "");
          return new Response(null, { status: 204 });
        } catch {
          return Response.json({ error: "Invalid report" }, { status: 422 });
        }
      },
    },
  },
});
