import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPageLayout } from "@/components/seo/MarketingPageLayout";
import { createPageMetadata } from "@/components/seo/MetaTags";
import { searchSite } from "@/lib/search/catalog";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  const { q } = await searchParams;
  return createPageMetadata({
    title: q ? `نتائج البحث: ${q}` : "بحث SANAD IPTV",
    description: "ابحث في صفحات IPTV، المدونة، والأدلة.",
    path: "/search",
    noIndex: true
  });
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const results = searchSite(q, 20);

  return (
    <MarketingPageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "بحث" }
      ]}
      title={q ? `نتائج: ${q}` : "بحث في الموقع"}
      subtitle="SANAD IPTV — صفحات، مدونة، وأدلة."
    >
      <form action="/search" method="get" className="not-prose mb-8 flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="ابحث..."
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
        />
        <button type="submit" className="btn-neon px-6">
          بحث
        </button>
      </form>
      <ul className="not-prose space-y-3">
        {results.map((item) => (
          <li key={item.id}>
            <Link href={item.href} className="glass-card block rounded-2xl p-4 hover:ring-2 hover:ring-neon-cyan/30">
              <p className="font-black text-white">{item.title}</p>
              <p className="text-sm text-white/60">{item.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </MarketingPageLayout>
  );
}
