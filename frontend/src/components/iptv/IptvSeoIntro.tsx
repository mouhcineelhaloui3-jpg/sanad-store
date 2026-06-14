"use client";

import { BlogPreviewClient } from "@/components/blog/BlogPreviewClient";
import { t, type LocalizedText } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

const title: LocalizedText = {
  ar: "أفضل اشتراك IPTV للعملاء حول العالم",
  en: "Premium IPTV for Customers Worldwide"
};

const subtitle: LocalizedText = {
  ar: "SANAD IPTV — +115,000 قناة، 120,000+ VOD، بث 4K مستقر 99.9%، تفعيل فوري خلال 5 دقائق.",
  en: "SANAD IPTV — 115,000+ channels, 120,000+ VOD, 99.9% stable 4K streaming, instant activation within 5 minutes."
};

const cards: { heading: LocalizedText; body: LocalizedText }[] = [
  {
    heading: {
      ar: "قنوات دولية من حول العالم",
      en: "International Channels from Around the World"
    },
    body: {
      ar: "رياضة عالمية، قنوات عربية وأوروبية وأمريكية، beIN Sports، Champions League، La Liga، Premier League — كلشي فباقة واحدة بلا رسوم مخفية.",
      en: "Global sports, Arabic, European & American channels, beIN Sports, Champions League, La Liga, Premier League — all in one plan with no hidden fees."
    }
  },
  {
    heading: { ar: "جودة 4K و anti-coupure", en: "4K Quality & Anti-Buffering" },
    body: {
      ar: "HD، FHD، 4K و 8K حسب الباقة. تكنولوجيا anti-buffer باش المباريات الكبيرة ما تقطعش — في أي بلد.",
      en: "HD, FHD, 4K & 8K by plan. Anti-buffer technology for big match days — wherever you stream."
    }
  },
  {
    heading: { ar: "+25,000 مشترك — دعم 24/7", en: "+25,000 Subscribers — 24/7 Support" },
    body: {
      ar: "آلاف العملاء حول العالم يثقوا بSANAD IPTV. الدعم عبر واتساب بالعربية والإنجليزية — جواب فـ 30 دقيقة.",
      en: "Thousands of subscribers worldwide trust SANAD IPTV. WhatsApp support in Arabic and English — reply within 30 minutes."
    }
  }
];

/** Server-rendered SEO block + blog cards — blog preview is locale-aware (client). */
export function IptvSeoIntro() {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <>
      <section className="iptv-section-spacing px-4" aria-labelledby="seo-intro-title">
        <div className="mx-auto max-w-6xl">
          <h2 id="seo-intro-title" className="section-title text-center">
            {t(title, locale)}
          </h2>
          <p className="section-subtitle mx-auto mt-3 text-center">{t(subtitle, locale)}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <article key={card.heading.en} className="glass-card p-5">
                <h3 className="text-base font-black text-neon-cyan">{t(card.heading, locale)}</h3>
                <p className="mt-2 text-sm leading-7 text-white/85">{t(card.body, locale)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BlogPreviewClient />
    </>
  );
}
