import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";

initializeApp();

/**
 * Existing admins can promote/demote other users. Called from the admin UI.
 *  data: { targetUid: string, admin: boolean }
 *
 * Writes BOTH the Firestore role field (live source of truth for the UI) and
 * the Auth custom claim (used by Firestore rules for fast server-side checks).
 *
 * The very first admin is bootstrapped out-of-band — either by editing the
 * /users/{uid}.role field directly in the Firebase Console (which is enough
 * because the security rules accept that as a source of truth), or by running
 * scripts/grant-admin.cjs which sets both the role field AND the custom claim.
 */
async function callerIsAdmin(uid: string, claimAdmin: boolean): Promise<boolean> {
  if (claimAdmin) return true;
  // Fall back to Firestore role (handles bootstrapped admins that don't yet have the claim).
  const snap = await getFirestore().doc(`users/${uid}`).get();
  return snap.exists && (snap.data() as { role?: string } | undefined)?.role === "admin";
}

export const setAdminRole = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Sign in first.");
  }
  const ok = await callerIsAdmin(request.auth.uid, request.auth.token.admin === true);
  if (!ok) throw new HttpsError("permission-denied", "Caller is not an admin.");

  const targetUid = String(request.data?.targetUid ?? "");
  const makeAdmin = Boolean(request.data?.admin);
  if (!targetUid) throw new HttpsError("invalid-argument", "targetUid is required.");

  const user = await getAuth().getUser(targetUid);
  const claims = { ...(user.customClaims ?? {}), admin: makeAdmin };
  await getAuth().setCustomUserClaims(targetUid, claims);
  await getFirestore()
    .doc(`users/${targetUid}`)
    .set({ role: makeAdmin ? "admin" : "learner" }, { merge: true });
  logger.info("Role updated", { targetUid, admin: makeAdmin, by: request.auth.uid });
  return { ok: true };
});
