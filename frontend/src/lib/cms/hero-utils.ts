import type { HeroContent } from "./types";

export const heroSizePresets = {
  small: { heightMobile: 200, heightDesktop: 320, maxHeight: 400 },
  medium: { heightMobile: 260, heightDesktop: 440, maxHeight: 560 },
  large: { heightMobile: 320, heightDesktop: 520, maxHeight: 640 },
  cinematic: { heightMobile: 280, heightDesktop: 480, maxHeight: 600, bannerMode: "aspect-ratio" as const, aspectRatio: "21/9" }
} as const;

export function normalizeHero(hero: Partial<HeroContent> & Pick<HeroContent, "imageUrl" | "headline">): HeroContent {
  return {
    imageUrl: hero.imageUrl ?? "",
    imageAlt: hero.imageAlt ?? "بانر سَنَد",
    layout: hero.layout ?? "banner-full",
    bannerMode: hero.bannerMode ?? "fixed-height",
    aspectRatio: hero.aspectRatio ?? "21/9",
    heightMobile: hero.heightMobile ?? 260,
    heightDesktop: hero.heightDesktop ?? 440,
    maxHeight: hero.maxHeight ?? 560,
    maxWidth: hero.maxWidth ?? 0,
    imageFit: hero.imageFit ?? "cover",
    objectPosition: hero.objectPosition ?? "center",
    rounded: hero.rounded ?? false,
    headline: hero.headline,
    subtitle: hero.subtitle ?? "",
    primaryCtaLabel: hero.primaryCtaLabel ?? "اطلب دابا",
    primaryCtaHref: hero.primaryCtaHref ?? "#products",
    secondaryCtaLabel: hero.secondaryCtaLabel ?? "ساعدني نختار",
    secondaryCtaHref: hero.secondaryCtaHref ?? "#find",
    trustLine: hero.trustLine ?? ""
  };
}
