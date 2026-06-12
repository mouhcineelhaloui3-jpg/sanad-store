"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { products, formatPrice } from "@/lib/products";
import { ProductVisual } from "@/components/product/ProductVisual";
import { useCartStore } from "@/store/cartStore";

type PainArea = "shoulders" | "neck" | "lower-back";
type Step = 1 | 2 | 3;

const painOptions: {
  id: PainArea;
  label: string;
  hint: string;
  slug: string;
  validation: string;
  objection: string;
}[] = [
  {
    id: "shoulders",
    label: "كتافي ووضعيتي",
    hint: "جلوس طويل، كتاف طايحين، ظهر علوي متعب",
    slug: "sanad-align",
    validation: "بزاف ناس كيخدمو قدام الشاشة وكيحسوا بنفس الشي. ماشي وحدك.",
    objection: "ما خاصكش علاج معقد — خاصك دعم يومي يذكّرك بوضعيتك."
  },
  {
    id: "neck",
    label: "رقبتي وكتافي",
    hint: "هاتف، سياقة، شد فآخر النهار",
    slug: "sanad-heat",
    validation: "الرقبة كتتحمل بزاف: هاتف، سياقة، توتر. هادشي طبيعي فنهار طويل.",
    objection: "ما بغيتي حل معقد — بغيتي لحظة راحة دافئة فدارك."
  },
  {
    id: "lower-back",
    label: "أسفل ظهري",
    hint: "سياقة، وقوف طويل، حركة كثيرة",
    slug: "sanad-lumbo",
    validation: "السياقة والوقوف الطويل كيخليو أسفل الظهر محتاج دعم. هادشي شائع بزاف.",
    objection: "ما خاصكش حزام قاسح — خاصك ضغط تتحكم فيه حسب راحتك."
  }
];

export function ProductFinder() {
  const [step, setStep] = useState<Step>(1);
  const [selected, setSelected] = useState<PainArea | null>(null);
  const addProduct = useCartStore((state) => state.addProduct);

  const match = painOptions.find((option) => option.id === selected);
  const product = products.find((item) => item.slug === match?.slug);

  const reset = () => {
    setStep(1);
    setSelected(null);
  };

  return (
    <section id="find" className="bg-sand-950 px-4 py-16 text-white md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-wide text-sage-100">مساعد الاختيار</p>
          <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">
            محتار؟ جاوب على سؤال واحد ونعطيك التوصية
          </h2>
          <p className="mt-4 text-base leading-8 text-sand-100/80 md:text-lg">
            هاد المساعد كيخدم بحال ما كندير معاك على واتساب: كنسول على التعب ديالك ونعطيك المنتج المناسب.
          </p>
        </div>

        {step === 1 ? (
          <div className="mt-10">
            <p className="mb-4 text-sm font-black text-white">فين كتحس بالتعب أكثر فالنهار؟</p>
            <div className="grid gap-4 md:grid-cols-3">
              {painOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setSelected(option.id);
                    setStep(2);
                  }}
                  className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-right transition hover:border-sage-100 hover:bg-white/10"
                >
                  <span className="text-3xl" aria-hidden>
                    {option.id === "shoulders" ? "🧍" : option.id === "neck" ? "🔥" : "💪"}
                  </span>
                  <h3 className="mt-4 text-xl font-black">{option.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-sand-100/75">{option.hint}</p>
                  <span className="mt-4 inline-block text-sm font-black text-sage-100">هذا أنا ←</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 2 && match ? (
          <div className="mt-10 max-w-2xl">
            <button
              type="button"
              onClick={reset}
              className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-sand-100/70 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              رجع للاختيار
            </button>
            <div className="rounded-[1.75rem] border border-sage-700/40 bg-sage-700/20 p-6 md:p-8">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 h-5 w-5 shrink-0 text-sage-100" />
                <div>
                  <p className="font-black text-sage-100">أنت فالمكان الصح</p>
                  <p className="mt-3 leading-8 text-white/90">{match.validation}</p>
                  <p className="mt-3 leading-8 text-sand-100/80">{match.objection}</p>
                </div>
              </div>
              <button type="button" onClick={() => setStep(3)} className="btn-primary mt-6 w-full sm:w-auto">
                شوف التوصية ديالي
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 && product && match ? (
          <div className="mt-10">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-sand-100/70 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              رجع
            </button>

            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white text-sand-950 md:grid md:grid-cols-[1.1fr_1fr]">
              <ProductVisual product={product} size="lg" showBadge />
              <div className="flex flex-col p-6 md:p-8">
                <p className="text-sm font-black text-sage-700">✓ التوصية ديالنا ليك</p>
                <h3 className="mt-2 text-2xl font-black md:text-3xl">{product.shortName}</h3>
                <p className="mt-3 leading-8 text-sand-700">{product.headline}</p>
                <ul className="mt-5 space-y-2">
                  {product.bullets.slice(0, 3).map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm text-sand-800">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-700" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-2xl font-black">{formatPrice(product.price)}</p>
                <p className="mt-1 text-xs font-bold text-sand-600">الدفع عند الاستلام · تأكيد هاتفي</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={() => addProduct(product)} className="btn-primary flex-1">
                    أضفه للسلة واطلب
                  </button>
                  <Link href={`/product/${product.slug}`} className="btn-secondary flex-1 text-center">
                    شوف التفاصيل
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
