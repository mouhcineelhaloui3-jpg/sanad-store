export type BlogCategory = "guides" | "devices" | "quality" | "sports" | "vod" | "troubleshooting" | "pricing";

export type BlogPost = {
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

export const blogCategoryLabels: Record<BlogCategory, string> = {
  guides: "أدلة",
  devices: "أجهزة",
  quality: "جودة",
  sports: "رياضة",
  vod: "محتوى",
  troubleshooting: "دعم",
  pricing: "أسعار"
};
