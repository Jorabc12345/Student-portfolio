# Primary, Foreign Key, and Constraint Design

## Phase 4 – Stage 3

## Primary Keys

- UUID primary keys for application entities.
- `auth.users.id` UUID referenced by `user_profiles.auth_user_id`.
- Composite keys for pure association tables.
- Unique student-to-portfolio and portfolio-to-Home-Page relationships.

## Foreign Keys

Profiles reference `user_profiles`; subjects reference levels; folders reference subjects; periods reference folders; domains reference subjects and optionally proposed parent folders; prompts reference academic context; portfolio content references portfolios; junctions reference both participants.

## Referential Behavior

- Restrict academic-parent deletion when dependent content exists.
- Represent faculty revocation by status/history, not content deletion.
- Do not delete artifacts when one association is removed.
- Coordinate artifact deletion with Storage cleanup.
- Preserve audit records according to approved retention.

## Proposed Checks

- Controlled account, assignment, content, artifact, and completion statuses.
- Non-negative file sizes, order values, and progress values.
- Progress between 0 and 100.
- Revoked assignments have revocation timestamps.
- Non-empty private Storage bucket/path values.
- No ownership-changing updates through student fields.

## Uniqueness

- Auth user reference.
- Scoped stable academic codes.
- One portfolio per student.
- One Home Page record per portfolio.
- One response per reflection/prompt and Final Musings prompt/portfolio.
- One active faculty/portfolio assignment.
- One Storage object path.

Foreign keys and ownership paths must allow RLS to verify that all child and association rows belong to the same portfolio.
