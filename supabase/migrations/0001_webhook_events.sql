-- Webhook event tracking for Stripe delivery health.
-- Payloads can contain sensitive customer/payment data, so this table is
-- service-role only — never expose it to the client.

create table if not exists webhook_events (
  id uuid primary key default gen_random_uuid(),
  stripe_event_id text not null unique,
  event_type text not null,
  status text not null check (status in ('received', 'processed', 'failed')),
  error_message text,
  payload jsonb,
  created_at timestamptz default now()
);

create index if not exists webhook_events_created_at_idx on webhook_events(created_at desc);
create index if not exists webhook_events_status_idx on webhook_events(status);
create index if not exists webhook_events_event_type_idx on webhook_events(event_type);

-- RLS on, no policies => public/anon denied. Service role bypasses RLS.
alter table webhook_events enable row level security;
