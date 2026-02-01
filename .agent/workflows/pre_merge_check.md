# Workflow: Pre-Merge Verification

STOP. Before you open a Pull Request, run these checks.

1. **Type Checking:**
   - Ensure no TypeScript errors exist across the monorepo.
   ```bash
   yarn type-check
   ```

2. **Atomic Logic Check:**
   - Did you modify files outside of your scope?
   - Run `git status`. If you see files you didn't mean to touch, revert them:
   ```bash
   git checkout packages/app/file-i-did-not-mean-to-touch.ts
   ```

3. **Integration Test:**
   - Does the web dashboard load? `yarn web`
   - Does the API respond? Check `/api/health` or similar.

4. **Push:**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Go to GitHub and open the PR.**
