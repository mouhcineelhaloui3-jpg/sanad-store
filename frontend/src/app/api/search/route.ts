import { NextResponse } from "next/server";
import { searchSite } from "@/lib/search/catalog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const limit = Math.min(Number(searchParams.get("limit") ?? 12), 24);
  const results = searchSite(q, limit);
  return NextResponse.json({ query: q, results, count: results.length });
}
