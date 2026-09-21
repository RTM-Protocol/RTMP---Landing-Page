import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { invalidateFoundingCache } from "@/lib/founding";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let key: string | undefined;
  let open: boolean | undefined;
  try {
    const body = await request.json();
    key = body?.key;
    open = body?.open;
  } catch {
    // fall through
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || key !== adminPassword) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 500 },
    );
  }

  const { error } = await supabase.from("site_state").upsert(
    {
      id: "singleton",
      founding_round_open: open === true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    console.error("[admin/round] failed to update site_state", error);
    return NextResponse.json({ error: "update_failed" }, { status: 500 });
  }

  invalidateFoundingCache();
  return NextResponse.json({ ok: true, open: open === true });
}
