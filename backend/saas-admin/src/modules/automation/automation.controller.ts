import { Controller, Get, Param, Post, Put, Body, UseGuards } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";

@Controller("admin/automation")
@UseGuards(JwtAuthGuard)
export class AutomationController {
  @Get()
  list() {
    return { ok: true, data: { jobs: [], logs: [] }, module: "automation-extension" };
  }

  @Put(":id")
  toggle(@Param("id") id: string, @Body() body: { enabled: boolean }) {
    return { ok: true, data: { id, ...body }, module: "automation-extension" };
  }

  @Post(":id/run")
  run(@Param("id") id: string) {
    return { ok: true, data: { jobId: id, status: "success" }, module: "automation-extension" };
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleExpireSubscriptions() {
    // expireSubscriptions();
  }
}
