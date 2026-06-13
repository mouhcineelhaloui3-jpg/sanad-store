import { Controller, Get, Put, Param, Body, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";

@Controller("admin/ads")
@UseGuards(JwtAuthGuard)
export class AdsController {
  @Get()
  list() {
    return { ok: true, data: [], module: "ads-extension" };
  }

  @Put(":platform")
  update(@Param("platform") platform: string, @Body() body: unknown) {
    return { ok: true, data: { platform, ...(body as object) }, module: "ads-extension" };
  }
}
