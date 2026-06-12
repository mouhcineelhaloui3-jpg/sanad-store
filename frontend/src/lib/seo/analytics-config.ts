import type { IntegrationsContent } from "@/lib/cms/types";

function cleanId(value?: string) {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

export function resolveIntegrations(cms?: IntegrationsContent) {
  return {
    gaMeasurementId:
      cleanId(cms?.gaMeasurementId) ?? cleanId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
    metaPixelId:
      cleanId(cms?.metaPixelId) ?? cleanId(process.env.NEXT_PUBLIC_META_PIXEL_ID),
    tiktokPixelId:
      cleanId(cms?.tiktokPixelId) ?? cleanId(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID),
    plausibleDomain:
      cleanId(cms?.plausibleDomain) ?? cleanId(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
    sentryDsn: cleanId(process.env.NEXT_PUBLIC_SENTRY_DSN)
  };
}

export function hasAnalytics(integrations: ReturnType<typeof resolveIntegrations>) {
  return Boolean(
    integrations.gaMeasurementId ||
      integrations.metaPixelId ||
      integrations.tiktokPixelId ||
      integrations.plausibleDomain
  );
}
