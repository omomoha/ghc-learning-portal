import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, type Auth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, type Firestore } from "firebase/firestore";
import { getStorage, connectStorageEmulator, type FirebaseStorage } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator, type Functions } from "firebase/functions";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/**
 * Whether Firebase is configured for this build.
 * If false (no .env.local, or partial config), the auth/db/storage exports are
 * stubs that throw clear errors when touched at runtime — but the rest of the
 * app (landing page, theme, content browsing) still renders fine.
 */
export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;
let _functions: Functions | null = null;

if (isFirebaseConfigured) {
  _app = initializeApp(config);
  _auth = getAuth(_app);
  _db = getFirestore(_app);
  _storage = getStorage(_app);
  _functions = getFunctions(_app);

  if (import.meta.env.VITE_USE_EMULATORS === "true") {
    connectAuthEmulator(_auth, "http://localhost:9099", { disableWarnings: true });
    connectFirestoreEmulator(_db, "localhost", 8080);
    connectStorageEmulator(_storage, "localhost", 9199);
    connectFunctionsEmulator(_functions, "localhost", 5001);
  }
} else {
  // Loud warning in dev so it's obvious why auth-dependent flows don't work.
  // eslint-disable-next-line no-console
  console.warn(
    "[firebase] No Firebase config detected. The public landing page works, but " +
      "sign-in, sign-up, and data sync will fail until you create .env.local " +
      "with the values from your Firebase console. See .env.example.",
  );
}

function notConfigured(thing: string): never {
  throw new Error(
    `${thing} was used but Firebase is not configured. Add the VITE_FIREBASE_* values to .env.local.`,
  );
}

export const app = _app ?? (new Proxy({}, { get: () => notConfigured("Firebase app") }) as FirebaseApp);
export const auth = _auth ?? (new Proxy({}, { get: () => notConfigured("Firebase Auth") }) as Auth);
export const db = _db ?? (new Proxy({}, { get: () => notConfigured("Firestore") }) as Firestore);
export const storage =
  _storage ?? (new Proxy({}, { get: () => notConfigured("Firebase Storage") }) as FirebaseStorage);
export const functions =
  _functions ?? (new Proxy({}, { get: () => notConfigured("Firebase Functions") }) as Functions);
