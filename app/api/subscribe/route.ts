import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { syncToMailchimp } from "@/lib/mailchimp";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let email: string | undefined;
  let tag = "landing-page-lead";

  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : undefined;
    if (typeof body?.tag === "string" && body.tag) tag = body.tag;
  } catch {
    // fall through
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const normalized = email.toLowerCase();
  const supabase = getSupabaseAdmin();

  // Sync to Mailchimp first (best-effort) so we can record the result.
  const mc = await syncToMailchimp(normalized, tag);

  if (supabase) {
    const { error } = await supabase.from("leads").upsert(
      {
        email: normalized,
        source: "landing_page",
        tag,
        mailchimp_synced: mc.ok,
      },
      { onConflict: "email" },
    );
    if (error) {
      console.error("[subscribe] failed to upsert lead", error);
      // Don't fail the request — the Mailchimp sync may still have succeeded.
    }
  } else {
    console.warn("[subscribe] Supabase not configured — lead not stored", normalized);
  }

  return NextResponse.json({ ok: true });
}
