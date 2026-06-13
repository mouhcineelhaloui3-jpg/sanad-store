import { NextResponse } from "next/server";
import { getStoreContent } from "@/lib/cms/server";

export async function GET() {
  const content = await getStoreContent();
  return NextResponse.json({
    totalCount: content.homepage.movies?.totalCount ?? 120000,
    genres: content.homepage.movies?.genres ?? [],
    marqueeTitles: content.homepage.movies?.marqueeTitles ?? [],
    items: content.homepage.movies?.items?.filter((m) => m.featured).map((m) => ({
      id: m.id,
      title: m.title,
      genre: m.genre,
      year: m.year,
      quality: m.quality,
      rating: m.rating,
      posterUrl: m.posterUrl
    })) ?? []
  });
}
