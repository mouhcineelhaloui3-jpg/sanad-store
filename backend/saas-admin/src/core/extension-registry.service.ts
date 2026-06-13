import { Injectable } from "@nestjs/common";

export type SaasExtension = {
  name: string;
  version: string;
  enabled: boolean;
  routes: string[];
};

@Injectable()
export class ExtensionRegistryService {
  private extensions: SaasExtension[] = [
    { name: "products-extension", version: "1.0.0", enabled: true, routes: ["/admin/products"] },
    { name: "ads-extension", version: "1.0.0", enabled: true, routes: ["/admin/ads"] },
    { name: "analytics-extension", version: "1.0.0", enabled: true, routes: ["/admin/analytics"] },
    { name: "automation-extension", version: "1.0.0", enabled: true, routes: ["/admin/automation"] },
    { name: "affiliate-extension", version: "1.0.0", enabled: false, routes: ["/admin/affiliates"] },
    { name: "marketplace-extension", version: "1.0.0", enabled: true, routes: ["/admin/marketplace", "/admin/extensions"] }
  ];

  list() {
    return this.extensions;
  }

  setEnabled(name: string, enabled: boolean) {
    const ext = this.extensions.find((e) => e.name === name);
    if (!ext) return null;
    ext.enabled = enabled;
    return ext;
  }
}
