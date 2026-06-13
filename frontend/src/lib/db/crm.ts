import type { LeadStatus, Prisma } from "@/generated/prisma/client";
import { LEAD_PIPELINE } from "@/lib/crm/constants";
import type { LeadDetail, LeadListItem, LeadTagDto } from "@/lib/crm/types";
import { appendAuditLog, appendActivityLog } from "./audit";
import { buildOrderBy, type ListParams, type PaginatedResult } from "./pagination";
import { prisma } from "./prisma";
import { removeSearchIndex, upsertSearchIndex } from "./search";

export { LEAD_PIPELINE };
export type { LeadDetail, LeadListItem, LeadTagDto } from "@/lib/crm/types";

function terminalStatuses(): LeadStatus[] {
  return ["lost", "expired", "delivered"];
}

function toListItem(lead: {
  id: string;
  name: string;
  phone: string;
  device: string | null;
  planSlug: string | null;
  source: string | null;
  status: LeadStatus;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  whatsappClickedAt: Date | null;
  convertedAt: Date | null;
  assignedToId: string | null;
  assignedTo: { name: string } | null;
  tags: { tag: LeadTagDto }[];
  createdAt: Date;
  updatedAt: Date;
}): LeadListItem {
  return {
    id: lead.id,
    name: lead.name,
    phone: lead.phone,
    device: lead.device,
    planSlug: lead.planSlug,
    source: lead.source,
    status: lead.status,
    utmSource: lead.utmSource,
    utmMedium: lead.utmMedium,
    utmCampaign: lead.utmCampaign,
    whatsappClickedAt: lead.whatsappClickedAt?.toISOString() ?? null,
    convertedAt: lead.convertedAt?.toISOString() ?? null,
    assignedToId: lead.assignedToId,
    assignedToName: lead.assignedTo?.name ?? null,
    tags: lead.tags.map((t) => t.tag),
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString()
  };
}

async function indexLead(lead: LeadListItem) {
  await upsertSearchIndex({
    entityType: "lead",
    entityId: lead.id,
    title: lead.name,
    subtitle: `${lead.phone} · ${lead.status}`,
    href: `/admin/crm/${lead.id}`,
    keywords: `${lead.phone} ${lead.planSlug ?? ""} ${lead.utmCampaign ?? ""}`
  });
}

async function writeTimeline(
  leadId: string,
  type: string,
  title: string,
  actorId?: string | null,
  metadata?: Prisma.InputJsonValue
) {
  await prisma.leadTimelineEvent.create({
    data: { leadId, type, title, actorId: actorId ?? null, metadata }
  });
}

async function auditLead(
  action: string,
  leadId: string,
  userId?: string | null,
  metadata?: Prisma.InputJsonValue,
  ip?: string | null
) {
  await appendAuditLog({
    userId: userId ?? null,
    action,
    module: "crm",
    entityType: "lead",
    entityId: leadId,
    metadata,
    ip: ip ?? null
  });
  await appendActivityLog({
    actorId: userId ?? null,
    action,
    resource: `lead:${leadId}`,
    metadata
  });
}

export async function captureLead(
  input: {
    name: string;
    phone: string;
    device?: string;
    planSlug?: string;
    source?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    whatsappClicked?: boolean;
    country?: string;
  },
  audit?: { userId: string; ip?: string | null }
) {
  const phone = input.phone.trim();
  const name = input.name.trim();

  const existing = await prisma.lead.findFirst({
    where: {
      phone,
      status: { notIn: terminalStatuses() }
    },
    orderBy: { createdAt: "desc" }
  });

  const now = new Date();
  const whatsappClickedAt = input.whatsappClicked ? now : undefined;

  let lead;
  if (existing) {
    lead = await prisma.lead.update({
      where: { id: existing.id },
      data: {
        name,
        device: input.device ?? existing.device,
        planSlug: input.planSlug ?? existing.planSlug,
        source: input.source ?? existing.source,
        utmSource: input.utmSource ?? existing.utmSource,
        utmMedium: input.utmMedium ?? existing.utmMedium,
        utmCampaign: input.utmCampaign ?? existing.utmCampaign,
        country: input.country ?? existing.country,
        whatsappClickedAt: whatsappClickedAt ?? existing.whatsappClickedAt
      },
      include: {
        assignedTo: { select: { name: true } },
        tags: { include: { tag: true } }
      }
    });
    await writeTimeline(existing.id, "lead.captured", "Lead updated from storefront capture");
  } else {
    lead = await prisma.lead.create({
      data: {
        name,
        phone,
        device: input.device ?? null,
        planSlug: input.planSlug ?? null,
        source: input.source ?? "storefront",
        utmSource: input.utmSource ?? null,
        utmMedium: input.utmMedium ?? null,
        utmCampaign: input.utmCampaign ?? null,
        country: input.country ?? null,
        whatsappClickedAt: whatsappClickedAt ?? null,
        status: "new"
      },
      include: {
        assignedTo: { select: { name: true } },
        tags: { include: { tag: true } }
      }
    });
    await writeTimeline(lead.id, "lead.created", "Lead captured from storefront");
  }

  if (input.whatsappClicked) {
    await writeTimeline(lead.id, "lead.whatsapp_clicked", "WhatsApp button clicked");
  }

  const dto = toListItem(lead);
  await indexLead(dto);

  if (audit) {
    await auditLead(existing ? "lead.update" : "lead.create", lead.id, audit.userId, { source: input.source }, audit.ip);
  }

  return dto;
}

export async function listCrmLeads(
  params: ListParams & { assignedToId?: string } = {}
): Promise<PaginatedResult<LeadListItem>> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const where: Prisma.LeadWhereInput = {};

  if (params.search) {
    where.OR = [
      { name: { contains: params.search, mode: "insensitive" } },
      { phone: { contains: params.search, mode: "insensitive" } },
      { planSlug: { contains: params.search, mode: "insensitive" } },
      { utmCampaign: { contains: params.search, mode: "insensitive" } }
    ];
  }
  if (params.status) where.status = params.status as LeadStatus;
  if (params.assignedToId) where.assignedToId = params.assignedToId;

  const [total, rows] = await Promise.all([
    prisma.lead.count({ where }),
    prisma.lead.findMany({
      where,
      orderBy: buildOrderBy(params.sort),
      skip: (page - 1) * limit,
      take: limit,
      include: {
        assignedTo: { select: { name: true } },
        tags: { include: { tag: true } }
      }
    })
  ]);

  return {
    items: rows.map(toListItem),
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit))
  };
}

export async function getCrmLeadById(id: string): Promise<LeadDetail | null> {
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      assignedTo: { select: { name: true } },
      tags: { include: { tag: true } },
      notes: {
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true } } }
      },
      timeline: {
        orderBy: { createdAt: "desc" },
        take: 50,
        include: { actor: { select: { name: true } } }
      },
      assignments: {
        orderBy: { createdAt: "desc" },
        take: 20,
        include: {
          assignee: { select: { name: true } },
          assignedBy: { select: { name: true } }
        }
      }
    }
  });

  if (!lead) return null;

  const base = toListItem(lead);
  return {
    ...base,
    country: lead.country,
    notes: lead.notes.map((n) => ({
      id: n.id,
      body: n.body,
      authorName: n.author?.name ?? null,
      createdAt: n.createdAt.toISOString()
    })),
    timeline: lead.timeline.map((e) => ({
      id: e.id,
      type: e.type,
      title: e.title,
      actorName: e.actor?.name ?? null,
      createdAt: e.createdAt.toISOString()
    })),
    assignments: lead.assignments.map((a) => ({
      id: a.id,
      assigneeName: a.assignee.name,
      assignedByName: a.assignedBy?.name ?? null,
      createdAt: a.createdAt.toISOString()
    }))
  };
}

export async function updateCrmLead(
  id: string,
  input: {
    status?: LeadStatus;
    assignedToId?: string | null;
    name?: string;
    device?: string;
    planSlug?: string;
    source?: string;
  },
  audit?: { userId: string; ip?: string | null }
) {
  const before = await prisma.lead.findUnique({ where: { id } });
  if (!before) return null;

  const convertedAt =
    input.status === "paid" && before.status !== "paid" ? new Date() : before.convertedAt;

  const lead = await prisma.lead.update({
    where: { id },
    data: {
      status: input.status,
      assignedToId: input.assignedToId,
      name: input.name,
      device: input.device,
      planSlug: input.planSlug,
      source: input.source,
      convertedAt
    },
    include: {
      assignedTo: { select: { name: true } },
      tags: { include: { tag: true } }
    }
  });

  if (input.status && input.status !== before.status) {
    await writeTimeline(id, "lead.status_changed", `Status → ${input.status}`, audit?.userId, {
      from: before.status,
      to: input.status
    });
  }

  if (input.assignedToId !== undefined && input.assignedToId !== before.assignedToId) {
    if (input.assignedToId) {
      await prisma.leadAssignment.create({
        data: {
          leadId: id,
          assigneeId: input.assignedToId,
          assignedById: audit?.userId ?? null
        }
      });
    }
    await writeTimeline(id, "lead.assigned", "Agent assignment updated", audit?.userId);
  }

  const dto = toListItem(lead);
  await indexLead(dto);

  if (audit) {
    await auditLead("lead.update", id, audit.userId, input as Prisma.InputJsonValue, audit.ip);
  }

  return dto;
}

export async function addLeadNote(
  leadId: string,
  body: string,
  audit?: { userId: string; ip?: string | null }
) {
  const note = await prisma.leadNote.create({
    data: {
      leadId,
      body: body.trim(),
      authorId: audit?.userId ?? null
    },
    include: { author: { select: { name: true } } }
  });

  await writeTimeline(leadId, "lead.note_added", "Internal note added", audit?.userId);
  if (audit) {
    await auditLead("lead.note_added", leadId, audit.userId, { noteId: note.id }, audit.ip);
  }

  return {
    id: note.id,
    body: note.body,
    authorName: note.author?.name ?? null,
    createdAt: note.createdAt.toISOString()
  };
}

export async function addLeadTag(
  leadId: string,
  tagName: string,
  audit?: { userId: string; ip?: string | null }
) {
  const name = tagName.trim();
  if (!name) throw new Error("Tag name required");

  const tag = await prisma.leadTag.upsert({
    where: { name },
    create: { name },
    update: {}
  });

  await prisma.leadTagOnLead.upsert({
    where: { leadId_tagId: { leadId, tagId: tag.id } },
    create: { leadId, tagId: tag.id },
    update: {}
  });

  await writeTimeline(leadId, "lead.tag_added", `Tag added: ${name}`, audit?.userId);
  if (audit) {
    await auditLead("lead.tag_added", leadId, audit.userId, { tag: name }, audit.ip);
  }

  return { id: tag.id, name: tag.name, color: tag.color };
}

export async function deleteCrmLead(id: string, audit?: { userId: string; ip?: string | null }) {
  await prisma.lead.delete({ where: { id } });
  await removeSearchIndex("lead", id);
  if (audit) {
    await auditLead("lead.delete", id, audit.userId, undefined, audit.ip);
  }
}

export async function countLeadsSince(since: Date) {
  return prisma.lead.count({ where: { createdAt: { gte: since } } });
}

export async function listAssignableAgents() {
  return prisma.user.findMany({
    where: { active: true },
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" }
  });
}
