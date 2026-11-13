# Logical Database Schema

## Phase 4 – Stage 3

This is a logical Supabase PostgreSQL design. The accompanying SQL is a draft reference and must not be executed or applied as a migration.

## Table Groups

**Identity/access:** `roles`, `user_profiles`, `student_profiles`, `faculty_profiles`, `user_roles`, `portfolios`, `faculty_portfolio_assignments`, `faculty_access_history`.

**Academic:** `academic_levels`, `subjects`, `main_folders`, `academic_periods`, `learning_domains`, `content_prompts`, `global_sections`, `program_learning_outcomes`.

**Portfolio:** `home_page_content`, `reflections`, `reflection_answers`, `artifacts`, `artifact_storage_metadata`, `reflection_artifacts`, `artifact_domains`, `artifact_plos`, `plo_evidence`, `final_musings_responses`.

**Monitoring:** `completion_requirements`, `section_completions`, `portfolio_progress`, `audit_logs`.

## Logical Rules

- UUID keys are used for application entities.
- `user_profiles.auth_user_id` references `auth.users.id`.
- Supabase Auth owns credentials and sessions.
- Academic configuration is data-driven and supports future levels.
- Level 1 contains three subjects and four folders per subject.
- MED 102 contains eight separate, directly accessible domains. A configurable parent-folder reference may group them under four folders, but grouping must not merge or hide domain records.
- One portfolio has one student owner.
- Artifacts are stored once in private Storage and linked through junction records.
- RLS will derive access from ownership and active faculty assignments.
- Proposed content statuses are `draft`, `completed`, and `submitted`; final workflow approval remains open.
- Artifact lifecycle and deletion rules remain open.

## Deletion and Storage

Academic configuration deletion should be restricted. Faculty revocation must not delete content. Artifact deletion must coordinate metadata, relationships, and private Storage cleanup. Storage bytes are never stored as PostgreSQL binary data.
