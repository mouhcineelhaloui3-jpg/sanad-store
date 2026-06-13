import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPageLayout } from "@/components/seo/MarketingPageLayout";
import { PlanLandingCta } from "@/components/seo/PlanLandingCta";
import { StructuredData, webPageJsonLd } from "@/components/seo/StructuredData";
import { createBlogMetadata } from "@/components/seo/MetaTags";
import { faqJsonLd } from "@/lib/seo/structured-data";

const articles = {
  "best-iptv-maroc": {
    title: "أحسن IPTV فالمغرب — دليل 2026",
    description: "معايير اختيار IPTV فالمغرب: الاستقرار، القنوات، الدعم، والأسعار.",
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
    title: "كيفاش تثبت IPTV على Smart TV",
    description: "Smart IPTV و TiviMate — خطوات التثبيت على Samsung و LG.",
    sections: [
      "حمّل Smart IPTV أو SS IPTV من متجر التطبيقات.",
      "دخل M3U أو Xtream codes اللي كتوصلك من SANAD IPTV.",
      "فعّل EPG باش تشوف دليل البرامج."
    ],
    faqs: [{ question: "واش خدام على Samsung؟", answer: "نعم، Smart IPTV خدام على أغلب Smart TV." }]
  },
  "iptv-android": {
    title: "IPTV على Android — دليل كامل",
    description: "IPTV Smarters و TiviMate على الهاتف و Android Box.",
    sections: [
      "IPTV Smarters Pro سهل للمبتدئين.",
      "TiviMate الأفضل للمستخدم المتقدم.",
      "استعمل Ethernet على Android Box للاستقرار."
    ],
    faqs: [{ question: "شنو أفضل تطبيق؟", answer: "TiviMate للتلفاز، Smarters للهاتف." }]
  },
  "iptv-4k": {
    title: "IPTV 4K — شروط ونصائح",
    description: "سرعة الإنترنت، HDR، وأحسن القنوات الرياضية بجودة 4K.",
    sections: [
      "محتاج 25 Mbps+ للبث 4K مستقر.",
      "SANAD IPTV كتدعم HD، FHD، و 4K حسب القناة.",
      "استعمل سلك Ethernet ملي تقدر."
    ],
    faqs: [{ question: "واش 4K خدام على Wi-Fi؟", answer: "نعم، ولكن Ethernet أحسن للمباريات." }]
  }
} as const;

type BlogSlug = keyof typeof articles;

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug as BlogSlug];
  if (!article) return {};
  return createBlogMetadata({
    title: article.title,
    description: article.description,
    slug
  });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug as BlogSlug];
  if (!article) return null;

  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({ name: article.title, description: article.description, url: `/blog/${slug}` }),
          faqJsonLd(article.faqs)
        ]}
      />
      <MarketingPageLayout
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المدونة", href: "/blog" },
          { label: article.title }
        ]}
        title={article.title}
        subtitle={article.description}
      >
        {article.sections.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <PlanLandingCta />
        <Link href="/pricing" className="text-neon-cyan underline">
          شوف الأسعار
        </Link>
      </MarketingPageLayout>
    </>
  );
}
