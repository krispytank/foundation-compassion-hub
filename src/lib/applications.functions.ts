import { createServerFn } from "@tanstack/react-start";
import Mailjet from "node-mailjet";
import { applicationSchema, type ApplicationInput } from "@/lib/application-schema";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { FOUNDATION_EMAIL, FOUNDATION_NAME } from "@/lib/foundation.config";

// Best-effort email sender. If Mailjet credentials are set, sends via Mailjet.
// Otherwise it logs and returns false so the submission still succeeds.
async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  const apiKey = process.env.MAILJET_API_KEY;
  const secretKey = process.env.MAILJET_SECRET_KEY;
  
  if (!apiKey || !secretKey) {
    console.log("[email:not-configured]", opts.to, opts.subject);
    return false;
  }

  try {
    const mailjet = Mailjet.apiConnect(apiKey, secretKey);
    
    const result = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: FOUNDATION_EMAIL,
            Name: FOUNDATION_NAME,
          },
          To: [
            {
              Email: opts.to,
            },
          ],
          Subject: opts.subject,
          HTMLPart: opts.html,
        },
      ],
    });

    if (result.response.status >= 200 && result.response.status < 300) {
      console.log("[email:success] Email sent to", opts.to);
      return true;
    } else {
      console.error("[email:failed]", result.response.status, result.response.data);
      return false;
    }
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
