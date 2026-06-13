export {
  captureLead,
  listCrmLeads,
  getCrmLeadById,
  updateCrmLead,
  addLeadNote,
  addLeadTag,
  deleteCrmLead,
  countLeadsSince,
  listAssignableAgents,
  LEAD_PIPELINE,
  type LeadListItem,
  type LeadDetail
} from "./crm";

import { captureLead, countLeadsSince } from "./crm";

export async function createLead(input: Parameters<typeof captureLead>[0]) {
  return captureLead(input);
}

export async function countNewLeadsSince(since: Date) {
  return countLeadsSince(since);
}

export async function countWhatsAppConversionsSince(since: Date) {
  const { prisma } = await import("./prisma");
  return prisma.lead.count({ where: { whatsappClickedAt: { gte: since } } });
}

export async function listLeads(limit = 100) {
  const { listCrmLeads } = await import("./crm");
  const result = await listCrmLeads({ limit, page: 1 });
  return result.items;
}
