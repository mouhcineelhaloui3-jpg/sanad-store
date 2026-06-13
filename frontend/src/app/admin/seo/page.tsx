import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { blogPosts } from "@/lib/blog/posts";
import { programmaticPages } from "@/lib/seo/programmatic-pages";
import { getAllPublicPaths } from "@/lib/seo/routes";

export default function AdminSeoPage() {
  const indexedPaths = getAllPublicPaths();

  return (
    <>
      <AdminPageHeader
        title="SEO Management"
        description="Indexed routes, programmatic landing pages, and blog coverage."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard title={`Sitemap Routes (${indexedPaths.length})`}>
          <ul className="max-h-80 space-y-2 overflow-y-auto text-sm">
            {indexedPaths.map((path) => (
              <li key={path} className="rounded-xl bg-slate-50 px-3 py-2 font-mono dark:bg-slate-800">
                {path}
              </li>
            ))}
          </ul>
        </AdminCard>

        <AdminCard title="Programmatic Landing Pages">
          <ul className="space-y-2 text-sm">
            {Object.values(programmaticPages).map((page) => (
              <li key={page.slug} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <p className="font-bold">{page.title}</p>
                <p className="text-xs text-slate-500">/iptv/{page.slug}</p>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>

      <div className="mt-6">
        <AdminCard title="Blog Articles">
          <ul className="space-y-2 text-sm">
            {Object.values(blogPosts).map((post) => (
              <li key={post.slug} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <span className="font-bold">{post.title}</span>
                <span className="text-xs text-slate-500">{post.category}</span>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>
    </>
  );
}
