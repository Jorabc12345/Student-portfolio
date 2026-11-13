# Conceptual Database Model

## Phase 4 – Stage 2

This conceptual model is for Supabase PostgreSQL. It defines entities, keys, and relationships without creating tables, migrations, SQL, or live Supabase configuration.

## 1. Identity and Access

- `auth_user_ref`: application reference to the Supabase Auth user ID.
- `user_profile`: shared display/account-status information.
- `student_profile`: student-specific profile data.
- `faculty_profile`: faculty-specific profile data.
- `role`: controlled student/faculty role values.
- `portfolio`: one individual portfolio owned by one student.
- `faculty_portfolio_assignment`: revocable many-to-many faculty-to-portfolio access.

Passwords, tokens, and authentication secrets remain owned by Supabase Auth.

## 2. Academic Configuration

- `academic_level`
- `subject`
- `main_folder`
- `academic_period`
- `learning_domain`
- `content_prompt`
- `global_section`
- `program_learning_outcome`

Academic IDs and display labels are separate. Level 1 is seeded with three subjects and four folders per subject, while future levels use the same configurable relationships.

## 3. Portfolio Content

- `reflection`
- `reflection_answer`
- `artifact`
- `artifact_storage_metadata`
- `reflection_artifact`
- `artifact_domain`
- `artifact_plo`
- `plo_evidence`
- `home_page_content`
- `final_musings_response`

An artifact is one logical evidence item and one Storage object. Junction entities allow reuse across domains, reflections, and PLOs without duplicate uploads.

## 4. Monitoring and Completion

- `completion_requirement`
- `section_completion`
- `portfolio_progress`
- `audit_log`
- Optional `faculty_access_history`

Progress and completion are included conceptually but require approved rules before becoming authoritative.

## 5. Ownership Rules

Every student content entity resolves to a portfolio owner. All child records and junctions must remain within that portfolio. RLS will derive access from trusted ownership and active faculty assignments.

## 6. Supabase Boundaries

- Supabase Auth owns credentials and sessions.
- PostgreSQL owns structured entities and metadata.
- Supabase Storage owns artifact bytes.
- RLS protects exposed rows.
- Storage policies protect private objects.

## 7. Free Plan Considerations

Use compact metadata, stable keys, limited indexes, scoped queries, and one Storage object per artifact. Avoid duplicating content or creating unnecessary monitoring rows.
