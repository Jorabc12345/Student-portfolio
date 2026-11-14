# Technology Stack Decision

## Phase 3 – Stage 1

## 1. Decision

Use the following target architecture:

| Layer | Selected technology | Status |
|---|---|---|
| Frontend | React + Vite | Approved target |
| Styling | Tailwind CSS | Approved target |
| Motion | Framer Motion | Approved target |
| Icons | Lucide React | Approved target |
| Backend platform | Supabase Free Plan | Approved target |
| Database | Supabase PostgreSQL | Approved target |
| Authentication | Supabase Authentication | Approved target |
| Database authorization | PostgreSQL Row Level Security (RLS) | Required security boundary |
| File storage | Supabase Storage | Approved target |
| Server-side extensions | Supabase Edge Functions only when genuinely necessary | Constrained/proposed |
| Frontend hosting | Free-tier hosting to be evaluated | Open implementation decision |

Laravel, MySQL, Firebase, and another backend are not part of this target architecture without explicit approval.

## 2. Why Supabase

Supabase provides PostgreSQL relational modeling, managed Authentication, private Storage, and database-level RLS in one backend platform. This fits the portfolio's relationships among academic units, reflections, artifacts, MED 102 domains, and PLO evidence.

Relational join tables can associate one artifact with many domains and PLOs without duplicate file uploads. PostgreSQL also supports configurable future academic levels while preserving stable folder IDs and configurable display names.

The Free Plan constraint requires deliberate query, storage, bandwidth, backup, and function design. Supabase is not assumed to be permanently free, unlimited, or automatically more scalable.

## 3. Responsibility Boundaries

### Frontend

- Render responsive student and faculty experiences.
- Present exact academic prompts and guidance.
- Collect text and file inputs.
- Show controls appropriate to the user's role.
- Call Supabase through the approved client APIs.
- Handle loading, validation, quota, and error messages.

### Supabase

- Authenticate users and manage sessions.
- Persist structured portfolio and academic data.
- Enforce ownership and faculty read-only access through RLS.
- Protect artifact files through private Storage policies.
- Execute only narrowly justified trusted operations through Edge Functions.

Frontend visibility is not authorization. The frontend must never contain a service-role key or decide whether a user may access another portfolio.

## 4. Authorization Decision

Use RLS as the authoritative database boundary:

- Students may manage only their own portfolio resources.
- Authorized faculty/mentors may read only assigned portfolios.
- Faculty/mentors may not insert, update, delete, upload, comment, provide feedback, or grade.
- Unauthenticated users receive no private portfolio or artifact access.

Storage policies must enforce the corresponding private-file rules. Every table and Storage path exposed to the client requires an explicit policy review.

## 5. Academic Modeling Decision

Use configurable records for levels, subjects, folders, domains, global sections, reflections, artifacts, PLOs, Final Musings, and faculty assignments. Use stable IDs such as `MED101-F01`; display names remain configurable.

MED 102's eight domains retain separate identities. Artifact-domain and artifact-PLO associations must support many-to-many links without duplicating binaries. MED 102 has eight independent domains and no parent-folder grouping.

## 6. Edge Function Decision

Do not use Edge Functions for ordinary student CRUD if PostgreSQL, RLS, Storage, and the Supabase client can safely provide the behavior. Consider a Function only for a trusted operation that cannot safely be implemented through those services. Each Function must have an authorization check, bounded resource use, and a Free Plan compatibility review.

## 7. Hosting Decision

Supabase is not assumed to host the React frontend. Evaluate free-tier static hosting options with HTTPS, environment protection, deployment rollback, and acceptable quota behavior. No paid hosting requirement is approved.

## 8. Technology Conflicts and History

Earlier project materials included Laravel/MySQL and a prior Firebase direction. The current instruction explicitly selects Supabase and supersedes those backend directions for this architecture stage. The SRS and roadmap decision history should be updated before implementation so the technology record is consistent.

## 9. Decisions Still Requiring Approval

1. Free-tier frontend hosting provider.
2. Supabase project ownership and permitted administrative users.
3. Authentication providers, account provisioning, password recovery, and account disabling.
4. Faculty assignment, revocation, and access expiration workflow.
5. Artifact file types, size limits, retention, deletion, and sensitive-content review.
6. Manual backup/export schedule, protected backup destination, and restore testing.
7. Implement direct navigation to the eight confirmed MED 102 domains, with no parent-folder layer.
8. MED 103 folder/period organization if still unresolved.
9. Audit logging requirements.
10. Progress-dashboard completion rules.

No Supabase project, schema, policy, bucket, Function, or application code is created by this decision.

## Academic naming update (13 November 2026)

MED 101 labels, the eight MED 102 domain names, and MED 103 Bimonthly labels are confirmed from the attached official PDF and the user naming decision (pp. 4-8). Keep MED 103 source themes separately. MED 102 parent-folder semantics/navigation are not open decisions; the database design supports eight independent domains without parent assignments.

## Current MED 102 structure (13 November 2026)

The official instructions PDF, section 2.2 (pp. 5-6), defines eight independent MED 102 domains, with required evidence, competency descriptions, one shared four-question reflection guide, and pertinent artifacts. MED 102 has no four-parent-folder requirement. Earlier proposed-parent and unresolved-grouping text in this document is superseded. See docs/phase-2-academic-content/03_MED102_STRUCTURE_FINALIZATION.md for exact wording and the database representation review.
