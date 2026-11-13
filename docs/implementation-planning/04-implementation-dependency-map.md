# Implementation Dependency Map

**Status:** Proposed sequencing derived from the verified assessment and backlog.  
**Roadmap phase mapping:** Unverified until `MASTER_PROJECT_ROADMAP.md` is restored. â€œPhase 7â€ appears only as a planning reference in the Phase 6 validation report.

## Dependency graph

```mermaid
flowchart TD
  DOC[PLAN-01 Restore approved SRS, PDF, roadmap and crosswalk]
  A[PLAN-02 Academic content approval]
  B[PLAN-03 Account and identity workflows]
  C[PLAN-04 Feedback authority/lifecycle]
  D[PLAN-05 Artifact policy and signed URL behavior]
  E[PLAN-06 Hosting, backup, export, audit operations]
  ENV[ENV-01 Git, environment and authorized project verification]
  DB[DB-01 Reconciled versioned schema]
  AUTH[AUTH-01 Student Supabase Auth]
  IAUTH[AUTH-02 Instructor registration/verification]
  ADMIN[ADMIN-01 Admin invitation-code management]
  RLS[SEC-01 Core RLS and ownership enforcement]
  GRANT[GRANT-01 Student grant/revoke]
  HOME[DATA-01 Profile and Home content]
  REF[DATA-02 Academic data and reflections]
  STORE[ART-01 Private Storage and artifacts]
  GLOBAL[DATA-03 PLO evidence and Final Musings]
  VIEW[INSTR-01 Instructor viewer]
  FB[INSTR-02 Separate reviews/feedback]
  ROUTE[ROUTE-01 URL routing and breadcrumbs]
  UX[UX-01 Accessibility and visual closure]
  OPS[OPS-01 Operations and deployment]
  QA[QA-01 Acceptance/security/release verification]

  DOC --> A
  DOC --> B
  DOC --> C
  DOC --> D
  DOC --> E
  B --> ENV
  ENV --> DB
  A --> DB
  B --> DB
  C --> DB
  D --> DB
  DB --> AUTH
  AUTH --> IAUTH
  AUTH --> ADMIN
  DB --> ADMIN
  RLS --> ADMIN
  ADMIN --> IAUTH
  AUTH --> RLS
  DB --> RLS
  C --> RLS
  RLS --> GRANT
  IAUTH --> GRANT
  AUTH --> GRANT
  AUTH --> HOME
  RLS --> HOME
  A --> REF
  AUTH --> REF
  RLS --> REF
  D --> STORE
  DB --> STORE
  RLS --> STORE
  GRANT --> STORE
  AUTH --> GLOBAL
  RLS --> GLOBAL
  STORE --> GLOBAL
  GRANT --> VIEW
  HOME --> VIEW
  REF --> VIEW
  STORE --> VIEW
  GLOBAL --> VIEW
  C --> FB
  VIEW --> FB
  GRANT --> FB
  AUTH --> ROUTE
  DOC --> ROUTE
  DOC --> UX
  HOME --> UX
  REF --> UX
  STORE --> UX
  GLOBAL --> UX
  VIEW --> UX
  FB --> UX
  E --> OPS
  ENV --> OPS
  DB --> OPS
  STORE --> OPS
  OPS --> QA
  UX --> QA
  ROUTE --> QA
  AUTH --> QA
  RLS --> QA
  GRANT --> QA
  HOME --> QA
  REF --> QA
  STORE --> QA
  GLOBAL --> QA
  VIEW --> QA
  FB --> QA
  ADMIN --> QA
```

## Sequencing notes

1. **Source and decisions first:** PLAN-01 must unblock content, policy and roadmap mapping. PLAN-02 through PLAN-06 can progress from available records, but any missing client authority remains a gate.
2. **Controlled backend foundation:** ENV-01 precedes DB-01. DB-01 is a review/migration planning task; applying schema to a shared or production project requires the relevant approval and safeguards.
3. **Authentication before user data:** AUTH-01 and trusted role provisioning precede account-owned content. Instructor registration and administrator management are separate tasks because their trust boundaries differ.
4. **RLS before feature integration:** SEC-01 protects database access; grants depend on authenticated identities and RLS. Storage also needs its own policy layer and must mirror ownership/grants.
5. **Feature slices remain separate:** Home/profile, reflections, PLO/Final Musings, files, instructor viewing and feedback are independent implementation tasks with explicit dependencies. Instructor viewing consumes student feature data; feedback depends on the approved revised model.
6. **Release operations are a gate:** OPS-01 is marked P3 for implementation sequencing, but deployment is blocked until it is complete. QA-01 closes only after the relevant policy, feature and operational work has evidence.

## Critical path

`PLAN-01 â†’ (PLAN-03 / PLAN-05 / PLAN-06) â†’ ENV-01 â†’ DB-01 â†’ AUTH-01 â†’ SEC-01 â†’ GRANT-01 â†’ ART-01 and student data slices â†’ INSTR-01 â†’ INSTR-02 â†’ OPS-01 â†’ QA-01`

Academic content approval (PLAN-02) is a parallel prerequisite for final content configuration and reflection acceptance. Feedback authority/lifecycle (PLAN-04) is a prerequisite for feedback schema/policies and INSTR-02. Routing (ROUTE-01) can be developed after auth requirements are clear and before or alongside data-backed screens, but protected routes must use real auth state.

## External blockers

- Approved SRS, original PDF and roadmap files are not present.
- Client/institution decisions are needed for provisioning, artifact policy, feedback lifecycle, backup/recovery and hosting.
- Live Supabase verification requires authorized project configuration. No database or Storage mutation is implied by this map.

