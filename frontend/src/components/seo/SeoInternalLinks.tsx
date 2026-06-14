import Link from "next/link";

const hubLinks = [
  { href: "/iptv/iptv-worldwide", label: "Premium IPTV Worldwide" },
  { href: "/iptv/iptv-smart-tv", label: "IPTV Smart TV" },
  { href: "/iptv/iptv-android", label: "IPTV Android" },
  { href: "/iptv/iptv-4k", label: "IPTV 4K" },
  { href: "/iptv/iptv-sports", label: "IPTV رياضة" },
  { href: "/pricing", label: "أسعار الاشتراك" },
  { href: "/trial", label: "تجربة مجانية" },
  { href: "/blog", label: "مدونة IPTV" }
] as const;

export function SeoInternalLinks({ currentPath }: { currentPath?: string }) {
  return (
    <nav aria-label="روابط IPTV ذات صلة" className="not-prose mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-lg font-black text-white">اكتشف SANAD IPTV</h2>
      <p className="mt-2 text-sm text-white/60">روابط داخلية باش تلقى أحسن محتوى واشتراك IPTV عالمي.</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {hubLinks
          .filter((link) => link.href !== currentPath)
          .map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-neon-cyan/40 hover:text-neon-cyan"
              >
                {link.label}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
