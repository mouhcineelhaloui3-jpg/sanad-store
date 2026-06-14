import { BlogPreviewClient } from "@/components/blog/BlogPreviewClient";

/** Server-rendered SEO block + blog cards — blog preview is locale-aware (client). */
export function IptvSeoIntro() {
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

      <BlogPreviewClient />
    </>
  );
}
