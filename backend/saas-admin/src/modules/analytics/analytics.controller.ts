import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";

@Controller("admin/analytics")
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  @Get()
  summary() {
    return {
      ok: true,
      data: {
        whatsappClicks: 0,
        leads: 0,
        conversionRate: 0,
        note: "WhatsApp-only analytics — no payment tracking"
      },
      module: "analytics-extension"
    };
  }
}
