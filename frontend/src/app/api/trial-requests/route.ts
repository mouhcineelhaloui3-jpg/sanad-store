import { NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const TRIALS_FILE = path.join(DATA_DIR, "trial-requests.json");

type TrialRequest = {
  id: string;
  name: string;
  phone: string;
  device: string;
  message?: string;
  status: "new" | "contacted" | "completed";
  createdAt: string;
};

async function readTrials(): Promise<TrialRequest[]> {
  try {
    const raw = await readFile(TRIALS_FILE, "utf-8");
    return JSON.parse(raw) as TrialRequest[];
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      device?: string;
      message?: string;
    };

    if (!body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await mkdir(DATA_DIR, { recursive: true });
    const trials = await readTrials();
    const trial: TrialRequest = {
      id: crypto.randomUUID(),
      name: body.name.trim(),
      phone: body.phone.trim(),
      device: body.device ?? "unknown",
      message: body.message?.trim(),
      status: "new",
      createdAt: new Date().toISOString()
    };
    trials.unshift(trial);
    await writeFile(TRIALS_FILE, JSON.stringify(trials, null, 2), "utf-8");

    return NextResponse.json({ ok: true, id: trial.id });
  } catch {
    return NextResponse.json({ error: "Failed to save trial request" }, { status: 500 });
  }
}

export async function GET() {
  const trials = await readTrials();
  return NextResponse.json(trials);
}
