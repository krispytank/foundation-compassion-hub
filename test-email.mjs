import { createClient } from '@supabase/supabase-js'
import Mailjet from 'node-mailjet'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const client = createClient(supabaseUrl, supabaseKey)

// Test email function using Mailjet
async function sendEmail(opts) {
  const apiKey = process.env.MAILJET_API_KEY;
  const secretKey = process.env.MAILJET_SECRET_KEY;
  
  if (!apiKey || !secretKey) {
    console.log("[email:not-configured] Missing MAILJET_API_KEY or MAILJET_SECRET_KEY");
    return false;
  }

  try {
    const mailjet = Mailjet.apiConnect(apiKey, secretKey);
    
    const result = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "noreply@foundation.example.com",
            Name: "Collins Kiprono Foundation",
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

console.log("Testing email functionality with Mailjet...");
console.log("MAILJET_API_KEY:", process.env.MAILJET_API_KEY ? "✅ Set" : "❌ Not set");
console.log("MAILJET_SECRET_KEY:", process.env.MAILJET_SECRET_KEY ? "✅ Set" : "❌ Not set");
console.log("Testing with email: brianrosh92@gmail.com");

const testHtml = `
<div style="font-family: Arial, sans-serif; background:#ffffff; padding:24px;">
  <h2 style="color:#1f4d3f; margin:0 0 12px;">Test Email</h2>
  <p>This is a test email to verify the Mailjet integration is working.</p>
  <p>Sent at: ${new Date().toISOString()}</p>
  <p style="color:#55575d; font-size:12px; margin-top:24px;">— Collins Kiprono Foundation Test</p>
</div>`;

const success = await sendEmail({
  to: "brianrosh92@gmail.com",
  subject: "Test Email - Collins Kiprono Foundation",
  html: testHtml,
});

if (success) {
  console.log("✅ Test email sent successfully!");
  console.log("📧 Check brianrosh92@gmail.com for the test email");
} else {
  console.log("❌ Test email failed");
  console.log("🔧 Make sure your Mailjet API credentials are set correctly");
}
