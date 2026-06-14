import Image from "next/image";
import Link from "next/link";
import { blogPosts, blogCategoryLabels, postReadingTime } from "@/lib/blog/posts";

/** Server-rendered SEO block + blog cards — zero client JS. */
export function IptvSeoIntro() {
  const posts = Object.values(blogPosts)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 4);

  return (
    <>
      <section className="iptv-section-spacing px-4" aria-labelledby="seo-intro-title">
        <div className="mx-auto max-w-6xl">
          <h2 id="seo-intro-title" className="section-title text-center">
            أحسن اشتراك IPTV للمغاربة
          </h2>
          <p className="section-subtitle mx-auto mt-3 text-center">
            SANAD IPTV — +115,000 قناة، 120,000+ VOD، بث 4K مستقر 99.9%، تفعيل فوري خلال 5 دقائق.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="glass-card p-5">
              <h3 className="text-base font-black text-neon-cyan">IPTV المغرب — قنوات كاملة</h3>
              <p className="mt-2 text-sm leading-7 text-white/85">
                Botola Pro، 2M، SNRT، beIN Sports، Champions League، La Liga، Premier League — كلشي فباقة
                واحدة بلا رسوم مخفية.
              </p>
            </article>
            <article className="glass-card p-5">
              <h3 className="text-base font-black text-neon-cyan">جودة 4K و anti-coupure</h3>
              <p className="mt-2 text-sm leading-7 text-white/85">
                HD، FHD، 4K و 8K حسب الباقة. تكنولوجيا anti-buffer باش المباريات الكبيرة ما تقطعش.
              </p>
            </article>
            <article className="glass-card p-5">
              <h3 className="text-base font-black text-neon-cyan">+25,000 مشترك — دعم 24/7</h3>
              <p className="mt-2 text-sm leading-7 text-white/85">
                آلاف المغاربة يثقوا بSANAD IPTV. الدعم عبر واتساب بالدارجة والعربية — جواب فـ 30 دقيقة.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="iptv-section-spacing px-4" aria-labelledby="blog-preview-title">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="section-eyebrow">مدونة IPTV</p>
              <h2 id="blog-preview-title" className="section-title mt-1">
                أدلة ونصائح IPTV
              </h2>
            </div>
            <Link href="/blog" className="text-sm font-bold text-neon-cyan hover:underline">
              جميع المقالات ←
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card-hover group flex flex-col overflow-hidden"
              >
                <div className="relative aspect-[1200/630] w-full bg-white/5">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                <span className="text-[11px] font-bold uppercase tracking-wide text-neon-gold">
                  {blogCategoryLabels[post.category]} · {postReadingTime(post)} د
                </span>
                <h3 className="mt-2 line-clamp-2 text-sm font-black text-white group-hover:text-neon-cyan">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-xs leading-6 text-white/70">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
