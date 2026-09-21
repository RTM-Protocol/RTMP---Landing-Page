import { Resend } from "resend";

let cached: Resend | null = null;

function getResend(): Resend | null {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key || key === "re_replace_me") return null;
  cached = new Resend(key);
  return cached;
}

const FROM =
  process.env.RESEND_FROM_EMAIL || "Jay <jay@rebuildthemanprotocol.com>";

function welcomeEmailBody(magicLink: string): string {
  return `You're one of the founding 40.

Click the link below to set your password and open the app:

${magicLink}

This link expires in 24 hours. If it expires, reply to this email
and I'll send a new one.

Your first mission is waiting on the other side. Don't read it — run it.

— Jay
Rebuild The Man Protocol

—
Need help? Just reply to this email.`;
}

function welcomeEmailHtml(magicLink: string): string {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#0A0A0A;font-family:Inter,system-ui,Arial,sans-serif;color:#CCCCCC;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#1A1A1A;border:1px solid #2A2A2A;">
            <tr>
              <td style="padding:32px;">
                <p style="color:#FFFFFF;font-size:20px;font-weight:700;margin:0 0 24px;letter-spacing:-0.01em;">You're one of the founding 40.</p>
                <p style="margin:0 0 24px;line-height:1.6;">Click the button below to set your password and open the app:</p>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                  <tr>
                    <td style="background:#D4662F;">
                      <a href="${magicLink}" style="display:inline-block;padding:14px 28px;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:15px;">SET YOUR PASSWORD &rarr;</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 24px;line-height:1.6;font-size:14px;color:#777777;">This link expires in 24 hours. If it expires, reply to this email and I'll send a new one.</p>
                <p style="margin:0 0 24px;line-height:1.6;">Your first mission is waiting on the other side. Don't read it — run it.</p>
                <p style="margin:0;line-height:1.6;">— Jay<br/>Rebuild The Man Protocol</p>
                <hr style="border:none;border-top:1px solid #2A2A2A;margin:24px 0;" />
                <p style="margin:0;font-size:13px;color:#777777;">Need help? Just reply to this email.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendWelcomeEmail(
  to: string,
  magicLink: string,
): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend();
  if (!resend) {
    console.warn("[resend] RESEND_API_KEY not set — skipping welcome email to", to);
    return { ok: false, error: "resend_not_configured" };
  }

  try {
    await resend.emails.send({
      from: FROM,
      to,
      replyTo: FROM,
      subject: "You're in. Set your password to start.",
      text: welcomeEmailBody(magicLink),
      html: welcomeEmailHtml(magicLink),
    });
    return { ok: true };
  } catch (err) {
    console.error("[resend] failed to send welcome email", err);
    return { ok: false, error: "send_failed" };
  }
}
