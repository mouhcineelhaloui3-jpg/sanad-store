import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="سَنَد">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand-900 text-lg font-bold text-white">
        N
      </span>
      <span className="leading-tight">
        <span className="block text-2xl font-extrabold text-sand-950">سَنَد</span>
        <span className="block font-latin text-xs font-semibold tracking-[0.22em] text-sand-700">
          SANAD
        </span>
      </span>
    </Link>
  );
}
