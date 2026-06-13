import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { bulkUpdateCoupons, deleteCoupon } from "@/lib/db/coupons";

export async function POST(request: NextRequest) {
  const { session, error } = requireAdminPermission(request, "coupons:write");
  if (error || !session) return error;

  const body = (await request.json()) as { ids?: string[]; action?: string };
  const ids = body.ids ?? [];
  const audit = { userId: session.userId, ip: getClientIp(request) };

  if (!ids.length) {
    return NextResponse.json({ error: "No ids provided" }, { status: 400 });
  }

  switch (body.action) {
    case "activate":
      await bulkUpdateCoupons(ids, "active", audit);
      break;
    case "deactivate":
      await bulkUpdateCoupons(ids, "inactive", audit);
      break;
    case "delete":
      for (const id of ids) {
        await deleteCoupon(id, audit);
      }
      break;
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, count: ids.length });
}
