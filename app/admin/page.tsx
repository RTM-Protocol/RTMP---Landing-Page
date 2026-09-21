import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { isFoundingRoundOpen } from "@/lib/founding";
import { getQuickStats } from "@/lib/admin/stats";
import { getSalesVelocity } from "@/lib/admin/velocity";
import { getWebhookHealth } from "@/lib/admin/webhook-health";
import { getRecentEvents } from "@/lib/admin/events";
import { AdminHeader } from "./components/Header";
import { QuickStats } from "./components/QuickStats";
import { SalesVelocity } from "./components/SalesVelocity";
import { WebhookHealth } from "./components/WebhookHealth";
import { EventsFeed } from "./components/EventsFeed";
import { StaleBanner } from "./components/StaleBanner";
import { CustomersTable, type Customer } from "./components/CustomersTable";
import { LeadsTable, type Lead } from "./components/LeadsTable";
import { Actions } from "./components/Actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Rebuild The Man Protocol",
  robots: { index: false, follow: false },
};

function Unauthorized() {
  return (
    <main className="container-narrow section-pad">
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-mono text-2xl font-bold uppercase text-accent-emergency">
          401 — Unauthorized
        </h1>
        <p className="mt-4 font-mono text-sm text-text-muted">
          Append ?key=YOUR_ADMIN_PASSWORD to the URL.
        </p>
      </div>
    </main>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || adminPassword === "replace_me") {
    return (
      <main className="container-narrow section-pad">
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-mono text-2xl font-bold uppercase text-accent-emergency">
            Admin not configured
          </h1>
          <p className="mt-4 font-mono text-sm text-text-muted">
            Set ADMIN_PASSWORD in your environment.
          </p>
        </div>
      </main>
    );
  }

  if (searchParams.key !== adminPassword) {
    return <Unauthorized />;
  }

  const supabase = getSupabaseAdmin();

  const [
    customersData,
    leadsData,
    roundOpen,
    stats,
    velocity,
    health,
    events,
  ] = await Promise.all([
    supabase
      ? supabase
          .from("customers")
          .select("email, amount_paid, currency, customer_type, status, created_at")
          .order("created_at", { ascending: false })
      : Promise.resolve({ data: [] as Customer[] }),
    supabase
      ? supabase
          .from("leads")
          .select("email, tag, created_at, mailchimp_synced")
          .order("created_at", { ascending: false })
      : Promise.resolve({ data: [] as Lead[] }),
    isFoundingRoundOpen(),
    getQuickStats(supabase),
    getSalesVelocity(supabase),
    getWebhookHealth(supabase),
    getRecentEvents(supabase, 20),
  ]);

  const customers = (customersData.data as Customer[]) ?? [];
  const leads = (leadsData.data as Lead[]) ?? [];

  const lastUpdated = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <main className="container-narrow section-pad space-y-12">
      <AdminHeader lastUpdated={lastUpdated} />

      {!supabase && (
        <p className="font-mono text-xs text-accent-emergency">
          Supabase not configured — showing empty data.
        </p>
      )}

      {health.stale && health.hoursSinceLast != null && (
        <StaleBanner hoursSinceLast={health.hoursSinceLast} />
      )}

      <QuickStats stats={stats} />

      <SalesVelocity velocity={velocity} />

      <WebhookHealth health={health} adminKey={adminPassword} />

      <EventsFeed events={events} />

      <CustomersTable customers={customers} />

      <LeadsTable leads={leads} />

      <Actions adminKey={adminPassword} roundOpen={roundOpen} />
    </main>
  );
}
