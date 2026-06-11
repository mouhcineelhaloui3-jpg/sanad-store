import { AdminCard } from "@/components/admin/AdminCard";
import { PrimaryButton, SelectField, TextAreaField, TextField } from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function StorefrontCmsPage() {
  return (
    <>
      <AdminPageHeader
        title="Storefront CMS"
        description="تحكم كامل فـHome page, product pages, WhatsApp icon, footer, tracking scripts, and store content."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCard title="Home Page Control">
          <div className="space-y-4">
            <TextField label="Hero badge" placeholder="نظام سَنَد للراحة اليومية" />
            <TextField label="Hero headline" placeholder="نهارك طويل؟ جسمك خاصو دعم ذكي..." />
            <TextAreaField label="Hero subtitle" placeholder="Main persuasive copy..." />
            <SelectField label="Show proof strip" options={["Enabled", "Disabled"]} />
            <SelectField label="Show problem selector" options={["Enabled", "Disabled"]} />
            <SelectField label="Show reviews section" options={["Enabled", "Disabled"]} />
            <PrimaryButton>Save home page</PrimaryButton>
          </div>
        </AdminCard>

        <AdminCard title="Product Page Control">
          <div className="space-y-4">
            <SelectField label="Product page template" options={["Landing page", "Simple PDP", "Custom"]} />
            <SelectField label="Show trust bar" options={["Enabled", "Disabled"]} />
            <SelectField label="Show benefits section" options={["Enabled", "Disabled"]} />
            <SelectField label="Show how it works" options={["Enabled", "Disabled"]} />
            <SelectField label="Show cross-sells" options={["Enabled", "Disabled"]} />
            <TextAreaField label="Global product disclaimer" placeholder="Products are for daily support..." />
            <PrimaryButton>Save product pages</PrimaryButton>
          </div>
        </AdminCard>

        <AdminCard title="WhatsApp Floating Icon">
          <div className="space-y-4">
            <SelectField label="WhatsApp icon" options={["Enabled", "Disabled"]} />
            <TextField label="WhatsApp number" placeholder="+212600000000" />
            <TextField label="Default message" placeholder="Salam, bghit nswl 3la produit..." />
            <SelectField label="Position" options={["Bottom right", "Bottom left"]} />
            <PrimaryButton>Save WhatsApp</PrimaryButton>
          </div>
        </AdminCard>

        <AdminCard title="Footer, SEO & Custom Scripts">
          <div className="space-y-4">
            <TextAreaField label="Footer brand text" placeholder="Footer copy..." />
            <TextField label="Meta title" placeholder="SANAD Morocco" />
            <TextAreaField label="Meta description" placeholder="SEO description..." />
            <TextAreaField label="Header scripts" placeholder="Pixel/CAPI/custom script placeholders..." />
            <TextAreaField label="Body scripts" placeholder="Chat widgets, tools, etc." />
            <PrimaryButton>Save storefront settings</PrimaryButton>
          </div>
        </AdminCard>
      </div>
    </>
  );
}
