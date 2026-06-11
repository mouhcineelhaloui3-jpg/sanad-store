"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/products";

export function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="font-bold text-sage-700">أسئلة شائعة</p>
        <h2 className="mt-2 text-2xl font-black text-sand-950 md:text-3xl">واش بقا عندك شي سؤال؟</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="overflow-hidden rounded-2xl border border-sand-100 bg-sand-50">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                  aria-expanded={isOpen}
                >
                  <span className="font-black text-sand-950">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-sand-700 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <p className="px-5 pb-5 leading-8 text-sand-700">{faq.answer}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
