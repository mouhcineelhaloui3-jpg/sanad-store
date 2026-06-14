import { t, type Locale } from "@/lib/i18n/localized";

export const blogUi = {
  pageTitle: { ar: "مدونة SANAD IPTV", en: "SANAD IPTV Blog" },
  pageSubtitle: {
    ar: "أدلة عملية باش تستافد أكثر من الاشتراك.",
    en: "Practical guides to get the most from your subscription."
  },
  home: { ar: "الرئيسية", en: "Home" },
  blog: { ar: "المدونة", en: "Blog" },
  searchPlaceholder: { ar: "ابحث في المقالات...", en: "Search articles..." },
  searchButton: { ar: "بحث", en: "Search" },
  noResults: { ar: "لا توجد مقالات مطابقة.", en: "No matching articles." },
  loading: { ar: "جاري التحميل...", en: "Loading..." },
  allArticles: { ar: "جميع المقالات ←", en: "All articles →" },
  blogEyebrow: { ar: "مدونة IPTV", en: "IPTV Blog" },
  blogSectionTitle: { ar: "أدلة ونصائح IPTV", en: "IPTV Guides & Tips" },
  faqTitle: { ar: "أسئلة شائعة", en: "FAQ" },
  relatedTitle: { ar: "مقالات ذات صلة", en: "Related articles" },
  readTime: { ar: "د قراءة", en: "min read" }
} as const;

export function blogUiText(key: keyof typeof blogUi, locale: Locale) {
  return t(blogUi[key], locale);
}

export function blogReadingTimeLabel(minutes: number, locale: Locale) {
  return locale === "en" ? `${minutes} min read` : `${minutes} ${blogUi.readTime.ar}`;
}
