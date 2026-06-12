import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { getStoreContent } from "@/lib/cms/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/structured-data";

const policies: Record<string, { title: string; description: string; body: string[] }> = {
  privacy: {
    title: "سياسة الخصوصية — SANAD IPTV",
    description:
      "كيفاش كنجمعو و كستعملو معلوماتك ف SANAD IPTV: الاسم، واتساب، نوع الجهاز، وبيانات تقنية للحماية.",
    body: [
      "نجمعو غير المعلومات الضرورية باش نفعّلو اشتراك IPTV ونتواصلو معاك: الاسم الكامل، رقم واتساب، نوع الجهاز، ومدة الاشتراك المطلوبة.",
      "كنجمعو أيضاً بعض البيانات التقنية (IP، نوع المتصفح) باش نحمو الموقع من الطلبات الوهمية ونحسّنو الأداء.",
      "ما كنبيعوش بياناتك لأطراف خارجية. المعلومات كتستعمل غير لتفعيل الاشتراك، الدعم التقني، وتحسين الخدمة.",
      "عندك الحق تطلب حذف بياناتك أو تعديلها عبر التواصل معنا على واتساب أو الإيميل."
    ]
  },
  terms: {
    title: "الشروط والأحكام — SANAD IPTV",
    description:
      "شروط استخدام SANAD IPTV: الاشتراك، الدفع، التفعيل، الدعم التقني، ومسؤوليات المستخدم.",
    body: [
      "SANAD IPTV كيقدّم خدمة بث IPTV باشتراك مدفوع. الأسعار معروضة بالدرهم المغربي ويمكن تتبدّل.",
      "من بعد الطلب، غادي نتواصلو معاك عبر واتساب باش نأكّدو الدفع و نرسلو بيانات التفعيل (M3U / Xtream).",
      "المستخدم مسؤول على استعمال الخدمة بشكل قانوني و على حماية بيانات الدخول ديالو.",
      "الخدمة ماشي بديل لأي اشتراك رسمي للقنوات. كنوفّرو بث عبر الإنترنت مع دعم تقني.",
      "يمكن إيقاف أو تعليق الاشتراك فحالة إساءة الاستخدام أو مخالفة الشروط."
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) return { title: "سياسة غير موجودة", robots: { index: false } };

  const content = await getStoreContent();
  return buildPageMetadata({
    title: policy.title,
    description: policy.description,
    path: `/policies/${slug}`,
    ogImage: content.seo.ogImageUrl,
    ogTitle: policy.title,
    keywords: content.seo.keywords
  });
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) notFound();

  const content = await getStoreContent();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: content.branding.brandName, path: "/" },
            { name: policy.title, path: `/policies/${slug}` }
          ])
        ]}
      />
      <p className="section-eyebrow">{content.branding.brandName}</p>
      <h1 className="section-title mt-2">{policy.title}</h1>
      <div className="mt-8 space-y-5 glass-card p-6 leading-9 text-dark-800 md:p-8">
        {policy.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Link href="/" className="btn-neon-outline mt-8 inline-flex">
        الرجوع للرئيسية
      </Link>
    </div>
  );
}
