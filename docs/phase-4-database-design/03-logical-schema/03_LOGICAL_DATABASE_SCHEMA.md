# Logical Database Schema

## Status

Phase 4 Stage 3 review draft for Supabase PostgreSQL. No statement in this document has been executed.

## Design Principles

- Supabase Auth owns passwords, sessions, and authentication tokens.
- `user_profiles.auth_user_id` references `auth.users(id)`.
- Students own and manage original portfolio content.
- Instructor access is granted per portfolio by the student and can be revoked.
- Verified instructor accounts can create reviews and feedback only for actively authorized portfolios.
- Instructor review and feedback records are separate from student content.
- Private artifact binaries are stored in Supabase Storage; PostgreSQL stores metadata.
- RLS and Storage policies are mandatory; frontend controls are not authorization.

## Table Groups

### Identity and access

`roles`, `user_profiles`, `student_profiles`, `instructor_invitation_codes`, `instructor_profiles`, `user_roles`, `portfolios`, `portfolio_access_grants`, and `portfolio_access_events`.

### Academic configuration

`academic_levels`, `subjects`, `main_folders`, `academic_periods`, `learning_domains`, `content_prompts`, `global_sections`, and `program_learning_outcomes`.

### Student content

`home_page_content`, `reflections`, `reflection_answers`, `artifact_policy_settings`, `artifacts`, `artifact_storage_metadata`, `reflection_artifacts`, `artifact_domains`, `artifact_plos`, `plo_evidence`, and `final_musings_responses`.

### Instructor collaboration

`portfolio_reviews`, `portfolio_feedback`, and optional `feedback_revisions`.

### Monitoring

`completion_requirements`, `section_completions`, `portfolio_progress`, and `audit_logs`.

## Academic Rules

Level 1 is seeded with MED 101, MED 102, and MED 103 after source content is verified. MED 102 contains eight independent learning_domains records linked to the subject, with no parent-folder layer. Future levels add data rows.

Artifact formats, maximum size, retention duration, and permanent-deletion enablement are represented by `artifact_policy_settings`. Exact policy values remain pending institutional approval.

## Proposed Lifecycle Fields

Content and feedback statuses are proposed, not client-approved workflow decisions. Suggested values are `draft`, `published`, `archived`, or `deleted` where appropriate. Access grants use `active` and `revoked`. Revoked grants remain historical but never satisfy authorization.

## Ownership and Delete Behavior

Student content is owned by `portfolios`. Access grants, reviews, feedback, and audit records should normally be retained or soft-deleted. Hard deletion of a portfolio requires an approved retention process and coordinated Storage cleanup. Junction rows may be deleted when an association is removed, but the shared artifact remains unless its owner deletes it.

## Proposed RLS Policy Shape

- **Students:** `SELECT`, `INSERT`, `UPDATE`, and `DELETE` only for rows reachable from their own portfolio. Students may create, update, and revoke their own access grants.
- **Instructors:** `SELECT` portfolio and student content only when `portfolio_access_grants.status = 'active'` and their instructor profile is verified. They may `INSERT` reviews and feedback for an actively authorized portfolio.
- **Feedback:** Students may `SELECT` feedback for their portfolio. Instructor updates/deletes are limited to their own records only if the approved feedback lifecycle allows it.
- **Original content:** Instructor `INSERT`, `UPDATE`, and `DELETE` are denied for reflections, answers, artifacts, PLO evidence, global content, and association rows.
- **Roles and verification:** Role, verification, ownership, and grant administration are not writable by ordinary users.
- **Instructor registration:** A trusted operation hashes the submitted code, verifies it matches the current active and unexpired shared invitation code, creates the individual instructor profile, and grants the Instructor role in one transaction. Replacing or disabling the code affects future registrations only. Raw invitation codes are not stored.
- **Revocation:** Every instructor policy rechecks current grant status; historical access events do not authorize reads.
- **Storage:** Private bucket policies repeat the same owner/active-grant checks for object paths and deny unauthenticated access.
- **Audit:** Ordinary students and instructors cannot update or delete audit rows.

Potential `SECURITY DEFINER` helpers should be narrowly scoped, search-path safe, and non-recursive, such as `current_user_profile_id()`, `owns_portfolio(portfolio_id)`, `has_active_portfolio_grant(portfolio_id)`, and `is_verified_instructor()`. Helper functions must not bypass RLS broadly or accept untrusted role/ownership claims.

## Backup and Restore Requirement

Backups must include PostgreSQL data, Storage objects, Auth/configuration exports where supported, RLS/Storage policy definitions, and seed/configuration data. The owner, secure destination, schedule, restoration authority, and restore-test cadence remain pending institutional approval.

## Current MED 102 structure (13 November 2026)

The official instructions PDF, section 2.2 (pp. 5-6), defines eight independent MED 102 domains, with required evidence, competency descriptions, one shared four-question reflection guide, and pertinent artifacts. MED 102 has no four-parent-folder requirement. Earlier proposed-parent and unresolved-grouping text in this document is superseded. See docs/phase-2-academic-content/03_MED102_STRUCTURE_FINALIZATION.md for exact wording and the database representation review.
