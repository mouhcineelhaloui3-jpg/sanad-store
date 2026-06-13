import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingPageLayout } from "@/components/seo/MarketingPageLayout";
import { PlanLandingCta } from "@/components/seo/PlanLandingCta";
import { StructuredData } from "@/components/seo/StructuredData";
import { createBlogMetadata } from "@/components/seo/MetaTags";
import { blogCategoryLabels, blogPosts, getRelatedPosts, postReadingTime } from "@/lib/blog/posts";
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
    title: article.title,
    description: article.description,
    slug,
    keywords: article.tags.join(", ")
  });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = blogPosts[slug];
  if (!article) notFound();

  const related = getRelatedPosts(slug);
  const readTime = postReadingTime(article);

  return (
    <>
      <StructuredData
        data={[
          articleJsonLd({
            title: article.title,
            description: article.description,
            url: `/blog/${slug}`,
            publishedAt: article.publishedAt
          }),
          faqJsonLd(article.faqs)
        ]}
      />
      <MarketingPageLayout
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المدونة", href: "/blog" },
          { label: article.title }
        ]}
        title={article.title}
        subtitle={article.description}
      >
        <p className="text-sm font-bold text-neon-cyan">
          {blogCategoryLabels[article.category]} • {readTime} د قراءة • {article.publishedAt}
        </p>

        {article.sections.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <section aria-labelledby="article-faq">
          <h2 id="article-faq" className="text-2xl font-black text-white">
            أسئلة شائعة
          </h2>
          <dl className="mt-4 space-y-4">
            {article.faqs.map((faq) => (
              <div key={faq.question} className="glass-card rounded-2xl p-4">
                <dt className="font-black text-neon-cyan">{faq.question}</dt>
                <dd className="mt-2 text-white/80">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <PlanLandingCta />

        {related.length > 0 ? (
          <nav aria-label="مقالات ذات صلة" className="not-prose mt-8">
            <h2 className="text-lg font-black text-white">مقالات ذات صلة</h2>
            <ul className="mt-3 space-y-2">
              {related.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="font-semibold text-neon-cyan underline">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </MarketingPageLayout>
    </>
  );
}
