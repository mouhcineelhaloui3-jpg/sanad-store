import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsSummary } from "@/lib/analytics/server";

function isAuthorized(request: NextRequest) {
  const key = request.headers.get("x-admin-key");
  const expected = process.env.ADMIN_API_KEY ?? process.env.NEXT_PUBLIC_ADMIN_API_KEY ?? "sanad-admin-dev";
  return key === expected;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = await getAnalyticsSummary();
  return NextResponse.json(summary);
}
