# Database Access and Permission Requirements

## Permission Matrix

| Resource/action | Student owner | Authorized instructor | Unverified/unauthed user |
|---|---:|---:|---:|
| Create/login account | Yes | Account may register; verification required | No private access |
| Manage own portfolio content | Create/read/update/delete | Read only | No |
| Upload/replace/delete student artifacts | Yes, own content | No | No |
| View private portfolio/files | Own | Active grant only | No |
| Grant/revoke instructor access | Yes, own portfolio | No | No |
| View reviews/feedback | Yes, own portfolio | Own authored records as permitted | No |
| Create periodic reviews | No | Active grant only | No |
| Create general feedback | No | Active grant only | No |
| Create reflection/artifact-linked feedback | No | Active grant only | No |
| Edit/delete original student content | No | No | No |
| Grade or alter attainment | No | No | No |
| Grant instructor role | No | No | No |

## Verification

Instructor role verification must be performed by a trusted institutional or provisioning process. A role value supplied during registration is untrusted input. The database must protect role and verification fields from ordinary user updates.

## Revocation

Revocation must be effective for subsequent database queries and Storage requests. Existing sessions, cached data, signed URLs, and in-flight requests require explicit policy decisions and short-lived access controls. Revocation must be auditable.

## Feedback Boundary

Instructor feedback is additive academic guidance. It must have its own author, timestamps, status, and optional target reference. It must not be stored in student response fields or permit updates to reflection, answer, artifact, or PLO-evidence records.

## RLS and Storage

RLS must deny by default, allow owner management for student rows, allow instructors SELECT only through an active grant, and allow instructor INSERT only for reviews/feedback. Storage policies must mirror the same active grant and portfolio ownership rules. Frontend controls are not enforcement.
