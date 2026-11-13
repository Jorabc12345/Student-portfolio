# Database Constraints and Indexes

## Validated Constraints

- One student profile owns one portfolio.
- An instructor/portfolio grant has active or revoked state and revocation timestamp rules.
- Auth identity, stable academic codes, institutional instructor email, object paths, and scoped prompts are unique.
- Junction tables prevent duplicate relationships.
- File sizes are non-negative and progress is bounded from 0 to 100.
- Feedback targets are optional and must remain within the feedback portfolio.
- Academic parent deletion is restricted.
- Shared artifacts are not deleted when one association is removed.
- Access history, reviews, feedback history, and audit records require retention policy before hard deletion.

## Validated Indexes

Indexes cover Auth/profile lookup, portfolio ownership, active grants by instructor and portfolio, academic hierarchy ordering, portfolio content, reviews, feedback, associations, and audit history.

## Integrity Limitations

Foreign keys do not prove that a reflection target, artifact target, feedback target, domain, or PLO belongs to the same portfolio context. RLS, trusted RPCs, triggers, or service operations must enforce these invariants. These are implementation blockers for production, not reasons to redesign the conceptual model.

## Simplification Review

`feedback_revisions`, completion, and progress remain optional. They should be omitted from the first migration if their workflows are not approved. No administrator directory, assignment queue, grading table, password table, or duplicate artifact table is needed.
