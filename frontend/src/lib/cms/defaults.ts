import type { StoreContent } from "./types";
import { defaultMoviesSection } from "./default-movies";
import { defaultSiteLayout } from "./layout-styles";

export const defaultStoreContent = (): StoreContent => ({
  version: 7,
  updatedAt: new Date().toISOString(),
  layout: defaultSiteLayout(),
  branding: {
    brandName: "SANAD IPTV",
    tagline: {
      ar: "تفرج بلا حدود — أكثر من 115,000 قناة",
      en: "Watch without limits — 115,000+ channels"
    },
    primaryColor: "#00E5FF",
    secondaryColor: "#00FF95",
    accentColor: "#FFB800",
    logoUrl: "/logo/sanad-iptv-logo.png"
  },
  header: {
    promoBar: {
      ar: "🏆 كأس العالم FIFA 2026™ • ⚽ Champions League LIVE • 🔥 تجربة مجانية",
      en: "🏆 FIFA World Cup 2026™ • ⚽ Champions League LIVE • 🔥 Free trial"
    },
    navLinks: [
      { label: { ar: "الرئيسية", en: "Home" }, href: "/" },
      { label: { ar: "⚽ الرياضة", en: "⚽ Sports" }, href: "#sports" },
      { label: { ar: "🎬 الأفلام", en: "🎬 Movies" }, href: "#movies" },
      { label: { ar: "الباقات", en: "Plans" }, href: "#plans" },
      { label: { ar: "المدونة", en: "Blog" }, href: "/blog" },
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
    whatsappNumber: "212682217644",
    whatsappMessage: "السلام، بغيت نستافسر على SANAD IPTV.",
    telegramUrl: "https://t.me/SANADIPTV",
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
    title: "SANAD IPTV | Premium IPTV Worldwide — +115,000 Channels 4K/UHD",
    description:
      "SANAD IPTV subscription — +115,000 live channels, 120,000+ VOD titles, 4K sports, beIN, Champions League. Instant activation within 5 minutes, free trial, 24/7 WhatsApp support worldwide.",
    keywords:
      "IPTV, SANAD IPTV, IPTV subscription, premium IPTV worldwide, +115000 channels, IPTV 4K, IPTV Smarters, TiviMate, live TV, FIFA World Cup 2026, Champions League, beIN Sports, international channels, VOD, global streaming",
    ogTitle: "SANAD IPTV | Premium IPTV for Customers Worldwide — +115,000 Channels",
    ogDescription:
      "115,000+ live channels, 120,000+ VOD, 4K sports, instant activation — free trial & 24/7 WhatsApp support worldwide.",
    ogImageUrl: "",
    googleSiteVerification: ""
  },
  integrations: {
    gaMeasurementId: "",
    metaPixelId: "",
    tiktokPixelId: "",
    plausibleDomain: "",
    clarityProjectId: ""
  },
  homepage: {
    hero: {
      headline: { ar: "SANAD IPTV\nأفضل IPTV للعملاء حول العالم", en: "SANAD IPTV\nPremium IPTV Worldwide" },
      subtitle: {
        ar: "اشتراك IPTV 4K و HD — +115,000 قناة مباشرة، 120,000+ فيلم ومسلسل VOD، رياضة مباشرة عالمية (beIN، Champions League، Premier League). تفعيل فوري خلال 5 دقائق على Smart TV، Android، iPhone و Fire Stick — في أي بلد.",
        en: "4K & HD IPTV subscription — 115,000+ live channels, 120,000+ VOD titles, global live sports (beIN, Champions League, Premier League). Instant activation within 5 minutes on Smart TV, Android, iPhone & Fire Stick — worldwide."
      },
      bannerText: {
        ar: "🏆 تابع كأس العالم FIFA 2026™ وأقوى البطولات مباشرة بدون تقطيع وبأعلى جودة.",
        en: "🏆 Watch FIFA World Cup 2026™ and the biggest tournaments live — no buffering, highest quality."
      },
      primaryCtaLabel: { ar: "🎁 بغيت نجرب", en: "🎁 Free Trial" },
      secondaryCtaLabel: { ar: "🔥 اشترك دابا", en: "🔥 Subscribe Now" },
      whatsappCtaLabel: { ar: "💬 تواصل عبر واتساب", en: "💬 WhatsApp" },
      trustLine: {
        ar: "⭐ أفضل IPTV عالمي 2026 — تقييم 4.9/5",
        en: "⭐ Premium IPTV Worldwide 2026 — Rated 4.9/5"
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
        { ar: "🏆 كأس العالم FIFA 2026™", en: "🏆 FIFA World Cup 2026™" },
        { ar: "⚽ Champions League", en: "⚽ Champions League" },
        { ar: "🏆 La Liga", en: "🏆 La Liga" },
        { ar: "👑 Premier League", en: "👑 Premier League" },
        { ar: "🇲🇦 Botola Pro", en: "🇲🇦 Botola Pro" },
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
        ar: "كأس العالم FIFA 2026™ وجميع البطولات — 4K بدون تقطيع في أي مكان بالعالم",
        en: "FIFA World Cup 2026™ and every league — 4K, zero buffering anywhere in the world"
      },
      ctaLabel: { ar: "🔥 اشترك وتابع LIVE", en: "🔥 Subscribe & Watch LIVE" },
      events: [
        {
          id: "wc2026",
          icon: "🏆",
          league: { ar: "FIFA World Cup™", en: "FIFA World Cup™" },
          title: {
            ar: "كأس العالم FIFA 2026™ — كل المباريات Live",
            en: "FIFA World Cup 2026™ — Every Match Live"
          },
          quality: { ar: "4K • 60FPS", en: "4K • 60FPS" },
          live: true,
          imageUrl: "/sports/world-cup-2026.jpg"
        },
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
          title: { ar: "بطولات إقليمية وعالمية — HD • LIVE", en: "Regional & Global Leagues — HD • LIVE" },
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
        }
      ]
    },
    movies: defaultMoviesSection(),
    featuresTitle: { ar: "المميزات", en: "Features" },
    featuresSubtitle: {
      ar: "SANAD IPTV — +115,000 قناة، 120,000+ VOD، بث 4K مستقر 99.9%، تفعيل فوري",
      en: "SANAD IPTV — 115,000+ channels, 120,000+ VOD, 99.9% stable 4K streaming, instant activation"
    },
    features: [
      { icon: "📺", label: { ar: "115,000+ قناة مباشرة", en: "115,000+ live channels" } },
      { icon: "🎬", label: { ar: "120,000+ أفلام ومسلسلات VOD", en: "120,000+ movies & series VOD" } },
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
    plansTitle: { ar: "اختر باقة اشتراك IPTV", en: "Choose Your IPTV Subscription" },
    plansSubtitle: {
      ar: "باقات 3، 6 و 12 شهر — +115,000 قناة، تفعيل فوري، بدون رسوم مخفية",
      en: "3, 6 & 12-month plans — 115,000+ channels, instant activation, no hidden fees"
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
      { prefix: "+", value: 115000, suffix: "", label: { ar: "قناة مباشرة", en: "live channels" } },
      { prefix: "+", value: 120000, suffix: "", label: { ar: "فيلم ومسلسل VOD", en: "VOD titles" } },
      { prefix: "+", value: 25000, suffix: "", label: { ar: "مشترك", en: "subscribers" } },
      { prefix: "", value: 99, suffix: "%", label: { ar: "استقرار البث", en: "uptime" } },
      { prefix: "", value: 24, suffix: "/7", label: { ar: "دعم واتساب", en: "WhatsApp support" } }
    ],
    testimonialsTitle: { ar: "آراء العملاء", en: "Customer Reviews" },
    testimonialsSubtitle: {
      ar: "آلاف العملاء راضيين على خدمتنا",
      en: "Thousands of satisfied customers"
    },
    testimonials: [
      {
        id: "1",
        name: { ar: "محمد — لندن", en: "Mohamed — London" },
        rating: 5,
        comment: {
          ar: "خدمة ممتازة، القنوات كاملة والجودة زوينة بزاف. الدعم جاوبني فدقائق.",
          en: "Excellent service, all channels and great quality. Support replied in minutes."
        },
        visible: true
      },
      {
        id: "2",
        name: { ar: "فاطمة — دبي", en: "Fatima — Dubai" },
        rating: 5,
        comment: {
          ar: "جربت التجربة المجانية ومن بعد اشتركت فباقة 6 أشهر. ما كاين حتى تقطيع.",
          en: "Tried the free trial then subscribed to 6 months. No buffering at all."
        },
        visible: true
      },
      {
        id: "3",
        name: { ar: "يoussef — باريس", en: "Youssef — Paris" },
        rating: 5,
        comment: {
          ar: "أحسن IPTV جربت. المباريات كاملة والأفلام محدثة كل يوم.",
          en: "Best IPTV I've tried. All matches and daily updated movies."
        },
        visible: true
      },
      {
        id: "4",
        name: { ar: "سارة — تورنتو", en: "Sara — Toronto" },
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
      telegramLabel: { ar: "🌐 Telegram @SANADIPTV", en: "🌐 Telegram @SANADIPTV" }
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
          ar: "الدفع عبر تحويل بنكي، بطاقة، أو طرق دفع محلية. كنتواصلو معاك على واتساب باش نعطيوك التفاصيل.",
          en: "Pay via bank transfer, card, or local payment methods. We contact you on WhatsApp with details."
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
          ar: "نعم، فريق الدعم متاح عبر واتساب 24/7 باش يساعدك فالتثبيت و أي مشكل — جواب فـ 30 دقيقة.",
          en: "Yes, our support team is available on WhatsApp 24/7 to help with setup and any issues — reply within 30 minutes."
        }
      },
      {
        question: { ar: "علاش SANAD IPTV من أفضل خدمات IPTV عالمياً؟", en: "Why is SANAD IPTV among the best IPTV services worldwide?" },
        answer: {
          ar: "SANAD IPTV كتوفر +115,000 قناة، 120,000+ VOD، بث 4K مستقر 99.9%، تفعيل فوري خلال 5 دقائق، ودعم واتساب بالعربية والإنجليزية — للعملاء في أوروبا وأمريكا والشرق الأوسط وأفريقيا.",
          en: "SANAD IPTV offers 115,000+ channels, 120,000+ VOD, 99.9% stable 4K streaming, 5-minute activation, and WhatsApp support in Arabic and English — for customers across Europe, the Americas, the Middle East, and Africa."
        }
      },
      {
        question: { ar: "شحال كتاخد التفعيل؟", en: "How long does activation take?" },
        answer: {
          ar: "التفعيل فوري — من بعد الدفع غادي نرسل ليك Xtream Codes أو M3U عبر واتساب فـ أقل من 5 دقائق.",
          en: "Instant activation — after payment we send Xtream codes or M3U via WhatsApp in under 5 minutes."
        }
      },
      {
        question: { ar: "واش كاين Replay TV؟", en: "Is Replay TV included?" },
        answer: {
          ar: "نعم، Replay TV مدمج فجميع الباقات. باقة 6 و 12 شهر كتشمل Replay 7 أيام.",
          en: "Yes, Replay TV is included in all plans. 6 and 12-month plans include 7-day Replay."
        }
      },
      {
        question: { ar: "شنو سرعة الإنترنت اللي خاصني لل 4K؟", en: "What internet speed do I need for 4K?" },
        answer: {
          ar: "لل HD خاصك 10 Mbps على الأقل. لل 4K ننصحو ب 25 Mbps+ عبر Wi-Fi 5GHz أو Ethernet.",
          en: "For HD you need at least 10 Mbps. For 4K we recommend 25 Mbps+ over 5GHz Wi-Fi or Ethernet."
        }
      },
      {
        question: { ar: "واش نقدر نخدم الاشتراك فـ أكثر من جهاز؟", en: "Can I use my subscription on multiple devices?" },
        answer: {
          ar: "كل باقة كتخدم على جهاز واحد. إذا بغيتي جهازين، تواصل معنا عبر واتساب باش نعطيوك عرض خاص.",
          en: "Each plan works on one device. For two devices, contact us on WhatsApp for a special offer."
        }
      },
      {
        question: { ar: "كيفاش نجدد الاشتراك؟", en: "How do I renew my subscription?" },
        answer: {
          ar: "تواصل معنا عبر واتساب قبل ما ينتهي الاشتراك — غادي نجددو ليك بنفس البيانات أو نعطيوك جديدة.",
          en: "Contact us on WhatsApp before expiry — we'll renew with the same credentials or provide new ones."
        }
      }
    ]
  },
  plans: [
    { slug: "plan-3-months", enabled: true },
    { slug: "plan-6-months", enabled: true, highlighted: true },
    { slug: "plan-12-months", enabled: true },
    { slug: "plan-2-screens", enabled: true }
  ]
});
