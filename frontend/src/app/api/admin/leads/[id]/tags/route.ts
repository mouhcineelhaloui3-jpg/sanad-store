import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { addLeadTag } from "@/lib/db/crm";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "leads:update");
  if (error || !session) return error;

  const { id } = await context.params;
  const body = (await request.json()) as { tagName?: string; name?: string };

  const tagName = body.tagName ?? body.name;
  if (!tagName?.trim()) {
    return NextResponse.json({ error: "Tag name required" }, { status: 400 });
  }

  try {
    const tag = await addLeadTag(id, tagName, { userId: session.userId, ip: getClientIp(request) });
    return NextResponse.json(tag, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add tag" }, { status: 400 });
  }
}
