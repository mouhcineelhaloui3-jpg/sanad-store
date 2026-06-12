import { NextResponse } from "next/server";
import { getStoreContent } from "@/lib/cms/server";

export async function GET() {
  const content = await getStoreContent();
  return NextResponse.json(content, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
  });
}
