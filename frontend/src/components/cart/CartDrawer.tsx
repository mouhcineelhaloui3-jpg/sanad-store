"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { formatPrice, products } from "@/lib/products";
import { getCartTotal, useCartStore } from "@/store/cartStore";

export function CartDrawer() {
  const { items, isOpen, close, removeProduct, updateQuantity, addProduct } = useCartStore();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const total = getCartTotal(items);
  const crossSells = products.filter((product) => !items.some((item) => item.productId === product.id));

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 z-50">
          <button className="absolute inset-0 bg-black/40" onClick={close} aria-label="إغلاق السلة" />
          <aside className="absolute left-0 top-0 flex h-full w-full max-w-md flex-col bg-white p-5 shadow-soft sm:left-4 sm:top-4 sm:h-[calc(100%-2rem)] sm:rounded-[2rem]">
            <div className="flex items-center justify-between border-b border-sand-100 pb-4">
              <div>
                <h2 className="text-2xl font-black text-sand-950">سلتك</h2>
                <p className="mt-1 text-xs font-semibold text-sage-700">الخطوة الجاية: الاسم + رقم الهاتف فقط</p>
              </div>
              <button onClick={close} type="button" aria-label="إغلاق">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-5">
              {items.length === 0 ? (
                <div className="rounded-3xl bg-sand-50 p-6 text-center">
                  <p className="font-bold text-sand-950">سلتك فارغة</p>
                  <p className="mt-2 text-sm text-sand-700">اختار الحل المناسب لمنطقة التعب اللي كتزعجك.</p>
                  <Link href="/collection" onClick={close} className="mt-4 inline-block font-bold text-sand-900 underline">
                    شاهد منتجات سَنَد
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.productId} className="rounded-2xl border border-sand-100 p-4">
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="font-bold text-sand-950">{item.name}</p>
                          <p className="text-sm text-sand-700">{formatPrice(item.unitPrice)}</p>
                        </div>
                        <button className="text-sm text-sand-500 underline" onClick={() => removeProduct(item.productId)}>
                          حذف
                        </button>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          className="rounded-full border border-sand-100 p-2"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-bold">{item.quantity}</span>
                        <button
                          className="rounded-full border border-sand-100 p-2"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {crossSells.length > 0 ? (
                <div className="mt-6">
                  <h3 className="font-black text-sand-950">كمّل نظام الراحة ديالك</h3>
                  <div className="mt-3 space-y-3">
                    {crossSells.map((product) => (
                      <div key={product.id} className="flex items-center justify-between rounded-2xl bg-sand-50 p-3">
                        <div>
                          <p className="font-bold">{product.shortName}</p>
                          <p className="text-sm text-sand-700">{formatPrice(product.price)}</p>
                        </div>
                        <button
                          onClick={() => addProduct(product)}
                          className="rounded-full bg-white px-4 py-2 text-sm font-bold text-sand-900"
                        >
                          أضف
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-sand-100 pt-4">
              <div className="mb-4 grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-sand-700">
                <span className="rounded-xl bg-sand-50 px-2 py-2">COD</span>
                <span className="rounded-xl bg-sand-50 px-2 py-2">تأكيد قبل الإرسال</span>
                <span className="rounded-xl bg-sand-50 px-2 py-2">بلا حساب</span>
              </div>
              <div className="mb-3 flex justify-between text-lg font-black">
                <span>الإجمالي</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button
                disabled={items.length === 0}
                onClick={() => setCheckoutOpen(true)}
                className="w-full rounded-full bg-sand-900 px-5 py-4 font-black text-white disabled:opacity-50"
              >
                أكمل الطلب
              </button>
              <p className="mt-3 text-center text-xs font-semibold text-sage-700">
                لن يتم إرسال الطلب حتى تؤكد الاسم ورقم الهاتف في الخطوة التالية.
              </p>
            </div>
          </aside>
        </div>
      ) : null}
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
