let envChecked = false;

export function logEnvHealth(scope: string) {
  if (envChecked) return;
  envChecked = true;

  const optional = ["DATABASE_URL", "JWT_SECRET", "NEXT_PUBLIC_API_URL", "ADMIN_API_KEY"] as const;

  for (const key of optional) {
    if (!process.env[key]) {
      console.warn(`[env:${scope}] Optional ${key} is not set`);
    }
  }
}
