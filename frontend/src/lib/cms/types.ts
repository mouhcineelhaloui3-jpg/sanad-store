import type { LocalizedText } from "@/lib/i18n/localized";

export type NavLink = { label: LocalizedText; href: string };

export type Faq = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type HeroContent = {
  headline: LocalizedText;
  subtitle: LocalizedText;
  bannerText: LocalizedText;
  primaryCtaLabel: LocalizedText;
  secondaryCtaLabel: LocalizedText;
  whatsappCtaLabel: LocalizedText;
  trustLine: LocalizedText;
};

export type SectionVisibility = {
  features: boolean;
  plans: boolean;
  trial: boolean;
  testimonials: boolean;
  stats: boolean;
  faq: boolean;
  contact: boolean;
  whatsapp: boolean;
};

export type BrandingContent = {
  brandName: string;
  tagline: LocalizedText;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl: string;
};

export type HeaderContent = {
  promoBar: LocalizedText;
  navLinks: NavLink[];
  subscribeCtaLabel: LocalizedText;
};

export type FooterContent = {
  description: LocalizedText;
  supportEmail: string;
  whatsappNumber: string;
  whatsappMessage: string;
  telegramUrl: string;
  storeLinks: NavLink[];
  policyLinks: NavLink[];
  copyright: LocalizedText;
};

export type SeoContent = {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  googleSiteVerification: string;
};

export type IntegrationsContent = {
  gaMeasurementId: string;
  metaPixelId: string;
  tiktokPixelId: string;
};

export type FeatureItem = {
  icon: string;
  label: LocalizedText;
};

export type StatItem = {
  value: number;
  suffix: string;
  prefix: string;
  label: LocalizedText;
};

export type Testimonial = {
  id: string;
  name: LocalizedText;
  rating: number;
  comment: LocalizedText;
  visible: boolean;
};

export type TrialSection = {
  title: LocalizedText;
  description: LocalizedText;
  ctaLabel: LocalizedText;
};

export type ContactSection = {
  title: LocalizedText;
  whatsappLabel: LocalizedText;
  emailLabel: LocalizedText;
  telegramLabel: LocalizedText;
};

export type PlanCmsOverride = {
  slug: string;
  name?: LocalizedText;
  duration?: LocalizedText;
  price?: number;
  currency?: string;
  badge?: LocalizedText | null;
  features?: LocalizedText[];
  highlighted?: boolean;
  enabled?: boolean;
};

export type HomepageContent = {
  hero: HeroContent;
  sections: SectionVisibility;
  featuresTitle: LocalizedText;
  featuresSubtitle: LocalizedText;
  features: FeatureItem[];
  plansTitle: LocalizedText;
  plansSubtitle: LocalizedText;
  stats: StatItem[];
  testimonialsTitle: LocalizedText;
  testimonialsSubtitle: LocalizedText;
  testimonials: Testimonial[];
  trial: TrialSection;
  contact: ContactSection;
  faqs: Faq[];
  faqTitle: LocalizedText;
  faqSubtitle: LocalizedText;
};

export type StoreContent = {
  version: number;
  updatedAt: string;
  branding: BrandingContent;
  header: HeaderContent;
  footer: FooterContent;
  seo: SeoContent;
  integrations: IntegrationsContent;
  homepage: HomepageContent;
  plans: PlanCmsOverride[];
};

export type DeviceType = "smart-tv" | "android" | "iphone" | "pc" | "fire-stick";

export const DEVICE_OPTIONS: { value: DeviceType; label: LocalizedText }[] = [
  { value: "smart-tv", label: { ar: "Smart TV", en: "Smart TV" } },
  { value: "android", label: { ar: "Android", en: "Android" } },
  { value: "iphone", label: { ar: "iPhone", en: "iPhone" } },
  { value: "pc", label: { ar: "PC", en: "PC" } },
  { value: "fire-stick", label: { ar: "Fire Stick", en: "Fire Stick" } }
];
