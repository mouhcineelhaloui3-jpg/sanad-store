import { NextResponse } from "next/server";
import { defaultStoreContent } from "@/lib/cms/defaults";
import { getStoreContent } from "@/lib/cms/server";

export async function GET() {
  try {
    const content = await getStoreContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error("[api/cms] GET failed, returning defaults", error);
    return NextResponse.json(defaultStoreContent());
  }
}
