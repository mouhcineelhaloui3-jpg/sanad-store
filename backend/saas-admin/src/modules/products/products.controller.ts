import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";

@Controller("admin/products")
@UseGuards(JwtAuthGuard)
export class ProductsController {
  @Get()
  list() {
    return { ok: true, data: [], module: "products-extension" };
  }

  @Post()
  create(@Body() body: unknown) {
    return { ok: true, data: body, module: "products-extension" };
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return { ok: true, data: { id }, module: "products-extension" };
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() body: unknown) {
    return { ok: true, data: { id, ...(body as object) }, module: "products-extension" };
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return { ok: true, data: { deleted: id }, module: "products-extension" };
  }
}
