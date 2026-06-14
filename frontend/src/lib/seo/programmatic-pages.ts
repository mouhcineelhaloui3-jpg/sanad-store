import type { PlanSlug } from "@/lib/plan-routes";

export type ContentBlock = {
  heading: string;
  paragraphs: string[];
};

export type ProgrammaticPage = {
  slug: string;
  title: string;
  description: string;
  subtitle: string;
  keywords: string;
  sections: string[];
  contentBlocks?: ContentBlock[];
  faqs: ReadonlyArray<{ question: string; answer: string }>;
  relatedSlugs: string[];
  planSlug?: PlanSlug;
};

export const programmaticPages: Record<string, ProgrammaticPage> = {
  "iptv-worldwide": {
    slug: "iptv-worldwide",
    title: "Premium IPTV Worldwide — SANAD IPTV Subscription",
    description:
      "Premium IPTV for customers worldwide: +115K channels, 120K+ VOD, 4K sports. Instant activation within 5 minutes and 24/7 WhatsApp support.",
    subtitle: "Trusted global IPTV — international channels, beIN, Netflix-style VOD.",
    keywords: "IPTV worldwide, global IPTV subscription, SANAD IPTV, international channels",
    sections: [
      "SANAD IPTV delivers stable streaming for international and regional channels with daily content updates.",
      "Plans: 3 months (80 MAD), 6 months (140 MAD), 12 months (240 MAD), 2 devices (400 MAD) — instant activation.",
      "Try free before subscribing and contact us on WhatsApp for activation anywhere in the world."
    ],
    contentBlocks: [
      {
        heading: "Global IPTV Subscription — What You Get",
        paragraphs: [
          "SANAD IPTV is a premium IPTV subscription for customers worldwide: Arabic, European, American, and Spanish channels, plus VOD movies, series, and 4K sports.",
          "What sets SANAD apart is stream stability, multilingual WhatsApp support, and daily content updates.",
          "Looking for a reliable global IPTV provider? SANAD offers a free trial before you choose the right plan."
        ]
      },
      {
        heading: "International Channels & Sports — beIN & More",
        paragraphs: [
          "With SANAD IPTV, watch global sports leagues, national broadcasters, and premium sports channels: Champions League, La Liga, Premier League, and more.",
          "Streaming works on Smart TV, Android, iPhone, Fire Stick, and Android Box — see device setup guides.",
          "For major events, we recommend Ethernet or 5GHz Wi-Fi to avoid buffering."
        ]
      },
      {
        heading: "SANAD IPTV Plans — Global Pricing",
        paragraphs: [
          "Starter 3 months: 80 MAD — ideal for first-time subscribers.",
          "Confort 6 months: 140 MAD — most popular (+115K channels, 7-day Replay).",
          "Premium 12 months: 240 MAD — best value (+115K channels, 120K+ VOD, 30-day guarantee).",
          "2-device 12 months: 400 MAD — 2 IPTV codes.",
          "Instant activation via WhatsApp after payment — no long wait."
        ]
      }
    ],
    faqs: [
      { question: "Does SANAD IPTV work worldwide?", answer: "Yes — the service is available internationally with global support." },
      { question: "How long does activation take?", answer: "Instant after WhatsApp contact." }
    ],
    relatedSlugs: ["iptv-sports", "iptv-4k", "iptv-smart-tv"],
    planSlug: "plan-6-months"
  },
  "iptv-smart-tv": {
    slug: "iptv-smart-tv",
    title: "IPTV Smart TV — Samsung, LG, Android TV",
    description: "ثبت IPTV على Smart TV: Smart IPTV، SS IPTV، TiviMate. دليل SANAD IPTV.",
    subtitle: "خطوات بسيطة باش تشوف +115K قناة على التلفاز الذكي.",
    keywords: "IPTV Smart TV, Samsung IPTV, LG IPTV, TiviMate IPTV",
    sections: [
      "حمّل Smart IPTV أو SS IPTV من متجر التطبيقات.",
      "دخل M3U أو Xtream codes من SANAD IPTV.",
      "فعّل EPG باش تشوف دليل البرامج."
    ],
    contentBlocks: [
      {
        heading: "IPTV Smart TV — Samsung و LG و Android TV",
        paragraphs: [
          "Smart TV IPTV كيتثبت بسهولة عبر تطبيقات Smart IPTV، SS IPTV، أو TiviMate (Android TV).",
          "SANAD IPTV كتوفر Xtream codes و M3U playlist جاهزة للنسخ — التفعيل فوري بعد الاشتراك.",
          "ل Samsung و LG، Smart IPTV هو الحل الأسرع. ل Android TV و Google TV، TiviMate أحسن تجربة."
        ]
      },
      {
        heading: "خطوات التثبيت على Smart TV",
        paragraphs: [
          "1. اشترك ف SANAD IPTV وتواصل عبر واتساب.",
          "2. حمّل التطبيق من متجر التلفاز.",
          "3. دخل الرابط أو Xtream (Server, Username, Password).",
          "4. فعّل EPG ورتّب القنوات المفضلة.",
          "5. للجودة 4K، تأكد من سرعة الإنترنت 25 Mbps+."
        ]
      },
      {
        heading: "مقارنة التطبيقات — Smart IPTV vs TiviMate",
        paragraphs: [
          "Smart IPTV: سهل، خدام على أغلب Smart TV، مناسب للمبتدئين.",
          "TiviMate: واجهة احترافية، EPG قوي، مناسب Android TV و Fire Stick.",
          "SS IPTV: بديل جيد ل Samsung — مجاني لفترة تجريبية."
        ]
      }
    ],
    faqs: [
      { question: "واش خدام على Samsung؟", answer: "نعم، Smart IPTV خدام على أغلب Smart TV." },
      { question: "واش TiviMate أحسن؟", answer: "TiviMate ممتاز على Android TV و Fire Stick." }
    ],
    relatedSlugs: ["iptv-firestick", "iptv-android", "iptv-4k"],
    planSlug: "plan-3-months"
  },
  "iptv-android": {
    slug: "iptv-android",
    title: "IPTV Android — هاتف و Android Box",
    description: "IPTV Smarters و TiviMate على Android. إعداد SANAD IPTV في دقائق.",
    subtitle: "أحسن التطبيقات والإعدادات للهاتف و Android Box.",
    keywords: "IPTV Android, IPTV Smarters, TiviMate Android, Android Box IPTV",
    sections: [
      "IPTV Smarters Pro سهل للمبتدئين.",
      "TiviMate الأفضل للمستخدم المتقدم.",
      "استعمل Ethernet على Android Box للاستقرار."
    ],
    contentBlocks: [
      {
        heading: "IPTV Android — هاتف، تابلت، و Android Box",
        paragraphs: [
          "IPTV Android كيتم عبر IPTV Smarters Pro للمبتدئين أو TiviMate للمستخدم المتقدم.",
          "SANAD IPTV subscription كيخدم على جميع أجهزة Android: Samsung Galaxy، Xiaomi، Huawei، و TV Box.",
          "للاستقرار، استعمل Ethernet على Android Box و Wi-Fi 5GHz على الهاتف."
        ]
      },
      {
        heading: "أحسن تطبيقات IPTV على Android",
        paragraphs: [
          "IPTV Smarters Pro: واجهة بسيطة، login ب Xtream، مناسب للمبتدئين.",
          "TiviMate: EPG، multi-view، recording — الأفضل على Android TV.",
          "Perfect Player: خيار للمستخدمين التقنيين."
        ]
      },
      {
        heading: "إعداد SANAD IPTV على Android",
        paragraphs: [
          "حمّل التطبيق من Google Play أو APK رسمي.",
          "دخل Xtream codes من SANAD (بعد الاشتراك عبر واتساب).",
          "فعّل Hardware decoding للبث 4K.",
          "شوف أيضاً: IPTV Smart TV و IPTV 4K للجودة العالية."
        ]
      }
    ],
    faqs: [
      { question: "شنو أفضل تطبيق؟", answer: "TiviMate للتلفاز، Smarters للهاتف." },
      { question: "واش خدام على 4G؟", answer: "نعم، ولكن Wi-Fi أو Ethernet أحسن." }
    ],
    relatedSlugs: ["iptv-smart-tv", "iptv-firestick", "iptv-worldwide"],
    planSlug: "plan-6-months"
  },
  "iptv-iphone": {
    slug: "iptv-iphone",
    title: "IPTV iPhone و iPad — GSE Smart IPTV",
    description: "شوف IPTV على iPhone و iPad مع GSE Smart IPTV و SANAD IPTV.",
    subtitle: "إعداد سريع على iOS بدون jailbreak.",
    keywords: "IPTV iPhone, IPTV iPad, GSE Smart IPTV, iOS Global IPTV",
    sections: [
      "حمّل GSE Smart IPTV من App Store.",
      "أضف playlist M3U أو Xtream من SANAD IPTV.",
      "استعمل AirPlay باش تعرض على التلفاز."
    ],
    faqs: [
      { question: "واش كاين تطبيق رسمي؟", answer: "GSE Smart IPTV هو الأكثر استعمالاً على iOS." },
      { question: "واش Picture-in-Picture خدام؟", answer: "نعم على iOS 14+ مع GSE Pro." }
    ],
    relatedSlugs: ["iptv-smart-tv", "iptv-android", "iptv-series"],
    planSlug: "plan-3-months"
  },
  "iptv-firestick": {
    slug: "iptv-firestick",
    title: "IPTV Fire Stick — TiviMate و Smarters",
    description: "ثبت SANAD IPTV على Amazon Fire Stick. TiviMate، Smarters، Downloader.",
    subtitle: "Fire TV Stick 4K — أحسن إعداد للبث المستقر.",
    keywords: "IPTV Fire Stick, Fire TV IPTV, TiviMate Firestick, SANAD IPTV",
    sections: [
      "فعّل Unknown Sources في Fire TV Settings.",
      "حمّل Downloader وثبت TiviMate أو Smarters.",
      "دخل Xtream codes من SANAD IPTV."
    ],
    faqs: [
      { question: "واش Fire Stick 4K كافي؟", answer: "نعم، 4K Max أحسن للبث 4K." },
      { question: "واش Ethernet adapter ضروري؟", answer: "مستحسن للمباريات والبث 4K." }
    ],
    relatedSlugs: ["iptv-smart-tv", "iptv-4k", "iptv-sports"],
    planSlug: "plan-6-months"
  },
  "iptv-4k": {
    slug: "iptv-4k",
    title: "IPTV 4K — UHD و HDR",
    description: "بث IPTV بجودة 4K: شروط الإنترنت، HDR، وأحسن القنوات الرياضية.",
    subtitle: "محتاج 25 Mbps+ للبث 4K مستقر.",
    keywords: "IPTV 4K, UHD IPTV, HDR streaming, 4K sports IPTV",
    sections: [
      "محتاج 25 Mbps+ للبث 4K مستقر.",
      "SANAD IPTV كتدعم HD، FHD، و 4K حسب القناة.",
      "استعمل سلك Ethernet ملي تقدر."
    ],
    faqs: [
      { question: "واش 4K خدام على Wi-Fi؟", answer: "نعم، ولكن Ethernet أحسن للمباريات." },
      { question: "واش HDR مدعوم؟", answer: "حسب القناة والجهاز." }
    ],
    relatedSlugs: ["iptv-sports", "iptv-worldwide", "iptv-firestick"],
    planSlug: "plan-12-months"
  },
  "iptv-sports": {
    slug: "iptv-sports",
    title: "IPTV رياضة — Champions League و Botola",
    description: "قنوات رياضية IPTV: Champions League، La Liga، Botola Pro، beIN. SANAD IPTV.",
    subtitle: "مباريات live بجودة HD/4K بدون تقطيع.",
    keywords: "IPTV sports, Champions League IPTV, Botola Pro IPTV, beIN Sports",
    sections: [
      "Champions League، La Liga، Premier League، Botola Pro.",
      "بث مستقر مع EPG و replay.",
      "SANAD IPTV — دعم واتساب قبل المباريات الكبيرة."
    ],
    faqs: [
      { question: "واش Botola Pro كاينة؟", answer: "نعم، القنوات الرياضية الدولية والعالمية." },
      { question: "واش في replay؟", answer: "حسب القناة والتطبيق." }
    ],
    relatedSlugs: ["iptv-4k", "iptv-worldwide", "iptv-smart-tv"],
    planSlug: "plan-6-months"
  },
  "iptv-films": {
    slug: "iptv-films",
    title: "IPTV أفلام — VOD و 4K Movies",
    description: "+120K VOD IPTV: أحدث الأفلام والمسلسلات، 4K. SANAD IPTV العالمي.",
    subtitle: "مكتبة أفلام ضخمة محدّثة يومياً.",
    keywords: "IPTV movies, VOD IPTV, 4K movies IPTV, أفلام IPTV",
    sections: [
      "+120,000 فيلم ومسلسل VOD.",
      "جودة HD، FHD، و 4K.",
      "تصنيفات: Action، Drama، Arabic، Netflix-style."
    ],
    faqs: [
      { question: "واش الأفلام محدّثة؟", answer: "نعم، تحديث يومي للمحتوى الجديد." },
      { question: "واش كاين ترجمة عربية؟", answer: "حسب الفيلم — أغلب المحتوى فيه subtitles." }
    ],
    relatedSlugs: ["iptv-series", "iptv-4k", "iptv-worldwide"],
    planSlug: "plan-12-months"
  },
  "iptv-series": {
    slug: "iptv-series",
    title: "IPTV مسلسلات — Series و Box-Sets",
    description: "مسلسلات IPTV: عربية، تركية، أمريكية. SANAD IPTV — seasons كاملة.",
    subtitle: "مسلسلات كاملة seasons — Netflix، Shahid-style.",
    keywords: "IPTV series, مسلسلات IPTV, Turkish series IPTV, Arabic series",
    sections: [
      "مسلسلات عربية، تركية، أمريكية، كorean.",
      "Seasons كاملة و episodes جديدة.",
      "SANAD IPTV — VOD + live channels."
    ],
    faqs: [
      { question: "واش المسلسلات التركية كاينة؟", answer: "نعم، مكتبة ضخمة محدّثة." },
      { question: "واش كاين Continue Watching؟", answer: "حسب التطبيق — TiviMate و Smarters يدعمو resume." }
    ],
    relatedSlugs: ["iptv-films", "iptv-worldwide", "iptv-smart-tv"],
    planSlug: "plan-6-months"
  }
};

export const programmaticSlugs = Object.keys(programmaticPages);
