import type { LocalizedText } from "@/lib/i18n/localized";

export type BlogCategory = "guides" | "devices" | "quality" | "sports" | "vod" | "troubleshooting" | "pricing";

export type BlogPostRaw = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  coverImage: string;
  sections: string[];
  faqs: ReadonlyArray<{ question: string; answer: string }>;
};

export type BlogPostEn = {
  title: string;
  description: string;
  excerpt: string;
  tags: string[];
  sections: string[];
  faqs: ReadonlyArray<{ question: string; answer: string }>;
};

export type BlogPost = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  excerpt: LocalizedText;
  category: BlogCategory;
  tags: LocalizedText[];
  publishedAt: string;
  coverImage: string;
  sections: LocalizedText[];
  faqs: ReadonlyArray<{ question: LocalizedText; answer: LocalizedText }>;
};

export const blogCategoryLabels: Record<BlogCategory, LocalizedText> = {
  guides: { ar: "أدلة", en: "Guides" },
  devices: { ar: "أجهزة", en: "Devices" },
  quality: { ar: "جودة", en: "Quality" },
  sports: { ar: "رياضة", en: "Sports" },
  vod: { ar: "محتوى", en: "VOD" },
  troubleshooting: { ar: "دعم", en: "Support" },
  pricing: { ar: "أسعار", en: "Pricing" }
};
