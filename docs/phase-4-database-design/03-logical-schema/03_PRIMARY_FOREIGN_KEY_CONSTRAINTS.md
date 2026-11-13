# Primary, Foreign Key, and Constraint Design

## Primary Keys

- UUID primary keys for entity and event records.
- Composite primary keys for pure junctions: `user_roles`, `reflection_artifacts`, `artifact_domains`, `artifact_plos`, `section_completions`.
- One-to-one records use the parent key as PK where appropriate, such as profiles and Home Page content.

## Key Foreign Keys

- `user_profiles.auth_user_id` -> `auth.users.id`.
- Student and instructor profiles -> `user_profiles.id`.
- `portfolios.student_profile_id` -> `student_profiles.user_profile_id`.
- Access grants -> `portfolios.id` and `instructor_profiles.user_profile_id`.
- Academic children -> their configured parent.
- Portfolio content -> `portfolios.id`.
- Storage metadata -> `artifacts.id` and owning portfolio.
- Reviews/feedback -> portfolio and verified instructor.
- Feedback targets -> reflection or artifact in the same portfolio.

## Required Constraints

- Unique Auth identity, student-to-portfolio ownership, institutional instructor email, stable academic codes, object paths, and scoped prompts.
- Account statuses and verification statuses are controlled values.
- Instructor grant status is `active` or `revoked`; revoked grants require `revoked_at`.
- Review/feedback authors must be instructors; role verification and active grant are policy conditions.
- File size is non-negative; progress is between 0 and 100.
- A feedback target is optional, but target ownership must match its portfolio.
- Academic configuration deletion is restricted.

## Referential Actions

- Restrict deletion of academic parents with dependent content.
- Do not cascade portfolio deletion into Storage without a trusted retention process.
- Cascade or explicitly clean junction rows when a relationship is removed.
- Retain access events, reviews, feedback history, and audit records according to approved policy.
- Revocation updates authorization state; it never deletes student content.

Foreign keys provide entity integrity. RLS, triggers, or trusted functions are still required for cross-portfolio and active-grant integrity.
