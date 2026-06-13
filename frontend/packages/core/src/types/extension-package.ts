export interface ExtensionPackage {
  id: string;
  name: string;
  version: string;
  description: string;
  downloadUrl: string;
  installed: boolean;
  category?: "core" | "marketing" | "sales" | "automation";
  author?: string;
}
