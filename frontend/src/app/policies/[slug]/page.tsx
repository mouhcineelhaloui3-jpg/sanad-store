import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoreContent } from "@/lib/cms/server";
import { buildPageMetadata } from "@/lib/seo/metadata";

const policies: Record<string, { title: string; body: string[] }> = {
  shipping: {
    title: "سياسة التوصيل",
    body: [
      "نوفّر التوصيل داخل المغرب. بعد تسجيل الطلب، يقوم فريق سَنَد بالتواصل معك لتأكيد الطلب والمعلومات قبل الإرسال.",
      "الدفع يتم عند الاستلام. لا تحتاج إلى أداء مسبق في النسخة الحالية من المتجر.",
      "مدة التوصيل تختلف حسب المدينة وشركة التوصيل، وغالباً تكون بين 24 و72 ساعة في المدن الكبرى."
    ]
  },
  returns: {
    title: "سياسة الاستبدال",
    body: [
      "إذا وصلك منتج متضرر أو مختلف عن الطلب، تواصل معنا في أقرب وقت مع رقم الطلب وصورة واضحة للمشكل.",
      "يجب التواصل خلال 24 إلى 48 ساعة من الاستلام.",
      "المنتج يجب أن يكون غير مستعمل بشكل واضح، باستثناء حالة الضرر عند الوصول."
    ]
  },
  privacy: {
    title: "سياسة الخصوصية",
    body: [
      "نجمع المعلومات الضرورية فقط لمعالجة الطلب والتواصل معك: الاسم، رقم الهاتف، المنتجات المطلوبة، وبعض المعلومات التقنية للحماية من الطلبات الوهمية.",
      "نستعمل البيانات لتأكيد الطلب، تجهيز التوصيل، تحسين تجربة الموقع، وقياس أداء الإعلانات.",
      "لا نبيع بياناتك لأطراف خارجية."
    ]
  },
  terms: {
    title: "الشروط والأحكام",
    body: [
      "الأسعار المعروضة بالدرهم المغربي، والدفع عند الاستلام.",
      "يجب إدخال رقم هاتف صحيح وقابل للتواصل. قد يتم إلغاء الطلب إذا تعذر التأكيد.",
      "منتجات سَنَد مخصصة للدعم والراحة اليومية وليست بديلاً عن استشارة مختص."
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
  if (!policy) return { title: "سياسة غير موجودة" };

  const content = await getStoreContent();
  return buildPageMetadata({
    title: policy.title,
    description: policy.body[0],
    path: `/policies/${slug}`,
    ogImage: content.seo.ogImageUrl
  });
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-4xl font-black text-sand-950">{policy.title}</h1>
      <div className="mt-8 space-y-5 rounded-[2rem] bg-white p-6 leading-9 text-sand-700 shadow-soft">
        {policy.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
