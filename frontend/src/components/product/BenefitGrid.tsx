import { Check } from "lucide-react";
import type { Product } from "@/lib/products";

export function BenefitGrid({ product }: { product: Product }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl">
        <p className="font-bold text-sage-700">علاش سَنَد؟</p>
        <h2 className="mt-2 text-2xl font-black text-sand-950 md:text-3xl">فوائد كتحس بيها فروتينك اليومي</h2>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {product.benefits.map((benefit) => (
          <div key={benefit.title} className="rounded-[1.75rem] border border-sand-100 bg-white p-6 shadow-soft">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-sage-700">
              <Check className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-black text-sand-950">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-7 text-sand-700">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
