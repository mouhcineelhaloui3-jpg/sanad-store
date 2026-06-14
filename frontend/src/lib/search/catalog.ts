import { blogPosts } from "@/lib/blog/posts";
import { t } from "@/lib/i18n/localized";
import { programmaticPages } from "@/lib/seo/programmatic-pages";

export type SearchDocument = {
  id: string;
  title: string;
  description: string;
  href: string;
  type: "page" | "blog" | "landing";
  keywords: string[];
};

const staticPages: SearchDocument[] = [
  { id: "home", title: "SANAD IPTV — الرئيسية", description: "اشتراك IPTV المغرب", href: "/", type: "page", keywords: ["iptv", "maroc", "sanad"] },
  { id: "pricing", title: "أسعار IPTV", description: "باقات 3، 6، 12 شهر", href: "/pricing", type: "page", keywords: ["pricing", "plans", "أسعار"] },
  { id: "trial", title: "تجربة مجانية", description: "جرّب IPTV مجاناً", href: "/trial", type: "page", keywords: ["trial", "free", "مجاني"] },
  { id: "contact", title: "اتصل بنا", description: "واتساب و تيليغرام", href: "/contact", type: "page", keywords: ["contact", "whatsapp"] },
  { id: "blog", title: "المدونة", description: "أدلة IPTV", href: "/blog", type: "page", keywords: ["blog", "guides"] }
];

function buildIndex(): SearchDocument[] {
  const landingDocs: SearchDocument[] = Object.values(programmaticPages).map((p) => ({
    id: p.slug,
    title: p.title,
    description: p.description,
    href: `/iptv/${p.slug}`,
    type: "landing" as const,
    keywords: p.keywords.split(/[,،]/).map((k) => k.trim().toLowerCase())
  }));

  const blogDocs: SearchDocument[] = Object.values(blogPosts).map((p) => ({
    id: p.slug,
    title: `${t(p.title, "ar-ma")} | ${t(p.title, "en")}`,
    description: `${t(p.excerpt, "ar-ma")} ${t(p.excerpt, "en")}`,
    href: `/blog/${p.slug}`,
    type: "blog" as const,
    keywords: p.tags.flatMap((tag) => [t(tag, "ar-ma"), t(tag, "en")].map((k) => k.toLowerCase()))
  }));

  return [...staticPages, ...landingDocs, ...blogDocs];
}

let cachedIndex: SearchDocument[] | null = null;

export function getSearchIndex() {
  if (!cachedIndex) cachedIndex = buildIndex();
  return cachedIndex;
}

export function searchSite(query: string, limit = 12): SearchDocument[] {
  const q = query.trim().toLowerCase();
  if (!q) return getSearchIndex().slice(0, limit);

  const terms = q.split(/\s+/).filter(Boolean);

  return getSearchIndex()
    .map((doc) => {
      const haystack = [doc.title, doc.description, ...doc.keywords].join(" ").toLowerCase();
      const score = terms.reduce((sum, term) => (haystack.includes(term) ? sum + 1 : sum), 0);
      return { doc, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ doc }) => doc);
}

export const trendingSearches = [
  "IPTV Maroc",
  "Smart TV",
  "4K",
  "Champions League",
  "تجربة مجانية"
];
