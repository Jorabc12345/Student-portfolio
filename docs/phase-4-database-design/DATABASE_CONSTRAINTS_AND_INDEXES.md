# Database Constraints and Indexes

## Constraints

- `user_profiles.auth_user_id` is a unique foreign key to `auth.users.id`.
- One student owns one portfolio; one portfolio has one Home Page record.
- Association tables use composite primary keys to prevent duplicate links.
- Academic stable codes and requirement codes are unique.
- Assignment status is `active` or `revoked`; revoked assignments require `revoked_at`.
- Content statuses are proposed as `draft`, `completed`, and `submitted`.
- Artifact statuses are proposed as `active`, `replaced`, `deleted`, and `quarantined`.
- Completion percentages range from 0 to 100 and file sizes cannot be negative.
- Academic parent deletion must be restricted where dependent content exists.
- Artifact association deletion must not delete the artifact or its other associations.

## Indexes

The draft indexes academic hierarchy navigation, faculty and portfolio assignment checks, reflection and artifact portfolio queries, and audit history by portfolio/time. Foreign-key indexes for junction tables should be retained where query plans demonstrate value. Additional indexes should not be added without workload evidence because Free Plan storage is limited.

## Integrity Gaps Requiring Implementation

Cross-portfolio child/association consistency requires RLS, triggers, or carefully constrained service operations. SQL foreign keys alone do not ensure that a domain, prompt, artifact, or PLO belongs to the same portfolio context as its parent. These checks must be implemented and tested before production.
