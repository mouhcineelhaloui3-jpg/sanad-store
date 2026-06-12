"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminCard } from "@/components/admin/AdminCard";
import {
  CheckboxField,
  PrimaryButton,
  SelectField,
  TextAreaField,
  TextField
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { fetchStoreContent, saveStoreContent, uploadImage } from "@/lib/cms/admin-client";
import { heroSizePresets, normalizeHero } from "@/lib/cms/hero-utils";
import type { ProductCmsOverride, StoreContent } from "@/lib/cms/types";
import { products as catalogProducts } from "@/lib/products";

const sectionKeys = [
  ["trustStrip", "Trust strip"],
  ["products", "Products"],
  ["productFinder", "Product finder"],
  ["productCompare", "Product compare"],
  ["sanadPromise", "Sanad promise"],
  ["testimonials", "Testimonials"],
  ["founderNote", "Founder note"],
  ["howItWorks", "How it works"],
  ["faq", "FAQ"],
  ["finalCta", "Final CTA"],
  ["stickyCta", "Sticky mobile CTA"],
  ["whatsapp", "WhatsApp button"]
] as const;

export function StorefrontCmsEditor() {
  const [content, setContent] = useState<StoreContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStoreContent()
      .then(setContent)
      .catch(() => toast.error("تعذر تحميل إعدادات الموقع"));
  }, []);

  const update = (patch: Partial<StoreContent>) => {
    if (!content) return;
    setContent({ ...content, ...patch });
  };

  const save = async () => {
    if (!content) return;
    setSaving(true);
    try {
      const saved = await saveStoreContent(content);
      setContent(saved);
      toast.success("تم حفظ التغييرات");
    } catch {
      toast.error("تعذر الحفظ");
    } finally {
      setSaving(false);
    }
  };

  const updateProduct = (slug: string, patch: Partial<ProductCmsOverride>) => {
    if (!content) return;
    const products = content.products.map((p) => (p.slug === slug ? { ...p, ...patch } : p));
    update({ products });
  };

  const handleHeroUpload = async (file: File) => {
    try {
      const url = await uploadImage(file);
      update({
        homepage: {
          ...content!.homepage,
          hero: { ...content!.homepage.hero, imageUrl: url }
        }
      });
      toast.success("تم رفع صورة الهيرو");
    } catch {
      toast.error("تعذر رفع الصورة");
    }
  };

  if (!content) {
    return <p className="text-sm text-slate-500">جاري التحميل...</p>;
  }

  const { homepage, header, footer, branding, seo, integrations } = content;

  return (
    <>
      <AdminPageHeader
        title="Storefront CMS"
        description="تحكم كامل فالمحتوى ديال الموقع: الهيرو، المنتجات، المراجعات، الهيدر، الفوتر، SEO."
        action={
          <PrimaryButton onClick={save} disabled={saving}>
            {saving ? "جاري الحفظ..." : "حفظ كل التغييرات"}
          </PrimaryButton>
        }
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCard title="بانر الهيرو — صورة + قياسات">
          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-500">
              معاينة البانر (نفس القياسات اللي غادي تبان فالموقع)
            </p>
            <div
              className="relative mx-auto w-full overflow-hidden rounded-xl border border-slate-200 bg-sand-100"
              style={
                homepage.hero.bannerMode === "aspect-ratio"
                  ? {
                      aspectRatio: (homepage.hero.aspectRatio ?? "21/9").replace("/", " / "),
                      maxHeight: `${homepage.hero.maxHeight ?? 560}px`
                    }
                  : {
                      height: `${homepage.hero.heightMobile ?? 260}px`,
                      maxHeight: `${homepage.hero.maxHeight ?? 560}px`
                    }
              }
            >
              {homepage.hero.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={homepage.hero.imageUrl}
                  alt="Hero preview"
                  className={`h-full w-full ${
                    homepage.hero.imageFit === "contain" ? "object-contain" : "object-cover"
                  } ${
                    homepage.hero.objectPosition === "top"
                      ? "object-top"
                      : homepage.hero.objectPosition === "bottom"
                        ? "object-bottom"
                        : "object-center"
                  }`}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-slate-500">
                  لا توجد صورة بعد
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["small", "صغير"],
                  ["medium", "متوسط"],
                  ["large", "كبير"],
                  ["cinematic", "سينمائي 21:9"]
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                  onClick={() =>
                    update({
                      homepage: {
                        ...homepage,
                        hero: { ...homepage.hero, ...heroSizePresets[key] }
                      }
                    })
                  }
                >
                  {label}
                </button>
              ))}
            </div>

            <label className="block">
              <span className="text-sm font-bold text-slate-700">رفع صورة البانر (المنتجات الثلاثة معاً)</span>
              <input
                type="file"
                accept="image/*"
                className="mt-2 block w-full text-sm"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleHeroUpload(file);
                }}
              />
            </label>
            <TextField
              label="Hero image URL"
              value={homepage.hero.imageUrl}
              onChange={(v) =>
                update({ homepage: { ...homepage, hero: { ...homepage.hero, imageUrl: v } } })
              }
            />
            <TextField
              label="Image alt text"
              value={homepage.hero.imageAlt}
              onChange={(v) =>
                update({ homepage: { ...homepage, hero: { ...homepage.hero, imageAlt: v } } })
              }
            />
            <SelectField
              label="نوع البانر"
              options={["banner-full", "banner-contained"]}
              value={homepage.hero.layout ?? "banner-full"}
              onChange={(v) =>
                update({
                  homepage: {
                    ...homepage,
                    hero: { ...homepage.hero, layout: v as "banner-full" | "banner-contained" }
                  }
                })
              }
            />
            <SelectField
              label="طريقة القياس"
              options={["fixed-height", "aspect-ratio"]}
              value={homepage.hero.bannerMode ?? "fixed-height"}
              onChange={(v) =>
                update({
                  homepage: {
                    ...homepage,
                    hero: { ...homepage.hero, bannerMode: v as "fixed-height" | "aspect-ratio" }
                  }
                })
              }
            />
            {homepage.hero.bannerMode === "aspect-ratio" ? (
              <SelectField
                label="نسبة العرض (Aspect ratio)"
                options={["21/9", "16/9", "3/1", "4/3"]}
                value={homepage.hero.aspectRatio ?? "21/9"}
                onChange={(v) =>
                  update({
                    homepage: { ...homepage, hero: { ...homepage.hero, aspectRatio: v } }
                  })
                }
              />
            ) : (
              <>
                <TextField
                  label="ارتفاع الموبايل (px)"
                  type="number"
                  value={String(homepage.hero.heightMobile ?? 260)}
                  onChange={(v) =>
                    update({
                      homepage: {
                        ...homepage,
                        hero: { ...homepage.hero, heightMobile: Number(v) || 260 }
                      }
                    })
                  }
                />
                <TextField
                  label="ارتفاع الديسكتوب (px)"
                  type="number"
                  value={String(homepage.hero.heightDesktop ?? 440)}
                  onChange={(v) =>
                    update({
                      homepage: {
                        ...homepage,
                        hero: { ...homepage.hero, heightDesktop: Number(v) || 440 }
                      }
                    })
                  }
                />
              </>
            )}
            <TextField
              label="أقصى ارتفاع (px)"
              type="number"
              value={String(homepage.hero.maxHeight ?? 560)}
              onChange={(v) =>
                update({
                  homepage: {
                    ...homepage,
                    hero: { ...homepage.hero, maxHeight: Number(v) || 560 }
                  }
                })
              }
            />
            <TextField
              label="أقصى عرض (px) — 0 = كامل الشاشة"
              type="number"
              value={String(homepage.hero.maxWidth ?? 0)}
              onChange={(v) =>
                update({
                  homepage: {
                    ...homepage,
                    hero: { ...homepage.hero, maxWidth: Number(v) || 0 }
                  }
                })
              }
            />
            <SelectField
              label="ملء الصورة"
              options={["cover", "contain"]}
              value={homepage.hero.imageFit ?? "cover"}
              onChange={(v) =>
                update({
                  homepage: {
                    ...homepage,
                    hero: { ...homepage.hero, imageFit: v as "cover" | "contain" }
                  }
                })
              }
            />
            <SelectField
              label="موضع الصورة"
              options={["center", "top", "bottom"]}
              value={homepage.hero.objectPosition ?? "center"}
              onChange={(v) =>
                update({
                  homepage: {
                    ...homepage,
                    hero: { ...homepage.hero, objectPosition: v as "center" | "top" | "bottom" }
                  }
                })
              }
            />
            <CheckboxField
              label="زوايا مدوّرة للبانر"
              checked={homepage.hero.rounded ?? false}
              onChange={(checked) =>
                update({
                  homepage: { ...homepage, hero: { ...homepage.hero, rounded: checked } }
                })
              }
            />
            <p className="text-xs text-slate-500">
              الحالي: {normalizeHero(homepage.hero).layout} ·{" "}
              {homepage.hero.bannerMode === "aspect-ratio"
                ? `نسبة ${homepage.hero.aspectRatio}`
                : `${homepage.hero.heightMobile}px موبايل / ${homepage.hero.heightDesktop}px ديسكتوب`}
            </p>
            <TextField
              label="Headline"
              value={homepage.hero.headline}
              onChange={(v) =>
                update({ homepage: { ...homepage, hero: { ...homepage.hero, headline: v } } })
              }
            />
            <TextAreaField
              label="Subtitle"
              value={homepage.hero.subtitle}
              onChange={(v) =>
                update({ homepage: { ...homepage, hero: { ...homepage.hero, subtitle: v } } })
              }
            />
            <TextField
              label="Primary CTA label"
              value={homepage.hero.primaryCtaLabel}
              onChange={(v) =>
                update({ homepage: { ...homepage, hero: { ...homepage.hero, primaryCtaLabel: v } } })
              }
            />
            <TextField
              label="Primary CTA link"
              value={homepage.hero.primaryCtaHref}
              onChange={(v) =>
                update({ homepage: { ...homepage, hero: { ...homepage.hero, primaryCtaHref: v } } })
              }
            />
            <TextField
              label="Secondary CTA label"
              value={homepage.hero.secondaryCtaLabel}
              onChange={(v) =>
                update({ homepage: { ...homepage, hero: { ...homepage.hero, secondaryCtaLabel: v } } })
              }
            />
            <TextField
              label="Trust line"
              value={homepage.hero.trustLine}
              onChange={(v) =>
                update({ homepage: { ...homepage, hero: { ...homepage.hero, trustLine: v } } })
              }
            />
          </div>
        </AdminCard>

        <AdminCard title="Section visibility">
          <div className="grid gap-3 sm:grid-cols-2">
            {sectionKeys.map(([key, label]) => (
              <CheckboxField
                key={key}
                label={label}
                checked={homepage.sections[key]}
                onChange={(checked) =>
                  update({
                    homepage: {
                      ...homepage,
                      sections: { ...homepage.sections, [key]: checked }
                    }
                  })
                }
              />
            ))}
          </div>
        </AdminCard>

        <AdminCard title="Header & promo bar">
          <div className="space-y-4">
            <TextField
              label="Promo bar text"
              value={header.promoBar}
              onChange={(v) => update({ header: { ...header, promoBar: v } })}
            />
            <TextAreaField
              label="Nav links (label|href per line)"
              value={header.navLinks.map((l) => `${l.label}|${l.href}`).join("\n")}
              onChange={(v) =>
                update({
                  header: {
                    ...header,
                    navLinks: v
                      .split("\n")
                      .filter(Boolean)
                      .map((line) => {
                        const [label, href] = line.split("|");
                        return { label: label?.trim() ?? "", href: href?.trim() ?? "/" };
                      })
                  }
                })
              }
            />
          </div>
        </AdminCard>

        <AdminCard title="Footer & contact">
          <div className="space-y-4">
            <TextAreaField
              label="Footer description"
              value={footer.description}
              onChange={(v) => update({ footer: { ...footer, description: v } })}
            />
            <TextField
              label="Support email"
              value={footer.supportEmail}
              onChange={(v) => update({ footer: { ...footer, supportEmail: v } })}
            />
            <TextField
              label="WhatsApp number"
              value={footer.whatsappNumber}
              onChange={(v) => update({ footer: { ...footer, whatsappNumber: v } })}
            />
            <TextAreaField
              label="WhatsApp default message"
              value={footer.whatsappMessage}
              onChange={(v) => update({ footer: { ...footer, whatsappMessage: v } })}
            />
          </div>
        </AdminCard>

        <AdminCard title="Branding">
          <div className="space-y-4">
            <TextField label="Brand name" value={branding.brandName} onChange={(v) => update({ branding: { ...branding, brandName: v } })} />
            <TextField label="Tagline" value={branding.tagline} onChange={(v) => update({ branding: { ...branding, tagline: v } })} />
            <TextField label="Primary color" value={branding.primaryColor} onChange={(v) => update({ branding: { ...branding, primaryColor: v } })} />
            <TextField label="Accent color" value={branding.accentColor} onChange={(v) => update({ branding: { ...branding, accentColor: v } })} />
            <TextField label="Logo URL" value={branding.logoUrl} onChange={(v) => update({ branding: { ...branding, logoUrl: v } })} />
          </div>
        </AdminCard>

        <AdminCard title="SEO — Meta Titles & Open Graph">
          <div className="space-y-4">
            <TextField label="Meta title" value={seo.title} onChange={(v) => update({ seo: { ...seo, title: v } })} />
            <TextAreaField label="Meta description" value={seo.description} onChange={(v) => update({ seo: { ...seo, description: v } })} />
            <TextField label="Keywords (مفصولة بفاصلة)" value={seo.keywords} onChange={(v) => update({ seo: { ...seo, keywords: v } })} />
            <TextField label="OG title" value={seo.ogTitle} onChange={(v) => update({ seo: { ...seo, ogTitle: v } })} />
            <TextAreaField label="OG description" value={seo.ogDescription} onChange={(v) => update({ seo: { ...seo, ogDescription: v } })} />
            <label className="block">
              <span className="text-sm font-bold text-slate-700">صورة Open Graph (1200×630)</span>
              <input
                type="file"
                accept="image/*"
                className="mt-2 block w-full text-sm"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const url = await uploadImage(file);
                    update({ seo: { ...seo, ogImageUrl: url } });
                    toast.success("تم رفع صورة OG");
                  } catch {
                    toast.error("تعذر رفع الصورة");
                  }
                }}
              />
            </label>
            <TextField
              label="OG image URL"
              value={seo.ogImageUrl ?? ""}
              onChange={(v) => update({ seo: { ...seo, ogImageUrl: v } })}
            />
            {seo.ogImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={seo.ogImageUrl} alt="OG preview" className="max-h-40 rounded-xl border border-slate-200" />
            ) : (
              <p className="text-xs text-slate-500">
                بلا صورة مرفوعة، غادي تتولّد صورة OG تلقائياً من `/opengraph-image`.
              </p>
            )}
            <TextField
              label="Google Search Console verification"
              value={seo.googleSiteVerification ?? ""}
              onChange={(v) => update({ seo: { ...seo, googleSiteVerification: v } })}
            />
            <p className="text-xs text-slate-500">
              Sitemap: <code>/sitemap.xml</code> · Robots: <code>/robots.txt</code>
            </p>
          </div>
        </AdminCard>

        <AdminCard title="Analytics & Tracking">
          <div className="space-y-4">
            <TextField
              label="Google Analytics 4 ID (G-XXXX)"
              value={integrations.gaMeasurementId ?? ""}
              onChange={(v) => update({ integrations: { ...integrations, gaMeasurementId: v } })}
            />
            <TextField
              label="Meta Pixel ID"
              value={integrations.metaPixelId ?? ""}
              onChange={(v) => update({ integrations: { ...integrations, metaPixelId: v } })}
            />
            <TextField
              label="TikTok Pixel ID"
              value={integrations.tiktokPixelId ?? ""}
              onChange={(v) => update({ integrations: { ...integrations, tiktokPixelId: v } })}
            />
            <p className="text-xs text-slate-500">
              يمكن تعيين نفس القيم في `.env` (`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_META_PIXEL_ID`,
              `NEXT_PUBLIC_TIKTOK_PIXEL_ID`). الأدمين كيغلب على `.env` إلا كانت الحقول معمّرة.
            </p>
            <p className="text-xs text-slate-500">
              Error tracking: أخطاء المتصفح كتتسجّل فـ `/api/report-error`. لـ Sentry، عيّن `SENTRY_DSN` فـ `.env`.
            </p>
          </div>
        </AdminCard>

        <AdminCard title="Homepage FAQs">
          <TextAreaField
            label="FAQ blocks (question|||answer per block, separated by ---)"
            value={homepage.faqs.map((f) => `${f.question}|||${f.answer}`).join("\n---\n")}
            onChange={(v) =>
              update({
                homepage: {
                  ...homepage,
                  faqs: v
                    .split("\n---\n")
                    .filter(Boolean)
                    .map((block) => {
                      const [question, answer] = block.split("|||");
                      return { question: question?.trim() ?? "", answer: answer?.trim() ?? "" };
                    })
                }
              })
            }
          />
        </AdminCard>

        <AdminCard title="Final CTA">
          <div className="space-y-4">
            <TextField
              label="Title"
              value={homepage.finalCtaTitle}
              onChange={(v) => update({ homepage: { ...homepage, finalCtaTitle: v } })}
            />
            <TextAreaField
              label="Subtitle"
              value={homepage.finalCtaSubtitle}
              onChange={(v) => update({ homepage: { ...homepage, finalCtaSubtitle: v } })}
            />
          </div>
        </AdminCard>
      </div>

      <div className="mt-6 grid gap-6">
        {catalogProducts.map((product) => {
          const override =
            content.products.find((p) => p.slug === product.slug) ?? { slug: product.slug, enabled: true };
          const reviewsText = (override.reviews ?? product.reviews)
            .map((r) => `${r.name}|${r.city}|${r.rating}|${r.text}`)
            .join("\n");

          return (
            <AdminCard key={product.slug} title={`Product: ${product.shortName}`}>
              <div className="grid gap-4 md:grid-cols-2">
                <CheckboxField
                  label="Enabled on storefront"
                  checked={override.enabled !== false}
                  onChange={(checked) => updateProduct(product.slug, { enabled: checked })}
                />
                <TextField
                  label="Price (MAD)"
                  type="number"
                  value={String(override.price ?? product.price)}
                  onChange={(v) => updateProduct(product.slug, { price: Number(v) })}
                />
                <TextField
                  label="Arabic name"
                  value={override.nameAr ?? product.nameAr}
                  onChange={(v) => updateProduct(product.slug, { nameAr: v })}
                />
                <TextAreaField
                  label="Headline"
                  value={override.headline ?? product.headline}
                  onChange={(v) => updateProduct(product.slug, { headline: v })}
                />
                <TextAreaField
                  label="Bullets (one per line)"
                  value={(override.bullets ?? product.bullets).join("\n")}
                  onChange={(v) =>
                    updateProduct(product.slug, { bullets: v.split("\n").filter(Boolean) })
                  }
                />
                <TextField
                  label="SEO title"
                  value={override.seoTitle ?? ""}
                  placeholder={product.shortName}
                  onChange={(v) => updateProduct(product.slug, { seoTitle: v })}
                />
                <TextAreaField
                  label="SEO description"
                  value={override.seoDescription ?? ""}
                  placeholder={product.subheadline}
                  onChange={(v) => updateProduct(product.slug, { seoDescription: v })}
                />
                <TextField
                  label="OG image URL"
                  value={override.ogImageUrl ?? ""}
                  onChange={(v) => updateProduct(product.slug, { ogImageUrl: v })}
                />
                <TextAreaField
                  label="Reviews (name|city|rating|text per line). Leave empty for Viagra/manual-only products."
                  value={reviewsText}
                  onChange={(v) => {
                    const reviews = v
                      .split("\n")
                      .filter(Boolean)
                      .map((line) => {
                        const [name, city, rating, ...textParts] = line.split("|");
                        return {
                          name: name?.trim() ?? "",
                          city: city?.trim() ?? "",
                          rating: Number(rating) || 5,
                          text: textParts.join("|").trim()
                        };
                      });
                    updateProduct(product.slug, { reviews, ratingCount: reviews.length });
                  }}
                />
              </div>
            </AdminCard>
          );
        })}
      </div>

      <div className="mt-8">
        <PrimaryButton onClick={save} disabled={saving}>
          {saving ? "جاري الحفظ..." : "حفظ كل التغييرات"}
        </PrimaryButton>
      </div>
    </>
  );
}
