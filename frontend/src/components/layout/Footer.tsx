import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

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
        </div>
        <div>
          <h3 className="font-bold">المتجر</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-sand-100">
            <Link href="/collection">المنتجات</Link>
            <Link href="/about">من نحن</Link>
            <Link href="/contact">اتصل بنا</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold">السياسات</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-sand-100">
            <Link href="/policies/shipping">سياسة التوصيل</Link>
            <Link href="/policies/returns">سياسة الاستبدال</Link>
            <Link href="/policies/privacy">الخصوصية</Link>
            <Link href="/policies/terms">الشروط</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl justify-end px-4 pb-6">
        <Link
          href="/admin"
          aria-label="Admin"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-sand-100/40 transition hover:bg-white/10 hover:text-sand-100"
        >
          <LockKeyhole className="h-4 w-4" />
        </Link>
      </div>
    </footer>
  );
}
