"use client";

import Image from "next/image";
import Link from "next/link";
import { blogCategoryLabels } from "@/lib/blog/types";
import { blogPosts, postReadingTime } from "@/lib/blog/posts";
import { blogReadingTimeLabel, blogUiText } from "@/lib/blog/ui-strings";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function BlogPreviewClient() {
  const locale = useLocaleStore((s) => s.locale);
  const posts = Object.values(blogPosts)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 4);

  return (
    <section className="iptv-section-spacing px-4" aria-labelledby="blog-preview-title">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="section-eyebrow">{blogUiText("blogEyebrow", locale)}</p>
            <h2 id="blog-preview-title" className="section-title mt-1">
              {blogUiText("blogSectionTitle", locale)}
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-bold text-neon-cyan hover:underline">
            {blogUiText("allArticles", locale)}
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass-card-hover group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[1200/630] w-full bg-white/5">
                <Image
                  src={post.coverImage}
                  alt={t(post.title, locale)}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-[11px] font-bold uppercase tracking-wide text-neon-gold">
                  {t(blogCategoryLabels[post.category], locale)} ·{" "}
                  {blogReadingTimeLabel(postReadingTime(post, locale), locale)}
                </span>
                <h3 className="mt-2 line-clamp-2 text-sm font-black text-white group-hover:text-neon-cyan">
                  {t(post.title, locale)}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-xs leading-6 text-white/70">{t(post.excerpt, locale)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
