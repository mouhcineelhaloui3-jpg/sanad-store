"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminCard } from "@/components/admin/AdminCard";
import { CheckboxField, PrimaryButton, TextAreaField, TextField } from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { fetchStoreContent, saveStoreContent } from "@/lib/cms/admin-client";
import type { PlanCmsOverride, StoreContent } from "@/lib/cms/types";
import { defaultPlans } from "@/lib/plans";

const sectionKeys = [
  ["features", "Features"],
  ["plans", "Plans"],
  ["trial", "Free Trial"],
  ["testimonials", "Testimonials"],
  ["stats", "Statistics"],
  ["faq", "FAQ"],
  ["contact", "Contact"],
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

  const updatePlan = (slug: string, patch: Partial<PlanCmsOverride>) => {
    if (!content) return;
    const plans = content.plans.map((p) => (p.slug === slug ? { ...p, ...patch } : p));
    update({ plans });
  };

  if (!content) {
    return <p className="text-sm text-slate-500">جاري التحميل...</p>;
  }

  const { homepage, header, footer, branding, seo, integrations } = content;

  return (
    <>
      <AdminPageHeader
        title="SANAD IPTV CMS"
        description="تحكم فالمحتوى: الهيرو، الباقات، المميزات، SEO، واتساب."
        action={
          <PrimaryButton onClick={save} disabled={saving}>
            {saving ? "جاري الحفظ..." : "حفظ كل التغييرات"}
          </PrimaryButton>
        }
      />

      <div className="grid gap-6">
        <AdminCard title="Branding">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Brand Name" value={branding.brandName} onChange={(v) => update({ branding: { ...branding, brandName: v } })} />
            <TextField label="Tagline (AR)" value={branding.tagline.ar} onChange={(v) => update({ branding: { ...branding, tagline: { ...branding.tagline, ar: v } } })} />
            <TextField label="Primary Color" value={branding.primaryColor} onChange={(v) => update({ branding: { ...branding, primaryColor: v } })} />
            <TextField label="Accent Color" value={branding.accentColor} onChange={(v) => update({ branding: { ...branding, accentColor: v } })} />
          </div>
        </AdminCard>

        <AdminCard title="Hero">
          <div className="grid gap-4">
            <TextAreaField label="Headline (AR)" value={homepage.hero.headline.ar} onChange={(v) => update({ homepage: { ...homepage, hero: { ...homepage.hero, headline: { ...homepage.hero.headline, ar: v } } } })} />
            <TextAreaField label="Subtitle (AR)" value={homepage.hero.subtitle.ar} onChange={(v) => update({ homepage: { ...homepage, hero: { ...homepage.hero, subtitle: { ...homepage.hero.subtitle, ar: v } } } })} />
            <TextAreaField label="Banner (AR)" value={homepage.hero.bannerText.ar} onChange={(v) => update({ homepage: { ...homepage, hero: { ...homepage.hero, bannerText: { ...homepage.hero.bannerText, ar: v } } } })} />
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

        <AdminCard title="Sections">
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

        <AdminCard title="WhatsApp">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Number" value={footer.whatsappNumber} onChange={(v) => update({ footer: { ...footer, whatsappNumber: v } })} />
            <TextAreaField label="Default Message" value={footer.whatsappMessage} onChange={(v) => update({ footer: { ...footer, whatsappMessage: v } })} />
            <TextField label="Telegram URL" value={footer.telegramUrl} onChange={(v) => update({ footer: { ...footer, telegramUrl: v } })} />
            <TextField label="Support Email" value={footer.supportEmail} onChange={(v) => update({ footer: { ...footer, supportEmail: v } })} />
          </div>
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
          <div className="grid gap-4 md:grid-cols-3">
            <TextField label="GA Measurement ID" value={integrations.gaMeasurementId} onChange={(v) => update({ integrations: { ...integrations, gaMeasurementId: v } })} />
            <TextField label="Meta Pixel ID" value={integrations.metaPixelId} onChange={(v) => update({ integrations: { ...integrations, metaPixelId: v } })} />
            <TextField label="TikTok Pixel ID" value={integrations.tiktokPixelId} onChange={(v) => update({ integrations: { ...integrations, tiktokPixelId: v } })} />
          </div>
        </AdminCard>

        <AdminCard title="Header Promo">
          <TextAreaField label="Promo Bar (AR)" value={header.promoBar.ar} onChange={(v) => update({ header: { ...header, promoBar: { ...header.promoBar, ar: v } } })} />
        </AdminCard>
      </div>
    </>
  );
}
