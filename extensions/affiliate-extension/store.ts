import { dataPath, readJsonStore, writeJsonStore } from "@sanad/core";
import type { AffiliatePartner } from "./types";

const FILE = () => dataPath("affiliate-partners.json");

export async function listAffiliates(): Promise<AffiliatePartner[]> {
  return readJsonStore<AffiliatePartner[]>(FILE(), []);
}

export async function createAffiliate(input: Omit<AffiliatePartner, "id" | "whatsappLeads" | "conversionRate">) {
  const items = await listAffiliates();
  const partner: AffiliatePartner = {
    ...input,
    id: `aff_${Date.now()}`,
    whatsappLeads: 0,
    conversionRate: 0
  };
  items.unshift(partner);
  await writeJsonStore(FILE(), items);
  return partner;
}
