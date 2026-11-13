# Supabase Free Plan Constraints

## Phase 3 – Stage 1

**Checked:** 2026-11-12 (Asia/Manila).  
Published limits can change. Recheck official documentation before creating a production project or making a cost decision.

## 1. Current Documented Limits

| Area | Free Plan information | Design consequence |
|---|---|---|
| Database | Nano compute; approximately 500 MB recommended database size | Keep academic configuration and portfolio data compact; monitor size and archive/export where approved |
| Storage | 1 GB included | Optimize images/files, set upload limits, monitor growth, and provide quota warnings |
| Bandwidth/egress | 10 GB monthly egress, reported as 5 GB cached and 5 GB uncached | Avoid repeated large downloads, optimize assets, and scope faculty views |
| Projects | Two free projects per organization; paused projects do not count toward the limit | Reserve projects deliberately for development/production needs |
| Authentication | No simple hard maximum user count is listed in the cited Free Plan summary; usage/resource limits and provider-specific rules still apply | Confirm selected providers and monitor Auth usage; do not assume unlimited service |
| Project pausing | Free projects may be paused for inactivity | Plan monitoring and recovery procedures; do not treat a paused project as production availability |
| Backups | Automatic daily backups are not included on the Free Plan | Define and test manual database exports; separately protect Storage, Auth, policies, and configuration |
| Edge Functions | 500,000 invocations/month; 100 Functions/project; 256 MB memory; 150-second duration; 2-second CPU time; size limits vary by deployment method | Use Functions sparingly and keep operations short and bounded |
| Function overage | Free Plan overage is not treated as an unlimited paid overage path | Monitor invocations and fail clearly before quota exhaustion |

Supabase Storage limits and file upload behavior also depend on the selected upload method and platform restrictions. The application must impose its own conservative file type and size policy after those limits are approved.

## 2. Billing and Plan Rules

- This project targets the Supabase Free Plan.
- Do not add a payment method or activate a paid subscription.
- Free Plan quotas are not a promise of permanent availability or unchanged limits.
- Exceeding a quota may prevent additional operations rather than automatically providing paid capacity.
- If requirements exceed the Free Plan, stop and request an explicit architecture/budget decision.

## 3. Required Application Controls

### Database

- Select only required columns.
- Paginate long lists.
- Avoid unnecessary realtime subscriptions and repeated reads.
- Query by portfolio/academic scope.
- Add indexes only for approved access patterns.
- Monitor database size and query performance.

### Storage

- Allow only approved formats.
- Apply conservative file-size limits.
- Optimize profile images and suitable evidence before upload.
- Avoid duplicate binaries for multiple domain/PLO associations.
- Display remaining/quota-warning states to administrators.
- Define deletion and replacement behavior so abandoned files do not accumulate.

### Bandwidth

- Avoid loading full portfolios and binary previews unnecessarily.
- Use thumbnails/previews where appropriate.
- Require explicit download actions for large files.
- Avoid automatic repeated downloads and unbounded listeners.

### Edge Functions

- Prefer database/RLS/Storage capabilities first.
- Limit invocation frequency and payload size.
- Avoid background jobs that are not essential.
- Monitor invocation count and duration.
- Keep Functions compatible with the documented Free Plan limits.

## 4. Manual Backup Strategy

Before production, define and test a manual procedure covering:

1. PostgreSQL data export.
2. Storage object export and metadata mapping.
3. Authentication user/configuration records, within Supabase-supported export capabilities.
4. RLS and Storage policy source.
5. Indexes, academic configuration, environment configuration, and Edge Function source.
6. Protected backup storage with access control.
7. Restore testing into a non-production environment.

A database export alone is not a complete portfolio backup.

## 5. Official Sources

- [Supabase pricing](https://supabase.com/pricing)
- [Supabase manage usage](https://supabase.com/docs/guides/platform/manage-your-usage)
- [Supabase compute and disk](https://supabase.com/docs/guides/platform/compute-and-disk)
- [Supabase Storage pricing and limits](https://supabase.com/docs/guides/storage/pricing)
- [Supabase Storage size usage](https://supabase.com/docs/guides/platform/manage-your-usage/storage-size)
- [Supabase Storage bandwidth and egress](https://supabase.com/docs/guides/storage/serving/bandwidth)
- [Supabase Edge Function limits](https://supabase.com/docs/guides/functions/limits)
- [Supabase Edge Function pricing](https://supabase.com/docs/guides/functions/pricing)
- [Supabase billing FAQ](https://supabase.com/docs/guides/platform/billing-faq)
- [Supabase database backups](https://supabase.com/docs/guides/platform/backups)

## 6. Limitations of This Record

The listed values are a point-in-time planning baseline, not a contractual guarantee. Confirm exact quotas, upload limits, backup capabilities, authentication provider behavior, and regional availability immediately before implementation and deployment.
