"use client";

import { AdminCard } from "@/components/admin/AdminCard";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/AdminForm";
import type { PlanCmsOverride, StoreContent } from "@/lib/cms/types";
import { defaultPlans, type Plan } from "@/lib/plans";

function mergedPlan(overrides: PlanCmsOverride[], plan: Plan) {
  const override = overrides.find((p) => p.slug === plan.slug);
  return {
    slug: plan.slug,
    name: { ar: override?.name?.ar ?? plan.name.ar, en: override?.name?.en ?? plan.name.en },
    duration: { ar: override?.duration?.ar ?? plan.duration.ar, en: override?.duration?.en ?? plan.duration.en },
    price: override?.price ?? plan.price,
    badge: override?.badge !== undefined ? override.badge : plan.badge,
    features: override?.features ?? plan.features,
    highlighted: override?.highlighted ?? plan.highlighted,
    enabled: override?.enabled !== false
  };
}

export function CmsPlansPanel({
  content,
  updatePlan,
  updateHomepage
}: {
  content: StoreContent;
  updatePlan: (slug: string, patch: Partial<PlanCmsOverride>) => void;
  updateHomepage: (patch: Partial<StoreContent["homepage"]>) => void;
}) {
  const { homepage, plans: overrides } = content;

  return (
    <div className="grid gap-6">
      <AdminCard title="Plans section — title & subtitle">
        <p className="mb-4 text-sm text-slate-500">
          This is the &quot;اختر باقة اشتراك IPTV&quot; block on the homepage. Edit here, then click{" "}
          <strong>Save all changes</strong>.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="Section title (AR)"
            value={homepage.plansTitle.ar}
            onChange={(v) =>
              updateHomepage({ plansTitle: { ...homepage.plansTitle, ar: v } })
            }
          />
          <TextField
            label="Section title (EN)"
            value={homepage.plansTitle.en}
            onChange={(v) =>
              updateHomepage({ plansTitle: { ...homepage.plansTitle, en: v } })
            }
          />
          <TextAreaField
            label="Section subtitle (AR)"
            value={homepage.plansSubtitle.ar}
            onChange={(v) =>
              updateHomepage({ plansSubtitle: { ...homepage.plansSubtitle, ar: v } })
            }
          />
          <TextAreaField
            label="Section subtitle (EN)"
            value={homepage.plansSubtitle.en}
            onChange={(v) =>
              updateHomepage({ plansSubtitle: { ...homepage.plansSubtitle, en: v } })
            }
          />
        </div>
      </AdminCard>

      {defaultPlans.map((plan) => {
        const state = mergedPlan(overrides, plan);
        return (
          <AdminCard key={plan.slug} title={`Plan: ${plan.name.en} (${plan.slug})`}>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Plan name (AR)"
                value={state.name.ar}
                onChange={(v) =>
                  updatePlan(plan.slug, { name: { ...state.name, ar: v } })
                }
              />
              <TextField
                label="Plan name (EN)"
                value={state.name.en}
                onChange={(v) =>
                  updatePlan(plan.slug, { name: { ...state.name, en: v } })
                }
              />
              <TextField
                label="Duration label (AR)"
                value={state.duration.ar}
                onChange={(v) =>
                  updatePlan(plan.slug, { duration: { ...state.duration, ar: v } })
                }
              />
              <TextField
                label="Duration label (EN)"
                value={state.duration.en}
                onChange={(v) =>
                  updatePlan(plan.slug, { duration: { ...state.duration, en: v } })
                }
              />
              <TextField
                label="Price (MAD)"
                type="number"
                value={String(state.price)}
                onChange={(v) => updatePlan(plan.slug, { price: Number(v) || state.price })}
              />
              <TextField
                label="Badge (AR) — leave empty for none"
                value={state.badge?.ar ?? ""}
                onChange={(v) =>
                  updatePlan(plan.slug, {
                    badge: v.trim() ? { ar: v, en: state.badge?.en ?? v } : null
                  })
                }
              />
              <TextField
                label="Badge (EN)"
                value={state.badge?.en ?? ""}
                onChange={(v) =>
                  updatePlan(plan.slug, {
                    badge: v.trim() || state.badge?.ar
                      ? { ar: state.badge?.ar ?? v, en: v }
                      : null
                  })
                }
              />
              <div className="flex flex-wrap gap-6 md:col-span-2">
                <CheckboxField
                  label="Visible on website"
                  checked={state.enabled}
                  onChange={(v) => updatePlan(plan.slug, { enabled: v })}
                />
                <CheckboxField
                  label="Highlighted (recommended plan)"
                  checked={state.highlighted}
                  onChange={(v) => updatePlan(plan.slug, { highlighted: v })}
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Features list</p>
              {state.features.map((feature, i) => (
                <div
                  key={`${plan.slug}-f-${i}`}
                  className="grid gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-700 md:grid-cols-2"
                >
                  <TextField
                    label={`Feature ${i + 1} (AR)`}
                    value={feature.ar}
                    onChange={(v) => {
                      const features = state.features.map((f, idx) =>
                        idx === i ? { ...f, ar: v } : f
                      );
                      updatePlan(plan.slug, { features });
                    }}
                  />
                  <TextField
                    label={`Feature ${i + 1} (EN)`}
                    value={feature.en}
                    onChange={(v) => {
                      const features = state.features.map((f, idx) =>
                        idx === i ? { ...f, en: v } : f
                      );
                      updatePlan(plan.slug, { features });
                    }}
                  />
                </div>
              ))}
            </div>
          </AdminCard>
        );
      })}
    </div>
  );
}
