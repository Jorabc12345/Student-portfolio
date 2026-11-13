# Architecture Risk Register

## Phase 3 – Stage 1

## 1. Risks

| ID | Risk | Impact | Mitigation |
|---|---|---|---|
| R-001 | Incorrect PostgreSQL RLS policy | Private portfolio data could be exposed or modified | Deny-by-default policies, role/ownership tests, direct-request tests, and policy review |
| R-002 | Incorrect Storage policy or public bucket | Artifact confidentiality could be lost | Private buckets, owner/assignment checks, no public URLs, and upload/download tests |
| R-003 | Faculty assignment error | Faculty could see the wrong portfolio | Explicit assignment records, revocation workflow, least privilege, and audit events |
| R-004 | Service-role key exposure | RLS protections could be bypassed | Never expose service-role credentials in React; protect administrative secrets |
| R-005 | Free Plan storage exhaustion | Students may be unable to upload artifacts | File limits, optimization, usage monitoring, deletion policy, warnings, and quota handling |
| R-006 | Database size or query growth | Slow or failed queries and quota pressure | Scoped queries, pagination, indexes, compact metadata, and usage monitoring |
| R-007 | Bandwidth exhaustion | Downloads or previews may fail | Thumbnails, explicit downloads, caching strategy, and download monitoring |
| R-008 | Project inactivity pause | Portfolio may be temporarily unavailable | Monitor project activity, document wake/recovery procedure, and confirm availability expectations |
| R-009 | No automatic Free Plan backups | Data loss after deletion, corruption, or incident | Manual exports, protected backup storage, restore tests, and documented ownership |
| R-010 | Edge Function overuse | Function quota or execution limits may block operations | Prefer PostgreSQL/RLS/Storage, keep Functions minimal, and monitor invocation/duration |
| R-011 | Sensitive information in artifacts | Patient or community privacy breach | Confidentiality guidance, file review policy, no required identifiers, and incident response |
| R-012 | Academic content hard-coding | Future levels or changed labels require redesign | Stable IDs, configurable names, versioned content, and generic level relationships |
| R-013 | Duplicate cross-referenced files | Storage waste and inconsistent evidence | Store one binary with many domain/PLO association records |
| R-014 | Vendor lock-in | Migration requires translating Auth, RLS, Storage, and Functions | Maintain exports, source-control policies/configuration, and document portability |
| R-015 | Frontend hosting limits | React deployment may exceed free-tier quota | Evaluate providers before implementation and keep hosting independent from Supabase |

## 2. Free Plan Risks

- The 1 GB Storage quota is small for student artifacts and images.
- The 500 MB recommended database size requires compact data and growth monitoring.
- The 10 GB monthly egress allowance can be consumed by repeated artifact downloads.
- Free projects may pause for inactivity.
- Automatic daily backups are not included on the Free Plan.
- Edge Functions have bounded invocation, CPU, memory, duration, and deployment-size limits.
- Limits and pricing may change after this document is checked.

No payment method or paid upgrade is permitted as part of this stage.

## 3. Security and Privacy Risks

- RLS is incomplete on an exposed table.
- A policy checks authentication but not ownership or faculty assignment.
- Storage object paths are public or guessable.
- A student can alter role or assignment data through an overly broad policy.
- Backups, exports, logs, or administrative dashboards expose private evidence.
- Uploaded files contain patient-identifiable information.

Mitigation requires policy tests, protected administrative access, secure exports, confidentiality guidance, and incident response.

## 4. Academic and Product Assumptions

These are not confirmed decisions:

- The proposed MED 102 parent-folder grouping is final.
- Temporary display names are permanent.
- MED 103 period/folder organization is fully resolved.
- PLO association automatically demonstrates attainment.
- Future levels will use four folders or the Level 1 global-section layout.
- Progress-dashboard calculations and draft/completed states are approved.
- Artifact file types, sizes, retention, and deletion rules are finalized.
- Faculty access is necessarily portfolio-wide rather than section-specific.

## 5. Unresolved Questions

1. Which free-tier frontend host will be used?
2. Who owns and administers the Supabase organization/project?
3. Which Auth providers and institutional account workflows are required?
4. How are faculty accounts invited, assigned, revoked, and audited?
5. What artifact formats, size limits, retention, and review process are required?
6. What is the manual backup/export schedule and protected destination?
7. What events must be audited and for how long?
8. What is the approved quota-warning and upload-failure experience?
9. What hosting availability is expected despite inactivity pausing?
10. Which final academic naming and mapping decisions require client confirmation?

## 6. Stage 1 Boundary

No code, migration, table, RLS policy, Storage bucket, Auth configuration, Edge Function, hosting deployment, or live Supabase project was created. These risks and questions must be reviewed before Stage 2.
