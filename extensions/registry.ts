import type { Extension } from "@sanad/core";
import { productsExtension } from "./products-extension";
import { adsExtension } from "./ads-extension";
import { analyticsExtension } from "./analytics-extension";
import { automationExtension } from "./automation-extension";
import { affiliateExtension } from "./affiliate-extension";
import { marketplaceExtension } from "./marketplace-extension";

export const allExtensions: Extension[] = [
  productsExtension,
  adsExtension,
  analyticsExtension,
  automationExtension,
  affiliateExtension,
  marketplaceExtension
];
