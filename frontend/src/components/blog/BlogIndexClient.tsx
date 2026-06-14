"use client";

import Image from "next/image";
import Link from "next/link";
import { blogCategoryLabels } from "@/lib/blog/types";
import { blogPosts, postReadingTime, searchBlogPosts } from "@/lib/blog/posts";
import { blogReadingTimeLabel, blogUiText } from "@/lib/blog/ui-strings";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function BlogIndexClient({ query }: { query?: string }) {
  const locale = useLocaleStore((s) => s.locale);
  const list = query ? searchBlogPosts(query) : Object.values(blogPosts);

  return (
    <div className="not-prose grid gap-6 md:grid-cols-2">
      {list.length === 0 ? (
        <p className="text-white/60">{blogUiText("noResults", locale)}</p>
      ) : (
        list.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card group block overflow-hidden rounded-2xl transition hover:ring-2 hover:ring-neon-cyan/40"
          >
            <div className="relative aspect-[1200/630] w-full overflow-hidden bg-white/5">
              <Image
                src={post.coverImage}
                alt={t(post.title, locale)}
                fill
                className="object-contain transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-neon-cyan">
                <span>{t(blogCategoryLabels[post.category], locale)}</span>
                <span className="text-white/40">•</span>
                <span className="text-white/50">{blogReadingTimeLabel(postReadingTime(post, locale), locale)}</span>
              </div>
              <h2 className="mt-2 text-xl font-black text-white">{t(post.title, locale)}</h2>
              <p className="mt-2 text-sm text-white/70">{t(post.excerpt, locale)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={t(tag, locale)} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
                    {t(tag, locale)}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
