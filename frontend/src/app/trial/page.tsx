import type { Metadata } from "next";
import { MarketingPageLayout } from "@/components/seo/MarketingPageLayout";
import { PlanLandingCta } from "@/components/seo/PlanLandingCta";
import { StructuredData, webPageJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/components/seo/MetaTags";
import { faqJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "تجربة IPTV مجانية — SANAD IPTV",
  description: "جرب SANAD IPTV مجاناً قبل الاشتراك. تفعيل سريع، دعم واتساب، وآلاف القنوات والأفلام.",
  path: "/trial",
  keywords: "IPTV free trial worldwide, global IPTV trial"
});

const faqs = [
  {
    question: "كيفاش نجرب الخدمة مجاناً؟",
    answer: "كليكي على زر التجربة المجانية، عمر المعلومات، وغادي نتواصلو معاك فواتساب."
  },
  {
    question: "شحال كتدام التجربة؟",
    answer: "مدة التجربة كتحدد مع فريق الدعم حسب نوع الجهاز والباقة."
  }
];

export default function TrialPage() {
  const description =
    "جرب SANAD IPTV مجاناً قبل الاشتراك. تفعيل سريع، دعم واتساب، وآلاف القنوات والأفلام.";

  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({ name: "تجربة IPTV مجانية", description, url: "/trial" }),
          faqJsonLd(faqs)
        ]}
      />
      <MarketingPageLayout
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "تجربة مجانية" }
        ]}
        title="🎁 تجربة IPTV مجانية"
        subtitle="ما عندك ما تخسر — جرب الخدمة قبل ما تشترك."
      >
        <p>SANAD IPTV كتعطيك تجربة مجانية باش تشوف الجودة، القنوات، والأفلام قبل الدفع.</p>
        <ul>
          <li>✓ تفعيل سريع عبر واتساب</li>
          <li>✓ دعم تقني فاش تحتاج</li>
          <li>✓ بدون التزام — قرر من بعد</li>
        </ul>
        <PlanLandingCta />
      </MarketingPageLayout>
    </>
  );
}
