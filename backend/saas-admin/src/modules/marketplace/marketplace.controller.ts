import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";

@Controller("admin/marketplace")
@UseGuards(JwtAuthGuard)
export class MarketplaceController {
  @Get()
  catalog() {
    return { ok: true, data: [], module: "marketplace-extension" };
  }

  @Post(":id/install")
  install(@Param("id") id: string) {
    return { ok: true, data: { installed: id }, module: "marketplace-extension" };
  }
}
