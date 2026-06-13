"use client";

import Link from "next/link";
import Image from "next/image";
import { useStoreContent } from "@/components/cms/StoreContentProvider";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function Logo() {
  const { branding } = useStoreContent();
  const locale = useLocaleStore((s) => s.locale);

  return (
    <Link href="/" className="flex items-center gap-3" aria-label={branding.brandName}>
      {branding.logoUrl ? (
        <Image
          src={branding.logoUrl}
          alt={branding.brandName}
          width={48}
          height={48}
          priority
          className="h-12 w-12 rounded-2xl object-cover shadow-glow ring-2 ring-neon-cyan/30"
        />
      ) : (
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-green text-lg font-black text-dark shadow-glow">
          🔥
        </span>
      )}
      <span className="leading-tight">
        <span className="block text-xl font-extrabold text-white">{branding.brandName}</span>
        <span className="block text-xs font-semibold text-neon-cyan" suppressHydrationWarning>
          {t(branding.tagline, locale).slice(0, 32)}
        </span>
      </span>
    </Link>
  );
}
