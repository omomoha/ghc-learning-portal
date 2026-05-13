#!/usr/bin/env node
/**
 * One-time bootstrap: grant the `admin` custom claim to a user account.
 *
 * Usage:
 *   1. `gcloud auth application-default login` (one time on your machine)
 *   2. `node scripts/grant-admin.cjs abraham.omomoh@andela.com`
 *
 * After this, sign out and back in on the web app to refresh your client-side
 * token, then visit /admin. From there, promote others via the Users table —
 * you should no longer need this script.
 */

const path = require("node:path");

// Resolve firebase-admin from functions/node_modules so we don't need a separate install.
const adminPath = require.resolve("firebase-admin", {
  paths: [path.join(__dirname, "..", "functions")],
});
const admin = require(adminPath);

const PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID ||
  process.env.GCLOUD_PROJECT ||
  "ghc-advance-learning-modules";

admin.initializeApp({ projectId: PROJECT_ID });

const target = process.argv[2];
if (!target) {
  console.error("Usage: node scripts/grant-admin.cjs <email>");
  process.exit(1);
}

(async () => {
  try {
    const user = await admin.auth().getUserByEmail(target);
    const existing = user.customClaims || {};
    if (existing.admin === true) {
      console.log(`${target} already has admin (uid ${user.uid}). No change.`);
      return;
    }
    await admin.auth().setCustomUserClaims(user.uid, { ...existing, admin: true });
    await admin
      .firestore()
      .doc(`users/${user.uid}`)
      .set({ role: "admin" }, { merge: true });
    console.log(`Granted admin to ${target} (uid ${user.uid}).`);
    console.log("Sign out and back in on the web app to refresh the client token.");
  } catch (err) {
    console.error("Failed:", err.message || err);
    if (err.code === "auth/user-not-found") {
      console.error(
        `\nNo Firebase Auth user exists with email "${target}". Have them sign up first, then re-run.`,
      );
    } else if (String(err.message).includes("Could not load the default credentials")) {
      console.error("\nRun `gcloud auth application-default login` first.");
    }
    process.exit(1);
  }
})();
