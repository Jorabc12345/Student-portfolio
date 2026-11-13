# Development Environment Setup Plan

## Recommendation

Use the existing React/Vite prototype as the baseline. Do not scaffold a second application and do not replace the current `src/` files.

## Stage 2 Preparation Sequence

1. Confirm or restore the final SRS and `MASTER_PROJECT_ROADMAP.md`.
2. Initialize Git in the project root and create an initial baseline commit containing the existing prototype and documentation.
3. Add an appropriate `.gitignore` for `node_modules`, `dist`, local environment files, and tool caches.
4. Standardize React and React type package majors, preserving the current working build.
5. Add Tailwind CSS using a configuration compatible with the existing CSS and approved design tokens.
6. Add Framer Motion and Lucide React.
7. Add the Supabase JavaScript client.
8. Create a non-secret `.env.example` defining the Supabase URL and publishable/anon key names approved by the architecture.
9. Create a small Supabase client module without exposing service-role credentials in the browser.
10. Add separate configuration boundaries for Auth, database queries, Storage signed URLs, and authorization-aware UI state.
11. Add linting, formatting, and focused tests before implementing persistent features.
12. Run the existing production build and targeted checks after each coherent setup change.

## Security Constraints

- Never put a Supabase service-role key in frontend code or public environment variables.
- Frontend route visibility is not authorization; enforce access in PostgreSQL RLS and Storage policies.
- Keep artifact buckets private.
- Generate short-lived signed URLs only after an active authorization check.
- Do not execute the Phase 4 SQL drafts until the approved database implementation stage.
- Do not add Firebase packages or configuration.

## Preservation Plan

Keep the current prototype available as the visual baseline. Integrate real data behind stable UI boundaries rather than rewriting the page structure before the environment is verified.

## Stage 1 Scope

No package installation, source implementation, migration, or Supabase configuration was performed in this stage.
