import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { deleteCoupon, updateCoupon } from "@/lib/db/coupons";
import type { CouponStatus, CouponType } from "@/generated/prisma/client";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "coupons:write");
  if (error || !session) return error;

  const { id } = await context.params;
  const body = (await request.json()) as {
    code?: string;
    type?: CouponType;
    value?: number;
    expiresAt?: string | null;
    usageLimit?: number;
    status?: CouponStatus;
  };

  try {
    const coupon = await updateCoupon(
      id,
      {
        code: body.code,
        type: body.type,
        value: body.value != null ? Number(body.value) : undefined,
        expiresAt: body.expiresAt,
        usageLimit: body.usageLimit,
        status: body.status
      },
      { userId: session.userId, ip: getClientIp(request) }
    );
    return NextResponse.json(coupon);
  } catch {
    return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "coupons:write");
  if (error || !session) return error;

  const { id } = await context.params;

  try {
    await deleteCoupon(id, { userId: session.userId, ip: getClientIp(request) });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
  }
}
