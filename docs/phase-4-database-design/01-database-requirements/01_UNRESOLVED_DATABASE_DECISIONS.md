# Unresolved Database Decisions

## Client or Institutional Approval

1. Who verifies instructor identity and what evidence is retained?
2. Is instructor self-registration enabled, invitation-only, or institution-provisioned?
3. Can students authorize any verified instructor, or only an approved institutional list?
4. Can authorization expire automatically, and can instructors request access?
5. Are reviews and feedback visible immediately, or may an instructor save drafts?
6. May instructors edit or delete their own feedback after publication?
7. Can students acknowledge, reply to, or report feedback, or is feedback one-way?
8. What review periods and minimum review contents are required?
9. What notifications are required for grants, revocations, reviews, and feedback?
10. What artifact retention, deletion, and backup policy applies?

## Technical Decisions

- Exact RLS helper functions and policy structure.
- Whether revocation invalidates existing signed URLs immediately or only prevents new URLs.
- Whether review/feedback records require soft deletion.
- Audit event taxonomy and retention implementation.
- Progress calculation and completion rules.

## Conflicts Requiring Formal Reconciliation

Earlier Phase 1 and Phase 3 documents explicitly prohibit faculty comments and feedback and describe faculty as read-only viewers. The revised prompt permits authorized instructor reviews and feedback. The revised model also replaces trusted assignment as the access grantor with student authorization. These changes must be approved and then propagated through the Phase 3 role matrix, architecture blueprint, RLS design, Storage security design, traceability matrix, and database schema.

## Stage 2 Gate

Conceptual design can model both review/feedback and authorization grants, but final constraints, policies, and workflow fields should not be frozen until the verification, authorization, feedback lifecycle, and retention decisions are approved.
