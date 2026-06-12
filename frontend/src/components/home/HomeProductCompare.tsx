"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { products, formatPrice } from "@/lib/products";

const columns = [
  { id: "sanad-align", label: "ألاين", focus: "كتاف ووضعية" },
  { id: "sanad-heat", label: "هيت", focus: "رقبة وشد" },
  { id: "sanad-lumbo", label: "لومبو", focus: "أسفل الظهر" }
] as const;

type ColumnId = (typeof columns)[number]["id"];

const features: { label: string; values: Record<ColumnId, string | boolean> }[] = [
  { label: "المنطقة المستهدفة", values: { "sanad-align": "كتاف وظهر علوي", "sanad-heat": "رقبة وكتاف", "sanad-lumbo": "أسفل الظهر" } },
  { label: "أحسن وقت", values: { "sanad-align": "جلوس طويل / خدمة", "sanad-heat": "بعد السياقة أو الخدمة", "sanad-lumbo": "سياقة ووقوف" } },
  { label: "الآلية", values: { "sanad-align": "دعم قابل للتعديل", "sanad-heat": "حرارة + اهتزاز", "sanad-lumbo": "ضغط داعم" } },
  { label: "مناسب للهدية", values: { "sanad-align": true, "sanad-heat": true, "sanad-lumbo": true } },
  { label: "الدفع عند الاستلام", values: { "sanad-align": true, "sanad-heat": true, "sanad-lumbo": true } }
];

export function HomeProductCompare() {
  const [highlight, setHighlight] = useState<ColumnId>("sanad-align");

  return (
    <section id="compare" className="bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="section-eyebrow">مقارنة سريعة</p>
          <h2 className="section-title">شنو الفرق بين الثلاثة؟</h2>
          <p className="section-subtitle">
            اضغط على المنتج باش تشوف التفاصيل. هاد المقارنة كتعطيك القرار فأقل من دقيقة.
          </p>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {columns.map((col) => (
            <button
              key={col.id}
              type="button"
              onClick={() => setHighlight(col.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-black transition ${
                highlight === col.id
                  ? "bg-sand-950 text-white shadow-soft"
                  : "bg-sand-100 text-sand-800 hover:bg-sand-200"
              }`}
            >
              {col.label} — {col.focus}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-right">
            <thead>
              <tr className="border-b border-sand-200">
                <th className="p-4 text-sm font-black text-sand-600">المعيار</th>
                {columns.map((col) => {
                  const product = products.find((p) => p.id === col.id)!;
                  return (
                    <th
                      key={col.id}
                      className={`p-4 text-sm font-black transition ${
                        highlight === col.id ? "bg-sage-100 text-sand-950" : "text-sand-950"
                      }`}
                    >
                      <span className="block">{product.shortName}</span>
                      <span className="mt-1 block text-xs font-bold text-sage-700">{formatPrice(product.price)}</span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {features.map((row) => (
                <tr key={row.label} className="border-b border-sand-100">
                  <td className="p-4 text-sm font-black text-sand-700">{row.label}</td>
                  {columns.map((col) => {
                    const value = row.values[col.id];
                    return (
                      <td
                        key={col.id}
                        className={`p-4 text-sm ${highlight === col.id ? "bg-sage-50 font-bold text-sand-900" : "text-sand-800"}`}
                      >
                        {typeof value === "boolean" ? (
                          value ? (
                            <Check className="inline h-5 w-5 text-sage-700" />
                          ) : (
                            <X className="inline h-5 w-5 text-sand-300" />
                          )
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={`/product/${highlight}`} className="btn-primary">
            شوف {products.find((p) => p.id === highlight)?.shortName} واطلب
          </Link>
          <Link href="#find" className="btn-secondary">
            ساعدني نختار
          </Link>
        </div>
      </div>
    </section>
  );
}
