import { NextRequest } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { apiError, apiSuccess } from "@/lib/admin/api-response";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { validateCsrf } from "@/lib/admin/csrf";

export async function POST(request: NextRequest) {
  const { error } = requireAdminPermission(request, "cms:write");
  if (error) return error;

  if (!validateCsrf(request)) {
    return apiError("CSRF_INVALID", "Invalid CSRF token", 403);
  }

  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!file || !(file instanceof File)) {
      return apiError("NO_FILE", "No file provided", 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const filename = `${Date.now()}-${safeName}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    return apiSuccess({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error("[api/admin/upload] POST failed", err);
    return apiError("UPLOAD_FAILED", "Upload failed", 500);
  }
}
