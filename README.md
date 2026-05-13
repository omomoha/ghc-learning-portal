# GHC Learning Portal

GitHub Copilot Advanced: The Agentic Workflow — a self-paced learning portal with auth, cloud-synced progress, a learner dashboard, and a full admin dashboard.

Two workshops, sixteen modules, **85 assessment questions**. Public marketing landing, gated learning experience with sidebar navigation, learner dashboard with per-module scores, and admin tools for cohort stats, user management, and resource uploads.

Live: <https://ghc-advance-learning-modules.web.app>

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Firebase**: Authentication, Firestore, Storage, Hosting, Functions (Blaze plan required for Functions)
- **React Router** for client-side routing
- **Recharts** for dashboard charts
- **Vitest** + **Testing Library** for tests
- **ESLint** + **Prettier**

## Local development

```bash
npm install
cp .env.example .env.local   # paste in your Firebase web app config
npm run dev
```

Open <http://localhost:5173>. The app boots even without a `.env.local` — the public landing, login, signup, and forgot-password screens render, but anything that calls Firebase Auth or Firestore will fail at submit-time.

To work against the Firebase Emulator Suite instead of the live project, set `VITE_USE_EMULATORS=true` in `.env.local` and run:

```bash
npm run emulators        # in one terminal
npm run dev              # in another
```

## Build

```bash
npm run build            # outputs to dist/
npm run preview          # serve the production build locally
```

## Deploy

The first deploy bootstraps Authentication, Firestore, Storage, and Functions for your Firebase project. Subsequent deploys typically only need hosting.

**Hosting only** (most common — UI changes):

```bash
npm run build
npx firebase-tools deploy --only hosting
```

**Everything** (hosting + Firestore/Storage rules + Functions):

```bash
cd functions && npm install && npm run build && cd ..
npm run build
npx firebase-tools deploy
```

**Just Functions** (after editing `functions/src/index.ts`):

```bash
cd functions && npm install && npm run build && cd ..
npx firebase-tools deploy --only functions
```

## Bootstrap the first admin

Admin is a Firebase custom claim, granted server-side only — there's no UI button users can press to grant themselves admin. The first admin is bootstrapped from the command line; after that, in-app promotion takes over.

```bash
# One-time on your machine:
gcloud auth application-default login

# Make sure the target account exists in Firebase Auth first (have them sign up via the live site).
# Then grant admin:
node scripts/grant-admin.cjs abraham.omomoh@andela.com
```

The script grants the `admin` custom claim and sets `role: "admin"` on the user's Firestore profile. Sign out and back in on the web app once to refresh your client-side token, then visit `/admin`.

After the first admin exists, promote other users in-app via **Admin → Users → "Make admin"** (which calls the `setAdminRole` Function, restricted to existing admins). The bootstrap script shouldn't be needed again outside of fresh-project setup or emergencies.

## Repository layout

```
src/
  routes/              page-level components, one per route
    learn/             gated learner experience (home, module, prerequisites, dashboard)
    admin/             admin-only views (overview, users, user detail, resources)
  components/          shared UI (TopNav, Sidebar, AdminShell, ThemeToggle, …)
  auth/                AuthProvider + RequireAuth/RequireAdmin guards
  data/                Firestore hooks and admin fetchers
  content/             manifest.json + 16 module JSON files
  styles/              design tokens + globals + per-area CSS
  lib/                 firebase init, theme persistence
functions/             Firebase Functions (bootstrapAdmin, seedAdminOnCreate, setAdminRole)
public/                static assets (favicon, module images)
firestore.rules        Firestore security rules
storage.rules          Storage security rules
firebase.json          Hosting + emulator config
```

## Status

| Phase | Status |
|---|---|
| 0 — Repo hygiene | ✅ |
| 1 — Vite + React + TS scaffold | ✅ |
| 2 — Port existing course to React (16 modules, 85 questions) | ✅ |
| 3 — A11y + dark mode | ✅ |
| 4 — Firebase Auth + landing/login/signup | ✅ |
| 5 — Learner dashboard | ✅ |
| 6 — Cloud-synced progress (Firestore) | ✅ |
| 7 — Admin dashboard (overview, users, user detail, resources) | ✅ |
| 8 — Polish, perf, ship | ✅ |

See `UPGRADE_PLAN.md` for the original phased plan, `MIGRATION_NOTES.md` for what changed from the v1 vanilla-HTML site, and `CLEANUP.md` for the one-time local cleanup commands.
