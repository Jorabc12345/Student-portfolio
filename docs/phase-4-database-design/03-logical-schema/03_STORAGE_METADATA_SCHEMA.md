# Storage Metadata Schema

## Private Storage Boundary

Artifact binaries belong in a private Supabase Storage bucket. PostgreSQL stores the artifact record and its Storage metadata only. Object paths are not public URLs.

## Proposed Metadata

`artifact_storage_metadata`:

- `artifact_id` UUID PK/FK to `artifacts`.
- `owner_portfolio_id` UUID FK to `portfolios`.
- `bucket_name` text NOT NULL.
- `object_path` text NOT NULL UNIQUE.
- `original_filename` text NOT NULL.
- `media_type` text NOT NULL.
- `file_size_bytes` bigint NOT NULL, non-negative.
- `uploaded_at` timestamptz NOT NULL.
- `replaced_at` and `deleted_at` nullable timestamps.
- `storage_status` controlled lifecycle value.

## Policies

- Students may upload, replace, and delete only their own artifact objects.
- Authorized instructors may download/read only while the grant is active.
- Instructors cannot upload, replace, or delete.
- Unauthenticated users receive no object access.
- Storage paths should include an opaque artifact identifier and portfolio identifier, for example `portfolio/{portfolio_id}/artifacts/{artifact_id}/{opaque_name}`.
- Short-lived signed URLs or authenticated downloads must be generated only after RLS-compatible authorization.

Revocation behavior for previously issued signed URLs must be explicitly tested and approved.
