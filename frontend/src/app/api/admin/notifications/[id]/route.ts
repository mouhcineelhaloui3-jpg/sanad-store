import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { updateNotificationStatus } from "@/lib/db/notifications";
import type { NotificationStatus } from "@/generated/prisma/client";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "notifications:write");
  if (error || !session) return error;

  const { id } = await context.params;
  const body = (await request.json()) as { status?: NotificationStatus };

  if (!body.status) {
    return NextResponse.json({ error: "Status is required" }, { status: 400 });
  }

  try {
    const notification = await updateNotificationStatus(id, body.status, {
      userId: session.userId,
      ip: getClientIp(request)
    });
    return NextResponse.json(notification);
  } catch {
    return NextResponse.json({ error: "Notification not found" }, { status: 404 });
  }
}
