import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { createNotification, listNotifications } from "@/lib/db/notifications";
import { parseListParams } from "@/lib/db/pagination";
import type { NotificationChannel } from "@/generated/prisma/client";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "notifications:read");
  if (error) return error;

  const params = parseListParams(request.nextUrl.searchParams);
  const result = await listNotifications(params);
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const { session, error } = requireAdminPermission(request, "notifications:write");
  if (error || !session) return error;

  const body = (await request.json()) as {
    title?: string;
    body?: string;
    channel?: NotificationChannel;
    userId?: string;
  };

  if (!body.title || !body.body) {
    return NextResponse.json({ error: "Title and body are required" }, { status: 400 });
  }

  const notification = await createNotification(
    {
      title: body.title,
      body: body.body,
      channel: body.channel,
      userId: body.userId
    },
    { userId: session.userId, ip: getClientIp(request) }
  );

  return NextResponse.json(notification, { status: 201 });
}
