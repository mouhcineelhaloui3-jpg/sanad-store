import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogIndexPageClient } from "@/components/blog/BlogIndexPageClient";
import { StructuredData, webPageJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/components/seo/MetaTags";

export const metadata: Metadata = createPageMetadata({
  title: "مدونة SANAD IPTV — أدلة ونصائح",
  description: "IPTV guides: Smart TV, Android, 4K, and premium global subscriptions.",
  path: "/blog",
  keywords: "IPTV blog worldwide, SANAD IPTV guides"
});

export default async function BlogIndexPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;

  return (
    <>
      <StructuredData
        data={webPageJsonLd({
          name: "مدونة SANAD IPTV",
          description: "مقالات IPTV و أدلة SANAD",
          url: "/blog"
        })}
      />
      <Suspense>
        <BlogIndexPageClient query={q} />
      </Suspense>
    </>
  );
}
