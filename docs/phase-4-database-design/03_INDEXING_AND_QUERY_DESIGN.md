# Indexing and Query Design

## Phase 4 – Stage 3

Indexes are proposals to validate with query plans before implementation.

## Authorization and Ownership

- Unique `user_profiles(auth_user_id)`.
- `portfolios(student_profile_id)`.
- `faculty_portfolio_assignments(faculty_profile_id, status)`.
- `faculty_portfolio_assignments(portfolio_id, status)`.
- Child-content `portfolio_id` indexes.

## Academic Navigation

- `subjects(academic_level_id, display_order)`.
- `main_folders(subject_id, display_order)`.
- `academic_periods(folder_id, sequence)`.
- `learning_domains(subject_id, display_order)`.
- Prompt context and type indexes.
- `global_sections(academic_level_id, display_order)`.
- Unique stable-code indexes.

## Portfolio Queries

- `reflections(portfolio_id, status, updated_at)`.
- `reflections(folder_id, updated_at)`.
- `reflection_answers(reflection_id)`.
- `artifacts(portfolio_id, status, uploaded_at)`.
- Unique Storage object path.
- Both foreign-key directions on association tables.
- `plo_evidence(portfolio_id, plo_id)`.
- `final_musings_responses(portfolio_id, section_id)`.

## Monitoring

- `section_completions(portfolio_id, status)`.
- `portfolio_progress(portfolio_id, academic_level_id)`.
- `audit_logs(portfolio_id, occurred_at)`.
- `audit_logs(actor_user_id, occurred_at)`.

Use scoped, paginated queries; avoid loading binaries in lists and avoid unbounded realtime listeners. Remove unused indexes to respect Free Plan storage.
