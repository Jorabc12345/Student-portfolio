# System Architecture Blueprint

## Phase 3 – Stage 4

This consolidated blueprint is the validated high-level architecture for the private BukSU-COM Student Learning and Reflective Digital Portfolio. It is the handoff reference for Phase 4 database design. It does not create tables, migrations, policies, or application code.

## 1. Project Overview

The SLRP is a private individual academic portfolio for Bukidnon State University – College of Medicine. Students manage their own academic reflections and evidence. Authorized faculty/mentors may view assigned portfolios but have no content-management, feedback, or grading capabilities.

Version 1 covers Level 1 while the architecture supports future academic levels and different future structures.

## 2. Approved Technology Stack

- React + Vite.
- Tailwind CSS.
- Framer Motion.
- Lucide React.
- Supabase Free Plan.
- Supabase PostgreSQL.
- Supabase Authentication.
- Supabase Storage with private buckets.
- PostgreSQL Row Level Security.
- Supabase Edge Functions only when genuinely necessary.
- Free-tier frontend hosting, provider not yet selected.

No Firebase, Laravel, MySQL, paid backend, paid authentication service, or unapproved third-party API is part of the active architecture.

## 3. System Architecture

The React frontend uses the Supabase client with the authenticated session. Supabase Auth supplies identity. PostgreSQL stores structured data and RLS enforces row access. Private Storage stores binaries and Storage policies enforce object access. Edge Functions are exceptional trusted operations only.

The frontend is responsible for presentation, input collection, early validation, and error display. Supabase is responsible for identity, persistence, authorization, private file access, and trusted operations. Frontend button visibility is never security enforcement.

## 4. Application Components

- Authentication/session module.
- Student dashboard and Home Page.
- Faculty read-only dashboard.
- Configurable academic-content navigation.
- Subject/folder/domain navigation.
- Reflection management.
- Artifact metadata and private file management.
- PLO Attainment and evidence associations.
- Final Musings.
- Profile management.
- Quota, error, and security-event presentation.

## 5. Academic Hierarchy

```text
Portfolio
├── Home Page
└── Level 1
    ├── MED 101
    │   └── Four main folders
    ├── MED 102
    │   └── Four main folders with eight separate domains
    ├── MED 103
    │   └── Four main folders
    ├── PLO Attainment
    └── Final Musings
```

Level 1 has exactly three subjects and twelve main subject folders. MED 101 and MED 103 preserve their approved reflection requirements. MED 102 domains remain separate and may cross-reference one artifact without duplicate upload. The current MED 102 parent-folder grouping and some display names remain provisional.

## 6. Authentication and Authorization

Supabase Auth uses email/password accounts. Trusted provisioning creates accounts and assigns roles/portfolio access. Users cannot assign themselves roles or faculty permissions.

RLS permits students to manage only their own rows. Assigned faculty can SELECT permitted portfolio data only. Faculty INSERT, UPDATE, DELETE, uploads, replacement, deletion, comments, feedback, and grading operations are denied. Storage policies apply equivalent rules to artifacts.

## 7. Data and File Design

Structured data includes profiles, portfolios, academic configuration, reflections, artifact metadata, artifact-domain associations, artifact-PLO associations, PLO evidence, Final Musings, faculty assignments, and approved audit records. Stable IDs identify academic units; display names are configurable.

Artifact binaries are stored once in private Storage. Relationship records connect an artifact to multiple domains, reflections, or PLOs. Retrieval uses authenticated access or short-lived signed URLs after authorization.

## 8. Security and Privacy

- RLS is enabled and tested on every client-exposed table.
- Storage buckets remain private.
- Service-role/secret keys never reach the frontend.
- Patient names, faces, record numbers, identifying dates, contact information, and other identifying details are prohibited.
- Backups, exports, logs, and administrative configuration receive equivalent protection.
- Account revocation and faculty assignment removal must affect future reads.

## 9. Free Plan Constraints

The validated planning baseline includes approximately 500 MB recommended database size, 1 GB Storage, 10 GB monthly egress, possible inactivity pausing, no assumed automatic daily backups, and bounded Edge Function usage. These values can change and must be rechecked before deployment.

The design minimizes queries, repeated listeners, duplicate files, large previews, unnecessary Functions, and uncontrolled uploads. Manual backup/export and quota monitoring are required. The system is not guaranteed to operate indefinitely without cost.

## 10. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| RLS or Storage policy error | Deny-by-default policies, scenario tests, security review |
| Storage exhaustion | File limits, optimization, usage monitoring, deletion policy |
| Free project pausing | Availability decision, monitoring, recovery procedure |
| Backup gap | Manual export of database, files, Auth/configuration, policies, and restore tests |
| Faculty assignment error | Trusted assignment workflow, revocation, audit |
| Academic hard-coding | Stable IDs, configurable content, future-level relationships |
| Vendor lock-in | Protected exports and source-controlled configuration |

## 11. Outstanding Questions

- Free-tier frontend host.
- Supabase project ownership and administrative access.
- Authentication providers and account provisioning.
- Faculty assignment and revocation process.
- Artifact formats, size limits, retention, review, and deletion.
- Backup/export schedule and restore ownership.
- Final MED 102 grouping and permanent display names.
- Final MED 103 folder/period organization.
- Audit requirements and progress calculation rules.

## 12. Phase 4 Boundary

Phase 4 may translate this blueprint into a database design after approval. It must not silently finalize provisional academic mappings or operational policies.
