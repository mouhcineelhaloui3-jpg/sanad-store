import type { SiteLayout } from "./types";

export const defaultSiteLayout = (): SiteLayout => ({
  sectionPaddingY: 112,
  sectionGap: 32,
  showSectionDividers: true,
  heroPaddingTop: 64,
  heroPaddingBottom: 96
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
