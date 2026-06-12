import { NextRequest, NextResponse } from "next/server";
import { getStoreContent, saveStoreContent } from "@/lib/cms/server";
import type { StoreContent } from "@/lib/cms/types";

function isAuthorized(request: NextRequest) {
  const key = request.headers.get("x-admin-key");
  const expected = process.env.ADMIN_API_KEY ?? process.env.NEXT_PUBLIC_ADMIN_API_KEY ?? "sanad-admin-dev";
  return key === expected;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = await getStoreContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as StoreContent;
  const saved = await saveStoreContent(body);
  return NextResponse.json(saved);
}
