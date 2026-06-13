import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { createAffiliate, listAffiliates } from "@/lib/db/affiliates";
import { parseListParams } from "@/lib/db/pagination";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "affiliate:read");
  if (error) return error;

  const params = parseListParams(request.nextUrl.searchParams);
  const result = await listAffiliates(params);
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const { session, error } = requireAdminPermission(request, "affiliate:write");
  if (error || !session) return error;

  const body = (await request.json()) as {
    name?: string;
    code?: string;
    email?: string;
    phone?: string;
    commission?: number;
    enabled?: boolean;
  };

  if (!body.name || !body.code) {
    return NextResponse.json({ error: "Name and code are required" }, { status: 400 });
  }

  const affiliate = await createAffiliate(
    {
      name: body.name,
      code: body.code,
      email: body.email,
      phone: body.phone,
      commission: body.commission,
      enabled: body.enabled
    },
    { userId: session.userId, ip: getClientIp(request) }
  );

  return NextResponse.json(affiliate, { status: 201 });
}
