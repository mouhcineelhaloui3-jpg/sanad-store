import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { getSeoSettings, saveSeoSettings, type SeoSettingsDto } from "@/lib/db/seo";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "settings:read");
  if (error) return error;

  const settings = await getSeoSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const { session, error } = requireAdminPermission(request, "settings:write");
  if (error || !session) return error;

  const body = (await request.json()) as SeoSettingsDto;
  const settings = await saveSeoSettings(body, { userId: session.userId, ip: getClientIp(request) });
  return NextResponse.json(settings);
}
