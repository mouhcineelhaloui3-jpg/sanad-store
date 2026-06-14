"use client";

import Link from "next/link";
import Image from "next/image";
import { useStoreContent } from "@/components/cms/StoreContentProvider";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function Logo({ compact = false }: { compact?: boolean }) {
  const { branding } = useStoreContent();
  const locale = useLocaleStore((s) => s.locale);

  return (
    <Link href="/" className="logo-link group relative flex shrink-0 items-center gap-2.5" aria-label={branding.brandName}>
      <span className="logo-glow pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-br from-neon-cyan/25 via-neon-green/10 to-transparent opacity-60 blur-xl transition-opacity duration-300 group-hover:opacity-90" aria-hidden="true" />

      <span className="relative">
        {branding.logoUrl ? (
          <Image
            src={branding.logoUrl}
            alt={branding.brandName}
            width={compact ? 40 : 48}
            height={compact ? 40 : 48}
            priority
            className={`${compact ? "h-10 w-10" : "h-12 w-12"} rounded-xl object-cover shadow-glow ring-1 ring-neon-cyan/25 transition duration-300 group-hover:ring-neon-cyan/50`}
          />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan to-neon-green text-base font-black text-dark shadow-glow">
            🔥
          </span>
        )}
      </span>

      <span className={`relative leading-tight ${compact ? "hidden sm:block" : ""}`}>
        <span className="block text-lg font-extrabold tracking-tight text-white">{branding.brandName}</span>
        {!compact ? (
          <span className="block text-[11px] font-medium text-white/50" suppressHydrationWarning>
            {t(branding.tagline, locale).slice(0, 36)}
          </span>
        ) : (
          <span className="hidden text-[10px] font-medium text-neon-cyan/80 md:block" suppressHydrationWarning>
            IPTV Morocco
          </span>
        )}
      </span>
    </Link>
  );
}
