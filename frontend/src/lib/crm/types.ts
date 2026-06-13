import type { LeadPipelineStatus } from "./constants";

export type LeadTagDto = { id: string; name: string; color: string };

export type LeadListItem = {
  id: string;
  name: string;
  phone: string;
  device: string | null;
  planSlug: string | null;
  source: string | null;
  status: LeadPipelineStatus | string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  whatsappClickedAt: string | null;
  convertedAt: string | null;
  assignedToId: string | null;
  assignedToName: string | null;
  tags: LeadTagDto[];
  createdAt: string;
  updatedAt: string;
};

export type LeadDetail = LeadListItem & {
  country: string | null;
  notes: {
    id: string;
    body: string;
    authorName: string | null;
    createdAt: string;
  }[];
  timeline: {
    id: string;
    type: string;
    title: string;
    actorName: string | null;
    createdAt: string;
  }[];
  assignments: {
    id: string;
    assigneeName: string;
    assignedByName: string | null;
    createdAt: string;
  }[];
};
