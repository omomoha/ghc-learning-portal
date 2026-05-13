# Deploy to Firebase

## Quick Deploy (3 steps)

1. Open a terminal and navigate to this folder:
   ```
   cd ghc-learning-portal
   ```

2. Login to Firebase:
   ```
   npx firebase-tools login
   ```

3. Deploy:
   ```
   npx firebase-tools deploy --project ghc-advance-learning-modules --only hosting
   ```

Your site will be live at:
**https://ghc-advance-learning-modules.web.app**

## Preview Locally
```
npx firebase-tools serve --project ghc-advance-learning-modules --only hosting
```
Then open http://localhost:5000
