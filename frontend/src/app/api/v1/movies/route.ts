import { NextResponse } from "next/server";
import { getStoreContent } from "@/lib/cms/server";

export async function GET() {
  const content = await getStoreContent();
  return NextResponse.json({
    totalCount: content.homepage.movies?.totalCount ?? 200000,
    genres: content.homepage.movies?.genres ?? [],
    marqueeTitles: content.homepage.movies?.marqueeTitles ?? [],
    items: content.homepage.movies?.items?.filter((m) => m.featured) ?? []
  });
}
