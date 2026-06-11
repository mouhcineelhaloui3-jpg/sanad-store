import { AlertCircle } from "lucide-react";
import type { Product } from "@/lib/products";

export function PainSection({ product }: { product: Product }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <div className="rounded-[2rem] bg-sand-100 p-8 md:p-12">
        <p className="font-bold text-sage-700">واش هاد الإحساس بان ليك؟</p>
        <h2 className="mt-2 text-2xl font-black leading-snug text-sand-950 md:text-3xl">{product.painTitle}</h2>
        <p className="mt-4 max-w-2xl text-lg leading-9 text-sand-700">{product.painCopy}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {product.painPoints.map((point) => (
            <li key={point} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-sand-500" />
              <span className="font-semibold text-sand-900">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
