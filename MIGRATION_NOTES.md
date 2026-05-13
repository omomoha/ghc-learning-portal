# Migration notes — old repo → new repo

## Files to delete from the old repo

These were in the original repo and shouldn't be there:

- `.DS_Store` (macOS junk)
- `.sfdx/` (Salesforce DX — unrelated to this project)
- `.firebase/` (Firebase deploy cache; should be gitignored, not committed)
- `.github/agents/aem-frontend-specialist.agent.md` (Adobe Experience Manager agent — unrelated)

Run from the root of the old repo:

```bash
git rm -r .sfdx .firebase .github/agents
find . -name .DS_Store -print -delete
git add .gitignore
git commit -m "chore: repo hygiene"
```

## When you pull this folder

There may be a stray `.git/` directory inside this output folder — it's a leftover from how the original repo was cloned during the audit. Before using this scaffold, delete it:

```bash
rm -rf ghc-learning-portal/.git
```

Then either initialize a fresh repo (`git init`) or copy these files over the existing repo.

## What's preserved

- All 17 module images (`public/images/*.png`) — copied in.
- The Firebase Hosting project (`ghc-advance-learning-modules`) is unchanged. The new `firebase.json` just points to `dist/` instead of `public/`.
- The hash routes (`#module-N`) are mapped to clean URLs (`/learn/module/:id`). A small redirect script preserves old links.

## Data corruption discovered in `modules-data.js`

The original `public/modules-data.js` contains multiple JavaScript syntax errors that prevent it from being parsed by Node or by a browser running with strict mode. These are real bugs in the live source. Specifically:

1. **Module 1, question 2** — A line containing `questions: [` was accidentally pasted into the `options` array, polluting one option.
2. **Module 1, question 4** — A 46-line block of four CCR-related advanced questions (which belong to Module 6, not Module 1) was wedged into Module 1's assessment, breaking the structure of question 4.
3. **Module 2, sections** — Several orphan question blocks (Coding Agent / AGENTS.md related, which belong to Module 3) were pasted into the middle of Module 2's section content, breaking template-literal boundaries.

**What this means in practice.** Modules 3 through 16 extract cleanly into JSON, with 73 of the original ~81 assessment questions preserved. Modules 1 and 2 are emitted as **placeholders** at `src/content/modules/1.json` and `src/content/modules/2.json`, with their correct titles and a `_needsRestoration: true` flag. The home page and module page render a "Content pending restoration" notice on those modules.

**To restore.** Open `src/content/modules/1.json` and `src/content/modules/2.json` and replace the placeholder content with the real objectives, sections, and assessment questions from your original course source (or from `modules-data.js` history if you have a clean revision in git).

## What's changing

- All content from `public/modules-data.js` will be split into 16 JSON files under `src/content/modules/` in Phase 2. The shape stays compatible.
- The 549-line `public/app.js` is replaced by typed React components.
- `localStorage` progress moves to Firestore in Phase 6 (with localStorage as offline cache).
- All `onclick=` inline handlers are replaced with proper React event handlers and semantic buttons.
