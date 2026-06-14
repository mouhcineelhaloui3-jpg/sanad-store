"use client";

import { Suspense } from "react";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import { BlogPageShell } from "@/components/blog/BlogPageShell";
import { blogUiText } from "@/lib/blog/ui-strings";
import { useLocaleStore } from "@/store/localeStore";

function BlogSearchForm({ defaultQuery }: { defaultQuery?: string }) {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <form action="/blog" method="get" className="not-prose mb-8 flex gap-2">
      <input
        name="q"
        defaultValue={defaultQuery}
        placeholder={blogUiText("searchPlaceholder", locale)}
        className="iptv-input flex-1"
      />
      <button type="submit" className="btn-neon px-6">
        {blogUiText("searchButton", locale)}
      </button>
    </form>
  );
}

export function BlogIndexPageClient({ query }: { query?: string }) {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <BlogPageShell>
      <BlogSearchForm defaultQuery={query} />
      <Suspense fallback={<p className="text-white/50">{blogUiText("loading", locale)}</p>}>
        <BlogIndexClient query={query} />
      </Suspense>
    </BlogPageShell>
  );
}
