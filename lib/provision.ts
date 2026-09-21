import { getSupabaseAdmin } from "./supabase-admin";
import { sendWelcomeEmail } from "./resend";
import { invalidateFoundingCache } from "./founding";

function welcomeRedirectUrl(): string {
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://app.rebuildthemanprotocol.com";
  return `${appUrl}/welcome`;
}

/**
 * Generates a fresh one-time "recovery" magic link that lands the user on the
 * app's /welcome page with an active session so they can set a password.
 */
export async function generateWelcomeLink(
  email: string,
): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo: welcomeRedirectUrl() },
  });

  if (error || !data?.properties?.action_link) {
    console.error("[provision] generateLink failed", error);
    return null;
  }
  return data.properties.action_link;
}

type ProvisionInput = {
  email: string;
  stripeCustomerId: string | null;
  amountTotal: number | null;
  currency: string | null;
};

/**
 * Full provisioning run for a completed checkout:
 * - create (or reuse) the Supabase auth user
 * - insert a `customers` row as a founding member
 * - generate a one-time password-set link
 * - send the welcome email
 * - invalidate the founding-count cache
 *
 * Idempotent on email: if the customer row already exists we skip the insert.
 */
export async function provisionFoundingCustomer(
  input: ProvisionInput,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.warn("[provision] Supabase not configured — cannot provision", input.email);
    return { ok: false, error: "supabase_not_configured" };
  }

  const email = input.email.toLowerCase().trim();

  // 1. Create auth user (ignore "already registered" so the webhook is safe to retry).
  let authUserId: string | null = null;
  const { data: created, error: createErr } =
    await supabase.auth.admin.createUser({ email, email_confirm: true });

  if (createErr) {
    // Likely already exists — look it up so we can still link the row.
    const { data: list } = await supabase.auth.admin.listUsers();
    const existing = list?.users.find(
      (u) => u.email?.toLowerCase() === email,
    );
    authUserId = existing?.id ?? null;
  } else {
    authUserId = created.user?.id ?? null;
  }

  // 2. Insert customer row if one doesn't already exist for this email.
  const { data: existingCustomer } = await supabase
    .from("customers")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (!existingCustomer) {
    const { error: insertErr } = await supabase.from("customers").insert({
      auth_user_id: authUserId,
      email,
      customer_type: "founding",
      stripe_customer_id: input.stripeCustomerId,
      amount_paid: input.amountTotal,
      currency: input.currency ?? "gbp",
      status: "active",
    });
    if (insertErr) {
      console.error("[provision] failed to insert customer", insertErr);
    }
  }

  // 3. Generate magic link + 4. send email.
  const link = await generateWelcomeLink(email);
  if (link) {
    await sendWelcomeEmail(email, link);
  } else {
    console.error("[provision] no magic link generated for", email);
  }

  // 5. Invalidate the founding count cache so the next read is fresh.
  invalidateFoundingCache();

  return { ok: true };
}
