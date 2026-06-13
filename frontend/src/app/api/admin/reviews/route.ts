import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { createReview, listReviews } from "@/lib/db/reviews";
import { parseListParams } from "@/lib/db/pagination";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "reviews:read");
  if (error) return error;

  const params = parseListParams(request.nextUrl.searchParams);
  const result = await listReviews(params);
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const { session, error } = requireAdminPermission(request, "reviews:write");
  if (error || !session) return error;

  const body = (await request.json()) as {
    customerName?: string;
    productName?: string;
    rating?: number;
    text?: string;
    customerId?: string;
    productId?: string;
  };

  if (!body.customerName || !body.productName || body.rating == null || !body.text) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const review = await createReview(
    {
      customerName: body.customerName,
      productName: body.productName,
      rating: Number(body.rating),
      text: body.text,
      customerId: body.customerId,
      productId: body.productId
    },
    { userId: session.userId, ip: getClientIp(request) }
  );

  return NextResponse.json(review, { status: 201 });
}
