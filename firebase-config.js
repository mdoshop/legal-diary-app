/**
 * ============================================================
 *  firebase-config.js
 *  Legal Diary — Firebase Configuration File
 * ============================================================
 *
 *  HOW TO GET YOUR FIREBASE CONFIG:
 *  ─────────────────────────────────────────────────────────
 *  1. Go to: https://console.firebase.google.com
 *  2. Create a new project (or use existing)
 *  3. Click the Web icon (</>)  to add a Web App
 *  4. Copy the firebaseConfig object shown
 *  5. Paste your values below, replacing the placeholders
 *
 *  SERVICES TO ENABLE IN FIREBASE CONSOLE:
 *  ─────────────────────────────────────────────────────────
 *  ✅ Authentication  → Enable "Email/Password" sign-in
 *  ✅ Firestore DB    → Create database in "production" mode
 *  ✅ Storage         → For PDF/image uploads
 *
 *  FIRESTORE SECURITY RULES (paste in Firestore Rules tab):
 *  ─────────────────────────────────────────────────────────
 *  rules_version = '2';
 *  service cloud.firestore {
 *    match /databases/{database}/documents {
 *      match /cases/{caseId} {
 *        // Only authenticated users can read/write their own cases
 *        allow read, write: if request.auth != null
 *                           && request.auth.uid == resource.data.uid;
 *        allow create: if request.auth != null
 *                      && request.resource.data.uid == request.auth.uid;
 *      }
 *    }
 *  }
 *
 *  FIREBASE STORAGE RULES (for document uploads):
 *  ─────────────────────────────────────────────────────────
 *  rules_version = '2';
 *  service firebase.storage {
 *    match /b/{bucket}/o {
 *      match /cases/{userId}/{allPaths=**} {
 *        allow read, write: if request.auth != null
 *                           && request.auth.uid == userId;
 *      }
 *    }
 *  }
 * ============================================================
 */

// ─────────────────────────────────────────────────────────────
//  ⬇️ PASTE YOUR FIREBASE CONFIG VALUES HERE ⬇️
// ─────────────────────────────────────────────────────────────

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDmTFvm_7HWxYVFZM5tCBNzrpbNYfrfTdY", // 🔑 Firebase API Key
  authDomain: "legal-diary-a1c9f.firebaseapp.com",        // 🌐 Auth Domain
  projectId: "legal-diary-a1c9f",                        // 📦 Project ID
  storageBucket: "legal-diary-a1c9f.firebasestorage.app",    // 🗄️ Storage Bucket
  messagingSenderId: "560485882718",                             // 📨 Messaging Sender ID
  appId: "1:560485882718:web:ab92f3600da4abd031cdcf", // 🔑 App ID
  measurementId: "G-XXXXXXXXXX"                              // 📊 Analytics (optional)
};

// ─────────────────────────────────────────────────────────────
//  NOTE: This file is for reference only.
//  The actual config is embedded inside index.html
//  in the <script type="module"> block.
//  Copy your values from here into that block.
// ─────────────────────────────────────────────────────────────

export default FIREBASE_CONFIG;
