# Workflow: Project Initialization

Run this sequence when setting up the project on a new machine.

1. **Install Dependencies:**
   ```bash
   yarn install
   ```

2. **Environment Setup:**
   - Copy `.env.example` to `.env.local` in `apps/next` and `apps/expo`.
   - Ask the Team Lead (Architect) for the `SUPABASE_URL` and `ANTHROPIC_API_KEY`.

3. **Database Introspection:**
   - Pull the latest database schema from Supabase to generate types.
   ```bash
   npx supabase gen types typescript --project-id "your-project-id" > packages/app/utils/supabase/types.ts
   ```

4. **Sanity Check:**
   - Run the development server to ensure no crashes.
   ```bash
   yarn web
   ```
