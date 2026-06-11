import Link from "next/link";
import { LockKeyhole, MessageCircle } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { storeConfig, whatsappUrl } from "@/lib/store-config";

export function Footer() {
  return (
    <footer className="border-t border-sand-100 bg-sand-950 text-sand-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-7 text-sand-100">
            سَنَد متجر مغربي متخصص في حلول الراحة اليومية ودعم الجسم، مصمم للناس
            اللي نهارهم طويل وباغين يرجعو يحسو براحتهم بثقة وبساطة.
          </p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white transition hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            تواصل عبر واتساب
          </a>
        </div>
        <div>
          <h3 className="font-bold">المتجر</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-sand-100">
            <Link href="/collection" className="transition hover:text-white">المنتجات</Link>
            <Link href="/about" className="transition hover:text-white">من نحن</Link>
            <Link href="/contact" className="transition hover:text-white">اتصل بنا</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold">السياسات</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-sand-100">
            <Link href="/policies/shipping" className="transition hover:text-white">سياسة التوصيل</Link>
            <Link href="/policies/returns" className="transition hover:text-white">سياسة الاستبدال</Link>
            <Link href="/policies/privacy" className="transition hover:text-white">الخصوصية</Link>
            <Link href="/policies/terms" className="transition hover:text-white">الشروط</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-sand-100/70 sm:flex-row">
          <p>© {new Date().getFullYear()} {storeConfig.brand}. جميع الحقوق محفوظة.</p>
          <p>{storeConfig.supportEmail}</p>
          <Link
            href="/admin"
            aria-label="Admin"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-sand-100/40 transition hover:bg-white/10 hover:text-sand-100"
          >
            <LockKeyhole className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
