import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductCard } from "@/components/product/ProductCard";
import { FAQAccordion } from "@/components/product/FAQAccordion";
import { HomeFounderNote } from "@/components/home/HomeFounderNote";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeProductCompare } from "@/components/home/HomeProductCompare";
import { HomeSanadPromise } from "@/components/home/HomeSanadPromise";
import { HomeStickyCTA } from "@/components/home/HomeStickyCTA";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { HomeTrustStrip } from "@/components/home/HomeTrustStrip";
import { ProductFinder } from "@/components/home/ProductFinder";
import { mergeProductsWithCms } from "@/lib/cms/merge-products";
import { getStoreContent } from "@/lib/cms/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { faqJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo/structured-data";
import { whatsappUrl } from "@/lib/store-config";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getStoreContent();
  return buildPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/",
    ogImage: content.seo.ogImageUrl || content.homepage.hero.imageUrl,
    ogTitle: content.seo.ogTitle
  });
}

const productHighlights: Record<string, string> = {
  "sanad-align": "للكتاف والوضعية",
  "sanad-heat": "للرقبة والشد",
  "sanad-lumbo": "لأسفل الظهر"
};

const steps = [
  { num: "01", title: "اختار المنتج", copy: "من المقارنة، المساعد، ولا مباشرة من المنتجات." },
  { num: "02", title: "أضف للسلة", copy: "الاسم ورقم الهاتف كافيين. ما خاصكش حساب ولا بطاقة." },
  { num: "03", title: "تأكيد وتوصيل", copy: "كنتاصلو بك بالهاتف، نرسلو الطلب، وتخلص عند الاستلام." }
];

export default async function HomePage() {
  const content = await getStoreContent();
  const { homepage } = content;
  const products = mergeProductsWithCms(content.products);
  const allReviews = products.flatMap((p) =>
    p.reviews.map((r) => ({ ...r, product: p.shortName, slug: p.slug }))
  );
  const avgRating =
    allReviews.length > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
      : 0;

  return (
    <div className="bg-sand-50 pb-20 md:pb-0">
      <JsonLd
        data={[
          organizationJsonLd({
            name: content.branding.brandName,
            description: content.footer.description,
            email: content.footer.supportEmail
          }),
          websiteJsonLd({
            name: content.branding.brandName,
            description: content.seo.description
          }),
          faqJsonLd(homepage.faqs)
        ].filter(Boolean) as Record<string, unknown>[]}
      />
      <HomeHero hero={homepage.hero} />

      {homepage.sections.trustStrip ? <HomeTrustStrip /> : null}

      {homepage.sections.products ? (
        <section id="products" className="bg-white px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="section-eyebrow">المنتجات</p>
                <h2 className="section-title">{homepage.productsTitle}</h2>
                <p className="section-subtitle">{homepage.productsSubtitle}</p>
              </div>
              {homepage.sections.productCompare ? (
                <Link href="#compare" className="text-sm font-black text-sage-700 underline underline-offset-4">
                  قارن بين المنتجات ←
                </Link>
              ) : null}
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="landing"
                  highlight={productHighlights[product.id]}
                />
              ))}
            </div>
            <p className="mt-8 text-center text-sm font-bold text-sand-600">
              الدفع عند الاستلام · تأكيد هاتفي · دعم واتساب
            </p>
          </div>
        </section>
      ) : null}

      {homepage.sections.productFinder ? <ProductFinder /> : null}
      {homepage.sections.productCompare ? <HomeProductCompare /> : null}
      {homepage.sections.sanadPromise ? <HomeSanadPromise /> : null}
      {homepage.sections.testimonials ? (
        <HomeTestimonials reviews={allReviews} avgRating={avgRating} />
      ) : null}
      {homepage.sections.founderNote ? <HomeFounderNote /> : null}

      {homepage.sections.howItWorks ? (
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="section-eyebrow">كيفاش تطلب؟</p>
            <h2 className="section-title">3 خطوات بسيطة حتى توصلك السلعة</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.num} className="card-premium p-6">
                <span className="text-4xl font-black text-sand-100">{step.num}</span>
                <h3 className="mt-3 text-xl font-black text-sand-950">{step.title}</h3>
                <p className="mt-2 leading-8 text-sand-700">{step.copy}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {homepage.sections.faq ? <FAQAccordion faqs={homepage.faqs} /> : null}

      {homepage.sections.finalCta ? (
        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-sand-950 p-8 text-center text-white md:p-14">
            <p className="font-bold text-sage-100">{homepage.finalCtaTitle}</p>
            <h2 className="mt-3 text-3xl font-black leading-snug md:text-4xl">{homepage.finalCtaSubtitle}</h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#products"
                className="inline-block w-full rounded-full bg-white px-8 py-4 font-black text-sand-950 transition hover:scale-105 sm:w-auto"
              >
                شوف المنتجات واطلب
              </Link>
              <a
                href={whatsappUrl(content.footer.whatsappMessage, content.footer.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                سولني على واتساب
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {products.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="trust-pill-dark text-xs">
                  {p.shortName}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {homepage.sections.stickyCta ? <HomeStickyCTA /> : null}
    </div>
  );
}
