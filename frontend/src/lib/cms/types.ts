import type { Faq, Review } from "@/lib/products";

export type NavLink = { label: string; href: string };

export type HeroImageFit = "cover" | "contain";
export type HeroLayout = "banner-full" | "banner-contained";
export type HeroBannerMode = "fixed-height" | "aspect-ratio";
export type HeroObjectPosition = "center" | "top" | "bottom";

export type HeroContent = {
  imageUrl: string;
  imageAlt: string;
  layout: HeroLayout;
  bannerMode: HeroBannerMode;
  aspectRatio: string;
  heightMobile: number;
  heightDesktop: number;
  maxHeight: number;
  maxWidth: number;
  imageFit: HeroImageFit;
  objectPosition: HeroObjectPosition;
  rounded: boolean;
  headline: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  trustLine: string;
};

export type SectionVisibility = {
  trustStrip: boolean;
  products: boolean;
  productFinder: boolean;
  productCompare: boolean;
  sanadPromise: boolean;
  testimonials: boolean;
  founderNote: boolean;
  howItWorks: boolean;
  faq: boolean;
  finalCta: boolean;
  stickyCta: boolean;
  whatsapp: boolean;
};

export type BrandingContent = {
  brandName: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  logoUrl: string;
};

export type HeaderContent = {
  promoBar: string;
  navLinks: NavLink[];
};

export type FooterContent = {
  description: string;
  supportEmail: string;
  whatsappNumber: string;
  whatsappMessage: string;
  storeLinks: NavLink[];
  policyLinks: NavLink[];
  socialLinks: { label: string; href: string }[];
};

export type SeoContent = {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
};

export type ProductCmsOverride = {
  slug: string;
  nameAr?: string;
  price?: number;
  upsellPrice?: number;
  headline?: string;
  subheadline?: string;
  bullets?: string[];
  imageUrl?: string;
  reviews?: Review[];
  faqs?: Faq[];
  ratingValue?: number;
  ratingCount?: number;
  enabled?: boolean;
};

export type HomepageContent = {
  hero: HeroContent;
  sections: SectionVisibility;
  productsTitle: string;
  productsSubtitle: string;
  faqs: Faq[];
  finalCtaTitle: string;
  finalCtaSubtitle: string;
};

export type StoreContent = {
  version: number;
  updatedAt: string;
  branding: BrandingContent;
  header: HeaderContent;
  footer: FooterContent;
  seo: SeoContent;
  homepage: HomepageContent;
  products: ProductCmsOverride[];
};
