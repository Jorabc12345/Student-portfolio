# Conceptual Design Decisions

## Phase 4 – Stage 2

## 1. Supabase Auth Identity

Use the Supabase Auth user ID as the application identity reference. Credentials and session secrets remain in Supabase Auth, not application tables.

## 2. Portfolio Ownership

Model one portfolio owner for the initial individual portfolio. All reflections, artifacts, responses, and evidence resolve to that portfolio so ownership checks remain consistent.

## 3. Configurable Academic Hierarchy

Current structure: MED 101 and MED 103 each have four Bimonthly sections; MED 102 has eight independent domains and no parent-folder layer.

## 4. MED 102 Domain Identity

Represent all eight domains separately. A configurable parent-folder reference may organize them, but grouping changes must not merge or delete domain identity.

## 5. Stable IDs and Labels

Stable subject/folder/domain codes are relationship keys. Display names and navigation labels are mutable configuration.

## 6. Junction Entities

Use junction entities for reflection-artifact, artifact-domain, and artifact-PLO relationships. This avoids duplicate uploads and permits relationship-specific metadata.

## 7. Storage Separation

Store artifact bytes in private Supabase Storage. Store object path, bucket, media type, size, title, description, lifecycle, and ownership metadata in PostgreSQL.

## 8. Faculty Assignments

Use an assignment entity with active/revoked lifecycle fields. The many-to-many relationship supports multiple faculty per student and multiple students per faculty. Faculty access remains SELECT-only.

## 9. Global Sections

Home Page, PLO Attainment, and Final Musings remain separate global sections rather than subject folders.

## 10. Progress and Audit

Progress and completion are separate from academic content because rules are not fully approved. Audit logs capture approved events without sensitive payloads.

## 11. Free Plan

Favor compact metadata, targeted indexes, scoped queries, one file per artifact, and minimal Edge Functions. Manual backup/export must cover database, Storage, Auth configuration, policies, and content configuration.

## 12. Deferred Decisions

- Exact physical table names and columns.
- Foreign-key cascade and deletion policy.
- Artifact retention and cleanup.
- Completion calculation.
- Audit event set and retention.
- MED 102 structure is confirmed as eight independent domains; no parent grouping is required.
- Final MED 103 display labels.
- Supabase project region and operational ownership.

## Current MED 102 structure (13 November 2026)

The official instructions PDF, section 2.2 (pp. 5-6), defines eight independent MED 102 domains, with required evidence, competency descriptions, one shared four-question reflection guide, and pertinent artifacts. MED 102 has no four-parent-folder requirement. Earlier proposed-parent and unresolved-grouping text in this document is superseded. See docs/phase-2-academic-content/03_MED102_STRUCTURE_FINALIZATION.md for exact wording and the database representation review.
