import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "الصفحة غير موجودة",
  description: "الصفحة اللي بغيتي ما لقيناهاش. رجع للرئيسية أو شوف المنتجات.",
  path: "/404",
  noIndex: true
});

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-black text-sage-700">404</p>
      <h1 className="mt-3 text-3xl font-black text-sand-950">الصفحة ما لقاتش</h1>
      <p className="mt-4 leading-8 text-sand-700">
        يمكن الرابط تبدّل أو الصفحة ما بقاتش موجودة. جرّب ترجع للرئيسية أو شوف المنتجات.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          الرئيسية
        </Link>
        <Link href="/collection" className="btn-secondary">
          المنتجات
        </Link>
      </div>
    </div>
  );
}
