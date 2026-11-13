# Database Security Readiness

## Required RLS Policies

- Students may access and mutate only rows reachable from their own portfolio.
- Students may create, update, and revoke their own access grants.
- Instructors require verified status and an active grant for portfolio and file reads.
- Instructors may insert reviews and feedback only for actively authorized portfolios.
- Students may read feedback for their own portfolio.
- Instructors may not insert, update, or delete original reflections, answers, artifacts, PLO evidence, or global content.
- Roles, verification, ownership, and grant administration require trusted operations.
- Instructor registration must validate the current client-issued shared invitation code and assign the Instructor role only in the same trusted transaction. Users cannot self-assign the role.
- Audit rows are not mutable by ordinary users.
- Every instructor policy rechecks current grant state so revocation blocks subsequent reads.

## Storage Security

Use private buckets, portfolio-scoped object paths, and short-lived signed URLs or authenticated access. Storage policies must perform the same ownership and active-grant checks as database reads. Public URLs are prohibited. Revoked grants must prevent new signed URLs from being generated; existing URL behavior must be tested and documented.

Signed URLs may remain usable until their short expiry after revocation. The application must use short expirations and must never issue a new URL when the active-grant check fails.

## Helper Functions

Potential narrowly scoped, non-recursive helpers include `current_user_profile_id()`, `owns_portfolio()`, `is_verified_instructor()`, and `has_active_portfolio_grant()`. They must use safe search paths, avoid trusting caller-supplied roles, and avoid broad service-role bypasses.

## Security Test Matrix

| Scenario | Expected result |
|---|---|
| Student reads own portfolio/reflection | Allow |
| Student edits own reflection or artifact metadata | Allow |
| Student uploads own artifact | Allow |
| Student reads another student's portfolio | Deny |
| Verified instructor reads active-grant portfolio | Allow |
| Verified instructor reads ungranted portfolio | Deny |
| Instructor reads after grant revocation | Deny |
| Instructor requests new signed URL after revocation | Deny |
| Previously issued signed URL after revocation | May work only until short expiry; document and test |
| Instructor edits/deletes student reflection or artifact | Deny |
| Instructor creates review/feedback for active grant | Allow |
| Instructor creates feedback for ungranted portfolio | Deny |
| Student reads feedback on own portfolio | Allow |
| Student reads another student's feedback | Deny |
| Anonymous reads portfolio or downloads artifact | Deny |
| User attempts self-assigned instructor role | Deny |
| User submits the current valid invitation code | Register account and grant Instructor role |
| Multiple users submit the current active code | Each may register an individual instructor account |
| Disabled or replaced invitation code | Deny new registration |
| Expired or invalid invitation code | Deny |
| Existing instructor after code replacement | Existing account and portfolio grants remain unchanged |

## Security Readiness Result

The logical design supports the required controls. It is not production-secure until policies, helper functions, Storage rules, revocation behavior, and negative tests are implemented.
