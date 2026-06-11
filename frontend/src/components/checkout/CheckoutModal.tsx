"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { acceptUpsell, cartToOrderItems, createOrder, declineUpsell } from "@/lib/api";
import { CrossSellList } from "@/components/product/CrossSellList";
import { formatPrice, products } from "@/lib/products";
import { checkoutSchema, type CheckoutInput } from "@/lib/validation";
import { getCartTotal, useCartStore } from "@/store/cartStore";

type CheckoutModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const router = useRouter();
  const { items, clear } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [upsellProductId, setUpsellProductId] = useState<string | null>(null);
  const [upsellSecondsLeft, setUpsellSecondsLeft] = useState(15);
  const total = getCartTotal(items);

  const form = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { customerName: "", phone: "" }
  });

  const upsellProduct = products.find((product) => product.id === upsellProductId);
  const checkoutCrossSells = products.filter(
    (product) => !items.some((item) => item.productId === product.id)
  );

  async function onSubmit(values: CheckoutInput) {
    setIsSubmitting(true);
    try {
      const order = await createOrder({
        customer_name: values.customerName,
        phone: values.phone,
        items: cartToOrderItems(items)
      });
      setOrderId(order.id);
      setUpsellProductId(order.eligible_upsell?.product_id ?? null);
      if (!order.eligible_upsell) {
        clear();
        router.push(`/thank-you?order=${order.id}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function finishWithoutUpsell() {
    if (orderId && !isFinishing) {
      setIsFinishing(true);
      await declineUpsell(orderId).catch(() => undefined);
      clear();
      router.push(`/thank-you?order=${orderId}`);
    }
  }

  async function addUpsell() {
    if (!orderId || !upsellProductId) return;
    setIsFinishing(true);
    await acceptUpsell(orderId, upsellProductId);
    clear();
    router.push(`/thank-you?order=${orderId}`);
  }

  useEffect(() => {
    if (!orderId || !upsellProductId) return undefined;

    setUpsellSecondsLeft(15);
    const interval = window.setInterval(() => {
      setUpsellSecondsLeft((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [orderId, upsellProductId]);

  useEffect(() => {
    if (orderId && upsellProductId && upsellSecondsLeft === 0 && !isFinishing) {
      void finishWithoutUpsell();
    }
  }, [orderId, upsellProductId, upsellSecondsLeft, isFinishing]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 p-4">
      <div className="mx-auto mt-8 max-h-[calc(100vh-4rem)] max-w-lg overflow-y-auto rounded-[2rem] bg-white p-6 shadow-soft">
        {!orderId ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-sand-950">خطوة أخيرة ونثبّتو طلبك</h2>
                <p className="mt-2 text-sm leading-6 text-sand-700">
                  الدفع عند الاستلام. غادي نتاصلو بك لتأكيد الطلب والعنوان قبل الإرسال.
                </p>
              </div>
              <button onClick={onClose} className="text-sand-700" type="button">
                إغلاق
              </button>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[11px] font-black text-sand-700">
              <span className="rounded-xl bg-sage-100 px-2 py-2 text-sage-700">1. مراجعة السلة</span>
              <span className="rounded-xl bg-sand-50 px-2 py-2">2. الاسم والهاتف</span>
              <span className="rounded-xl bg-sand-50 px-2 py-2">3. عرض خاص</span>
            </div>

            <div className="mt-5 rounded-2xl bg-sand-50 p-4">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between py-1 text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
              <div className="mt-3 flex justify-between border-t border-sand-100 pt-3 font-black">
                <span>الإجمالي</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {checkoutCrossSells.length > 0 ? (
              <div className="mt-5">
                <CrossSellList products={checkoutCrossSells} title="اختياري: زيد منتج مكمل قبل التأكيد" ctaLabel="زيد" />
              </div>
            ) : null}

            <form className="mt-5 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <label className="block">
                <span className="text-sm font-bold text-sand-950">الاسم الكامل</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-sand-100 px-4 py-3 outline-none focus:border-sand-700"
                  {...form.register("customerName")}
                />
                <span className="mt-1 block text-sm text-red-600">
                  {form.formState.errors.customerName?.message}
                </span>
              </label>
              <label className="block">
                <span className="text-sm font-bold text-sand-950">رقم الهاتف</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-sand-100 px-4 py-3 outline-none focus:border-sand-700"
                  placeholder="0612345678"
                  {...form.register("phone")}
                />
                <span className="mt-1 block text-sm text-red-600">{form.formState.errors.phone?.message}</span>
              </label>
              <button
                disabled={isSubmitting || items.length === 0}
                className="w-full rounded-full bg-sand-900 px-5 py-4 font-black text-white disabled:opacity-60"
                type="submit"
              >
                {isSubmitting ? "جارٍ تسجيل الطلب..." : "ثبّت طلبي الآن"}
              </button>
              <p className="text-center text-xs leading-5 text-sand-600">
                معلوماتك كتستعمل غير لتأكيد الطلب والتوصيل. ما كاين لا أداء مسبق لا بطاقة بنكية.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-5 grid grid-cols-3 gap-2 text-center text-[11px] font-black text-sand-700">
              <span className="rounded-xl bg-sand-50 px-2 py-2">1. الطلب</span>
              <span className="rounded-xl bg-sand-50 px-2 py-2">2. تأكد</span>
              <span className="rounded-xl bg-sage-100 px-2 py-2 text-sage-700">3. عرض خاص</span>
            </div>
            <p className="text-sm font-bold text-sage-700">عرض خاص قبل ما نرسلو طلبك</p>
            <h2 className="mt-2 text-2xl font-black text-sand-950">زيد {upsellProduct?.shortName} لطلبك بثمن خاص</h2>
            <p className="mt-3 text-sand-700">
              هذا العرض كيظهر مرة واحدة بعد تثبيت الطلب. تقدر تضيفه الآن أو تكمل طلبك عادي.
            </p>
            <p className="mx-auto mt-4 inline-flex rounded-full bg-sage-100 px-4 py-2 text-sm font-black text-sage-700">
              العرض كيسالي خلال {upsellSecondsLeft} ثانية
            </p>
            {upsellProduct ? (
              <div className="mt-5 rounded-2xl bg-sand-50 p-5">
                <p className="font-bold">{upsellProduct.nameAr}</p>
                <p className="mt-2">
                  <span className="text-sand-500 line-through">{formatPrice(upsellProduct.price)}</span>{" "}
                  <span className="text-2xl font-black text-sand-950">
                    {formatPrice(upsellProduct.upsellPrice)}
                  </span>
                </p>
              </div>
            ) : null}
            <button
              onClick={addUpsell}
              disabled={isFinishing}
              className="mt-5 w-full rounded-full bg-sand-900 px-5 py-4 font-black text-white disabled:opacity-60"
            >
              {isFinishing ? "جارٍ التحديث..." : "أضفه لطلبي"}
            </button>
            <button
              onClick={finishWithoutUpsell}
              disabled={isFinishing}
              className="mt-3 w-full rounded-full border border-sand-100 px-5 py-4 font-bold disabled:opacity-60"
            >
              لا شكراً، أكمل طلبي
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
