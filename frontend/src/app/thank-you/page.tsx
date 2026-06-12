import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "تم استلام طلبك — SANAD IPTV",
  description: "شكراً على طلبك. غادي نتواصلو معاك عبر واتساب باش نفعّلو الاشتراك.",
  path: "/thank-you",
  noIndex: true
});

export default function ThankYouPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-4xl">✅</p>
      <h1 className="mt-4 text-3xl font-black text-white">تم استلام طلبك!</h1>
      <p className="mt-4 leading-8 text-dark-800">
        شكراً على ثقتك ف SANAD IPTV. غادي نتاصلو بك قريباً عبر واتساب باش نأكّدو الطلب و نفعّلو
        الاشتراك.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {["تأكيد عبر واتساب", "إرسال بيانات التفعيل", "دعم تقني"].map((step, index) => (
          <span key={step} className="glass-card px-4 py-3 text-sm font-bold text-neon-cyan">
            {index + 1}. {step}
          </span>
        ))}
      </div>
      <Link href="/" className="btn-neon mt-10">
        الرجوع للرئيسية
      </Link>
    </div>
  );
}
