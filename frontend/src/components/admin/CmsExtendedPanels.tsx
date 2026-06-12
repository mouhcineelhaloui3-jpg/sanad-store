"use client";

import { AdminCard } from "@/components/admin/AdminCard";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/AdminForm";
import type { StoreContent } from "@/lib/cms/types";

type PanelProps = {
  content: StoreContent;
  update: (patch: Partial<StoreContent>) => void;
};

export function CmsLayoutPanel({ content, update }: PanelProps) {
  const { layout, branding } = content;

  return (
    <>
      <AdminCard title="Layout & Spacing">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="Section padding (px)"
            type="number"
            value={String(layout.sectionPaddingY)}
            onChange={(v) =>
              update({ layout: { ...layout, sectionPaddingY: Number(v) || 112 } })
            }
          />
          <TextField
            label="Gap between sections (px)"
            type="number"
            value={String(layout.sectionGap)}
            onChange={(v) => update({ layout: { ...layout, sectionGap: Number(v) || 0 } })}
          />
          <TextField
            label="Hero padding top (px)"
            type="number"
            value={String(layout.heroPaddingTop)}
            onChange={(v) =>
              update({ layout: { ...layout, heroPaddingTop: Number(v) || 64 } })
            }
          />
          <TextField
            label="Hero padding bottom (px)"
            type="number"
            value={String(layout.heroPaddingBottom)}
            onChange={(v) =>
              update({ layout: { ...layout, heroPaddingBottom: Number(v) || 96 } })
            }
          />
          <CheckboxField
            label="Show dividers between sections"
            checked={layout.showSectionDividers}
            onChange={(v) => update({ layout: { ...layout, showSectionDividers: v } })}
          />
        </div>
        <p className="mt-3 text-xs text-slate-500">
          المسافات كتطبق مباشرة على الموقع (padding + gap). جرب 80–160px للـ padding.
        </p>
      </AdminCard>

      <AdminCard title="Logo & Branding">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="Logo URL"
            value={branding.logoUrl}
            onChange={(v) => update({ branding: { ...branding, logoUrl: v } })}
          />
          <TextField
            label="Tagline (EN)"
            value={branding.tagline.en}
            onChange={(v) =>
              update({ branding: { ...branding, tagline: { ...branding.tagline, en: v } } })
            }
          />
          <TextField
            label="Secondary Color"
            value={branding.secondaryColor}
            onChange={(v) => update({ branding: { ...branding, secondaryColor: v } })}
          />
        </div>
        {branding.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={branding.logoUrl}
            alt="Logo preview"
            className="mt-4 h-20 w-20 rounded-2xl border border-slate-200 object-cover dark:border-slate-700"
          />
        ) : null}
      </AdminCard>
    </>
  );
}

export function CmsHomeSectionsPanel({ content, update }: PanelProps) {
  const { homepage, header, footer } = content;

  return (
    <>
      <AdminCard title="Sports Section">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="Title (AR)"
            value={homepage.sports.title.ar}
            onChange={(v) =>
              update({
                homepage: {
                  ...homepage,
                  sports: { ...homepage.sports, title: { ...homepage.sports.title, ar: v } }
                }
              })
            }
          />
          <TextAreaField
            label="Subtitle (AR)"
            value={homepage.sports.subtitle.ar}
            onChange={(v) =>
              update({
                homepage: {
                  ...homepage,
                  sports: { ...homepage.sports, subtitle: { ...homepage.sports.subtitle, ar: v } }
                }
              })
            }
          />
        </div>
      </AdminCard>

      <AdminCard title="Features">
        <TextField
          label="Title (AR)"
          value={homepage.featuresTitle.ar}
          onChange={(v) =>
            update({
              homepage: { ...homepage, featuresTitle: { ...homepage.featuresTitle, ar: v } }
            })
          }
        />
        {homepage.features.map((f, i) => (
          <div key={i} className="mt-3 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <TextField
              label={`Icon ${i + 1}`}
              value={f.icon}
              onChange={(v) => {
                const features = [...homepage.features];
                features[i] = { ...f, icon: v };
                update({ homepage: { ...homepage, features } });
              }}
            />
            <TextField
              label="Label (AR)"
              value={f.label.ar}
              onChange={(v) => {
                const features = [...homepage.features];
                features[i] = { ...f, label: { ...f.label, ar: v } };
                update({ homepage: { ...homepage, features } });
              }}
            />
          </div>
        ))}
      </AdminCard>

      <AdminCard title="Plans Section">
        <TextField
          label="Title (AR)"
          value={homepage.plansTitle.ar}
          onChange={(v) =>
            update({
              homepage: { ...homepage, plansTitle: { ...homepage.plansTitle, ar: v } }
            })
          }
        />
        <TextAreaField
          label="Subtitle (AR)"
          value={homepage.plansSubtitle.ar}
          onChange={(v) =>
            update({
              homepage: { ...homepage, plansSubtitle: { ...homepage.plansSubtitle, ar: v } }
            })
          }
        />
      </AdminCard>

      <AdminCard title="Trial & Contact">
        <TextField
          label="Trial title (AR)"
          value={homepage.trial.title.ar}
          onChange={(v) =>
            update({
              homepage: {
                ...homepage,
                trial: { ...homepage.trial, title: { ...homepage.trial.title, ar: v } }
              }
            })
          }
        />
        <TextAreaField
          label="Trial description (AR)"
          value={homepage.trial.description.ar}
          onChange={(v) =>
            update({
              homepage: {
                ...homepage,
                trial: { ...homepage.trial, description: { ...homepage.trial.description, ar: v } }
              }
            })
          }
        />
        <TextField
          label="Contact title (AR)"
          value={homepage.contact.title.ar}
          onChange={(v) =>
            update({
              homepage: {
                ...homepage,
                contact: { ...homepage.contact, title: { ...homepage.contact.title, ar: v } }
              }
            })
          }
        />
      </AdminCard>

      <AdminCard title="Navigation Links">
        {header.navLinks.map((link, i) => (
          <div key={i} className="mb-3 grid gap-2 md:grid-cols-2">
            <TextField
              label={`Link ${i + 1} label (AR)`}
              value={link.label.ar}
              onChange={(v) => {
                const navLinks = [...header.navLinks];
                navLinks[i] = { ...link, label: { ...link.label, ar: v } };
                update({ header: { ...header, navLinks } });
              }}
            />
            <TextField
              label="Href"
              value={link.href}
              onChange={(v) => {
                const navLinks = [...header.navLinks];
                navLinks[i] = { ...link, href: v };
                update({ header: { ...header, navLinks } });
              }}
            />
          </div>
        ))}
      </AdminCard>

      <AdminCard title="Footer">
        <TextAreaField
          label="Description (AR)"
          value={footer.description.ar}
          onChange={(v) =>
            update({ footer: { ...footer, description: { ...footer.description, ar: v } } })
          }
        />
        <TextField
          label="Copyright (AR)"
          value={footer.copyright.ar}
          onChange={(v) =>
            update({ footer: { ...footer, copyright: { ...footer.copyright, ar: v } } })
          }
        />
      </AdminCard>
    </>
  );
}
