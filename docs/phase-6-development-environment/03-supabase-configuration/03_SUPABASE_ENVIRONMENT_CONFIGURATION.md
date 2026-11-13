# Supabase Environment Configuration

## Approved Configuration

The application targets the Supabase Free Plan:

- Supabase PostgreSQL for relational data.
- Supabase Auth for credentials and sessions.
- Private Supabase Storage for artifact binaries.
- PostgreSQL RLS and Storage policies for authorization.
- Edge Functions only when a later approved requirement needs them.

## Browser Configuration

The centralized client is located at:

`src/services/supabase/client.ts`

It reads only:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

These are browser-exposed Vite variables. The anon/publishable key is intended for client use and is safe only when RLS and Storage policies are correctly enforced.

## Local Setup

1. Copy `.env.example` to `.env`.
2. Replace the placeholder URL with the Supabase project URL.
3. Replace the placeholder key with the project's public anon/publishable key.
4. Restart the Vite development server.
5. Never commit `.env`.

No local `.env` file was created because no project credentials were supplied.

## Scope Boundary

This configuration does not create tables, execute SQL, configure production Auth, implement registration, authorize portfolios, or upload artifacts.
