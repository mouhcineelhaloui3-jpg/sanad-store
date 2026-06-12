"use client";

import { useStoreContent } from "@/components/cms/StoreContentProvider";
import { defaultSiteLayout } from "@/lib/cms/layout-styles";

export function useSiteLayout() {
  const { layout } = useStoreContent();
  return { ...defaultSiteLayout(), ...layout };
}

export function sectionSpacingClass(extra = "") {
  return `iptv-section-spacing px-4 ${extra}`.trim();
}
