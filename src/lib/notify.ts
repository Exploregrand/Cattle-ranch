import "server-only";

/**
 * Lead alerts by email via Resend's HTTP API. Silently does nothing until
 * RESEND_API_KEY and LEAD_ALERT_EMAIL are set, and never blocks a registration.
 */
export async function notifyNewLead(subject: string, lines: (string | null | undefined)[]) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_ALERT_EMAIL;
  if (!key || !to) return;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_ALERT_FROM ?? "Herd & Field <alerts@herdandfield.co.ke>",
        to: to.split(",").map((s) => s.trim()),
        subject,
        text: lines.filter(Boolean).join("\n"),
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error("Lead alert failed", res.status, await res.text());
  } catch (error) {
    console.error("Lead alert failed", error);
  }
}
