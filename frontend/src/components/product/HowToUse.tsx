import type { Product } from "@/lib/products";

export function HowToUse({ product }: { product: Product }) {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="font-bold text-sage-700">بسيط وسهل</p>
          <h2 className="mt-2 text-2xl font-black text-sand-950 md:text-3xl">كيفاش كتستعملو؟</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {product.howToUse.map((step, index) => (
            <div key={step.title} className="rounded-[1.75rem] bg-sand-50 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand-900 text-lg font-black text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-black text-sand-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-sand-700">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <p className="font-bold text-sand-950">مناسب لـ:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.useCases.map((useCase) => (
              <span key={useCase} className="rounded-full bg-sage-100 px-4 py-2 text-sm font-semibold text-sage-700">
                {useCase}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
