import {
  CreateClientServiceRequestBody,
  CreateClientServiceRequestResponse,
} from "@workspace/api-zod";
import { clientServiceRequestsTable, db } from "@workspace/db";
import { Router, type Request } from "express";
import { logger } from "../lib/logger";

const router = Router();
const requestWindows = new Map<string, { startedAt: number; count: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 8;

function canSubmitFromRequest(req: Request): boolean {
  const now = Date.now();
  const key = req.ip || "unknown";
  const current = requestWindows.get(key);

  if (!current || now - current.startedAt >= WINDOW_MS) {
    requestWindows.set(key, { startedAt: now, count: 1 });
    if (requestWindows.size > 2_000) {
      for (const [ip, window] of requestWindows) {
        if (now - window.startedAt >= WINDOW_MS) requestWindows.delete(ip);
      }
    }
    return true;
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) return false;
  current.count += 1;
  return true;
}

router.post("/client/requests", async (req, res): Promise<void> => {
  if (!canSubmitFromRequest(req)) {
    res.status(429).json({
      error: "Please wait before submitting another service request.",
    });
    return;
  }

  const parsed = CreateClientServiceRequestBody.safeParse(req.body);
  if (!parsed.success) {
    const error = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "request"}: ${issue.message}`)
      .join("; ");
    res.status(400).json({ error });
    return;
  }

  const body = parsed.data;
  try {
    const [row] = await db
      .insert(clientServiceRequestsTable)
      .values({
        serviceClass: body.serviceClass,
        fullName: body.fullName.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone?.trim() || null,
        jobLocation: body.jobLocation.trim(),
        description: body.description.trim(),
        preferredDate: body.preferredDate
          ? body.preferredDate.toISOString().slice(0, 10)
          : null,
        consentToContact: true,
      })
      .returning({
        id: clientServiceRequestsTable.id,
        createdAt: clientServiceRequestsTable.createdAt,
      });

    if (!row) {
      res.status(500).json({ error: "The service request could not be saved." });
      return;
    }

    const response = CreateClientServiceRequestResponse.parse({
      requestId: row.id,
      submittedAt: row.createdAt.toISOString(),
      message:
        "Your request has been received. The team will review the details and contact you.",
    });
    res.status(201).json(response);
  } catch (error) {
    logger.error({ err: error }, "Unable to save client service request");
    res.status(500).json({ error: "The service request could not be saved." });
  }
});

export default router;
