import { NextRequest, NextResponse } from "next/server";
import { appendAnalyticsEvent } from "@/lib/analytics/server";
import type { AnalyticsEventName, AnalyticsEventRecord } from "@/lib/analytics/types";
import { getClientIp, getUserAgent } from "@/lib/analytics/request-meta";
import { getClientKey, rateLimit } from "@/lib/security/rate-limit";

const ALLOWED_EVENTS: AnalyticsEventName[] = [
  "page_view",
  "click",
  "modal_open",
  "initiate_checkout",
  "lead",
  "trial_submit",
  "whatsapp_click"
];

export async function POST(request: NextRequest) {
  const limited = rateLimit(getClientKey(request, "analytics-post"), 120, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = (await request.json()) as {
      name?: AnalyticsEventName;
      path?: string;
      properties?: Record<string, string | number | boolean | null>;
      sessionId?: string | null;
      utm?: AnalyticsEventRecord["utm"];
    };

    if (!body.name || !ALLOWED_EVENTS.includes(body.name)) {
      return NextResponse.json({ error: "Invalid event name" }, { status: 400 });
    }

    const event: AnalyticsEventRecord = {
      id: crypto.randomUUID(),
      name: body.name,
      path: body.path ?? "/",
      properties: body.properties ?? {},
      ip: getClientIp(request),
      userAgent: getUserAgent(request),
      utm: body.utm ?? null,
      sessionId: body.sessionId ?? null,
      createdAt: new Date().toISOString()
    };

    await appendAnalyticsEvent(event);
    return NextResponse.json({ ok: true, id: event.id });
  } catch {
    return NextResponse.json({ error: "Failed to save event" }, { status: 500 });
  }
}
