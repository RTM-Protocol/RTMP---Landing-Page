# Rebuild The Man Protocol — Landing Site

## What this is

A multi-page marketing + checkout site for **Rebuild The Man Protocol (RTMP)**, a tactical mental health app for men. It sells a single founding-member offer (£149 / $197 one-time, capped at 40 spots), auto-provisions the buyer's Supabase auth account via a Stripe webhook, and emails them a one-click magic link to set their password. The Emergency Tools page is fully public — anyone in crisis can reach the app's emergency tools without signing up or paying.

Built with Next.js 14 (App Router), TypeScript (strict), Tailwind, Stripe Checkout, Supabase, Resend, and Mailchimp.

---

## 1. Local setup

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev
```

The site runs at http://localhost:3000.

The app is designed to **render with empty env** — pages load and API routes return informative errors instead of crashing — so you can develop the UI before wiring services. The founding counter shows the full 40 until Supabase is connected.

Useful scripts:

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — Next lint

---

## 2. Stripe setup

1. Create **one** product in the Stripe Dashboard: `Rebuild The Man Protocol — Founding Member`.
2. Add a multi-currency price on that product:
   - £149 GBP, one-time
   - $197 USD, one-time (add USD to the same Price via Stripe's multi-currency pricing — Stripe shows the right one based on customer location).
3. Copy the **Price ID** → `STRIPE_PRICE_ID_FOUNDING`.
4. Copy your secret + publishable keys → `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
5. Create a webhook endpoint pointing at `/api/webhooks/stripe`, subscribed to `checkout.session.completed`, `charge.refunded`, `invoice.payment_failed`. Copy the signing secret → `STRIPE_WEBHOOK_SECRET`.

When you move to a second round or the standard £249 price, create a **new** Price object — don't reuse the founding one.

---

## 3. Supabase setup

Create the tables and a one-row `site_state` table used by the admin close-round toggle:

```sql
create table customers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users(id) on delete set null,
  email text not null,
  customer_type text not null check (customer_type in ('founding', 'standard')),
  stripe_customer_id text,
  amount_paid integer,
  currency text default 'gbp',
  status text default 'active' check (status in ('active', 'cancelled', 'refunded')),
  created_at timestamptz default now(),
  refunded_at timestamptz
);
create index customers_email_idx on customers(email);
create index customers_type_idx on customers(customer_type);
create index customers_auth_user_idx on customers(auth_user_id);

create table leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text default 'landing_page',
  tag text default 'landing-page-lead',
  mailchimp_synced boolean default false,
  created_at timestamptz default now()
);

-- Runtime flag so admin can close the round without a redeploy.
create table site_state (
  id text primary key default 'singleton',
  founding_round_open boolean not null default true,
  updated_at timestamptz default now()
);
insert into site_state (id, founding_round_open) values ('singleton', true);

-- Stripe webhook delivery tracking (launch ops dashboard). See
-- supabase/migrations/0001_webhook_events.sql for the canonical version.
-- Payloads contain sensitive data — service-role only, never public.
create table webhook_events (
  id uuid primary key default gen_random_uuid(),
  stripe_event_id text not null unique,
  event_type text not null,
  status text not null check (status in ('received', 'processed', 'failed')),
  error_message text,
  payload jsonb,
  created_at timestamptz default now()
);
create index webhook_events_created_at_idx on webhook_events(created_at desc);
create index webhook_events_status_idx on webhook_events(status);
create index webhook_events_event_type_idx on webhook_events(event_type);

-- RLS: enable on all, deny public. Server uses the service role key.
alter table customers enable row level security;
alter table leads enable row level security;
alter table site_state enable row level security;
alter table webhook_events enable row level security;
```

SQL migrations also live in `supabase/migrations/` — apply them in order (e.g. paste into the Supabase SQL editor or run via the Supabase CLI).

Copy the project URL → `NEXT_PUBLIC_SUPABASE_URL` and the **service role** key → `SUPABASE_SERVICE_ROLE_KEY`. The service role key is server-only — never expose it to the client.

---

## 4. Resend setup

1. Verify your sending domain DNS in Resend (SPF/DKIM).
2. Copy the API key → `RESEND_API_KEY`.
3. Set `RESEND_FROM_EMAIL=Jay <jay@rebuildthemanprotocol.com>` (used as both From and Reply-To).

The welcome email subject is `You're in. Set your password to start.` and contains the one-click magic link.

---

## 5. Mailchimp setup

1. Copy your API key → `MAILCHIMP_API_KEY`.
2. Copy the audience/list ID → `MAILCHIMP_AUDIENCE_ID`.
3. Copy the server prefix from your API key suffix (e.g. `us21`) → `MAILCHIMP_SERVER_PREFIX`.

Leads from the landing page get tag `landing-page-lead`; the sold-out waitlist passes `founding-waitlist`.

---

## 6. Vercel deployment

```bash
vercel link
# paste every variable from .env.example into Vercel project settings (all environments)
git push   # or: vercel --prod
```

After the first deploy, update your Stripe webhook URL to the live domain: `https://YOUR_DOMAIN/api/webhooks/stripe`.

Vercel Analytics is enabled automatically once deployed to Vercel — no env vars needed. Turn it on in your project's **Analytics** tab.

---

## 7. Launch ops dashboard (`/admin`)

Open `/admin?key=YOUR_ADMIN_PASSWORD`. The page auto-refreshes every 30 seconds (countdown shown top-right) and contains, top to bottom:

- **Header** — external links to Stripe, Resend, Mailchimp, and Vercel Analytics dashboards (edit URLs in `app/admin/components/Header.tsx`).
- **Quick stats** — Founding Sold, Founding Revenue, Waitlist, Leads (24h), Refunds, Avg Time To Buy. ("Avg Time To Buy" shows `—`: the first `/join` view lives only in Vercel Analytics, which has no public read API on the free tier — read it from the Analytics tab.)
- **Sales velocity** — inline SVG bar chart, one bar per hour for the last 24h.
- **Stripe webhook health** — last event received, 24h success rate, 24h failure count. The failures card expands to show the last 5 failures, each with a **Retry** button that re-fetches the event from Stripe and re-runs the handler. A top banner appears if no event has arrived in over an hour.
- **Recent activity** — last 20 events across customers, leads, waitlist, refunds, and webhook failures, colour-coded and time-sorted.
- **Customers** and **Leads/Waitlist** tables with CSV export.
- **Actions** — close/re-open the founding round.

Funnel/traffic analytics (page views, checkout-started, purchase-completed, checkout-abandoned, emergency-page-view) live in **Vercel Analytics**, not in this page.

---

## 8. How to close the founding round

Either:

- Click **"Mark founding round CLOSED"** in `/admin` (writes `site_state.founding_round_open = false` in Supabase — takes effect immediately, no redeploy), **or**
- Set `FOUNDING_ROUND_OPEN: false` in `lib/launch-config.ts` and redeploy.

The round also closes automatically once 40 `customers` rows with `customer_type = 'founding'` exist. When closed, all "N of 40 remaining" UI switches to the sold-out / waitlist state.

---

## 9. App-side dependencies (the separate RTMP app)

This landing site assumes the main app:

1. **Renders Emergency Tools at unauthenticated routes** — `/emergency` here links to `${NEXT_PUBLIC_APP_URL}/emergency/{panic|anger|dark-thoughts|sleep}`. Those routes must work with no login.
2. **Has a `/welcome` page** that handles the magic-link landing (active recovery session) and renders the set-your-password form, then routes to protocol selection.
3. **Shares the same Supabase instance** as this landing site, so the auth users created by the webhook can sign in.

---

## 10. Testing the payment → account flow locally

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# copy the printed whsec_... into STRIPE_WEBHOOK_SECRET in .env.local, restart dev
```

Then run a test checkout from `/join`, or fire an event directly:

```bash
stripe trigger checkout.session.completed
```

The webhook will: log a `webhook_events` row (`status: 'received'`), verify the signature, create the Supabase auth user, insert the `customers` row as `founding`, generate a recovery link to `${NEXT_PUBLIC_APP_URL}/welcome`, send the Resend welcome email, invalidate the founding-count cache, and mark the `webhook_events` row `processed` (or `failed` with the error). Duplicate Stripe event IDs are ack'd with 200 and skipped. Confirm rows appear in `webhook_events` and surface in the admin webhook-health panel.

To test the live counter and sold-out UI without paying, insert fake rows:

```sql
insert into customers (email, customer_type) values ('test1@example.com', 'founding');
-- ...repeat to 40 to trigger the sold-out state across the whole site
```

The count is cached in-memory for 60s, so allow up to a minute (or restart dev) to see changes.

---

## Project structure

```
app/                  # routes (landing, join, success, cancelled, emergency, waitlist, admin, privacy, terms) + api/
app/admin/components/  # launch ops sections (header, stats, velocity, webhook health, events feed, tables, actions)
components/shared/     # Header, Footer, Shield, CheckoutButton, WaitlistForm, ResendButton, TrackOnLoad
components/sections/   # landing + pricing page sections
components/admin/       # admin client controls (CSV export, close-round)
lib/                   # launch-config, founding, stripe, supabase-admin, resend, mailchimp, provision, webhook-events, process-stripe-event
lib/admin/             # dashboard data helpers (stats, velocity, webhook-health, events, format)
supabase/migrations/   # SQL migrations (webhook_events, ...)
public/shield.svg
```

---

## Notes

- **The founding count is always real** — read live from Supabase, floored at 0, cached 60s. Never hardcoded.
- **The Emergency Tools page** has no marketing CTAs to the paid product. It fires one anonymous, cookieless Vercel Analytics `emergency_page_view` event on load (added in the ops add-on at the owner's request) — no PII, no third-party pixels.
- **The founder story copy is final** — rendered verbatim in `components/sections/FounderStory.tsx`. Do not punch it up.
- **Social proof testimonials are placeholders** — replace them with real beta quotes before launch (see the TODO in `SocialProof.tsx`).
