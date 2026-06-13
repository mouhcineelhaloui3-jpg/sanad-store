import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPageLayout } from "@/components/seo/MarketingPageLayout";
import { StructuredData, webPageJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/components/seo/MetaTags";
import { blogSlugs } from "@/lib/seo/routes";

const posts: Record<(typeof blogSlugs)[number], { title: string; excerpt: string }> = {
  "best-iptv-maroc": {
    title: "أحسن IPTV فالمغرب 2026",
    excerpt: "كيفاش تختار خدمة IPTV موثوقة فالمغرب: الجودة، الدعم، والأسعار."
  },
  "iptv-smart-tv": {
    title: "IPTV على Smart TV",
    excerpt: "Smart IPTV، TiviMate، SS IPTV — دليل التثبيت السريع."
  },
  "iptv-android": {
    title: "IPTV على Android",
    excerpt: "أحسن التطبيقات والإعدادات لـ Android و Android Box."
  },
  "iptv-4k": {
    title: "IPTV بجودة 4K",
    excerpt: "شروط 4K، سرعة الإنترنت، وأحسن القنوات الرياضية."
  }
};

export const metadata: Metadata = createPageMetadata({
  title: "مدونة SANAD IPTV — أدلة ونصائح",
  description: "مقالات IPTV: Smart TV، Android، 4K، وأحسن اشتراك فالمغرب.",
  path: "/blog",
  keywords: "IPTV blog Maroc, SANAD IPTV guides"
});

export default function BlogIndexPage() {
  return (
    <>
      <StructuredData
        data={webPageJsonLd({
          name: "مدونة SANAD IPTV",
          description: metadata.description as string,
          url: "/blog"
        })}
      />
      <MarketingPageLayout
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المدونة" }
        ]}
        title="مدونة SANAD IPTV"
        subtitle="أدلة عملية باش تستافد أكثر من الاشتراك."
      >
        <div className="not-prose grid gap-4">
          {blogSlugs.map((slug) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="glass-card block rounded-2xl p-6 transition hover:ring-2 hover:ring-neon-cyan/40"
            >
              <h2 className="text-xl font-black text-white">{posts[slug].title}</h2>
              <p className="mt-2 text-sm text-white/70">{posts[slug].excerpt}</p>
            </Link>
          ))}
        </div>
      </MarketingPageLayout>
    </>
  );
}
