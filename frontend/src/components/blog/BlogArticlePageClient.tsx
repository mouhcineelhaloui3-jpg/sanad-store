"use client";

import { Suspense } from "react";
import { BlogArticleClient } from "@/components/blog/BlogArticleClient";
import { BlogPageShell } from "@/components/blog/BlogPageShell";
import { blogPosts } from "@/lib/blog/posts";

export function BlogArticlePageClient({ slug, relatedSlugs }: { slug: string; relatedSlugs: string[] }) {
  const article = blogPosts[slug];
  if (!article) return null;

  return (
    <BlogPageShell title={article.title} subtitle={article.description}>
      <BlogArticleClient slug={slug} relatedSlugs={relatedSlugs} />
    </BlogPageShell>
  );
}

export function BlogArticlePageClientSuspense(props: { slug: string; relatedSlugs: string[] }) {
  return (
    <Suspense>
      <BlogArticlePageClient {...props} />
    </Suspense>
  );
}
