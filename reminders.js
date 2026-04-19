/**
 * ============================================================
 *  reminders.js
 *  Legal Diary — Email & WhatsApp Reminder Logic
 * ============================================================
 *
 *  This file documents the reminder system logic.
 *  The actual implementation is embedded in index.html.
 *  Use this as a reference or for a Node.js backend setup.
 *
 *  HOW THE REMINDER SYSTEM WORKS:
 *  ─────────────────────────────────────────────────────────
 *
 *  1. AUTOMATIC CHECK ON LOGIN:
 *     Every time the advocate logs in, the app scans all
 *     cases and checks if any hearings are:
 *       - Today      → Shows urgent red banner + sends email
 *       - Tomorrow   → Shows warning banner + auto-sends email
 *       - This week  → Shows info banner
 *
 *  2. EMAILJS INTEGRATION:
 *     Uses the EmailJS SDK to send transactional emails
 *     directly from the browser — NO backend server needed!
 *
 *     Setup Steps:
 *     ┌──────────────────────────────────────────────────┐
 *     │ a) Go to https://www.emailjs.com                 │
 *     │ b) Create a FREE account                         │
 *     │ c) Add Email Service → Connect your Gmail        │
 *     │    → Note your SERVICE_ID                        │
 *     │ d) Create Email Template with variables:         │
 *     │    {{to_name}}, {{to_email}}, {{case_name}},     │
 *     │    {{case_no}}, {{court}}, {{hearing_date}},     │
 *     │    {{notes}}, {{advocate_name}}                  │
 *     │    → Note your TEMPLATE_ID                       │
 *     │ e) Go to Account → Note your PUBLIC_KEY          │
 *     └──────────────────────────────────────────────────┘
 *
 *  3. WHATSAPP INTEGRATION:
 *     Uses the WhatsApp API deep link (wa.me) to open
 *     WhatsApp with a pre-written message for the client.
 *     Format: https://wa.me/{phone}?text={encoded_message}
 *     No API key needed — works on mobile & desktop!
 *
 *  4. MANUAL REMINDER:
 *     Advocates can click "Send Alert" on any case
 *     to manually trigger an email + WhatsApp message.
 *
 * ============================================================
 */

// ─────────────────────────────────────────────────────────────
//  EMAILJS CONFIGURATION
//  Update these values in the index.html EMAILJS_CONFIG block
// ─────────────────────────────────────────────────────────────

const EMAILJS_CONFIG = {
  publicKey:  "YOUR_EMAILJS_PUBLIC_KEY",  // From EmailJS → Account → API Keys
  serviceID:  "YOUR_SERVICE_ID",          // From EmailJS → Email Services
  templateID: "YOUR_TEMPLATE_ID"          // From EmailJS → Email Templates
};


// ─────────────────────────────────────────────────────────────
//  EMAIL TEMPLATE EXAMPLE
//  Create this template in your EmailJS dashboard
// ─────────────────────────────────────────────────────────────

const EMAIL_TEMPLATE_EXAMPLE = `
Subject: ⚖️ Hearing Reminder — {{case_name}} on {{hearing_date}}

Dear {{to_name}},

This is an automated reminder from Legal Diary.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 CASE DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Case No:      {{case_no}}
⚖️  Case Title:  {{case_name}}
🏛️  Court:       {{court}}
📅  Hearing:     {{hearing_date}}
👨‍⚖️  Advocate:    {{advocate_name}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 NOTES:
{{notes}}

Please ensure all documents are ready.

This is an automated message from Legal Diary.
Do not reply to this email.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Legal Diary | Professional Case Management
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;


// ─────────────────────────────────────────────────────────────
//  NODE.JS BACKEND ALTERNATIVE
//  Use this if you want server-side cron-based reminders
//  Install: npm install nodemailer node-cron firebase-admin
// ─────────────────────────────────────────────────────────────

/*

const cron         = require('node-cron');
const nodemailer   = require('nodemailer');
const admin        = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// Email Transporter (Gmail)
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,     // your-email@gmail.com
    pass: process.env.GMAIL_APP_PASS  // Gmail App Password (not your real password)
  }
});

// Cron Job: Run every day at 8:00 AM
cron.schedule('0 8 * * *', async () => {
  console.log('[Legal Diary Cron] Checking for tomorrow\'s hearings...');

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  try {
    // Query all cases with hearing tomorrow
    const snapshot = await db.collection('cases')
      .where('hearingDate', '==', tomorrowStr)
      .where('status', '!=', 'Closed')
      .get();

    for (const docSnap of snapshot.docs) {
      const c = docSnap.data();
      if (!c.remindEmail) continue;

      // Send email
      await transporter.sendMail({
        from:    '"Legal Diary" <your-email@gmail.com>',
        to:      c.remindEmail,
        subject: `⚖️ Hearing Tomorrow — ${c.title}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#1e3a5f;color:#d4af37;padding:20px;text-align:center;border-radius:8px 8px 0 0;">
              <h1 style="margin:0;font-size:24px;">⚖️ Legal Diary</h1>
              <p style="margin:5px 0 0;color:#fff;opacity:0.8;">Hearing Reminder</p>
            </div>
            <div style="background:#f8fafc;padding:25px;border:1px solid #e2e8f0;">
              <h2 style="color:#1e3a5f;">📅 Hearing Tomorrow!</h2>
              <p><strong>Case No:</strong> ${c.caseNo}</p>
              <p><strong>Case:</strong> ${c.title}</p>
              <p><strong>Court:</strong> ${c.court}</p>
              <p><strong>Date:</strong> ${tomorrowStr}</p>
              <p><strong>Notes:</strong> ${c.notes || 'None'}</p>
            </div>
            <div style="background:#1e3a5f;color:#fff;padding:15px;text-align:center;border-radius:0 0 8px 8px;font-size:12px;">
              Legal Diary — Automated Reminder System
            </div>
          </div>
        `
      });
      console.log(`[Legal Diary Cron] Sent reminder for ${c.caseNo} to ${c.remindEmail}`);
    }
  } catch (err) {
    console.error('[Legal Diary Cron] Error:', err);
  }
});

console.log('[Legal Diary Cron] Reminder service started. Runs at 8:00 AM daily.');

*/


// ─────────────────────────────────────────────────────────────
//  WHATSAPP MESSAGE TEMPLATES
//  These are pre-formatted messages used in the app
// ─────────────────────────────────────────────────────────────

const WHATSAPP_TEMPLATES = {
  today: (c) => `
⚖️ *LEGAL DIARY — HEARING TODAY!*
━━━━━━━━━━━━━━━━━━━━━
📋 *Case No:* ${c.caseNo}
📌 *Case:* ${c.title}
🏛️ *Court:* ${c.court}
📅 *Date:* TODAY
━━━━━━━━━━━━━━━━━━━━━
Please ensure all documents are ready!
  `.trim(),

  tomorrow: (c) => `
⚠️ *LEGAL DIARY — HEARING TOMORROW!*
━━━━━━━━━━━━━━━━━━━━━
📋 *Case No:* ${c.caseNo}
📌 *Case:* ${c.title}
🏛️ *Court:* ${c.court}
📅 *Date:* Tomorrow
━━━━━━━━━━━━━━━━━━━━━
Please be prepared with all documents.
  `.trim()
};

// ─────────────────────────────────────────────────────────────
//  REMINDER LOGIC FLOW DIAGRAM
// ─────────────────────────────────────────────────────────────
/*

  USER LOGS IN
      │
      ▼
  checkReminders()
      │
      ├─── Loop through all cases
      │         │
      │         ├── getDaysDiff(hearingDate)
      │         │
      │         ├── diff === 0  ──► TODAY    → Red banner + Manual email button + WhatsApp link
      │         ├── diff === 1  ──► TOMORROW → Orange banner + Auto email + WhatsApp link
      │         ├── diff <= 7  ──► THIS WEEK → Blue info banner
      │         └── diff > 7   ──► No alert
      │
      ├─── Auto-send EmailJS for tomorrow's hearings
      │
      └─── Display toast notifications

*/

export { EMAILJS_CONFIG, WHATSAPP_TEMPLATES };
