import { NextResponse } from "next/server";
import { LAUNCH_CONFIG } from "@/lib/launch-config";
import { getFoundingSpotsRemaining, isFoundingRoundOpen } from "@/lib/founding";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const [remaining, open] = await Promise.all([
    getFoundingSpotsRemaining(),
    isFoundingRoundOpen(),
  ]);

  return NextResponse.json({
    remaining,
    total: LAUNCH_CONFIG.FOUNDING_SPOTS_TOTAL,
    open: open && remaining > 0,
  });
}
