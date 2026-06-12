import type { SiteLayout } from "./types";

export const defaultSiteLayout = (): SiteLayout => ({
  sectionPaddingY: 32,
  sectionGap: 4,
  showSectionDividers: false,
  heroPaddingTop: 48,
  heroPaddingBottom: 56
});

export function layoutCssVars(layout?: SiteLayout): Record<string, string> {
  const l = { ...defaultSiteLayout(), ...layout };
  return {
    "--section-py": `${l.sectionPaddingY}px`,
    "--section-gap": `${l.sectionGap}px`,
    "--hero-pt": `${l.heroPaddingTop}px`,
    "--hero-pb": `${l.heroPaddingBottom}px`
  };
}
