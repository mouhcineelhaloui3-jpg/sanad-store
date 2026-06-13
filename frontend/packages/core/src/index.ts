export type { Extension, ExtensionState, ExtensionHooks } from "./types/extension";
export type { ExtensionPackage } from "./types/extension-package";
export type { AdminApp, AdminNavItem, ApiContext, ApiHandler, ApiResponse, HttpMethod } from "./types/admin-app";
export type { AuditLogRecord, AuditInput } from "./types/audit";
export { SAAS_ROLE_PERMISSIONS, roleHasPermission, type SaasRole } from "./roles";
export { encryptSecret, decryptSecret } from "./security/encryption";
export { signJwt, verifyJwt, type JwtPayload } from "./security/jwt";
export { appendAuditLog, listAuditLogs } from "./audit/audit-store";
export { dataPath, readJsonStore, writeJsonStore } from "./storage/json-store";
export {
  bootstrapExtensions,
  getExtensionRegistry,
  loadExtensionState,
  matchRoute,
  setExtensionEnabled,
  installExtension
} from "./engine/extension-registry";
