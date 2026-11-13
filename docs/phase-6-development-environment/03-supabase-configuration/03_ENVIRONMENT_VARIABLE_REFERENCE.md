# Environment Variable Reference

| Variable | Required | Browser exposed | Purpose |
|---|---:|---:|---|
| `VITE_SUPABASE_URL` | Yes | Yes | Supabase project API URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Yes | Supabase public anon/publishable key |

## Forbidden Variables

Never put these in Vite environment variables or frontend source:

- Supabase service-role key.
- Database password.
- JWT signing secret.
- Storage administrative credential.
- Any private backend integration secret.

Vite embeds variables beginning with `VITE_` into browser-delivered code. Treat every such value as public.

## Files

- `.env.example` is safe to commit and contains placeholders only.
- `.env` is ignored by `.gitignore`.
- Environment-specific `.env.*` files are ignored except `.env.example`.

## Configuration Failure

If either required public variable is absent, the centralized client throws an explicit configuration error. It does not silently use a fallback URL or key.
