import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { deleteAffiliate, updateAffiliate } from "@/lib/db/affiliates";
import type { AffiliateStatus } from "@/generated/prisma/client";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "affiliate:write");
  if (error || !session) return error;

  const { id } = await context.params;
  const body = (await request.json()) as {
    name?: string;
    code?: string;
    email?: string;
    phone?: string;
    commission?: number;
    enabled?: boolean;
    status?: AffiliateStatus;
  };

  try {
    const affiliate = await updateAffiliate(
      id,
      {
        name: body.name,
        code: body.code,
        email: body.email,
        phone: body.phone,
        commission: body.commission != null ? Number(body.commission) : undefined,
        enabled: body.enabled,
        status: body.status
      },
      { userId: session.userId, ip: getClientIp(request) }
    );
    return NextResponse.json(affiliate);
  } catch {
    return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "affiliate:write");
  if (error || !session) return error;

  const { id } = await context.params;

  try {
    await deleteAffiliate(id, { userId: session.userId, ip: getClientIp(request) });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
  }
}
