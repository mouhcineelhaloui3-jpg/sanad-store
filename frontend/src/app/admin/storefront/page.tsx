import { AdminCard } from "@/components/admin/AdminCard";
import { PrimaryButton, SelectField, TextAreaField, TextField } from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { products } from "@/lib/products";

const sectionControls = [
  "Hero",
  "Need-based finder",
  "Product cards",
  "Method / trust",
  "Visual directions",
  "Questions to answer",
  "FAQ",
  "Final CTA",
  "WhatsApp",
  "Footer"
];

export default function StorefrontCmsPage() {
  return (
    <>
      <AdminPageHeader
        title="Storefront Control Room"
        description="لوحة تحكم باش تبدل أي نص، section، image prompt، سؤال ناقص، أو design direction فالستور كامل."
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-sand-900 p-5 text-white">
          <p className="text-sm font-bold text-sand-100/70">Store voice</p>
          <p className="mt-2 text-2xl font-black">كيهضر مع العميل</p>
          <p className="mt-2 text-sm leading-6 text-sand-100/70">كل copy خاصو يسول، يشرح، ويعاون فالقرار.</p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
          <p className="text-sm font-bold text-slate-500">Fake content rule</p>
          <p className="mt-2 text-2xl font-black">ممنوع نخترعو</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">Reviews, ratings, specs خاصها تكون موثقة قبل النشر.</p>
        </div>
        <div className="rounded-3xl bg-sage-100 p-5 text-sage-700">
          <p className="text-sm font-bold">Design control</p>
          <p className="mt-2 text-2xl font-black">180 IQ</p>
          <p className="mt-2 text-sm leading-6">Colors، buttons، sections، prompts، WhatsApp، SEO.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCard title="Global Store Voice">
          <div className="space-y-4">
            <TextField label="Main promise" placeholder="جاوب على مشكلتك ونرشح لك الحل المناسب" />
            <TextAreaField label="Store tone rules" placeholder="دارجة واضحة، بلا وعود طبية، بلا fake urgency، كنهضر مع العميل بصيغة مباشرة..." />
            <TextAreaField label="Words to use" placeholder="الدفع عند الاستلام، تأكيد قبل الإرسال، دعم يومي، راحة، اختيار واضح..." />
            <TextAreaField label="Words to avoid" placeholder="يعالج، يشفي، مضمون، أفضل منتج في العالم، مراجعات مخترعة..." />
            <PrimaryButton>Save store voice</PrimaryButton>
          </div>
        </AdminCard>

        <AdminCard title="Design System Control">
          <div className="space-y-4">
            <SelectField label="Theme mood" options={["Warm premium", "Clinical clean", "Bold COD", "Minimal luxury"]} />
            <TextField label="Primary color" placeholder="#3A2A1C" />
            <TextField label="Accent color" placeholder="#51715E" />
            <SelectField label="Button shape" options={["Rounded pill", "Soft rounded", "Sharp premium"]} />
            <SelectField label="Product visual style" options={["AI lifestyle", "Real product photos", "Studio renders", "Mixed"]} />
            <PrimaryButton>Save design</PrimaryButton>
          </div>
        </AdminCard>

        <AdminCard title="Home Page Builder">
          <div className="space-y-4">
            <TextField label="Hero badge" placeholder="متجر كيهضر معاك قبل ما يبيع ليك" />
            <TextField label="Hero headline" placeholder="فين كتحس بالتعب؟ جاوب، ونرشح لك الحل المناسب." />
            <TextAreaField label="Hero subtitle" placeholder="Copy ديال الهوم بصيغة كتخاطب العميل مباشرة..." />
            <TextAreaField label="Need-based finder questions" placeholder="كتافك طايحين؟ / رقبتك مشدودة؟ / أسفل ظهرك كيتقل؟" />
            <TextAreaField label="Trust strip items" placeholder="الدفع عند الاستلام، تأكيد هاتفي، بدون بطاقة..." />
            <SelectField label="Hero product selector" options={["Enabled", "Disabled"]} />
            <SelectField label="Show content gaps section" options={["Enabled", "Disabled"]} />
            <PrimaryButton>Save home page</PrimaryButton>
          </div>
        </AdminCard>

        <AdminCard title="Section Visibility">
          <div className="grid gap-3 sm:grid-cols-2">
            {sectionControls.map((section) => (
              <SelectField key={section} label={section} options={["Enabled", "Disabled"]} />
            ))}
          </div>
        </AdminCard>

        <AdminCard title="Product Page Template">
          <div className="space-y-4">
            <SelectField label="Template" options={["Conversational landing page", "Classic PDP", "Quiz-first PDP", "Long CRO page"]} />
            <TextField label="Above-fold trust note" placeholder="الدفع عند الاستلام • تأكيد هاتفي قبل الإرسال" />
            <TextAreaField label="Global product disclaimer" placeholder="منتجات الدعم والراحة اليومية، ليست علاجاً طبياً..." />
            <TextAreaField label="CTA microcopy" placeholder="لا بطاقة بنكية، لا أداء مسبق، رقم الهاتف يكفي..." />
            <SelectField label="Show reviews only when verified" options={["Yes", "No"]} />
            <PrimaryButton>Save product pages</PrimaryButton>
          </div>
        </AdminCard>

        {products.map((product) => (
          <AdminCard key={product.id} title={`${product.shortName} Content Control`}>
            <div className="space-y-4">
              <TextField label="Product name" placeholder={product.nameAr} />
              <TextField label="Problem label" placeholder={product.problem} />
              <TextAreaField label="Headline" placeholder={product.headline} />
              <TextAreaField label="Bullets" placeholder={product.bullets.join("\n")} />
              <TextAreaField label="Visual direction" placeholder={product.imagePrompt} />
              <TextAreaField label="Questions to answer before launch" placeholder={product.questionsToAnswer.join("\n")} />
              <SelectField label="Reviews status" options={["No verified reviews yet", "Use verified reviews", "Hide reviews"]} />
              <PrimaryButton>Save {product.shortName}</PrimaryButton>
            </div>
          </AdminCard>
        ))}

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
            <TextAreaField label="OpenGraph visual direction" placeholder="Products + Moroccan premium wellness style..." />
            <TextAreaField label="Header scripts" placeholder="Pixel/CAPI/custom script placeholders..." />
            <TextAreaField label="Body scripts" placeholder="Chat widgets, tools, etc." />
            <PrimaryButton>Save storefront settings</PrimaryButton>
          </div>
        </AdminCard>
      </div>
    </>
  );
}
