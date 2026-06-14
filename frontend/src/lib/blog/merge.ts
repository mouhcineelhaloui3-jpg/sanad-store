import type { LocalizedText } from "@/lib/i18n/localized";
import type { BlogPost, BlogPostEn, BlogPostRaw } from "./types";

export function loc(ar: string, en: string): LocalizedText {
  return { ar, en };
}

export function mergeBlogPost(ar: BlogPostRaw, en?: BlogPostEn): BlogPost {
  return {
    slug: ar.slug,
    title: loc(ar.title, en?.title ?? ar.title),
    description: loc(ar.description, en?.description ?? ar.description),
    excerpt: loc(ar.excerpt, en?.excerpt ?? ar.excerpt),
    category: ar.category,
    tags: ar.tags.map((tag, i) => loc(tag, en?.tags[i] ?? tag)),
    publishedAt: ar.publishedAt,
    coverImage: ar.coverImage,
    sections: ar.sections.map((section, i) => loc(section, en?.sections[i] ?? section)),
    faqs: ar.faqs.map((faq, i) => ({
      question: loc(faq.question, en?.faqs[i]?.question ?? faq.question),
      answer: loc(faq.answer, en?.faqs[i]?.answer ?? faq.answer)
    }))
  };
}
