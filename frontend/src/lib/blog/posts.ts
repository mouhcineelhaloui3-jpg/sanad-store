export type { BlogCategory, BlogPost, BlogPostEn, BlogPostRaw } from "./types";
export { blogCategoryLabels } from "./types";

import { t, type Locale } from "@/lib/i18n/localized";
import { mergeBlogPost } from "./merge";
import { blogPostsData } from "./posts-data";
import { blogPostsEn } from "./posts-en";

const WORDS_PER_MINUTE = 180;

export function readingTimeMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function postReadingTime(post: import("./types").BlogPost, locale: Locale = "ar-ma") {
  const body = [
    ...post.sections.map((s) => t(s, locale)),
    ...post.faqs.map((f) => `${t(f.question, locale)} ${t(f.answer, locale)}`)
  ].join(" ");
  return readingTimeMinutes(`${t(post.title, locale)} ${t(post.description, locale)} ${body}`);
}

export const blogPosts: Record<string, import("./types").BlogPost> = Object.fromEntries(
  Object.entries(blogPostsData).map(([slug, ar]) => [slug, mergeBlogPost(ar, blogPostsEn[slug])])
);

export const blogSlugs = Object.keys(blogPosts);

export function getRelatedPosts(slug: string, limit = 3) {
  const current = blogPosts[slug];
  if (!current) return [];
  return Object.values(blogPosts)
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const tagMatch = (post: import("./types").BlogPost) =>
        post.tags.filter((tag) => current.tags.some((ct) => ct.ar === tag.ar)).length;
      const scoreA = (a.category === current.category ? 2 : 0) + tagMatch(a);
      const scoreB = (b.category === current.category ? 2 : 0) + tagMatch(b);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

function postHaystack(post: import("./types").BlogPost) {
  const parts: string[] = [];
  for (const field of [post.title, post.description, post.excerpt, ...post.tags, ...post.sections]) {
    parts.push(t(field, "ar-ma"), t(field, "en"));
  }
  for (const faq of post.faqs) {
    parts.push(t(faq.question, "ar-ma"), t(faq.question, "en"), t(faq.answer, "ar-ma"), t(faq.answer, "en"));
  }
  return parts.join(" ").toLowerCase();
}

export function searchBlogPosts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return Object.values(blogPosts);
  return Object.values(blogPosts).filter((post) => {
    const haystack = postHaystack(post);
    return haystack.includes(q) || q.split(/\s+/).every((word) => haystack.includes(word));
  });
}
