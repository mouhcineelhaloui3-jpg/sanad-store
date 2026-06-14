export type { BlogCategory, BlogPost } from "./types";
export { blogCategoryLabels } from "./types";

import { blogPostsData } from "./posts-data";

const WORDS_PER_MINUTE = 180;

export function readingTimeMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function postReadingTime(post: import("./types").BlogPost) {
  const body = [...post.sections, ...post.faqs.map((f) => `${f.question} ${f.answer}`)].join(" ");
  return readingTimeMinutes(`${post.title} ${post.description} ${body}`);
}

export const blogPosts = blogPostsData;
export const blogSlugs = Object.keys(blogPostsData);

export function getRelatedPosts(slug: string, limit = 3) {
  const current = blogPostsData[slug];
  if (!current) return [];
  return Object.values(blogPostsData)
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const scoreA = (a.category === current.category ? 2 : 0) + a.tags.filter((t) => current.tags.includes(t)).length;
      const scoreB = (b.category === current.category ? 2 : 0) + b.tags.filter((t) => current.tags.includes(t)).length;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

export function searchBlogPosts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return Object.values(blogPostsData);
  return Object.values(blogPostsData).filter((post) => {
    const haystack = [post.title, post.description, post.excerpt, ...post.tags, ...post.sections].join(" ").toLowerCase();
    return haystack.includes(q) || q.split(/\s+/).every((word) => haystack.includes(word));
  });
}
