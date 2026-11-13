# Database Design Constraints

## Platform

- Supabase PostgreSQL only.
- Supabase Auth owns passwords, sessions, and tokens.
- Supabase Storage private buckets store binary artifacts.
- PostgreSQL RLS enforces database authorization.
- No Firebase, MySQL, Laravel, paid authentication, or unapproved third-party backend.

## Academic

- Exactly three Level 1 subjects and twelve subject folders in the initial release.
- Eight MED 102 domains must remain separate and directly accessible, regardless of four-folder grouping.
- Official MED 101 and MED 103 prompts must be stored as protected configuration.
- Global sections must not be modeled as subject folders.
- Future levels must be data-driven.

## Security and Privacy

- No client-controlled role escalation.
- No automatic instructor access.
- No public portfolio or instructor directory exposure.
- Active authorization is required for instructor reads, reviews, feedback, and private files.
- Student ownership fields and authorization grants cannot be changed through ordinary content updates.
- Audit logs must not contain passwords, tokens, signed URLs, patient identifiers, or raw confidential content.

## Content Integrity

- Instructor review/feedback rows are separate from student originals.
- Cross-portfolio junctions and feedback targets must be rejected.
- Artifact files are stored once and reused through relationships.
- Deletion and retention must preserve required audit/review history.

## Free Plan

Design for bounded storage, database size, egress, inactivity pausing, limited functions, quota warnings, and manual backup/export. The design is not a guarantee of indefinite zero-cost operation.
