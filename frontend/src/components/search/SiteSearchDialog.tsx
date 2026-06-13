"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import type { SearchDocument } from "@/lib/search/catalog";

export function SiteSearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchDocument[]>([]);
  const [loading, setLoading] = useState(false);

  const runSearch = useCallback(async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=8`);
      const data = (await res.json()) as { results: SearchDocument[] };
      setResults(data.results ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => runSearch(query), 200);
    return () => window.clearTimeout(timer);
  }, [open, query, runSearch]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 transition hover:border-neon-cyan/30 hover:text-white md:inline-flex"
        aria-label="بحث في الموقع"
      >
        <Search className="h-4 w-4" />
        <span>بحث</span>
        <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px]">Ctrl+K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 p-4 pt-[12vh] backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="بحث">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-dark shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-4">
          <Search className="h-5 w-5 text-neon-cyan" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث: Smart TV، 4K، أسعار..."
            className="flex-1 bg-transparent py-4 text-white outline-none placeholder:text-white/40"
          />
          <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-white/60 hover:bg-white/10" aria-label="إغلاق">
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {loading ? (
            <li className="px-4 py-6 text-center text-sm text-white/50">جاري البحث...</li>
          ) : results.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-white/50">لا توجد نتائج</li>
          ) : (
            results.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 transition hover:bg-white/5"
                >
                  <p className="font-bold text-white">{item.title}</p>
                  <p className="text-xs text-white/50">{item.description}</p>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
