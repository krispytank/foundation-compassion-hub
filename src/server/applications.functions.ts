import { createServerFn } from "@tanstack/react-start";
import { applicationSchema, type ApplicationInput } from "@/lib/application-schema";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { FOUNDATION_EMAIL, FOUNDATION_NAME } from "./foundation.config";

// Best-effort email sender. If RESEND_API_KEY is set, sends via Resend.
// Otherwise it logs and returns false so the submission still succeeds.
async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.log("[email:not-configured]", opts.to, opts.subject);
    return false;
  }

  // For now, only send emails to the foundation email (enock.ken@outlook.com)
  // TODO: Verify a domain in Resend to send to external addresses
  if (opts.to !== "enock.ken@outlook.com") {
    console.log("[email:skipped] Only sending to foundation email until domain is verified", opts.to);
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: `${FOUNDATION_NAME} <onboarding@resend.dev>`,
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
      }),
    });
    if (!res.ok) {
      console.error("[email:failed]", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email:error]", err);
    return false;
  }
}

// Tiny HTML escape — never inject raw user values into HTML.
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function applicantEmailHtml(d: ApplicationInput): string {
  return `
    <div style="font-family: Arial, sans-serif; background:#ffffff; padding:24px;">
      <h2 style="color:#1f4d3f; margin:0 0 12px;">Application received</h2>
      <p>Dear ${esc(d.full_name)},</p>
      <p>Thank you for applying to <strong>${FOUNDATION_NAME}</strong>. We have received your application and our team will review it shortly.</p>
      <p style="margin:24px 0 8px; font-weight:bold;">Your details:</p>
      <ul>
        <li>Name: ${esc(d.full_name)}</li>
        <li>Email: ${esc(d.email)}</li>
        <li>Phone: ${esc(d.phone)}</li>
        <li>Location: ${esc(d.village)}, ${esc(d.sub_location)}, ${esc(d.ward)}, ${esc(d.constituency)}, ${esc(d.county)}</li>
      </ul>
      <p style="color:#55575d; font-size:12px; margin-top:24px;">— The ${FOUNDATION_NAME} Team</p>
    </div>`;
}

function foundationEmailHtml(d: ApplicationInput): string {
  return `
    <div style="font-family: Arial, sans-serif; background:#ffffff; padding:24px;">
      <h2 style="color:#1f4d3f; margin:0 0 12px;">New application submitted</h2>
      <p>A new application has been received:</p>
      <ul>
        <li><strong>Name:</strong> ${esc(d.full_name)}</li>
        <li><strong>Email:</strong> ${esc(d.email)}</li>
        <li><strong>Phone:</strong> ${esc(d.phone)}</li>
        <li><strong>Location:</strong> ${esc(d.village)}, ${esc(d.sub_location)}, ${esc(d.ward)}</li>
      </ul>
      <p style="color:#55575d; font-size:12px; margin-top:24px;">Full record stored in the foundation database.</p>
    </div>`;
}

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => applicationSchema.parse(input))
  .handler(async ({ data }) => {
    // Honeypot: silently succeed without storing or emailing.
    if (data.website && data.website.length > 0) {
      return { ok: true as const };
    }

    const { error } = await supabaseAdmin.from("applications").insert({
      full_name: data.full_name,
      phone: data.phone,
      email: data.email,
      id_number: data.id_number,
      county: data.county,
      constituency: data.constituency,
      ward: data.ward,
      sub_location: data.sub_location,
      village: data.village,
    });

    if (error) {
      console.error("[applications:insert-error]", error);
      throw new Error("Could not save your application. Please try again.");
    }

    // Fire-and-await both emails. Failures are logged but don't break the submission.
    await Promise.all([
      sendEmail({
        to: data.email,
        subject: `We've received your ${FOUNDATION_NAME} application`,
        html: applicantEmailHtml(data),
      }),
      sendEmail({
        to: FOUNDATION_EMAIL,
        subject: `New application: ${data.full_name}`,
        html: foundationEmailHtml(data),
      }),
    ]);

    return { ok: true as const };
  });
