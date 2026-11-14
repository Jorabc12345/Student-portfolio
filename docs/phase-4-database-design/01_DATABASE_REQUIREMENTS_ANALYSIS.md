# Database Requirements Analysis

## Phase 4 – Stage 1

This document identifies database requirements for the Supabase PostgreSQL implementation. It does not create tables, migrations, SQL, RLS policies, or a live Supabase project.

## 1. Approved Platform

- Supabase Free Plan.
- Supabase PostgreSQL for structured data.
- Supabase Authentication for identities and sessions.
- Supabase Storage for private files.
- PostgreSQL RLS for database authorization.
- Edge Functions only when genuinely necessary.

Firebase, Firestore, Firebase Storage, Laravel, and MySQL are excluded.

## 2. Database Scope

The database must support:

- Auth-linked student and faculty profiles.
- Student-owned private portfolios.
- Trusted faculty-to-student access assignments.
- Configurable academic levels, subjects, folders, periods, domains, prompts, and global sections.
- Student reflections and answers.
- Artifact metadata and private Storage paths.
- Many-to-many artifact/domain and artifact/PLO associations.
- Home Page, PLO Attainment, and Final Musings content.
- Account status, approved activity logs, progress/completion state, and access history where approved.

## 3. Level 1 Academic Requirements

The initial release contains exactly:

1. MED 101 – Integrated Basic Sciences.
2. MED 102 – Family, Community, & Preventive Medicine I.
3. MED 103 – Medical Humanities I.

MED 101 and MED 103 each have four Bimonthly sections. MED 102 has eight separate, directly accessible domains with no parent-folder layer.

Home Page, PLO Attainment, and Final Musings are global Level 1 sections, not subject folders.

## 4. Ownership and Access

Each portfolio has one student owner. A student can manage only their own content. Faculty can be assigned to multiple students, and a student can have multiple authorized faculty members. Faculty access is SELECT/read-only and must be enforced by RLS and Storage policies.

Supabase Auth user IDs are the identity references. Authentication passwords and tokens are never duplicated in application tables.

## 5. Content Requirements

### Reflections

Store the portfolio owner, academic context, source prompt/context reference, student response, status where approved, and timestamps. A response must remain tied to the correct subject/folder/domain or global section.

### Artifacts

Store metadata, owner, academic context, Storage bucket/path, original/display filename as approved, media type, size, and lifecycle status. Store binary files only in private Supabase Storage, never as PostgreSQL binary data.

### Cross-references

One artifact can be linked to multiple domains, reflections, and PLOs without duplicate file uploads. Association records may contain relevance descriptions/reflections.

### Global sections

Store Home Page fields, PLO evidence/reflections, and Final Musings responses separately from subject content.

## 6. Free Plan Requirements

- Keep structured data within the approximately 500 MB recommended database size.
- Keep Storage within the 1 GB Free Plan quota.
- Minimize repeated reads and large result sets.
- Avoid unnecessary realtime subscriptions and Edge Functions.
- Store compact metadata and do not duplicate artifact binaries.
- Support quota warnings and explicit failed-upload handling.
- Plan manual database and file backups because automatic daily backup coverage is not assumed.

## 7. Database Quality Requirements

- Use stable academic identifiers independent of display names.
- Preserve referential integrity between parent and child academic records.
- Prevent cross-portfolio associations.
- Keep protected role, ownership, and faculty assignments out of ordinary student updates.
- Include created/updated timestamps where useful.
- Define deletion and retention behavior before migrations.
- Design indexes for approved access patterns without speculative over-indexing.

## 8. Stage 1 Boundary

Phase 4 Stage 1 identifies requirements only. Schema design, normalization decisions, migrations, SQL, constraints, indexes, and RLS implementation are deferred to Stage 2.
