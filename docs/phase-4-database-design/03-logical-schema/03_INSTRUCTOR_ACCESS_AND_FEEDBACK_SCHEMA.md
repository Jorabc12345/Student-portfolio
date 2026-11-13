# Instructor Access and Feedback Schema

## Instructor Verification

Instructor registration is permitted, but registration cannot assign the instructor role. A trusted approved process must verify instructor identity and set `verification_status` before access or feedback privileges are available.

## Access Grants

`portfolio_access_grants` stores one student authorization relationship:

- portfolio owner and authorized instructor.
- `status`: proposed `active` or `revoked`.
- `granted_at`, `revoked_at`.
- actor who granted or revoked access.
- optional expiration if approved.

The pair should be unique for its current lifecycle or use a separate grant-instance strategy if repeated grant/revoke cycles must be preserved. `portfolio_access_events` preserves history.

## Instructor Verification

`instructor_profiles.verification_status` and verification timestamps are trusted fields. They cannot be set by registration input or ordinary profile updates. Only verified instructors with an active grant may create review or feedback rows.

## Reviews

`portfolio_reviews` contains the reviewed portfolio, reviewing instructor, the active grant used, review date, summary/notes, status, and timestamps. A review is not a grade or approval.

## Feedback

`portfolio_feedback` contains portfolio, instructor, optional review, optional reflection target, optional artifact target, feedback body, status, created/updated timestamps, and optional publication timestamp. A target must belong to the same portfolio. `feedback_revisions` may preserve history if editing is approved. The institution must decide who may edit/delete feedback and whether published reviews are immutable.

## RLS Requirements

- Students SELECT feedback for their own portfolio.
- Verified authorized instructors SELECT the permitted portfolio and INSERT feedback/reviews.
- Instructor UPDATE/DELETE is limited to their own feedback/review rows only if that lifecycle is approved.
- Instructors never UPDATE/DELETE student reflections, answers, artifacts, PLO evidence, or global content.
- Revoked grants deny new review/feedback operations and portfolio reads.
