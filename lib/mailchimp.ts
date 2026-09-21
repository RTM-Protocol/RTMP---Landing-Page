import crypto from "crypto";

/**
 * Minimal Mailchimp Marketing API client via fetch (no SDK dependency).
 * Adds/updates a member in the audience and applies a tag.
 */
export async function syncToMailchimp(
  email: string,
  tag = "landing-page-lead",
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (
    !apiKey ||
    !audienceId ||
    !serverPrefix ||
    apiKey === "replace_me" ||
    audienceId === "replace_me"
  ) {
    console.warn("[mailchimp] not configured — skipping sync for", email);
    return { ok: false, error: "mailchimp_not_configured" };
  }

  const subscriberHash = crypto
    .createHash("md5")
    .update(email.toLowerCase())
    .digest("hex");

  const base = `https://${serverPrefix}.api.mailchimp.com/3.0`;
  const auth = "Basic " + Buffer.from(`anystring:${apiKey}`).toString("base64");

  try {
    const upsert = await fetch(
      `${base}/lists/${audienceId}/members/${subscriberHash}`,
      {
        method: "PUT",
        headers: { Authorization: auth, "Content-Type": "application/json" },
        body: JSON.stringify({
          email_address: email,
          status_if_new: "subscribed",
        }),
      },
    );

    if (!upsert.ok && upsert.status !== 200) {
      const detail = await upsert.text();
      console.error("[mailchimp] upsert failed", upsert.status, detail);
      return { ok: false, error: "upsert_failed" };
    }

    await fetch(`${base}/lists/${audienceId}/members/${subscriberHash}/tags`, {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({ tags: [{ name: tag, status: "active" }] }),
    });

    return { ok: true };
  } catch (err) {
    console.error("[mailchimp] sync error", err);
    return { ok: false, error: "network_error" };
  }
}
