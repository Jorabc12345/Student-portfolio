# Database Entity Inventory

## Identity and Access

- `user_profiles`: Supabase Auth-linked application profile and account status.
- `student_profiles`: student-specific identity data.
- `instructor_profiles`: instructor-specific identity and verification status.
- `roles` and `user_roles`: controlled role assignments; instructor role is trusted data.
- `portfolios`: one private portfolio per student.
- `portfolio_access_grants`: individual student-to-instructor authorization with active/revoked lifecycle.
- `portfolio_access_events`: authorization, revocation, and access-lifecycle history.

## Academic Configuration

- `academic_levels`, `subjects`, `main_folders`, `academic_periods`.
- `learning_domains`: eight distinct MED 102 domains remain separate records.
- `content_prompts`: official MED 101/MED 102/MED 103 questions and other configured prompts.
- `global_sections`: Home Page, PLO Attainment, and Final Musings.
- `program_learning_outcomes`: eleven PLO definitions.

## Student Portfolio Content

- `reflections` and `reflection_answers`.
- `artifacts` and `artifact_storage_metadata`.
- `reflection_artifacts`, `artifact_domains`, and `artifact_plos`.
- `plo_evidence`.
- Home Page content, Final Musings responses, and other global-section content.

## Instructor Review Content

- `portfolio_reviews`: periodic review record, author, portfolio, review period, and status.
- `portfolio_feedback`: general or item-linked instructor guidance.
- Optional `feedback_recipients` or read-state data only if notifications/read tracking is approved.

Reviews and feedback are instructor-created records, not replacements for student content. Students may read feedback for their portfolio but cannot alter its authorship.

## Monitoring

- `completion_requirements`, `section_completions`, and `portfolio_progress`, if completion rules remain required.
- `audit_logs`: security-sensitive lifecycle and content events with restricted mutation.

## Exclusions

No password table, token table, public instructor directory, automatic assignment queue, faculty grading table, or duplicate artifact binary table is required.
