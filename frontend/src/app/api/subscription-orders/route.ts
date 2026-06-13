import { NextResponse } from "next/server";
import { getClientIp, getUserAgent } from "@/lib/analytics/request-meta";
import { createSubscriptionOrder } from "@/lib/db/orders";
import { getClientKey, rateLimit } from "@/lib/security/rate-limit";
import type { TrackingPayload } from "@/lib/analytics/types";
import { listOrders } from "@/lib/db/orders";

export async function POST(request: Request) {
  const limited = rateLimit(getClientKey(request, "orders-post"), 10, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(Math.ceil(limited.retryAfterMs / 1000)) } }
    );
  }

  try {
    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      device?: string;
      planSlug?: string;
      notes?: string;
      tracking?: TrackingPayload;
    };

    if (!body.name?.trim() || !body.phone?.trim() || !body.planSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = await createSubscriptionOrder({
      name: body.name.trim(),
      phone: body.phone.trim(),
      device: body.device ?? "unknown",
      planSlug: body.planSlug,
      notes: body.notes?.trim(),
      ip: getClientIp(request),
      userAgent: getUserAgent(request),
      tracking: body.tracking ?? undefined
    });

    return NextResponse.json({ ok: true, id: order.id });
  } catch (error) {
    console.error("Failed to save order", error);
    return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const adminKey = request.headers.get("x-admin-key");
  const expected = process.env.ADMIN_API_KEY ?? "";
  if (!expected || adminKey !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await listOrders();
  return NextResponse.json(orders);
}
