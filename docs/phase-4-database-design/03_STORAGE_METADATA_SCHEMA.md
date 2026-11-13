# Storage Metadata Schema

## Phase 4 – Stage 3

Artifact bytes are stored in private Supabase Storage. PostgreSQL stores metadata and relationships only.

## `artifacts`

- `id` UUID PK.
- `portfolio_id` owner FK.
- `title`.
- `description`.
- `status`.
- `created_at`, `updated_at`.

## `artifact_storage_metadata`

- `artifact_id` UUID PK/FK.
- `owner_portfolio_id` UUID FK.
- `bucket_name` text.
- `object_path` text UNIQUE.
- `original_filename` text.
- `media_type` text.
- `file_size_bytes` bigint.
- `uploaded_at` timestamptz.
- `replaced_at` nullable timestamptz.
- `deleted_at` nullable timestamptz.
- `storage_status` controlled text.

## Path and Access

Proposed path:

```text
portfolio/{portfolio-id}/artifacts/{artifact-id}/{opaque-file-name}
```

Paths are not public URLs. Storage policies verify the owner or active faculty assignment before reads. Faculty never receives upload, replace, or delete access.

## Constraints

- Non-negative file size.
- Non-empty unique object path.
- Approved private bucket only.
- Metadata owner matches artifact portfolio owner.
- Deletion coordinates metadata, associations, and Storage cleanup.

Exact formats, limits, retention, quarantine, and cleanup remain unresolved.
