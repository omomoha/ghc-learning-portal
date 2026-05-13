# One-time local cleanup

A handful of files left over from the old repo couldn't be removed from inside the assistant's sandbox (permission-restricted by the OS). Run these locally before your first commit:

```bash
cd ~/ghc-learning-portal
rm -rf .DS_Store .firebase .sfdx .git/tfpb87A
rm -rf .github/agents
git status
```

Then either:

1. **Use the existing git remote** — if this folder still has a `.git/` pointing to your GitHub remote, just commit and push as usual.
2. **Re-init git** — if `.git/` is the stale clone from the audit (likely), run:
   ```bash
   rm -rf .git
   git init
   git remote add origin https://github.com/omomoha/ghc-learning-portal.git
   git checkout -b v2-rewrite
   git add .
   git commit -m "v2: Vite + React + TS + Firebase scaffold"
   ```

After cleanup, the project should be ready to run:

```bash
npm install
cp .env.example .env.local   # fill in your Firebase web config
npm run dev
```

If you don't have Firebase config yet, you can still run the app — auth-related routes will fail at runtime when they hit the SDK, but `/learn/*` works because content loads from local JSON.

## Legacy folder

`legacy/` contains the old `app.js`, `index.html`, `styles.css`, `modules-data.js`, and `DEPLOY-old.md`. Keep them for reference while you verify the new app, then delete them when you're confident.
