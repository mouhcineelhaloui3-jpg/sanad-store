import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { captureLead } from "@/lib/db/crm";
import { getClientKey, rateLimit } from "@/lib/security/rate-limit";

export async function POST(request: NextRequest) {
  const limited = rateLimit(getClientKey(request, "leads-capture"), 30, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      device?: string;
      planSlug?: string;
      source?: string;
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
      whatsappClicked?: boolean;
      country?: string;
    };

    if (!body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const lead = await captureLead({
      name: body.name,
      phone: body.phone,
      device: body.device,
      planSlug: body.planSlug,
      source: body.source ?? "storefront",
      utmSource: body.utm_source,
      utmMedium: body.utm_medium,
      utmCampaign: body.utm_campaign,
      whatsappClicked: body.whatsappClicked ?? false,
      country: body.country
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    console.error("[api/leads/capture]", error);
    return NextResponse.json({ error: "Failed to capture lead" }, { status: 500 });
  }
}
