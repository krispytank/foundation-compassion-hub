import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const client = createClient(supabaseUrl, supabaseKey)

// Test email function (updated to only send to foundation email)
async function sendEmail(opts) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.log("[email:not-configured]", opts.to, opts.subject);
    return false;
  }

  // For now, only send emails to the foundation email (enock.ken@outlook.com)
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
        from: "Collins Kiprono Foundation <onboarding@resend.dev>",
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
      }),
    });
    if (!res.ok) {
      console.error("[email:failed]", res.status, await res.text());
      return false;
    }
    console.log("[email:success] Email sent to", opts.to);
    return true;
  } catch (err) {
    console.error("[email:error]", err);
    return false;
  }
}

console.log("Testing email functionality...");
console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY ? "✅ Set" : "❌ Not set");
console.log("Testing with foundation email: enock.ken@outlook.com");

const testHtml = `
<div style="font-family: Arial, sans-serif; background:#ffffff; padding:24px;">
  <h2 style="color:#1f4d3f; margin:0 0 12px;">Test Email</h2>
  <p>This is a test email to verify the Resend integration is working.</p>
  <p>Sent at: ${new Date().toISOString()}</p>
  <p style="color:#55575d; font-size:12px; margin-top:24px;">— Collins Kiprono Foundation Test</p>
</div>`;

const success = await sendEmail({
  to: "enock.ken@outlook.com",
  subject: "Test Email - Collins Kiprono Foundation",
  html: testHtml,
});

if (success) {
  console.log("✅ Test email sent successfully!");
  console.log("📧 Check enock.ken@outlook.com for the test email");
} else {
  console.log("❌ Test email failed - domain verification needed");
  console.log("🔧 To fix: Go to https://resend.com/domains and verify a domain");
}
