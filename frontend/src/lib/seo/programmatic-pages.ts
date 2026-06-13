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
    contentBlocks: [
      {
        heading: "اشتراك IPTV Morocco — شنو كتستنا؟",
        paragraphs: [
          "SANAD IPTV هي خدمة IPTV subscription محسّنة للمغرب: قنوات مغربية، عربية، فرنسية، وإسبانية، مع VOD أفلام ومسلسلات ورياضة 4K.",
          "الفرق بين SANAD وبين مزودين آخرين هو الاستقرار فالبث، الدعم بالدارجة والعربية عبر واتساب، والتحديث اليومي للمحتوى.",
          "إذا كنت كتقلب على abonnement IPTV Maroc موثوق، SANAD كتوفر trial مجاني قبل ما تختار الباقة المناسبة."
        ]
      },
      {
        heading: "قنوات مغربية ورياضة — Botola Pro و beIN",
        paragraphs: [
          "مع SANAD IPTV، تقدر تشوف Botola Pro، القنوات الوطنية 2M و SNRT، وقنوات رياضية عالمية: Champions League، La Liga، Premier League.",
          "البث كيخدم على Smart TV، Android، iPhone، Fire Stick، و Android Box — شوف دليل التثبيت فصفحات الأجهزة.",
          "للمباريات الكبيرة، ننصحو ب Ethernet أو Wi-Fi 5GHz باش تفادى التقطيع."
        ]
      },
      {
        heading: "أسعار IPTV فالمغرب — باقات SANAD",
        paragraphs: [
          "باقة 3 أشهر: 150 د.م. — مثالية للتجربة الأولى.",
          "باقة 6 أشهر: 250 د.م. — الأكثر اختياراً (أحسن rapport qualité/prix).",
          "باقة سنة: 400 د.م. — أفضل قيمة للاستعمال اليومي.",
          "التفعيل فوري عبر واتساب بعد الدفع — ما كاينش انتظار طويل."
        ]
      }
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
