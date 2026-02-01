# Workflow: Starting a New Feature

Follow this git-flow strictly to prevent conflicts with the team.

1. **Sync with Main:**
   - Ensure you are building on the latest code.
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Branching:**
   - Name your branch according to the feature type:
     - Feature: `feature/name-of-feature`
     - Bugfix: `fix/bug-description`
     - UI: `ui/screen-name`
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Development Loop:**
   - Implement your changes.
   - Run `yarn lint` to check for syntax errors.

4. **Commit:**
   ```bash
   git add .
   git commit -m "feat: description of what you built"
   ```
