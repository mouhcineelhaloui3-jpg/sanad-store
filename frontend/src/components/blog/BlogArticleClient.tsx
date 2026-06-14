"use client";

import Image from "next/image";
import Link from "next/link";
import { PlanLandingCta } from "@/components/seo/PlanLandingCta";
import { blogCategoryLabels } from "@/lib/blog/types";
import { blogPosts, postReadingTime } from "@/lib/blog/posts";
import { blogReadingTimeLabel, blogUiText } from "@/lib/blog/ui-strings";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function BlogArticleClient({ slug, relatedSlugs }: { slug: string; relatedSlugs: string[] }) {
  const locale = useLocaleStore((s) => s.locale);
  const article = blogPosts[slug];
  if (!article) return null;

  const related = relatedSlugs.map((s) => blogPosts[s]).filter(Boolean);
  const readTime = postReadingTime(article, locale);

  return (
    <>
      <p className="text-sm font-bold text-neon-cyan">
        {t(blogCategoryLabels[article.category], locale)} • {blogReadingTimeLabel(readTime, locale)} •{" "}
        {article.publishedAt}
      </p>

      <div className="not-prose relative my-6 aspect-[1200/630] overflow-hidden rounded-2xl bg-white/5">
        <Image
          src={article.coverImage}
          alt={t(article.title, locale)}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>

      {article.sections.map((paragraph) => (
        <p key={t(paragraph, locale)}>{t(paragraph, locale)}</p>
      ))}

      <section aria-labelledby="article-faq">
        <h2 id="article-faq" className="text-2xl font-black text-white">
          {blogUiText("faqTitle", locale)}
        </h2>
        <dl className="mt-4 space-y-4">
          {article.faqs.map((faq) => (
            <div key={t(faq.question, locale)} className="glass-card rounded-2xl p-4">
              <dt className="font-black text-neon-cyan">{t(faq.question, locale)}</dt>
              <dd className="mt-2 text-white/80">{t(faq.answer, locale)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <PlanLandingCta />

      {related.length > 0 ? (
        <nav aria-label={blogUiText("relatedTitle", locale)} className="not-prose mt-8">
          <h2 className="text-lg font-black text-white">{blogUiText("relatedTitle", locale)}</h2>
          <ul className="mt-3 space-y-2">
            {related.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="font-semibold text-neon-cyan underline">
                  {t(post.title, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
}
