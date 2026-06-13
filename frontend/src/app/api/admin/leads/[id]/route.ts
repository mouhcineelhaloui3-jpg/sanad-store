import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { deleteCrmLead, getCrmLeadById, listAssignableAgents, updateCrmLead } from "@/lib/db/crm";
import type { LeadStatus } from "@/generated/prisma/client";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const { error } = requireAdminPermission(request, "leads:view");
  if (error) return error;

  const { id } = await context.params;
  const lead = await getCrmLeadById(id);
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  const agents = await listAssignableAgents();
  return NextResponse.json({ lead, agents });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "leads:update");
  if (error || !session) return error;

  const { id } = await context.params;
  const body = (await request.json()) as {
    status?: LeadStatus;
    assignedToId?: string | null;
    name?: string;
    device?: string;
    planSlug?: string;
    source?: string;
  };

  const lead = await updateCrmLead(id, body, { userId: session.userId, ip: getClientIp(request) });
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  return NextResponse.json(lead);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "leads:delete");
  if (error || !session) return error;

  const { id } = await context.params;
  try {
    await deleteCrmLead(id, { userId: session.userId, ip: getClientIp(request) });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
}
