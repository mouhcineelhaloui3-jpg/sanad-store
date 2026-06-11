import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { TrustStrip } from "@/components/product/TrustStrip";
import { PainSection } from "@/components/product/PainSection";
import { MechanismBlock } from "@/components/product/MechanismBlock";
import { BenefitGrid } from "@/components/product/BenefitGrid";
import { HowToUse } from "@/components/product/HowToUse";
import { SocialProof } from "@/components/product/SocialProof";
import { FAQAccordion } from "@/components/product/FAQAccordion";
import { MobileStickyCTA } from "@/components/product/MobileStickyCTA";
import { BuyNowButton } from "./product-actions";
import { getCrossSells, getProductBySlug, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "منتج غير موجود | سَنَد" };
  return {
    title: `${product.shortName} | سَنَد`,
    description: product.subheadline
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const crossSells = getCrossSells(product);

  return (
    <div className="pb-24 md:pb-0">
      {/* Sticky trust bar */}
      <div className="sticky top-0 z-20 border-b border-sand-100 bg-sand-50/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-6xl justify-center">
          <TrustStrip variant="compact" />
        </div>
      </div>

      {/* Hero: gallery + buy box */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:items-start">
        <ProductGallery product={product} />
        <ProductBuyBox product={product} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-sand-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-sage-700">مناسب لك إذا</p>
            <ul className="mt-3 space-y-2 text-sm font-semibold leading-7 text-sand-800">
              {product.useCases.slice(0, 3).map((useCase) => (
                <li key={useCase}>• {useCase}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.75rem] border border-sand-100 bg-sage-100 p-5 shadow-sm">
            <p className="text-sm font-bold text-sage-700">قرار بلا مخاطرة</p>
            <h2 className="mt-2 text-xl font-black text-sand-950">الدفع عند الاستلام</h2>
            <p className="mt-2 text-sm leading-7 text-sand-700">
              ما كتخلص حتى توصلك السلعة. وفريق سَنَد كيتاصل بك قبل الإرسال باش يأكد الطلب.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-sand-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-sage-700">شنو غادي تفهم فهاد الصفحة؟</p>
            <p className="mt-2 text-sm leading-7 text-sand-700">
              المشكل، كيفاش كيخدم {product.mechanism}، الفوائد، طريقة الاستعمال، آراء العملاء، والأسئلة قبل الطلب.
            </p>
          </div>
        </div>
      </section>

      <PainSection product={product} />
      <MechanismBlock product={product} />
      <BenefitGrid product={product} />
      <HowToUse product={product} />
      <SocialProof product={product} />

      {/* Cross-sells */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-2xl">
          <p className="font-bold text-sage-700">كمّل نظام الراحة</p>
          <h2 className="mt-2 text-2xl font-black text-sand-950 md:text-3xl">منتجات كتكمل مع {product.shortName}</h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {crossSells.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <FAQAccordion faqs={product.faqs} />

      {/* Final CTA */}
      <section className="bg-sand-900 px-4 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-black md:text-3xl">جرّب {product.shortName} بلا مخاطرة</h2>
          <p className="mt-3 leading-8 text-sand-100">
            الدفع عند الاستلام داخل المغرب، وكنأكدو معاك الطلب بالهاتف قبل الإرسال.
          </p>
          <div className="mt-6 flex justify-center">
            <BuyNowButton product={product} />
          </div>
        </div>
      </section>

      <MobileStickyCTA product={product} />
    </div>
  );
}
