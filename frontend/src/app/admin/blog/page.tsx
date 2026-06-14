import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { blogCategoryLabels, blogPosts, postReadingTime } from "@/lib/blog/posts";
import { t } from "@/lib/i18n/localized";

export default function AdminBlogPage() {
  const posts = Object.values(blogPosts);

  return (
    <>
      <AdminPageHeader
        title="Blog Management"
        description="Articles are defined in src/lib/blog/posts.ts. Connect CMS or AI generation next."
        action={
          <Link href="/blog" className="rounded-2xl bg-sand-900 px-5 py-3 text-sm font-black text-white">
            View blog
          </Link>
        }
      />

      <AdminCard title={`Articles (${posts.length})`}>
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.slug} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <div>
                <p className="font-black">{t(post.title, "ar-ma")}</p>
                <p className="text-xs text-slate-500">
                  /blog/{post.slug} • {t(blogCategoryLabels[post.category], "ar-ma")} • {postReadingTime(post, "ar-ma")} min
                </p>
              </div>
              <Link href={`/blog/${post.slug}`} className="text-sm font-bold text-sand-700">
                Preview
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Roadmap: admin CRUD, scheduling, and AI article generation via Content MCP.
        </p>
      </AdminCard>
    </>
  );
}
