export type BlogCategory = "guides" | "devices" | "quality" | "sports" | "vod";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  sections: string[];
  faqs: ReadonlyArray<{ question: string; answer: string }>;
};

const WORDS_PER_MINUTE = 180;

export function readingTimeMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function postReadingTime(post: BlogPost) {
  const body = [...post.sections, ...post.faqs.map((f) => `${f.question} ${f.answer}`)].join(" ");
  return readingTimeMinutes(`${post.title} ${post.description} ${body}`);
}

export const blogCategoryLabels: Record<BlogCategory, string> = {
  guides: "أدلة",
  devices: "أجهزة",
  quality: "جودة",
  sports: "رياضة",
  vod: "محتوى"
};

export const blogPosts: Record<string, BlogPost> = {
  "best-iptv-maroc": {
    slug: "best-iptv-maroc",
    title: "أحسن IPTV فالمغرب — دليل 2026",
    description: "معايير اختيار IPTV فالمغرب: الاستقرار، القنوات، الدعم، والأسعار.",
    excerpt: "كيفاش تختار خدمة IPTV موثوقة فالمغرب: الجودة، الدعم، والأسعار.",
    category: "guides",
    tags: ["IPTV Maroc", "SANAD IPTV", "abonnement"],
    publishedAt: "2026-01-15",
    sections: [
      "خدمة IPTV موثوقة خاصها استقرار فالبث، دعم واتساب سريع، وتحديث يومي للمحتوى.",
      "SANAD IPTV كتوفر أكثر من 100,000 قناة، أفلام ومسلسلات، ورياضة 4K.",
      "قارن الباقات: 3 أشهر، 6 أشهر، أو سنة — وجرّب مجاناً قبل الاشتراك."
    ],
    faqs: [
      { question: "واش IPTV قانوني فالمغرب؟", answer: "الخدمة IPTV هي بث عبر الإنترنت — تأكد من مزود موثوق ودعم محلي." }
    ]
  },
  "iptv-smart-tv": {
    slug: "iptv-smart-tv",
    title: "كيفاش تثبت IPTV على Smart TV",
    description: "Smart IPTV و TiviMate — خطوات التثبيت على Samsung و LG.",
    excerpt: "Smart IPTV، TiviMate، SS IPTV — دليل التثبيت السريع.",
    category: "devices",
    tags: ["Smart TV", "Samsung", "TiviMate"],
    publishedAt: "2026-02-01",
    sections: [
      "حمّل Smart IPTV أو SS IPTV من متجر التطبيقات.",
      "دخل M3U أو Xtream codes اللي كتوصلك من SANAD IPTV.",
      "فعّل EPG باش تشوف دليل البرامج."
    ],
    faqs: [{ question: "واش خدام على Samsung؟", answer: "نعم، Smart IPTV خدام على أغلب Smart TV." }]
  },
  "iptv-android": {
    slug: "iptv-android",
    title: "IPTV على Android — دليل كامل",
    description: "IPTV Smarters و TiviMate على الهاتف و Android Box.",
    excerpt: "أحسن التطبيقات والإعدادات لـ Android و Android Box.",
    category: "devices",
    tags: ["Android", "Smarters", "Android Box"],
    publishedAt: "2026-02-10",
    sections: [
      "IPTV Smarters Pro سهل للمبتدئين.",
      "TiviMate الأفضل للمستخدم المتقدم.",
      "استعمل Ethernet على Android Box للاستقرار."
    ],
    faqs: [{ question: "شنو أفضل تطبيق؟", answer: "TiviMate للتلفاز، Smarters للهاتف." }]
  },
  "iptv-4k": {
    slug: "iptv-4k",
    title: "IPTV 4K — شروط ونصائح",
    description: "سرعة الإنترنت، HDR، وأحسن القنوات الرياضية بجودة 4K.",
    excerpt: "شروط 4K، سرعة الإنترنت، وأحسن القنوات الرياضية.",
    category: "quality",
    tags: ["4K", "UHD", "HDR"],
    publishedAt: "2026-03-01",
    sections: [
      "محتاج 25 Mbps+ للبث 4K مستقر.",
      "SANAD IPTV كتدعم HD، FHD، و 4K حسب القناة.",
      "استعمل سلك Ethernet ملي تقدر."
    ],
    faqs: [{ question: "واش 4K خدام على Wi-Fi؟", answer: "نعم، ولكن Ethernet أحسن للمباريات." }]
  }
};

export const blogSlugs = Object.keys(blogPosts);

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = blogPosts[slug];
  if (!current) return [];
  return Object.values(blogPosts)
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const scoreA = (a.category === current.category ? 2 : 0) + a.tags.filter((t) => current.tags.includes(t)).length;
      const scoreB = (b.category === current.category ? 2 : 0) + b.tags.filter((t) => current.tags.includes(t)).length;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

export function searchBlogPosts(query: string): BlogPost[] {
  const q = query.trim().toLowerCase();
  if (!q) return Object.values(blogPosts);
  return Object.values(blogPosts).filter((post) => {
    const haystack = [post.title, post.description, post.excerpt, ...post.tags, ...post.sections].join(" ").toLowerCase();
    return haystack.includes(q) || q.split(/\s+/).every((word) => haystack.includes(word));
  });
}
