import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePageClientSuspense } from "@/components/blog/BlogArticlePageClient";
import { StructuredData } from "@/components/seo/StructuredData";
import { createBlogMetadata } from "@/components/seo/MetaTags";
import { blogPosts, getRelatedPosts } from "@/lib/blog/posts";
import { t } from "@/lib/i18n/localized";
import { articleJsonLd, faqJsonLd } from "@/lib/seo/structured-data";

export const revalidate = 3600;

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = blogPosts[slug];
  if (!article) return {};
  return createBlogMetadata({
    title: t(article.title, "ar-ma"),
    description: t(article.description, "ar-ma"),
    slug,
    keywords: article.tags.map((tag) => t(tag, "ar-ma")).join(", ")
  });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = blogPosts[slug];
  if (!article) notFound();

  const related = getRelatedPosts(slug);

  return (
    <>
      <StructuredData
        data={[
          articleJsonLd({
            title: t(article.title, "ar-ma"),
            description: t(article.description, "ar-ma"),
            url: `/blog/${slug}`,
            publishedAt: article.publishedAt,
            imageUrl: article.coverImage
          }),
          faqJsonLd(
            article.faqs.map((faq) => ({
              question: t(faq.question, "ar-ma"),
              answer: t(faq.answer, "ar-ma")
            }))
          )
        ]}
      />
      <BlogArticlePageClientSuspense slug={slug} relatedSlugs={related.map((p) => p.slug)} />
    </>
  );
}
