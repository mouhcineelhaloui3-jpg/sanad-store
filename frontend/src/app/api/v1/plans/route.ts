import { NextResponse } from "next/server";
import { mergePlansWithCms } from "@/lib/cms/merge-plans";
import { getStoreContent } from "@/lib/cms/server";

export async function GET() {
  const content = await getStoreContent();
  const plans = mergePlansWithCms(content.plans);
  return NextResponse.json(plans);
}
