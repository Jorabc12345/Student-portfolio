# Database Design Blueprint

## Status

Phase 4 database validation and finalization. This is a reviewed design reference, not a migration.

## Technology

The approved platform is Supabase Free Plan: PostgreSQL, Supabase Auth, private Supabase Storage, and PostgreSQL RLS. Auth owns passwords, sessions, and tokens. Storage owns artifact binaries. Application tables store structured metadata and relationships. Firebase, MySQL, Laravel, and paid backend services are excluded.

## Scope and Inventory

The proposed logical model contains 30 tables:

- Identity and access: `roles`, `user_profiles`, `student_profiles`, `faculty_profiles`, `user_roles`, `portfolios`, `faculty_portfolio_assignments`, `faculty_access_history`.
- Academic configuration: `academic_levels`, `subjects`, `main_folders`, `academic_periods`, `learning_domains`, `content_prompts`, `global_sections`, `program_learning_outcomes`.
- Portfolio content: `home_page_content`, `reflections`, `reflection_answers`, `artifacts`, `artifact_storage_metadata`, `reflection_artifacts`, `artifact_domains`, `artifact_plos`, `plo_evidence`, `final_musings_responses`.
- Monitoring: `completion_requirements`, `section_completions`, `portfolio_progress`, `audit_logs`.

## Academic Model

Level 1 contains exactly three subjects and twelve subject folders. MED 101 and MED 103 use four bimonthly folders. MED 102 retains eight separately accessible and separately identifiable domains, even when those domains are grouped under four parent folders. The parent-folder grouping remains provisional and must never merge the eight domain records. Home Page, PLO Attainment, and Final Musings are global Level 1 sections, not subject folders. Future levels are represented as rows rather than new tables.

## Relationships

Each student has one portfolio. Faculty access is many-to-many through individually revocable assignments. Subjects belong to levels, folders to subjects, periods to folders, and domains to subjects with an optional parent folder. Reflections, artifacts, and evidence belong to portfolios. Artifact-domain, artifact-PLO, and reflection-artifact junctions preserve many-to-many reuse without duplicate files. `plo_evidence` represents student attainment evidence without treating it as faculty grading.

## Security Readiness

The schema supports ownership paths and assignment checks, but does not itself enforce authorization. RLS must be enabled on every exposed table. Students must write only owned rows; assigned faculty receive SELECT only; role and ownership fields must be protected. Private Storage policies must mirror portfolio ownership and active faculty assignments. Audit records must be append-only for ordinary users.

## Storage and Free Plan

Artifacts use private Storage and metadata containing bucket, object path, filename, media type, size, and lifecycle status. Files are not PostgreSQL binary data and paths are not public URLs. The design acknowledges limited database/storage capacity, egress, inactivity pausing, bounded functions, and backup limitations. Upload quotas, retention, monitoring, and manual restore procedures remain operational decisions.

## Finalization Boundary

The relational structure is sufficiently stable for Phase 5 planning, but implementation must not hard-code the provisional MED 102 grouping, final MED 103 labels, content workflow, completion calculation, artifact retention, or audit retention until the responsible approvers decide them.
