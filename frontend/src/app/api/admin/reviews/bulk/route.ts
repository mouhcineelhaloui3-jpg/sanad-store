import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { bulkUpdateReviews, deleteReview } from "@/lib/db/reviews";

export async function POST(request: NextRequest) {
  const { session, error } = requireAdminPermission(request, "reviews:write");
  if (error || !session) return error;

  const body = (await request.json()) as { ids?: string[]; action?: string };
  const ids = body.ids ?? [];
  const audit = { userId: session.userId, ip: getClientIp(request) };

  if (!ids.length) {
    return NextResponse.json({ error: "No ids provided" }, { status: 400 });
  }

  switch (body.action) {
    case "approve":
      await bulkUpdateReviews(ids, "approved", audit);
      break;
    case "reject":
      await bulkUpdateReviews(ids, "rejected", audit);
      break;
    case "delete":
      for (const id of ids) {
        await deleteReview(id, audit);
      }
      break;
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, count: ids.length });
}
