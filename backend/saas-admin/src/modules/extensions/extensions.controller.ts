import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ExtensionRegistryService } from "../core/extension-registry.service";

@Controller("admin/extensions")
@UseGuards(JwtAuthGuard)
export class ExtensionsController {
  constructor(private registry: ExtensionRegistryService) {}

  @Get()
  list() {
    return { ok: true, data: this.registry.list() };
  }
}
