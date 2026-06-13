import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { deleteCustomers } from "@/lib/db/customers";

export async function POST(request: NextRequest) {
  const { session, error } = requireAdminPermission(request, "customers:write");
  if (error || !session) return error;

  const body = (await request.json()) as { ids?: string[]; action?: string };
  const ids = body.ids ?? [];

  if (!ids.length) {
    return NextResponse.json({ error: "No ids provided" }, { status: 400 });
  }
  if (body.action !== "delete") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  await deleteCustomers(ids, { userId: session.userId, ip: getClientIp(request) });
  return NextResponse.json({ ok: true, count: ids.length });
}
