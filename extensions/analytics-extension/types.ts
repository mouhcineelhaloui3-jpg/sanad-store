export type WhatsAppAnalyticsEvent = {
  event: "WHATSAPP_CLICK" | "LEAD" | "TRIAL_SUBMIT" | "PAGE_VIEW";
  productId?: string;
  source?: string;
  timestamp: string;
  path?: string;
  sessionId?: string;
};

export type AnalyticsMetrics = {
  whatsappClicks: number;
  leads: number;
  trials: number;
  pageViews: number;
  conversionRate: number;
  productInterest: { productId: string; count: number }[];
  trafficSources: { source: string; count: number }[];
  recentEvents: WhatsAppAnalyticsEvent[];
};
