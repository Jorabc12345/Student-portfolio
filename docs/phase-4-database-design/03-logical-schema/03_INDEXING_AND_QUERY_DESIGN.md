# Indexing and Query Design

## Required Indexes

- `user_profiles(auth_user_id)`.
- `portfolios(student_profile_id)`.
- `instructor_profiles(institutional_email, verification_status)`.
- `portfolio_access_grants(instructor_profile_id, status)`.
- `portfolio_access_grants(portfolio_id, status)`.
- `portfolio_access_events(grant_id, occurred_at)`.
- Academic parent/order indexes for subjects, folders, periods, and domains.
- Reflections and artifacts by `portfolio_id, status, updated_at`.
- Association foreign keys in both directions.
- Reviews by `portfolio_id, review_date` and instructor/date.
- Feedback by portfolio/date and target identifiers.
- Audit logs by portfolio/time and actor/time.

## Core Queries

1. Resolve the authenticated user to a profile and role.
2. Resolve a student portfolio by owner.
3. Check an active grant for instructor access.
4. Load academic hierarchy in display order.
5. Load a portfolio with reflections, artifacts, and global sections.
6. Load reviews and feedback without joining them into editable student rows.
7. Retrieve private Storage metadata only after database authorization.

## Email Authorization Lookup

The student-facing flow may accept an instructor's registered email address. Email lookup must use a controlled RPC or trusted server operation that returns only a verified instructor identity suitable for creating a grant. Do not expose a general instructor directory or permit arbitrary email enumeration.

## Free Plan Considerations

Avoid speculative indexes, duplicate artifact rows, unbounded audit payloads, and repeated progress recalculation. Monitor query plans and storage size before adding indexes.
