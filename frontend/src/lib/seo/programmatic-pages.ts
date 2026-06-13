export type ProgrammaticPage = {
  slug: string;
  title: string;
  description: string;
  subtitle: string;
  keywords: string;
  sections: string[];
  faqs: ReadonlyArray<{ question: string; answer: string }>;
  relatedSlugs: string[];
  planSlug?: "plan-3-months" | "plan-6-months" | "plan-12-months";
};

export const programmaticPages: Record<string, ProgrammaticPage> = {
  "iptv-maroc": {
    slug: "iptv-maroc",
    title: "IPTV المغرب — اشتراك SANAD IPTV",
    description:
      "أحسن IPTV فالمغرب: +100K قناة، رياضة 4K، أفلام ومسلسلات. تفعيل فوري ودعم واتساب 24/7.",
    subtitle: "خدمة IPTV موثوقة للمغاربة — Botola Pro، beIN، Netflix-style VOD.",
    keywords: "IPTV Maroc, abonnement IPTV Maroc, SANAD IPTV, قنوات مغربية",
    sections: [
      "SANAD IPTV كتوفر بث مستقر للقنوات المغربية والعالمية مع تحديث يومي للمحتوى.",
      "الباقات: 3 أشهر (150 د.م.)، 6 أشهر (250 د.م.)، سنة (400 د.م.) — تفعيل فوري.",
      "جرّب مجاناً قبل الاشتراك وتواصل معنا عبر واتساب للتفعيل."
    ],
    faqs: [
      { question: "واش SANAD IPTV خدام فالمغرب؟", answer: "نعم، الخدمة محسّنة للمغرب مع دعم محلي." },
      { question: "شحال كتاخد التفعيل؟", answer: "فوري بعد التواصل عبر واتساب." }
    ],
    relatedSlugs: ["iptv-sports", "iptv-4k", "iptv-smart-tv"],
    planSlug: "plan-6-months"
  },
  "iptv-smart-tv": {
    slug: "iptv-smart-tv",
    title: "IPTV Smart TV — Samsung, LG, Android TV",
    description: "ثبت IPTV على Smart TV: Smart IPTV، SS IPTV، TiviMate. دليل SANAD IPTV.",
    subtitle: "خطوات بسيطة باش تشوف +100K قناة على التلفاز الذكي.",
    keywords: "IPTV Smart TV, Samsung IPTV, LG IPTV, TiviMate Maroc",
    sections: [
      "حمّل Smart IPTV أو SS IPTV من متجر التطبيقات.",
      "دخل M3U أو Xtream codes من SANAD IPTV.",
      "فعّل EPG باش تشوف دليل البرامج."
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
    faqs: [
      { question: "شنو أفضل تطبيق؟", answer: "TiviMate للتلفاز، Smarters للهاتف." },
      { question: "واش خدام على 4G؟", answer: "نعم، ولكن Wi-Fi أو Ethernet أحسن." }
    ],
    relatedSlugs: ["iptv-smart-tv", "iptv-firestick", "iptv-maroc"],
    planSlug: "plan-6-months"
  },
  "iptv-iphone": {
    slug: "iptv-iphone",
    title: "IPTV iPhone و iPad — GSE Smart IPTV",
    description: "شوف IPTV على iPhone و iPad مع GSE Smart IPTV و SANAD IPTV.",
    subtitle: "إعداد سريع على iOS بدون jailbreak.",
    keywords: "IPTV iPhone, IPTV iPad, GSE Smart IPTV, iOS IPTV Maroc",
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
    relatedSlugs: ["iptv-sports", "iptv-maroc", "iptv-firestick"],
    planSlug: "plan-12-months"
  },
  "iptv-sports": {
    slug: "iptv-sports",
    title: "IPTV رياضة — Champions League و Botola",
    description: "قنوات رياضية IPTV: Champions League، La Liga، Botola Pro، beIN. SANAD IPTV.",
    subtitle: "مباريات live بجودة HD/4K بدون تقطيع.",
    keywords: "IPTV sports, Champions League IPTV, Botola Pro IPTV, beIN Maroc",
    sections: [
      "Champions League، La Liga، Premier League، Botola Pro.",
      "بث مستقر مع EPG و replay.",
      "SANAD IPTV — دعم واتساب قبل المباريات الكبيرة."
    ],
    faqs: [
      { question: "واش Botola Pro كاينة؟", answer: "نعم، القنوات الرياضية المغربية والعالمية." },
      { question: "واش في replay؟", answer: "حسب القناة والتطبيق." }
    ],
    relatedSlugs: ["iptv-4k", "iptv-maroc", "iptv-smart-tv"],
    planSlug: "plan-6-months"
  },
  "iptv-films": {
    slug: "iptv-films",
    title: "IPTV أفلام — VOD و 4K Movies",
    description: "+200K فيلم IPTV: أحدث الأفلام، VOD، 4K. SANAD IPTV المغرب.",
    subtitle: "مكتبة أفلام ضخمة محدّثة يومياً.",
    keywords: "IPTV movies, VOD IPTV, 4K movies IPTV, أفلام IPTV",
    sections: [
      "+200,000 فيلم ووثائقي.",
      "جودة HD، FHD، و 4K.",
      "تصنيفات: Action، Drama، Arabic، Netflix-style."
    ],
    faqs: [
      { question: "واش الأفلام محدّثة؟", answer: "نعم، تحديث يومي للمحتوى الجديد." },
      { question: "واش كاين ترجمة عربية؟", answer: "حسب الفيلم — أغلب المحتوى فيه subtitles." }
    ],
    relatedSlugs: ["iptv-series", "iptv-4k", "iptv-maroc"],
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
    relatedSlugs: ["iptv-films", "iptv-maroc", "iptv-smart-tv"],
    planSlug: "plan-6-months"
  }
};

export const programmaticSlugs = Object.keys(programmaticPages);
