import type { Product } from "@/lib/products";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="rounded-[2.5rem] bg-sand-100 p-4 shadow-soft md:p-6">
      <div className="flex aspect-square items-center justify-center rounded-[2rem] bg-white text-center">
        <div className="px-6">
          <p className="font-bold text-sage-700">{product.type}</p>
          <p className="mt-3 text-4xl font-black text-sand-950">{product.shortName}</p>
          <p className="mt-3 text-sm text-sand-700">{product.problem}</p>
        </div>
      </div>
    </div>
  );
}
