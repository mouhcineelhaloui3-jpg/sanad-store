import Image from "next/image";
import Link from "next/link";
import { normalizeHero } from "@/lib/cms/hero-utils";
import type { HeroContent } from "@/lib/cms/types";

type HomeHeroProps = {
  hero: HeroContent;
};

const objectPositionClass = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom"
} as const;

export function HomeHero({ hero: rawHero }: HomeHeroProps) {
  const hero = normalizeHero(rawHero);
  const isContained = hero.layout === "banner-contained";
  const isAspectRatio = hero.bannerMode === "aspect-ratio";
  const roundedClass = hero.rounded ? "rounded-[1.25rem] md:rounded-[1.75rem]" : "";
  const fitClass = hero.imageFit === "contain" ? "object-contain" : "object-cover";
  const positionClass = objectPositionClass[hero.objectPosition];

  const bannerStyle: React.CSSProperties = isAspectRatio
    ? {
        aspectRatio: hero.aspectRatio.replace("/", " / "),
        maxHeight: `${hero.maxHeight}px`,
        maxWidth: hero.maxWidth > 0 ? `${hero.maxWidth}px` : undefined
      }
    : {
        ["--hero-h-mobile" as string]: `${hero.heightMobile}px`,
        ["--hero-h-desktop" as string]: `${hero.heightDesktop}px`,
        maxHeight: `${hero.maxHeight}px`,
        maxWidth: hero.maxWidth > 0 ? `${hero.maxWidth}px` : undefined
      };

  const bannerInner = hero.imageUrl ? (
    <Image
      src={hero.imageUrl}
      alt={hero.imageAlt}
      fill
      priority
      className={`${fitClass} ${positionClass}`}
      sizes="100vw"
    />
  ) : (
    <div className="flex h-full min-h-[inherit] w-full items-center justify-center bg-gradient-to-br from-sand-100 via-sand-50 to-sage-100 px-6 text-center">
      <div>
        <p className="text-sm font-black text-sage-700">بانر الهيرو</p>
        <p className="mt-2 max-w-md text-sm leading-7 text-sand-700">
          ارفع صورة واحدة (المنتجات الثلاثة معاً) من الأدمين → Storefront CMS
        </p>
      </div>
    </div>
  );

  return (
    <section className="bg-white">
      <div
        className={
          isContained
            ? "mx-auto w-full px-4 pt-3 md:pt-4"
            : "w-full border-b border-sand-100"
        }
        style={hero.maxWidth > 0 && isContained ? { maxWidth: hero.maxWidth } : undefined}
      >
        <div
          className={`relative mx-auto w-full overflow-hidden bg-sand-100 shadow-sm ${roundedClass} ${
            isAspectRatio ? "" : "hero-banner"
          }`}
          style={bannerStyle}
        >
          {bannerInner}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 text-center md:py-12">
        <h1 className="text-3xl font-black leading-[1.15] text-sand-950 md:text-5xl">{hero.headline}</h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-sand-700 md:text-lg">{hero.subtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={hero.primaryCtaHref} className="btn-primary w-full sm:w-auto">
            {hero.primaryCtaLabel}
          </Link>
          <Link href={hero.secondaryCtaHref} className="btn-secondary w-full sm:w-auto">
            {hero.secondaryCtaLabel}
          </Link>
        </div>
        <p className="mt-4 text-sm font-bold text-sand-600">{hero.trustLine}</p>
      </div>
    </section>
  );
}
