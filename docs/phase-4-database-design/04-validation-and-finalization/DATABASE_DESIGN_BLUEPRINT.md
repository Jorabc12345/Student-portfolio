# Final Database Design Blueprint

## Validation Status

The Phase 4 design is technically ready for Phase 5 planning, but production migration is blocked until the listed client and institutional decisions are approved.

## Approved Platform

Supabase PostgreSQL, Supabase Auth, private Supabase Storage, and PostgreSQL RLS. Auth owns credentials. Storage owns artifact binaries. PostgreSQL stores relational metadata and authorization relationships. Firebase, MySQL, Laravel, and paid backend services are excluded.

## Final Logical Model

The model contains identity/profile records, a client-controlled shared instructor invitation code, student-owned portfolios, verified instructor profiles, student-controlled access grants, academic configuration, student content, configurable artifact policy settings and private metadata, instructor reviews and feedback, audit events, and optional progress records.

Students own original content. Instructors have no access without an active grant and may create reviews or feedback only for authorized portfolios. Reviews and feedback are separate instructor-authored records.

Instructor registration is permitted only when the current client-issued shared invitation code is valid, active, and unexpired. Multiple instructors may use it. Replacing or disabling it immediately prevents future registrations but does not affect existing instructor accounts or portfolio grants. Validation and Instructor-role assignment must occur atomically through a trusted operation. The raw code must not be stored.

## Academic Validation

Level 1 contains exactly three subjects and twelve folders. MED 102 contains eight separate, directly accessible domains even when grouped under four folders. MED 101 and MED 103 questions remain configuration data. Home Page, PLO Attainment, and Final Musings remain global sections. Future levels are represented as data.

The four-folder MED 102 grouping and some display labels remain provisional and must not be seeded as approved academic decisions.

## Security Boundary

RLS and Storage policies must enforce ownership, verified instructor status, active grants, feedback boundaries, and revocation. SQL foreign keys alone cannot enforce cross-portfolio context. Trusted helper functions or controlled operations are required for those checks.

## Free Plan and Operations

The design avoids duplicate binaries and unnecessary tables, but still requires quotas, monitoring, manual backup/export, restore testing, and explicit retention policies. Backups must have an institutionally approved owner, secure storage destination, schedule, restoration authority, and restore-test cadence. Free Plan use is not guaranteed to remain cost-free indefinitely.
