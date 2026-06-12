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
  liveTicker: boolean;
  sports: boolean;
  movies: boolean;
  features: boolean;
  plans: boolean;
  howItWorks: boolean;
  devices: boolean;
  trial: boolean;
  testimonials: boolean;
  stats: boolean;
  faq: boolean;
  contact: boolean;
  stickyCta: boolean;
  whatsapp: boolean;
};

export type MovieItem = {
  id: string;
  title: LocalizedText;
  genre: LocalizedText;
  year: string;
  quality: LocalizedText;
  rating: number;
  posterGradient: string;
  posterUrl: string;
  featured: boolean;
};

export type MoviesSection = {
  title: LocalizedText;
  subtitle: LocalizedText;
  totalCount: number;
  ctaLabel: LocalizedText;
  genres: LocalizedText[];
  marqueeTitles: LocalizedText[];
  items: MovieItem[];
};

export type SportsEvent = {
  id: string;
  icon: string;
  league: LocalizedText;
  title: LocalizedText;
  quality: LocalizedText;
  live: boolean;
  imageUrl: string;
};

export type SportsSection = {
  title: LocalizedText;
  subtitle: LocalizedText;
  ctaLabel: LocalizedText;
  events: SportsEvent[];
};

export type LiveTickerSection = {
  label: LocalizedText;
  items: LocalizedText[];
};

export type HowItWorksStep = {
  num: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
};

export type HowItWorksSection = {
  title: LocalizedText;
  subtitle: LocalizedText;
  steps: HowItWorksStep[];
};

export type DeviceItem = {
  icon: string;
  name: LocalizedText;
  apps: LocalizedText;
};

export type DevicesSection = {
  title: LocalizedText;
  subtitle: LocalizedText;
  devices: DeviceItem[];
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
  plausibleDomain: string;
  clarityProjectId: string;
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
  liveTicker: LiveTickerSection;
  sports: SportsSection;
  movies: MoviesSection;
  featuresTitle: LocalizedText;
  featuresSubtitle: LocalizedText;
  features: FeatureItem[];
  plansTitle: LocalizedText;
  plansSubtitle: LocalizedText;
  howItWorks: HowItWorksSection;
  devices: DevicesSection;
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

export type SiteLayout = {
  sectionPaddingY: number;
  sectionGap: number;
  showSectionDividers: boolean;
  heroPaddingTop: number;
  heroPaddingBottom: number;
};

export type StoreContent = {
  version: number;
  updatedAt: string;
  branding: BrandingContent;
  layout: SiteLayout;
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
