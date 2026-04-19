/**
 * ============================================================
 *  app.js
 *  Legal Diary — Core Application Logic Reference
 * ============================================================
 *
 *  NOTE: This file is for documentation & reference only.
 *  All logic is embedded directly in index.html for
 *  "copy-paste ready" single-file deployment.
 *
 *  ARCHITECTURE OVERVIEW:
 *  ─────────────────────────────────────────────────────────
 *
 *  index.html
 *  ├── <style>          → Custom CSS (glassmorphism theme)
 *  ├── <script module>  → firebase-config.js (Firebase init)
 *  ├── <script>         → app.js (Auth + CRUD logic)
 *  ├── <script>         → reminders.js (Email + WhatsApp)
 *  └── <script>         → PDF export logic
 *
 *  FEATURES IMPLEMENTED:
 *  ─────────────────────────────────────────────────────────
 *
 *  ✅ AUTHENTICATION
 *     - Email/Password Login via Firebase Auth
 *     - User Registration with display name
 *     - Auth state persistence (stays logged in)
 *     - Demo Mode (no Firebase needed)
 *
 *  ✅ CASE MANAGEMENT (CRUD)
 *     - Add new cases with full details
 *     - Edit existing cases
 *     - Delete cases with confirmation
 *     - View full case details in modal
 *     - Real-time sync via Firestore onSnapshot()
 *
 *  ✅ CASE FIELDS:
 *     - Case Number, Court, Title/Parties
 *     - Type (Civil/Criminal/Family/etc.)
 *     - Status (Active/Pending/Adjourned/Closed/Urgent)
 *     - Filing Date, Next Hearing Date
 *     - Presiding Judge, Priority
 *     - Client Name & Contact
 *     - Document URL (Firebase Storage / Google Drive)
 *     - Reminder Email
 *     - Case Notes
 *
 *  ✅ AUTOMATED REMINDERS
 *     - Scans hearings on every login
 *     - Auto-sends email for tomorrow's hearings (EmailJS)
 *     - Manual "Send Alert" button on each case
 *     - WhatsApp deep link for quick messaging
 *     - Countdown badges (Today / Tomorrow / X days)
 *
 *  ✅ DOCUMENT ATTACHMENT
 *     - Store Firebase Storage download URLs
 *     - Direct link to view/download PDF
 *     - Supports Google Drive links too
 *
 *  ✅ PDF EXPORT
 *     - Professional court-ready PDF layout
 *     - Colored status badges in PDF
 *     - Summary analytics page
 *     - Upcoming hearings table
 *     - Header/footer on every page
 *     - Landscape A4 format
 *
 *  ✅ SEARCH & FILTER
 *     - Real-time search (case no, title, court, client)
 *     - Filter tabs (All/Active/Pending/Adjourned/Closed/Urgent)
 *
 *  ✅ DASHBOARD STATS
 *     - Total / Active / Pending / Hearings Soon / Closed
 *     - Animated number transitions
 *
 * ============================================================
 *
 *  HOW TO DEPLOY:
 *  ─────────────────────────────────────────────────────────
 *
 *  Option 1 — Firebase Hosting (Recommended):
 *    1. npm install -g firebase-tools
 *    2. firebase login
 *    3. firebase init hosting
 *    4. firebase deploy
 *
 *  Option 2 — Netlify Drop:
 *    1. Go to app.netlify.com/drop
 *    2. Drag your project folder
 *    3. Done! Live in 30 seconds.
 *
 *  Option 3 — GitHub Pages:
 *    1. Push to GitHub repository
 *    2. Enable Pages in repo Settings
 *    3. Select main branch / root folder
 *
 *  Option 4 — Any Web Host:
 *    Just upload index.html + style.css to any web server.
 *    No server-side language needed (pure client-side).
 *
 * ============================================================
 *
 *  FIRESTORE DATA STRUCTURE:
 *  ─────────────────────────────────────────────────────────
 *
 *  Collection: "cases"
 *  Document ID: auto-generated
 *  Fields:
 *  {
 *    uid:          string,   // Firebase User ID (for security)
 *    caseNo:       string,   // e.g. "CC/2024/001"
 *    court:        string,   // e.g. "Delhi High Court"
 *    title:        string,   // e.g. "Ram Prasad vs State"
 *    type:         string,   // Civil / Criminal / Family / etc.
 *    status:       string,   // Active / Pending / Closed / etc.
 *    priority:     string,   // High / Medium / Low
 *    filingDate:   string,   // YYYY-MM-DD format
 *    hearingDate:  string,   // YYYY-MM-DD format
 *    judge:        string,   // Presiding judge name
 *    client:       string,   // Client full name
 *    contact:      string,   // Client phone number
 *    docUrl:       string,   // Firebase Storage / Drive URL
 *    remindEmail:  string,   // Email for reminders
 *    notes:        string,   // Case notes
 *    createdAt:    string,   // ISO timestamp
 *    updatedAt:    string    // ISO timestamp
 *  }
 *
 * ============================================================
 */

// This file is intentionally left as documentation.
// See index.html for the complete implementation.
