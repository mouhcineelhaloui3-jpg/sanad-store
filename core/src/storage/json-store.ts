import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export function dataPath(...segments: string[]) {
  const root = process.env.SANAD_DATA_DIR ?? path.join(process.cwd(), "data");
  return path.join(root, ...segments);
}

export async function readJsonStore<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJsonStore<T>(file: string, value: T): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(value, null, 2), "utf-8");
}
