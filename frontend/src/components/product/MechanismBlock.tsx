import type { Product } from "@/lib/products";

export function MechanismBlock({ product }: { product: Product }) {
  return (
    <section className="bg-sand-900 px-4 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="font-bold text-sage-100">{product.mechanism}</p>
        <h2 className="mt-2 text-2xl font-black md:text-3xl">{product.mechanismTitle}</h2>
        <p className="mt-4 text-lg leading-9 text-sand-100">{product.mechanismCopy}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {product.materials.map((material) => (
            <div key={material} className="rounded-2xl bg-white/10 px-4 py-3 font-semibold">
              {material}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
