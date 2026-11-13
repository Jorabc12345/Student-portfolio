# Database Design Constraints

## Phase 4 – Stage 1

## Platform

- Design for Supabase PostgreSQL on the Free Plan.
- Use Supabase Auth user IDs as identity references.
- Do not duplicate passwords, password hashes, refresh tokens, or secrets.
- Store artifact bytes in private Supabase Storage, not PostgreSQL binary columns.
- Store Storage bucket/path and metadata in PostgreSQL.
- Use PostgreSQL RLS as the authorization boundary.
- Use Edge Functions only when genuinely necessary and Free Plan-compatible.
- Do not introduce Firebase, Laravel, MySQL, paid services, or unapproved APIs.

## Security

- RLS covers every client-exposed table.
- Student writes require ownership.
- Faculty reads require active assignment.
- Faculty INSERT, UPDATE, DELETE, uploads, replacements, and deletions are denied.
- Role, owner, and assignment fields cannot be changed through ordinary updates.
- Cross-portfolio child/association records are rejected.
- Storage buckets remain private with matching policies.
- No public artifact URLs.

## Academic

- Exactly three Level 1 subjects.
- Exactly four main folders per subject and twelve total.
- Eight separate MED 102 domain records.
- Official MED 101 and MED 103 periods/questions are preserved.
- Eleven PLO records and five Final Musings questions are preserved.
- Home Page, PLO Attainment, and Final Musings remain global sections.
- MED 102 grouping remains provisional until approved.
- Official MED 103 titles remain available while shorter labels may be used in navigation.
- Future levels are configurable.

## Free Plan

- Plan around approximately 500 MB recommended database size.
- Plan around 1 GB Storage.
- Monitor 10 GB monthly egress.
- Minimize large queries, repeated listeners, duplicate files, and background operations.
- Apply approved upload limits and optimize images.
- Handle quota exhaustion explicitly.
- Do not assume automatic daily backups.
- Define manual database/file export and restore testing.
- Do not add a payment method or silently upgrade.

## Deferred Physical Decisions

Stage 2 must decide normalization, columns, keys, foreign keys, uniqueness, indexes, constraints, cascade behavior, soft deletion, RLS implementation, Storage synchronization, and backup format.
