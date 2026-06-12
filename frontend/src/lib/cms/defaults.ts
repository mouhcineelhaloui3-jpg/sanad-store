import type { StoreContent } from "./types";
import { defaultMoviesSection } from "./default-movies";

export const defaultStoreContent = (): StoreContent => ({
  version: 4,
  updatedAt: new Date().toISOString(),
  branding: {
    brandName: "SANAD IPTV",
    tagline: {
      ar: "تفرج بلا حدود — أكثر من 100,000 قناة",
      en: "Watch without limits — 100,000+ channels"
    },
    primaryColor: "#00E5FF",
    secondaryColor: "#00FF95",
    accentColor: "#FFB800",
    logoUrl: ""
  },
  header: {
    promoBar: {
      ar: "⚽ Champions League LIVE • 🔥 تجربة مجانية • ⚡ تفعيل فوري 2026",
      en: "⚽ Champions League LIVE • 🔥 Free trial • ⚡ Instant activation 2026"
    },
    navLinks: [
      { label: { ar: "الرئيسية", en: "Home" }, href: "/" },
      { label: { ar: "⚽ الرياضة", en: "⚽ Sports" }, href: "#sports" },
      { label: { ar: "🎬 الأفلام", en: "🎬 Movies" }, href: "#movies" },
      { label: { ar: "الباقات", en: "Plans" }, href: "#plans" },
      { label: { ar: "التجربة المجانية", en: "Free Trial" }, href: "#trial" },
      { label: { ar: "المميزات", en: "Features" }, href: "#features" },
      { label: { ar: "آراء العملاء", en: "Reviews" }, href: "#testimonials" },
      { label: { ar: "FAQ", en: "FAQ" }, href: "#faq" }
    ],
    subscribeCtaLabel: { ar: "🔥 اشترك الآن", en: "🔥 Subscribe Now" }
  },
  footer: {
    description: {
      ar: "SANAD IPTV — منصة احترافية لبيع اشتراكات IPTV مع تجربة مجانية، دعم سريع عبر واتساب، ولوحة تحكم متكاملة.",
      en: "SANAD IPTV — Professional IPTV subscriptions with free trial, fast WhatsApp support, and full admin control."
    },
    supportEmail: "support@sanadiptv.com",
    whatsappNumber: "212600000000",
    whatsappMessage: "السلام، بغيت نستافسر على SANAD IPTV.",
    telegramUrl: "https://t.me/sanadiptv",
    storeLinks: [
      { label: { ar: "الباقات", en: "Plans" }, href: "#plans" },
      { label: { ar: "التجربة المجانية", en: "Free Trial" }, href: "#trial" },
      { label: { ar: "المميزات", en: "Features" }, href: "#features" },
      { label: { ar: "تواصل معنا", en: "Contact" }, href: "#contact" }
    ],
    policyLinks: [
      { label: { ar: "سياسة الخصوصية", en: "Privacy Policy" }, href: "/policies/privacy" },
      { label: { ar: "الشروط والأحكام", en: "Terms & Conditions" }, href: "/policies/terms" }
    ],
    copyright: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" }
  },
  seo: {
    title: "SANAD IPTV | تفرج بلا حدود — +100,000 قناة",
    description:
      "اشتراك SANAD IPTV — أكثر من 100,000 قناة مباشرة، أفلام ومسلسلات HD و4K، بطولات رياضية عالمية. تجربة مجانية ودعم واتساب.",
    keywords:
      "IPTV, SANAD IPTV, اشتراك IPTV, قنوات مباشرة, Champions League, La Liga, Premier League, Botola, CAN, مباريات مباشرة, 4K, المغرب",
    ogTitle: "SANAD IPTV | تفرج بلا حدود",
    ogDescription: "أكثر من 100,000 قناة مباشرة وأفضل الأفلام والمسلسلات بجودة HD و4K.",
    ogImageUrl: "",
    googleSiteVerification: ""
  },
  integrations: {
    gaMeasurementId: "",
    metaPixelId: "",
    tiktokPixelId: "",
    plausibleDomain: ""
  },
  homepage: {
    hero: {
      headline: { ar: "🔥 SANAD IPTV\nتفرج بلا حدود", en: "🔥 SANAD IPTV\nWatch Without Limits" },
      subtitle: {
        ar: "استمتع بأكثر من 100,000 قناة مباشرة وأفضل الأفلام والمسلسلات والبطولات الرياضية العالمية بجودة HD و FHD و 4K.",
        en: "Enjoy 100,000+ live channels, the best movies, series, and global sports in HD, FHD, and 4K quality."
      },
      bannerText: {
        ar: "🏆 تابع أقوى البطولات والمباريات مباشرة بدون تقطيع وبأعلى جودة.",
        en: "🏆 Watch the biggest tournaments and matches live — no buffering, highest quality."
      },
      primaryCtaLabel: { ar: "🎁 بغيت نجرب", en: "🎁 Free Trial" },
      secondaryCtaLabel: { ar: "🔥 اشترك دابا", en: "🔥 Subscribe Now" },
      whatsappCtaLabel: { ar: "💬 تواصل عبر واتساب", en: "💬 WhatsApp" },
      trustLine: {
        ar: "+100,000 قناة • +50,000 عميل • +99% رضا",
        en: "+100,000 channels • +50,000 customers • +99% satisfaction"
      }
    },
    sections: {
      liveTicker: true,
      sports: true,
      movies: true,
      features: true,
      plans: true,
      howItWorks: true,
      devices: true,
      trial: true,
      testimonials: true,
      stats: true,
      faq: true,
      contact: true,
      stickyCta: true,
      whatsapp: true
    },
    liveTicker: {
      label: { ar: "🔴 LIVE NOW", en: "🔴 LIVE NOW" },
      items: [
        { ar: "⚽ Champions League", en: "⚽ Champions League" },
        { ar: "🏆 La Liga", en: "🏆 La Liga" },
        { ar: "👑 Premier League", en: "👑 Premier League" },
        { ar: "🇲🇦 Botola Pro", en: "🇲🇦 Botola Pro" },
        { ar: "🏎️ Formula 1", en: "🏎️ Formula 1" },
        { ar: "🥊 UFC", en: "🥊 UFC" },
        { ar: "🏀 NBA", en: "🏀 NBA" },
        { ar: "🌍 CAN 2025", en: "🌍 AFCON 2025" },
        { ar: "📺 beIN Sports", en: "📺 beIN Sports" },
        { ar: "✨ 4K Ultra HD", en: "✨ 4K Ultra HD" }
      ]
    },
    sports: {
      title: { ar: "⚽ شاهد أقوى البطولات LIVE", en: "⚽ Watch Top Leagues LIVE" },
      subtitle: {
        ar: "كل المباريات، كل البطولات، بجودة 4K وبدون تقطيع — فاش ما كتكون فالدار ولا فالخدمة",
        en: "Every match, every league, in 4K with zero buffering — at home or on the go"
      },
      ctaLabel: { ar: "🔥 اشترك وتابع LIVE", en: "🔥 Subscribe & Watch LIVE" },
      events: [
        {
          id: "ucl",
          icon: "🏆",
          league: { ar: "Champions League", en: "Champions League" },
          title: { ar: "دوري أبطال أوروبا — كل المباريات", en: "UEFA Champions League — All Matches" },
          quality: { ar: "4K • 60FPS", en: "4K • 60FPS" },
          live: true,
          imageUrl: "/sports/champions-league.jpg"
        },
        {
          id: "laliga",
          icon: "⚽",
          league: { ar: "La Liga", en: "La Liga" },
          title: { ar: "الدوري الإسباني — Real • Barça • Atlético", en: "Spanish League — Real • Barça • Atlético" },
          quality: { ar: "FHD • LIVE", en: "FHD • LIVE" },
          live: true,
          imageUrl: "/sports/la-liga.jpg"
        },
        {
          id: "epl",
          icon: "👑",
          league: { ar: "Premier League", en: "Premier League" },
          title: { ar: "الدوري الإنجليزي — كل الجولات", en: "English Premier League — Every Round" },
          quality: { ar: "4K • LIVE", en: "4K • LIVE" },
          live: true,
          imageUrl: "/sports/premier-league.jpg"
        },
        {
          id: "botola",
          icon: "🇲🇦",
          league: { ar: "Botola Pro", en: "Botola Pro" },
          title: { ar: "الدوري المغربي — الرجاء • الوداد • الجيش", en: "Moroccan League — Raja • Wydad • AS FAR" },
          quality: { ar: "HD • LIVE", en: "HD • LIVE" },
          live: false,
          imageUrl: "/sports/botola.jpg"
        },
        {
          id: "can",
          icon: "🌍",
          league: { ar: "CAN / AFCON", en: "AFCON" },
          title: { ar: "كأس أمم أفريقيا — المنتخبات كلها", en: "Africa Cup of Nations — All Nations" },
          quality: { ar: "4K • LIVE", en: "4K • LIVE" },
          live: true,
          imageUrl: "/sports/afcon.jpg"
        },
        {
          id: "f1",
          icon: "🏎️",
          league: { ar: "Formula 1", en: "Formula 1" },
          title: { ar: "Formula 1 — كل السباقات Live", en: "Formula 1 — Every Race Live" },
          quality: { ar: "FHD • LIVE", en: "FHD • LIVE" },
          live: false,
          imageUrl: "/sports/formula-1.jpg"
        }
      ]
    },
    movies: defaultMoviesSection(),
    featuresTitle: { ar: "المميزات", en: "Features" },
    featuresSubtitle: {
      ar: "كل ما تحتاجه لتجربة بث ممتازة",
      en: "Everything you need for an amazing streaming experience"
    },
    features: [
      { icon: "📺", label: { ar: "أكثر من 100,000 قناة", en: "100,000+ channels" } },
      { icon: "⚽", label: { ar: "جميع القنوات الرياضية العالمية", en: "All global sports channels" } },
      { icon: "🎬", label: { ar: "أفلام ومسلسلات محدثة يومياً", en: "Daily updated movies & series" } },
      { icon: "📡", label: { ar: "جودة HD", en: "HD quality" } },
      { icon: "🖥️", label: { ar: "جودة Full HD", en: "Full HD quality" } },
      { icon: "✨", label: { ar: "جودة 4K", en: "4K quality" } },
      { icon: "💬", label: { ar: "دعم سريع", en: "Fast support" } },
      { icon: "🔒", label: { ar: "اشتغال مستقر", en: "Stable streaming" } },
      { icon: "🔄", label: { ar: "تحديثات مستمرة", en: "Regular updates" } },
      { icon: "📱", label: { ar: "متوافق مع Smart TV", en: "Smart TV compatible" } },
      { icon: "🤖", label: { ar: "متوافق مع Android", en: "Android compatible" } },
      { icon: "🍎", label: { ar: "متوافق مع iPhone", en: "iPhone compatible" } },
      { icon: "💻", label: { ar: "متوافق مع PC", en: "PC compatible" } },
      { icon: "🔥", label: { ar: "متوافق مع Fire Stick", en: "Fire Stick compatible" } }
    ],
    plansTitle: { ar: "الباقات", en: "Plans" },
    plansSubtitle: {
      ar: "اختار الباقة اللي تناسبك — الأسعار قابلة للتعديل من لوحة التحكم",
      en: "Choose the plan that fits you — prices editable from admin panel"
    },
    howItWorks: {
      title: { ar: "كيفاش تخدم؟", en: "How It Works" },
      subtitle: {
        ar: "3 خطوات بسيطة و تبدا تفرج فـ دقائق",
        en: "3 simple steps — start watching in minutes"
      },
      steps: [
        {
          num: "01",
          icon: "📱",
          title: { ar: "طلب الاشتراك", en: "Subscribe" },
          description: {
            ar: "عمر الفورم ولا تواصل معنا على واتساب — غادي نجاوبوك فدقائق",
            en: "Fill the form or contact us on WhatsApp — we reply in minutes"
          }
        },
        {
          num: "02",
          icon: "🔑",
          title: { ar: "تفعيل فوري", en: "Instant Activation" },
          description: {
            ar: "غادي نرسل ليك M3U / Xtream Codes عبر واتساب",
            en: "We send M3U / Xtream codes via WhatsApp"
          }
        },
        {
          num: "03",
          icon: "📺",
          title: { ar: "تفرج LIVE", en: "Watch LIVE" },
          description: {
            ar: "ثبت التطبيق على Smart TV، Android، iPhone ولا PC و بدا",
            en: "Install the app on Smart TV, Android, iPhone or PC and go"
          }
        }
      ]
    },
    devices: {
      title: { ar: "خدام على جميع الأجهزة", en: "Works on All Devices" },
      subtitle: {
        ar: "Smart TV، Android، iPhone، PC، Fire Stick — كله compatible",
        en: "Smart TV, Android, iPhone, PC, Fire Stick — fully compatible"
      },
      devices: [
        { icon: "📺", name: { ar: "Smart TV", en: "Smart TV" }, apps: { ar: "Smart IPTV • SS IPTV • TiviMate", en: "Smart IPTV • SS IPTV • TiviMate" } },
        { icon: "🤖", name: { ar: "Android", en: "Android" }, apps: { ar: "IPTV Smarters • TiviMate • XCIPTV", en: "IPTV Smarters • TiviMate • XCIPTV" } },
        { icon: "🍎", name: { ar: "iPhone / iPad", en: "iPhone / iPad" }, apps: { ar: "Smarters Player • GSE IPTV", en: "Smarters Player • GSE IPTV" } },
        { icon: "💻", name: { ar: "PC / Mac", en: "PC / Mac" }, apps: { ar: "VLC • IPTV Smarters Web", en: "VLC • IPTV Smarters Web" } },
        { icon: "🔥", name: { ar: "Fire Stick", en: "Fire Stick" }, apps: { ar: "Downloader • IPTV Smarters", en: "Downloader • IPTV Smarters" } },
        { icon: "🎮", name: { ar: "Android Box", en: "Android Box" }, apps: { ar: "TiviMate • Perfect Player", en: "TiviMate • Perfect Player" } }
      ]
    },
    stats: [
      { prefix: "+", value: 100000, suffix: "", label: { ar: "قناة", en: "channels" } },
      { prefix: "+", value: 50000, suffix: "", label: { ar: "عميل", en: "customers" } },
      { prefix: "+", value: 200000, suffix: "", label: { ar: "فيلم", en: "movies" } },
      { prefix: "+", value: 10000, suffix: "", label: { ar: "مسلسل", en: "series" } },
      { prefix: "", value: 99, suffix: "%", label: { ar: "رضا العملاء", en: "satisfaction" } }
    ],
    testimonialsTitle: { ar: "آراء العملاء", en: "Customer Reviews" },
    testimonialsSubtitle: {
      ar: "آلاف العملاء راضيين على خدمتنا",
      en: "Thousands of satisfied customers"
    },
    testimonials: [
      {
        id: "1",
        name: { ar: "محمد — الدار البيضاء", en: "Mohamed — Casablanca" },
        rating: 5,
        comment: {
          ar: "خدمة ممتازة، القنوات كاملة والجودة زوينة بزاف. الدعم جاوبني فدقائق.",
          en: "Excellent service, all channels and great quality. Support replied in minutes."
        },
        visible: true
      },
      {
        id: "2",
        name: { ar: "فاطمة — الرباط", en: "Fatima — Rabat" },
        rating: 5,
        comment: {
          ar: "جربت التجربة المجانية ومن بعد اشتركت فباقة 6 أشهر. ما كاين حتى تقطيع.",
          en: "Tried the free trial then subscribed to 6 months. No buffering at all."
        },
        visible: true
      },
      {
        id: "3",
        name: { ar: "يoussef — مراكش", en: "Youssef — Marrakech" },
        rating: 5,
        comment: {
          ar: "أحسن IPTV جربت. المباريات كاملة والأفلام محدثة كل يوم.",
          en: "Best IPTV I've tried. All matches and daily updated movies."
        },
        visible: true
      },
      {
        id: "4",
        name: { ar: "سارة — طنجة", en: "Sara — Tangier" },
        rating: 5,
        comment: {
          ar: "خدم على Smart TV و Android بلا مشكل. التفعيل كان سريع.",
          en: "Works on Smart TV and Android perfectly. Activation was fast."
        },
        visible: true
      }
    ],
    trial: {
      title: { ar: "🎁 جرب الخدمة مجاناً", en: "🎁 Try Free" },
      description: {
        ar: "إذا كنت متردداً يمكنك تجربة الخدمة أولاً قبل الاشتراك.",
        en: "Not sure yet? Try the service first before subscribing."
      },
      ctaLabel: { ar: "بغيت نجرب", en: "Start Free Trial" }
    },
    contact: {
      title: { ar: "تواصل معنا", en: "Contact Us" },
      whatsappLabel: { ar: "💬 واتساب", en: "💬 WhatsApp" },
      emailLabel: { ar: "📧 Email", en: "📧 Email" },
      telegramLabel: { ar: "🌐 Telegram", en: "🌐 Telegram" }
    },
    faqTitle: { ar: "الأسئلة الشائعة", en: "FAQ" },
    faqSubtitle: { ar: "شنو بغيتي تعرف؟", en: "What would you like to know?" },
    faqs: [
      {
        question: { ar: "شنو هو IPTV؟", en: "What is IPTV?" },
        answer: {
          ar: "IPTV هو بث تلفزيوني عبر الإنترنت. كتشوف القنوات المباشرة والأفلام والمسلسلات من أي جهاز متصل بالإنترنت.",
          en: "IPTV is TV streaming over the internet. Watch live channels, movies, and series from any internet-connected device."
        }
      },
      {
        question: { ar: "كيفاش نخدم الاشتراك؟", en: "How do I use my subscription?" },
        answer: {
          ar: "من بعد ما تطلب، غادي نرسل ليك بيانات الدخول (M3U أو Xtream) عبر واتساب. تثبت التطبيق المناسب و تدخل البيانات.",
          en: "After ordering, we send login details (M3U or Xtream) via WhatsApp. Install the right app and enter the credentials."
        }
      },
      {
        question: { ar: "واش كاينة تجربة مجانية؟", en: "Is there a free trial?" },
        answer: {
          ar: "نعم! يمكنك طلب تجربة مجانية من الموقع و غادي نتواصلو معاك عبر واتساب.",
          en: "Yes! Request a free trial from the site and we'll contact you on WhatsApp."
        }
      },
      {
        question: { ar: "كيفاش نخلص؟", en: "How do I pay?" },
        answer: {
          ar: "الدفع عبر تحويل بنكي، Cash Plus، أو طرق أخرى. كنتواصلو معاك على واتساب باش نعطيوك التفاصيل.",
          en: "Pay via bank transfer, Cash Plus, or other methods. We contact you on WhatsApp with details."
        }
      },
      {
        question: { ar: "واش خدام فـ Smart TV؟", en: "Does it work on Smart TV?" },
        answer: {
          ar: "نعم، خدام على Smart TV، Android، iPhone، PC، و Fire Stick.",
          en: "Yes, it works on Smart TV, Android, iPhone, PC, and Fire Stick."
        }
      },
      {
        question: { ar: "واش كاين دعم تقني؟", en: "Is there technical support?" },
        answer: {
          ar: "نعم، فريق الدعم متاح عبر واتساب باش يساعدك فالتثبيت و أي مشكل.",
          en: "Yes, our support team is available on WhatsApp to help with setup and any issues."
        }
      }
    ]
  },
  plans: [
    { slug: "plan-3-months", enabled: true },
    { slug: "plan-6-months", enabled: true, highlighted: true },
    { slug: "plan-12-months", enabled: true }
  ]
});
