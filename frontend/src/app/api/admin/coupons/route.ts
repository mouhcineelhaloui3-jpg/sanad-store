import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { createCoupon, listCoupons } from "@/lib/db/coupons";
import { parseListParams } from "@/lib/db/pagination";
import type { CouponStatus, CouponType } from "@/generated/prisma/client";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "coupons:read");
  if (error) return error;

  const params = parseListParams(request.nextUrl.searchParams);
  const result = await listCoupons(params);
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const { session, error } = requireAdminPermission(request, "coupons:write");
  if (error || !session) return error;

  const body = (await request.json()) as {
    code?: string;
    type?: CouponType;
    value?: number;
    expiresAt?: string | null;
    usageLimit?: number;
    status?: CouponStatus;
  };

  if (!body.code || !body.type || body.value == null) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const coupon = await createCoupon(
    {
      code: body.code,
      type: body.type,
      value: Number(body.value),
      expiresAt: body.expiresAt,
      usageLimit: body.usageLimit,
      status: body.status
    },
    { userId: session.userId, ip: getClientIp(request) }
  );

  return NextResponse.json(coupon, { status: 201 });
}
