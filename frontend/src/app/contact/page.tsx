import type { Metadata } from "next";
import { MessageCircle, Mail, Clock } from "lucide-react";
import { getStoreContent } from "@/lib/cms/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { storeConfig, whatsappUrl } from "@/lib/store-config";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getStoreContent();
  return buildPageMetadata({
    title: "اتصل بنا",
    description: "تواصل مع فريق سَنَد — عبر واتساب أو البريد الإلكتروني.",
    path: "/contact",
    ogImage: content.seo.ogImageUrl
  });
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="section-eyebrow">تواصل معنا</p>
      <h1 className="section-title">فريق سَنَد حاضر للمساعدة</h1>
      <p className="mt-4 leading-8 text-sand-700">
        عندك سؤال حول منتج، طلب، أو طريقة التوصيل؟ راسلنا وسنجاوبك في أقرب وقت.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="card-premium flex items-start gap-4 p-6 transition hover:border-[#25D366]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366]">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-black text-sand-950">واتساب</h2>
            <p className="mt-1 text-sm leading-6 text-sand-700">الأسرع — رد مباشر من الفريق</p>
            <p className="mt-3 text-sm font-bold text-[#25D366]">ابدأ محادثة ←</p>
          </div>
        </a>

        <div className="card-premium flex items-start gap-4 p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sand-100">
            <Mail className="h-6 w-6 text-sand-700" />
          </div>
          <div>
            <h2 className="font-black text-sand-950">البريد الإلكتروني</h2>
            <p className="mt-1 text-sm leading-6 text-sand-700">{storeConfig.supportEmail}</p>
            <p className="mt-3 text-sm text-sand-600">رد خلال 24 ساعة</p>
          </div>
        </div>
      </div>

      <div className="mt-6 card-premium flex items-start gap-4 p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-100">
          <Clock className="h-6 w-6 text-sage-700" />
        </div>
        <div>
          <h2 className="font-black text-sand-950">أوقات الدعم</h2>
          <p className="mt-1 text-sm leading-6 text-sand-700">من الإثنين إلى السبت، 9:00 - 18:00</p>
          <p className="mt-3 rounded-xl bg-sand-50 px-4 py-2 text-sm leading-6 text-sand-700">
            إذا كان عندك طلب سابق، احتفظ برقم الطلب باش نقدر نساعدك بسرعة.
          </p>
        </div>
      </div>
    </div>
  );
}
