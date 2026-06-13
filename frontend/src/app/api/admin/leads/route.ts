import { NextRequest, NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { captureLead } from "@/lib/db/crm";
import { getClientIp } from "@/lib/analytics/request-meta";
import { listCrmLeads } from "@/lib/db/crm";
import { parseListParams } from "@/lib/db/pagination";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "leads:view");
  if (error) return error;

  const params = parseListParams(request.nextUrl.searchParams);
  const assignedToId = request.nextUrl.searchParams.get("assignedToId") ?? undefined;
  const result = await listCrmLeads({ ...params, assignedToId });
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const { session, error } = requireAdminPermission(request, "leads:create");
  if (error || !session) return error;

  const body = (await request.json()) as {
    name?: string;
    phone?: string;
    device?: string;
    planSlug?: string;
    source?: string;
  };

  if (!body.name?.trim() || !body.phone?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const lead = await captureLead(
    {
      name: body.name,
      phone: body.phone,
      device: body.device,
      planSlug: body.planSlug,
      source: body.source ?? "admin"
    },
    { userId: session.userId, ip: getClientIp(request) }
  );

  return NextResponse.json(lead, { status: 201 });
}
