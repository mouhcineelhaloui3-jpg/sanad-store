import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { addLeadNote } from "@/lib/db/crm";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "leads:update");
  if (error || !session) return error;

  const { id } = await context.params;
  const body = (await request.json()) as { body?: string };

  if (!body.body?.trim()) {
    return NextResponse.json({ error: "Note body required" }, { status: 400 });
  }

  const note = await addLeadNote(id, body.body, { userId: session.userId, ip: getClientIp(request) });
  return NextResponse.json(note, { status: 201 });
}
