import type { Extension } from "@sanad/core";
import { appendAuditLog } from "@sanad/core";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "./store";

export const productsExtension: Extension = {
  name: "products-extension",
  version: "1.0.0",
  enabled: true,
  description: "IPTV product catalog CRUD",
  register(app) {
    app.registerPermission("products:read");
    app.registerPermission("products:write");
    app.registerNav({
      label: "Products",
      href: "/admin/products",
      section: "commerce",
      permission: "products:read"
    });

    app.registerRoute("GET", "/api/admin/products", async () => ({
      status: 200,
      body: { ok: true, data: await listProducts() }
    }));

    app.registerRoute("POST", "/api/admin/products", async ({ body, userId }) => {
      const input = body as Parameters<typeof createProduct>[0];
      const product = await createProduct(input);
      await appendAuditLog({
        userId: userId ?? "system",
        action: "PRODUCT_CREATE",
        module: "products-extension",
        metadata: { productId: product.id }
      });
      return { status: 201, body: { ok: true, data: product } };
    });

    app.registerRoute("GET", "/api/admin/products/:id", async ({ params }) => {
      const product = await getProduct(params.id ?? "");
      if (!product) return { status: 404, body: { ok: false, error: "Product not found" } };
      return { status: 200, body: { ok: true, data: product } };
    });

    app.registerRoute("PUT", "/api/admin/products/:id", async ({ params, body, userId }) => {
      const product = await updateProduct(params.id ?? "", body as Parameters<typeof updateProduct>[1]);
      if (!product) return { status: 404, body: { ok: false, error: "Product not found" } };
      await appendAuditLog({
        userId: userId ?? "system",
        action: "PRODUCT_UPDATE",
        module: "products-extension",
        metadata: { productId: product.id }
      });
      return { status: 200, body: { ok: true, data: product } };
    });

    app.registerRoute("DELETE", "/api/admin/products/:id", async ({ params, userId }) => {
      const ok = await deleteProduct(params.id ?? "");
      if (!ok) return { status: 404, body: { ok: false, error: "Product not found" } };
      await appendAuditLog({
        userId: userId ?? "system",
        action: "PRODUCT_DELETE",
        module: "products-extension",
        metadata: { productId: params.id }
      });
      return { status: 200, body: { ok: true, data: { deleted: true } } };
    });
  }
};

export * from "./types";
export * from "./store";
