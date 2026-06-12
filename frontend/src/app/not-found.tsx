import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "الصفحة غير موجودة — SANAD IPTV",
  description: "الصفحة اللي بغيتي ما لقيناهاش. رجع للرئيسية أو شوف الباقات.",
  path: "/404",
  noIndex: true
});

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-black text-neon-cyan">404</p>
      <h1 className="mt-3 text-3xl font-black text-white">الصفحة ما لقاتش</h1>
      <p className="mt-4 leading-8 text-dark-800">
        يمكن الرابط تبدّل أو الصفحة ما بقاتش موجودة. رجع للرئيسية أو شوف الباقات.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-neon">
          الرئيسية
        </Link>
        <Link href="/#plans" className="btn-neon-outline">
          الباقات
        </Link>
      </div>
    </div>
  );
}
