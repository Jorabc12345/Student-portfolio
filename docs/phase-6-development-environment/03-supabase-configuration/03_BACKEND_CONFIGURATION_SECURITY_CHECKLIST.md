# Backend Configuration Security Checklist

## Completed

- [x] Official `@supabase/supabase-js` client installed.
- [x] Centralized client configuration created.
- [x] Public environment variable names documented.
- [x] `.env.example` created with placeholders only.
- [x] `.env` and environment-specific files excluded by `.gitignore`.
- [x] No service-role key or database password added.
- [x] No Firebase package or configuration added.
- [x] No SQL, table, migration, bucket, or RLS policy executed.
- [x] Supabase access is isolated from React components.

## Required Before Real Data Integration

- [ ] Confirm the project URL and public key with the authorized project administrator.
- [ ] Confirm the key convention: anon key or current publishable key.
- [ ] Create private Storage buckets only through the approved backend setup process.
- [ ] Implement and test PostgreSQL RLS policies.
- [ ] Implement and test Storage policies.
- [ ] Verify active instructor authorization before issuing signed URLs.
- [ ] Document that previously issued short-lived URLs may remain usable until expiry.
- [ ] Add generated database types after schema implementation.
- [ ] Add environment validation to deployment/CI without printing credential values.
- [ ] Review the current npm audit findings before production deployment.

## Prohibited

- Do not use the service-role key in the browser.
- Do not make artifact buckets public.
- Do not bypass RLS with privileged client credentials.
- Do not hardcode credentials.
- Do not commit `.env`.
