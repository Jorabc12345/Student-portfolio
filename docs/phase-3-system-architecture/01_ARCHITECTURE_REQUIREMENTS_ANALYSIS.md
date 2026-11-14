# Architecture Requirements Analysis

## Phase 3 – Stage 1

This document analyzes the architecture requirements for the BukSU-COM Student Learning and Reflective Digital Portfolio. It does not create application code, database migrations, tables, a live Supabase project, or frontend/backend implementation.

## 1. Sources Reviewed

- Supplied `MASTER_PROJECT_ROADMAP.md`.
- Approved Software Requirements Specification.
- Original `BukSU-COM Portfolio Instructions.pdf`.
- Phase 1 requirements documents in `docs/phase-1-requirements/`.
- Phase 2 academic inventory, mapping, reflection, PLO, and global-section documents in `docs/phase-2-academic-content/`.
- [ACADEMIC_CONTENT_BLUEPRINT.md](../phase-2-academic-content/ACADEMIC_CONTENT_BLUEPRINT.md).
- [USER_ROLES_AND_PERMISSIONS.md](../phase-1-requirements/USER_ROLES_AND_PERMISSIONS.md).

The original college instructions remain authoritative for academic wording, questions, evidence, confidentiality, and academic integrity. Client-confirmed decisions control scope and access. Technical recommendations are not academic requirements.

## 2. Target Technology Architecture

- Frontend: React and Vite.
- Styling: Tailwind CSS.
- Motion: Framer Motion.
- Icons: Lucide React.
- Backend services: Supabase Free Plan.
- Structured data: Supabase PostgreSQL.
- Authentication: Supabase Authentication.
- Authorization: PostgreSQL Row Level Security (RLS).
- Files: Supabase Storage with private buckets and RLS-aware access.
- Additional server logic: Supabase Edge Functions only when genuinely necessary and compatible with the Free Plan.
- Frontend hosting: free-tier hosting to be evaluated separately; Supabase is not assumed to host the React frontend.

Supabase is the approved backend direction. Laravel, MySQL, Firebase, and another backend are outside this architecture unless explicitly approved later.

## 3. Confirmed Requirements Affecting Architecture

### Academic structure

- Initial coverage is Level 1.
- Level 1 contains exactly MED 101, MED 102, and MED 103.
- Each subject has four main folders, for twelve total subject folders.
- Stable IDs such as `MED101-F01` must remain independent from configurable display names.
- MED 102 retains eight separate, individually identifiable learning-domain sections using the owner-confirmed official names. No domain-to-folder grouping or MED 102 parent-folder name is approved; a domain parent-folder link is optional until its UI treatment is decided.
- One artifact may be associated with multiple domains and PLOs without duplicate uploads.
- Home Page, PLO Attainment, and Final Musings are separate Level 1 portfolio sections, not additional subject folders.
- Future levels and academic structures must be configurable.

### Users and privacy

- Login is mandatory.
- Portfolios are private.
- Students manage only their own portfolios.
- Authorized faculty/mentors may view only permitted portfolios.
- Faculty/mentors are strictly read-only and cannot create, edit, upload, delete, comment, provide feedback, or grade.
- Patient-identifiable information must not be required or uploaded.
- Academic integrity, permissions, attribution, collaborator, and artificial-intelligence-use requirements must remain supported.

### Presentation

- White: approximately 60%.
- Pink: approximately 30%, `#FF669B`.
- Butter yellow: approximately 10%, `#F9E7A2`.
- The interface must be readable, professional, responsive, accessible, and appropriate for medical education.

## 4. Functional Architecture Drivers

| Driver | Requirement | Architectural effect |
|---|---|---|
| Portfolio ownership | One student owns one portfolio | Every row and storage object needs an unambiguous owner relationship |
| Academic hierarchy | Levels, subjects, folders, domains, and global sections | Use configurable relational records rather than hard-coded Level 1 screens |
| Stable academic identity | Display names may change | Use stable IDs as relationships and configurable labels as data |
| MED 102 domains | Eight domains remain independent | Do not merge domains into parent-folder names |
| Cross-referenced evidence | One artifact supports multiple domains/PLOs | Use join relationships; store one file and many associations |
| Reflections | Exact prompts and student responses | Store source prompt references and responses with academic context |
| Read-only faculty | Authorized faculty can view assigned portfolios only | RLS must distinguish permitted SELECT from every INSERT/UPDATE/DELETE |
| Private artifacts | Academic evidence requires restricted access | Use private Storage buckets and signed/authenticated access after authorization |
| Future expansion | Later levels may differ | Model levels and academic units generically while validating Level 1 counts |
| Global sections | Home, PLOs, Final Musings outside subjects | Support section types separately from subject-folder relationships |

## 5. Supabase Service Responsibilities

### React/Vite frontend

Responsible for rendering navigation and forms, presenting exact academic prompts, collecting responses and file selections, showing role-appropriate controls, and handling loading/validation/error states.

The frontend must not be trusted for ownership, role, faculty assignment, PLO authorization, or file privacy. It must not expose service-role credentials.

### Supabase PostgreSQL

Responsible for structured users/profile references, roles and faculty assignments, portfolios, configurable academic hierarchy, reflections, artifacts metadata, domain/PLO associations, Final Musings, and approved audit records. Exact tables and migrations are deferred.

### Supabase Authentication

Responsible for identity, sign-in, session lifecycle, password recovery, and account state according to the approved operational policy. Authentication establishes identity but does not grant access to another student's portfolio.

### PostgreSQL RLS

RLS is the primary database authorization boundary. Policies must:

- Allow students to read/write only their own portfolio resources.
- Allow faculty/mentors to SELECT only explicitly assigned portfolio resources.
- Deny faculty INSERT, UPDATE, DELETE, artifact metadata writes, comments, feedback, and grading writes.
- Prevent client-supplied identifiers from bypassing ownership or assignment checks.
- Cover every exposed table and relationship path.

RLS policies must be tested with student, assigned faculty, unassigned faculty, unauthenticated, and direct-request scenarios.

### Supabase Storage

Storage must use private buckets. Object paths and metadata must connect to the owning portfolio and artifact record. Upload, read, replace, and delete operations must be restricted by authenticated ownership/assignment rules. Public buckets and unrestricted public URLs are not permitted for private evidence.

Storage growth must be controlled through file-size/type limits, image optimization, deletion/replacement rules, and quota monitoring.

### Supabase Edge Functions

Use only when a trusted server operation cannot reasonably be handled through PostgreSQL, RLS, Storage, or the client. Examples may include a carefully authorized administrative workflow or coordinated external processing, subject to Free Plan limits. Edge Functions must not become a general backend replacement.

### Frontend hosting

Evaluate free-tier options separately. Hosting must provide HTTPS, environment-variable protection, deployment rollback, and a suitable static React deployment model without assuming paid hosting.

## 6. Security and Privacy Requirements

- Require authentication for all private application data and artifact access.
- Enforce student ownership and faculty assignment in RLS and Storage policies.
- Deny all faculty writes, including direct API and Storage requests.
- Keep Storage buckets private and issue only controlled authenticated/signed access.
- Validate file type, size, content expectations, and metadata before storage.
- Do not require patient names, faces, record numbers, identifying dates, or other patient-identifiable information.
- Protect Supabase URL/key configuration; never expose the service-role key in the frontend.
- Keep exports, backups, logs, and administrative tooling protected at the same privacy level as source data.
- Log security and administrative events without storing unnecessary sensitive payloads.

## 7. Free-Plan Design Requirements

- Keep the database within the current Free Plan recommended size.
- Keep Storage within the included quota; reaching the limit must produce a clear user/admin warning and block or manage additional uploads safely.
- Minimize database reads, repeated subscriptions, large result sets, and unnecessary background processing.
- Optimize profile images and artifacts before upload where appropriate.
- Restrict file sizes, types, and quantity according to approved policy.
- Avoid paid APIs and external services.
- Provide manual database export/backup procedures because Free Plan automatic backup availability is limited.
- Monitor database, Storage, bandwidth/egress, Auth, and Edge Function usage.
- Design graceful quota-warning and upload-failure states without silently losing student work.

## 8. Scalability and Maintainability

- Use stable IDs and configurable academic content.
- Use relational join tables for artifact-to-domain and artifact-to-PLO relationships.
- Avoid storing duplicate binaries for cross-references.
- Scope queries by portfolio, level, subject, folder, domain, and role.
- Add indexes based on measured access patterns.
- Keep RLS policies centralized, reviewable, and covered by automated policy tests.
- Version or govern academic prompts and content configuration so historical responses remain interpretable.
- Keep Level 1 validation separate from future-level configuration.

No unapproved performance, availability, retention, or user-volume targets are introduced.

## 9. Backup, Export, and Portability

The backup plan must cover PostgreSQL data, Storage objects, Authentication user/configuration data, RLS policies, Storage policies, Edge Functions, indexes, environment configuration, and academic content configuration.

Free Plan limitations mean manual database backups/export procedures must be defined and tested. A database export alone does not restore Storage files or Auth configuration. Backups and exports contain private academic evidence and require protected storage.

PostgreSQL and object data are comparatively portable, but Supabase Auth, RLS policies, Storage metadata, Edge Functions, and platform configuration create migration work and vendor lock-in.

## 10. Cost and Billing Considerations

This architecture targets the Supabase Free Plan and must not add a payment method or activate a paid subscription. Current limits are recorded in [01_SUPABASE_FREE_PLAN_CONSTRAINTS.md](01_SUPABASE_FREE_PLAN_CONSTRAINTS.md).

The project must monitor quotas and prevent silent growth. If project requirements exceed Free Plan limits, development must stop for an explicit approval decision rather than silently upgrading or adding paid services.

## 11. Stage Restrictions

- Do not create application code.
- Do not create migrations, tables, RLS policies, Storage buckets, Auth configuration, Edge Functions, or a live Supabase project.
- Do not install packages.
- Do not change the approved Supabase stack.
- Do not invent academic content or finalize provisional mappings.

## Current MED 102 structure (13 November 2026)

The official instructions PDF, section 2.2 (pp. 5-6), defines eight independent MED 102 domains, with required evidence, competency descriptions, one shared four-question reflection guide, and pertinent artifacts. MED 102 has no four-parent-folder requirement. Earlier proposed-parent and unresolved-grouping text in this document is superseded. See docs/phase-2-academic-content/03_MED102_STRUCTURE_FINALIZATION.md for exact wording and the database representation review.
