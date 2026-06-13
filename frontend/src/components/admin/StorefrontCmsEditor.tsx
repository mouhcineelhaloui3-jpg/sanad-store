"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CmsHomeSectionsPanel, CmsLayoutPanel } from "@/components/admin/CmsExtendedPanels";
import { AdminCard } from "@/components/admin/AdminCard";
import { CheckboxField, PrimaryButton, TextAreaField, TextField } from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPageSkeleton } from "@/components/admin/AdminSkeleton";
import { useAdminCms, useSaveAdminCms, useAdminSession } from "@/lib/admin/queries";
import { hasPermission } from "@/lib/admin/rbac";
import { defaultStoreContent } from "@/lib/cms/defaults";
import type { PlanCmsOverride, StoreContent } from "@/lib/cms/types";
import { defaultPlans } from "@/lib/plans";

const sectionKeys = [
  ["liveTicker", "Live ticker"],
  ["sports", "Sports showcase"],
  ["movies", "Movies showcase"],
  ["features", "Features"],
  ["plans", "Plans"],
  ["howItWorks", "How it works"],
  ["devices", "Devices"],
  ["trial", "Free Trial"],
  ["testimonials", "Testimonials"],
  ["stats", "Statistics"],
  ["faq", "FAQ"],
  ["contact", "Contact"],
  ["stickyCta", "Sticky mobile CTA"],
  ["whatsapp", "WhatsApp button"]
] as const;

type TabId = "general" | "layout" | "content" | "movies" | "sports" | "seo";

const tabs: { id: TabId; label: string }[] = [
  { id: "general", label: "عام" },
  { id: "layout", label: "📐 Layout" },
  { id: "content", label: "المحتوى" },
  { id: "movies", label: "🎬 أفلام" },
  { id: "sports", label: "⚽ رياضة" },
  { id: "seo", label: "SEO & API" }
];

export function StorefrontCmsEditor() {
  const session = useAdminSession();
  const { data, isLoading, isError, refetch } = useAdminCms();
  const saveMutation = useSaveAdminCms();
  const [content, setContent] = useState<StoreContent | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [tab, setTab] = useState<TabId>("general");
  const canWrite = session.data?.user ? hasPermission(session.data.user.role, "cms:write") : false;

  useEffect(() => {
    if (data) {
      setContent(data);
      setUsingFallback(false);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setContent(defaultStoreContent());
      setUsingFallback(true);
      toast.error("تعذر تحميل إعدادات الموقع — تم استخدام الإعدادات الافتراضية");
    }
  }, [isError]);

  const update = (patch: Partial<StoreContent>) => {
    if (!content) return;
    setContent({ ...content, ...patch });
  };

  const save = async () => {
    if (!content) return;
    if (!canWrite) {
      toast.error("You do not have permission to save CMS content");
      return;
    }

    try {
      const saved = await saveMutation.mutateAsync(content);
      setContent(saved);
      toast.success("تم حفظ التغييرات");
    } catch {
      toast.error("تعذر الحفظ");
    }
  };

  const updatePlan = (slug: string, patch: Partial<PlanCmsOverride>) => {
    if (!content) return;
    const plans = content.plans.map((p) => (p.slug === slug ? { ...p, ...patch } : p));
    update({ plans });
  };

  if (isLoading || !content) {
    return <AdminPageSkeleton />;
  }

  const { homepage, header, footer, branding, seo, integrations } = content;
  const movies = homepage.movies;

  return (
    <>
      <AdminPageHeader
        title="SANAD IPTV CMS"
        description="تحكم كامل فالمحتوى: أفلام، رياضة، باقات، SEO، Plausible، و API."
        action={
          <PrimaryButton onClick={save} disabled={saveMutation.isPending || !canWrite}>
            {saveMutation.isPending ? "جاري الحفظ..." : "حفظ كل التغييرات"}
          </PrimaryButton>
        }
      />

      {usingFallback ? (
        <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100">
          <p>يتم عرض الإعدادات الافتراضية. يمكنك إعادة المحاولة.</p>
          <button type="button" className="mt-3 rounded-xl bg-amber-600 px-4 py-2 font-bold text-white" onClick={() => refetch()}>
            إعادة المحاولة
          </button>
        </div>
      ) : null}

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              tab === t.id
                ? "bg-neon-cyan text-dark"
                : "border border-slate-300 bg-white text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {(tab === "general" || tab === "content") && (
          <>
            <AdminCard title="Branding">
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Brand Name" value={branding.brandName} onChange={(v) => update({ branding: { ...branding, brandName: v } })} />
                <TextField label="Tagline (AR)" value={branding.tagline.ar} onChange={(v) => update({ branding: { ...branding, tagline: { ...branding.tagline, ar: v } } })} />
                <TextField label="Primary Color" value={branding.primaryColor} onChange={(v) => update({ branding: { ...branding, primaryColor: v } })} />
                <TextField label="Accent Color" value={branding.accentColor} onChange={(v) => update({ branding: { ...branding, accentColor: v } })} />
                <TextField label="Logo URL" value={branding.logoUrl} onChange={(v) => update({ branding: { ...branding, logoUrl: v } })} />
              </div>
              {branding.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={branding.logoUrl} alt="Logo" className="mt-3 h-16 w-16 rounded-2xl border object-cover" />
              ) : null}
            </AdminCard>

            <AdminCard title="Hero">
              <div className="grid gap-4 md:grid-cols-2">
                <TextAreaField label="Headline (AR)" value={homepage.hero.headline.ar} onChange={(v) => update({ homepage: { ...homepage, hero: { ...homepage.hero, headline: { ...homepage.hero.headline, ar: v } } } })} />
                <TextAreaField label="Headline (EN)" value={homepage.hero.headline.en} onChange={(v) => update({ homepage: { ...homepage, hero: { ...homepage.hero, headline: { ...homepage.hero.headline, en: v } } } })} />
                <TextAreaField label="Subtitle (AR)" value={homepage.hero.subtitle.ar} onChange={(v) => update({ homepage: { ...homepage, hero: { ...homepage.hero, subtitle: { ...homepage.hero.subtitle, ar: v } } } })} />
                <TextAreaField label="Subtitle (EN)" value={homepage.hero.subtitle.en} onChange={(v) => update({ homepage: { ...homepage, hero: { ...homepage.hero, subtitle: { ...homepage.hero.subtitle, en: v } } } })} />
                <TextAreaField label="Banner (AR)" value={homepage.hero.bannerText.ar} onChange={(v) => update({ homepage: { ...homepage, hero: { ...homepage.hero, bannerText: { ...homepage.hero.bannerText, ar: v } } } })} />
                <TextAreaField label="Banner (EN)" value={homepage.hero.bannerText.en} onChange={(v) => update({ homepage: { ...homepage, hero: { ...homepage.hero, bannerText: { ...homepage.hero.bannerText, en: v } } } })} />
              </div>
            </AdminCard>

            <AdminCard title="Plans (Prices)">
              <div className="grid gap-4">
                {defaultPlans.map((plan) => {
                  const override = content.plans.find((p) => p.slug === plan.slug) ?? { slug: plan.slug };
                  return (
                    <div key={plan.slug} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                      <p className="mb-3 font-bold">{plan.name.ar}</p>
                      <div className="grid gap-3 md:grid-cols-3">
                        <TextField
                          label="Price (MAD)"
                          type="number"
                          value={String(override.price ?? plan.price)}
                          onChange={(v) => updatePlan(plan.slug, { price: Number(v) || plan.price })}
                        />
                        <CheckboxField
                          label="Enabled"
                          checked={override.enabled !== false}
                          onChange={(v) => updatePlan(plan.slug, { enabled: v })}
                        />
                        <CheckboxField
                          label="Highlighted"
                          checked={override.highlighted ?? plan.highlighted}
                          onChange={(v) => updatePlan(plan.slug, { highlighted: v })}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </AdminCard>
          </>
        )}

        {tab === "general" && (
          <>
            <AdminCard title="Sections — إظهار / إخفاء">
              <p className="mb-4 text-sm text-slate-500">
                فعّل أو عطّل أي section فالموقع. التغييرات كتبان مباشرة بعد الحفظ.
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {sectionKeys.map(([key, label]) => (
                  <CheckboxField
                    key={key}
                    label={label}
                    checked={homepage.sections[key]}
                    onChange={(v) =>
                      update({
                        homepage: {
                          ...homepage,
                          sections: { ...homepage.sections, [key]: v }
                        }
                      })
                    }
                  />
                ))}
              </div>
            </AdminCard>

            <AdminCard title="📞 Contact — WhatsApp / Telegram / Email">
              <p className="mb-4 text-sm text-slate-500">
                تحكم فأرقام التواصل اللي كيظهرو فالموقع (Contact, Footer, WhatsApp button).
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  label="WhatsApp Number (212...)"
                  value={footer.whatsappNumber}
                  onChange={(v) => update({ footer: { ...footer, whatsappNumber: v } })}
                />
                <TextAreaField
                  label="WhatsApp Default Message"
                  value={footer.whatsappMessage}
                  onChange={(v) => update({ footer: { ...footer, whatsappMessage: v } })}
                />
                <TextField
                  label="Telegram URL"
                  value={footer.telegramUrl}
                  onChange={(v) => update({ footer: { ...footer, telegramUrl: v } })}
                />
                <TextField
                  label="Support Email"
                  value={footer.supportEmail}
                  onChange={(v) => update({ footer: { ...footer, supportEmail: v } })}
                />
              </div>
            </AdminCard>
          </>
        )}

        {tab === "layout" && content && (
          <CmsLayoutPanel content={content} update={update} />
        )}

        {tab === "content" && (
          <>
            <AdminCard title="Live Ticker">
              <TextField
                label="Label (AR)"
                value={homepage.liveTicker.label.ar}
                onChange={(v) =>
                  update({
                    homepage: {
                      ...homepage,
                      liveTicker: { ...homepage.liveTicker, label: { ...homepage.liveTicker.label, ar: v } }
                    }
                  })
                }
              />
              <div className="mt-4 grid gap-2">
                {homepage.liveTicker.items.map((item, i) => (
                  <TextField
                    key={i}
                    label={`Item ${i + 1} (AR)`}
                    value={item.ar}
                    onChange={(v) => {
                      const items = [...homepage.liveTicker.items];
                      items[i] = { ...item, ar: v };
                      update({ homepage: { ...homepage, liveTicker: { ...homepage.liveTicker, items } } });
                    }}
                  />
                ))}
              </div>
            </AdminCard>

            <AdminCard title="Testimonials">
              {homepage.testimonials.map((t, i) => (
                <div key={t.id} className="mb-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <TextField
                    label="Name (AR)"
                    value={t.name.ar}
                    onChange={(v) => {
                      const testimonials = [...homepage.testimonials];
                      testimonials[i] = { ...t, name: { ...t.name, ar: v } };
                      update({ homepage: { ...homepage, testimonials } });
                    }}
                  />
                  <TextAreaField
                    label="Comment (AR)"
                    value={t.comment.ar}
                    onChange={(v) => {
                      const testimonials = [...homepage.testimonials];
                      testimonials[i] = { ...t, comment: { ...t.comment, ar: v } };
                      update({ homepage: { ...homepage, testimonials } });
                    }}
                  />
                </div>
              ))}
            </AdminCard>

            <AdminCard title="FAQ">
              {homepage.faqs.map((f, i) => (
                <div key={i} className="mb-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <TextField
                    label="Question (AR)"
                    value={f.question.ar}
                    onChange={(v) => {
                      const faqs = [...homepage.faqs];
                      faqs[i] = { ...f, question: { ...f.question, ar: v } };
                      update({ homepage: { ...homepage, faqs } });
                    }}
                  />
                  <TextAreaField
                    label="Answer (AR)"
                    value={f.answer.ar}
                    onChange={(v) => {
                      const faqs = [...homepage.faqs];
                      faqs[i] = { ...f, answer: { ...f.answer, ar: v } };
                      update({ homepage: { ...homepage, faqs } });
                    }}
                  />
                </div>
              ))}
            </AdminCard>

            <AdminCard title="Statistics">
              <div className="grid gap-3 md:grid-cols-2">
                {homepage.stats.map((s, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                    <TextField
                      label={`Stat ${i + 1} value`}
                      type="number"
                      value={String(s.value)}
                      onChange={(v) => {
                        const stats = [...homepage.stats];
                        stats[i] = { ...s, value: Number(v) || 0 };
                        update({ homepage: { ...homepage, stats } });
                      }}
                    />
                    <TextField
                      label="Label (AR)"
                      value={s.label.ar}
                      onChange={(v) => {
                        const stats = [...homepage.stats];
                        stats[i] = { ...s, label: { ...s.label, ar: v } };
                        update({ homepage: { ...homepage, stats } });
                      }}
                    />
                  </div>
                ))}
              </div>
            </AdminCard>
            <CmsHomeSectionsPanel content={content} update={update} />
          </>
        )}

        {tab === "movies" && movies && (
          <AdminCard title="Movies (+200K)">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Total count"
                type="number"
                value={String(movies.totalCount)}
                onChange={(v) =>
                  update({
                    homepage: {
                      ...homepage,
                      movies: { ...movies, totalCount: Number(v) || 200000 }
                    }
                  })
                }
              />
              <TextField
                label="Title (AR)"
                value={movies.title.ar}
                onChange={(v) =>
                  update({
                    homepage: {
                      ...homepage,
                      movies: { ...movies, title: { ...movies.title, ar: v } }
                    }
                  })
                }
              />
              <TextAreaField
                label="Subtitle (AR)"
                value={movies.subtitle.ar}
                onChange={(v) =>
                  update({
                    homepage: {
                      ...homepage,
                      movies: { ...movies, subtitle: { ...movies.subtitle, ar: v } }
                    }
                  })
                }
              />
              <TextField
                label="CTA (AR)"
                value={movies.ctaLabel.ar}
                onChange={(v) =>
                  update({
                    homepage: {
                      ...homepage,
                      movies: { ...movies, ctaLabel: { ...movies.ctaLabel, ar: v } }
                    }
                  })
                }
              />
            </div>
            <div className="mt-6 grid gap-4">
              {movies.items.map((movie, i) => (
                <div key={movie.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <p className="mb-2 font-bold">{movie.title.ar}</p>
                  <div className="grid gap-3 md:grid-cols-3">
                    <TextField
                      label="Title (AR)"
                      value={movie.title.ar}
                      onChange={(v) => {
                        const items = [...movies.items];
                        items[i] = { ...movie, title: { ...movie.title, ar: v } };
                        update({ homepage: { ...homepage, movies: { ...movies, items } } });
                      }}
                    />
                    <TextField
                      label="Year"
                      value={movie.year}
                      onChange={(v) => {
                        const items = [...movies.items];
                        items[i] = { ...movie, year: v };
                        update({ homepage: { ...homepage, movies: { ...movies, items } } });
                      }}
                    />
                    <TextField
                      label="Rating"
                      type="number"
                      value={String(movie.rating)}
                      onChange={(v) => {
                        const items = [...movies.items];
                        items[i] = { ...movie, rating: Number(v) || 0 };
                        update({ homepage: { ...homepage, movies: { ...movies, items } } });
                      }}
                    />
                    <TextField
                      label="Poster URL"
                      value={movie.posterUrl ?? ""}
                      onChange={(v) => {
                        const items = [...movies.items];
                        items[i] = { ...movie, posterUrl: v };
                        update({ homepage: { ...homepage, movies: { ...movies, items } } });
                      }}
                    />
                    <CheckboxField
                      label="Featured on homepage"
                      checked={movie.featured}
                      onChange={(v) => {
                        const items = [...movies.items];
                        items[i] = { ...movie, featured: v };
                        update({ homepage: { ...homepage, movies: { ...movies, items } } });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        )}

        {tab === "sports" && (
          <AdminCard title="Sports Events">
            {homepage.sports.events.map((ev, i) => (
              <div key={ev.id} className="mb-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <div className="grid gap-3 md:grid-cols-2">
                  <TextField
                    label="League (AR)"
                    value={ev.league.ar}
                    onChange={(v) => {
                      const events = [...homepage.sports.events];
                      events[i] = { ...ev, league: { ...ev.league, ar: v } };
                      update({ homepage: { ...homepage, sports: { ...homepage.sports, events } } });
                    }}
                  />
                  <TextField
                    label="Title (AR)"
                    value={ev.title.ar}
                    onChange={(v) => {
                      const events = [...homepage.sports.events];
                      events[i] = { ...ev, title: { ...ev.title, ar: v } };
                      update({ homepage: { ...homepage, sports: { ...homepage.sports, events } } });
                    }}
                  />
                  <CheckboxField
                    label="Live badge"
                    checked={ev.live}
                    onChange={(v) => {
                      const events = [...homepage.sports.events];
                      events[i] = { ...ev, live: v };
                      update({ homepage: { ...homepage, sports: { ...homepage.sports, events } } });
                    }}
                  />
                  <TextField
                    label="Image URL"
                    value={ev.imageUrl ?? ""}
                    onChange={(v) => {
                      const events = [...homepage.sports.events];
                      events[i] = { ...ev, imageUrl: v };
                      update({ homepage: { ...homepage, sports: { ...homepage.sports, events } } });
                    }}
                  />
                </div>
              </div>
            ))}
          </AdminCard>
        )}

        {tab === "seo" && (
          <>
            <AdminCard title="Header Promo">
              <TextAreaField label="Promo Bar (AR)" value={header.promoBar.ar} onChange={(v) => update({ header: { ...header, promoBar: { ...header.promoBar, ar: v } } })} />
            </AdminCard>

            <AdminCard title="SEO">
              <div className="grid gap-4">
                <TextField label="Meta Title" value={seo.title} onChange={(v) => update({ seo: { ...seo, title: v } })} />
                <TextAreaField label="Meta Description" value={seo.description} onChange={(v) => update({ seo: { ...seo, description: v } })} />
                <TextField label="Keywords (comma separated)" value={seo.keywords} onChange={(v) => update({ seo: { ...seo, keywords: v } })} />
                <TextField label="OG Title" value={seo.ogTitle} onChange={(v) => update({ seo: { ...seo, ogTitle: v } })} />
                <TextAreaField label="OG Description" value={seo.ogDescription} onChange={(v) => update({ seo: { ...seo, ogDescription: v } })} />
                <TextField label="OG Image URL" value={seo.ogImageUrl} onChange={(v) => update({ seo: { ...seo, ogImageUrl: v } })} />
                <TextField label="Google Site Verification" value={seo.googleSiteVerification} onChange={(v) => update({ seo: { ...seo, googleSiteVerification: v } })} />
              </div>
            </AdminCard>

            <AdminCard title="Integrations">
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="GA Measurement ID" value={integrations.gaMeasurementId} onChange={(v) => update({ integrations: { ...integrations, gaMeasurementId: v } })} />
                <TextField label="Meta Pixel ID" value={integrations.metaPixelId} onChange={(v) => update({ integrations: { ...integrations, metaPixelId: v } })} />
                <TextField label="TikTok Pixel ID" value={integrations.tiktokPixelId} onChange={(v) => update({ integrations: { ...integrations, tiktokPixelId: v } })} />
                <TextField label="Plausible Domain" value={integrations.plausibleDomain ?? ""} onChange={(v) => update({ integrations: { ...integrations, plausibleDomain: v } })} />
                <TextField label="Microsoft Clarity Project ID" value={integrations.clarityProjectId ?? ""} onChange={(v) => update({ integrations: { ...integrations, clarityProjectId: v } })} />
              </div>
            </AdminCard>

            <AdminCard title="Public API (read-only)">
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li><code className="rounded bg-slate-100 px-2 py-1 dark:bg-slate-800">GET /api/v1/content</code> — full CMS JSON</li>
                <li><code className="rounded bg-slate-100 px-2 py-1 dark:bg-slate-800">GET /api/v1/movies</code> — featured movies + genres</li>
                <li><code className="rounded bg-slate-100 px-2 py-1 dark:bg-slate-800">GET /api/v1/sports</code> — sports events</li>
                <li><code className="rounded bg-slate-100 px-2 py-1 dark:bg-slate-800">GET /api/v1/plans</code> — subscription plans</li>
              </ul>
            </AdminCard>
          </>
        )}
      </div>
    </>
  );
}
