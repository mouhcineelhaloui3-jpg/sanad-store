import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import {
  getNotificationSettings,
  saveNotificationSettings,
  type NotificationSettingsDto
} from "@/lib/db/notifications";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "notifications:read");
  if (error) return error;

  const settings = await getNotificationSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const { session, error } = requireAdminPermission(request, "notifications:write");
  if (error || !session) return error;

  const body = (await request.json()) as NotificationSettingsDto;
  const settings = await saveNotificationSettings(body, { userId: session.userId, ip: getClientIp(request) });
  return NextResponse.json(settings);
}
