import { NextRequest, NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { reindexAllSearch, searchGlobal } from "@/lib/db/search";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "dashboard:read");
  if (error) return error;

  const q = request.nextUrl.searchParams.get("q") ?? "";
  const results = await searchGlobal(q, 25);
  return NextResponse.json({ results });
}

export async function POST(request: NextRequest) {
  const { error } = requireAdminPermission(request, "settings:write");
  if (error) return error;

  const summary = await reindexAllSearch();
  return NextResponse.json({ ok: true, summary });
}
