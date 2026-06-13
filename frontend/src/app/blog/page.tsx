import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { MarketingPageLayout } from "@/components/seo/MarketingPageLayout";
import { StructuredData, webPageJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/components/seo/MetaTags";
import { blogCategoryLabels, blogPosts, postReadingTime, searchBlogPosts } from "@/lib/blog/posts";

export const metadata: Metadata = createPageMetadata({
  title: "مدونة SANAD IPTV — أدلة ونصائح",
  description: "مقالات IPTV: Smart TV، Android، 4K، وأحسن اشتراك فالمغرب.",
  path: "/blog",
  keywords: "IPTV blog Maroc, SANAD IPTV guides"
});

function BlogList({ query }: { query?: string }) {
  const list = query ? searchBlogPosts(query) : Object.values(blogPosts);

  return (
    <div className="not-prose grid gap-4">
      {list.length === 0 ? (
        <p className="text-white/60">لا توجد مقالات مطابقة.</p>
      ) : (
        list.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card block rounded-2xl p-6 transition hover:ring-2 hover:ring-neon-cyan/40"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-neon-cyan">
              <span>{blogCategoryLabels[post.category]}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/50">{postReadingTime(post)} د read</span>
            </div>
            <h2 className="mt-2 text-xl font-black text-white">{post.title}</h2>
            <p className="mt-2 text-sm text-white/70">{post.excerpt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

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
      <MarketingPageLayout
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المدونة" }
        ]}
        title="مدونة SANAD IPTV"
        subtitle="أدلة عملية باش تستافد أكثر من الاشتراك."
      >
        <form action="/blog" method="get" className="not-prose mb-8 flex gap-2">
          <input
            name="q"
            defaultValue={q}
            placeholder="ابحث في المقالات..."
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-neon-cyan/40"
          />
          <button type="submit" className="btn-neon px-6">
            بحث
          </button>
        </form>
        <Suspense fallback={<p className="text-white/50">جاري التحميل...</p>}>
          <BlogList query={q} />
        </Suspense>
      </MarketingPageLayout>
    </>
  );
}
