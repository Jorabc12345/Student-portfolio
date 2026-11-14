# Implementation Backlog

**Status:** Proposed backlog; no tasks in this file have been implemented.  
**Source of truth:** `docs/VERIFIED_IMPLEMENTATION_PLAN.md` and `02-requirements-conflicts-and-client-decisions.md`.  
**Roadmap baseline:** UPDATED PROJECT ROADMAP.pdf v2.0 names 18 phases. Its cover says Pending Client Approval; task mapping follows the supplied baseline pending formal approval.

Priority definitions: **P0** = source/policy gate that blocks dependent implementation; **P1** = foundation/security needed before production feature work; **P2** = feature completion after foundations; **P3** = release hardening or conditional scope.

`PLAN-*` identifiers are backlog tasks. `DEC-*` identifiers refer to the separate decision register in `02-requirements-conflicts-and-client-decisions.md`. The planning tasks address these decision-register entries: PLAN-01 → DEC-01/DEC-02; PLAN-02 → DEC-09; PLAN-03 → DEC-05–DEC-07; PLAN-04 → DEC-04/DEC-12; PLAN-05 → DEC-10/DEC-11; PLAN-06 → DEC-14–DEC-16 and DEC-18. DEC-08 is a dependency of GRANT-01/INSTR-01; DEC-13 is relevant to DATA-02; DEC-17 is a dependency of UX-01. These mappings organize resolution work; they do not mark any decision approved.

## Backlog tasks

### PLAN-01 - Reconcile current SRS, official instructions, and roadmap baseline

- **Description:** Crosswalk UPDATED SRS.pdf v2.0 and the official instructions; verify requirement IDs, evidence, decisions, and roadmap mappings; record approval/version metadata or requested revisions.
- **Expected outcome:** Traceable reviewed baseline without inferred requirements or phase renumbering.
- **Dependencies:** Supplied PDFs and project-owner/client review of their pending approval status.
- **Priority:** P0.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** Phase 1 requirement/traceability docs; Phase 2 academic source maps; planning registers; Phase 3-5 reconciliation.
- **Acceptance criteria:** Requirements link to SRS sections, official instructions pages, or confirmed decisions; superseded conflicts are marked; unresolved decisions remain open; phase names remain unchanged; approval metadata/status is recorded.
- **Client approval required:** Yes, for formal SRS/roadmap baseline approval; no, to record sources and conflicts.
### PLAN-02 - Implement the official academic content structure

- **Description:** Configure the verified academic sections for MED 101, MED 102, and MED 103. MED 102 comprises eight independent domain sections, each with its official evidence and competency description, shared reflection questions, and pertinent-artifact requirement. Remove proposed MED 102 parent cards from the future UI.
- **Expected outcome:** Source-aligned academic content with eight direct, separately accessible MED 102 sections.
- **Dependencies:** Official instructions PDF reviewed; use docs/phase-2-academic-content/03_MED102_STRUCTURE_FINALIZATION.md. No MED 102 structure client approval is required.
- **Priority:** P0 for source alignment.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** Phase 2 academic records; Phase 5 navigation/UI specifications; later academic data and subject navigation implementation.
- **Acceptance criteria:** MED 101 and MED 103 have exactly the four confirmed Bimonthly labels; MED 102 shows exactly the eight source-named independent domains; each domain retains its exact evidence and competency wording; all four recurring questions apply to every domain; pertinent artifacts are required; no parent cards or invented domain grouping; official source references are recorded.
- **Client approval required:** No for the confirmed academic structure.

### PLAN-03 â€” Resolve account provisioning and identity workflows

- **Description:** Define student provisioning/recovery/disablement, instructor identity verification, admin provisioning and registration failure handling.
- **Expected outcome:** Trusted role lifecycle with no self-assigned roles.
- **Dependencies:** PLAN-01; institution identifies responsible operators.
- **Priority:** P0.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `docs/phase-3-system-architecture/03_AUTHENTICATION_ARCHITECTURE.md`, `docs/phase-4-database-design/04-validation-and-finalization/DATABASE_DECISION_REGISTER.md`; later Auth pages/services.
- **Acceptance criteria:** Account creation, verification, password recovery, disablement, role assignment and support ownership are documented; instructor registration cannot assign trusted role without approved verification.
- **Client approval required:** Yes.

### PLAN-04 â€” Reconcile instructor feedback policy and lifecycle

- **Description:** Record source authority for separate instructor feedback and decide draft/publish, edit/delete, reply, notification, review cadence and retention.
- **Expected outcome:** Consistent policy across Phase 1, Phase 3, Phase 4, Phase 5, traceability and implementation.
- **Dependencies:** PLAN-01.
- **Priority:** P0.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** Phase 1 role/permission and acceptance docs; Phase 3 role matrix/RLS/blueprint/traceability; Phase 4 decision register/schema; Phase 5 specs; later `src/pages/FeedbackPage.tsx`.
- **Acceptance criteria:** Separate feedback is explicitly confirmed or rejected by the authoritative client record; stale restrictions are revised with history; feedback can never mutate student original content; lifecycle rules are testable.
- **Client approval required:** For lifecycle decisions only (DEC-12). The separate-additive-feedback direction is already confirmed; source provenance awaits PLAN-01 and does not reopen that direction.

### PLAN-05 â€” Approve artifact policy and URL revocation behavior

- **Description:** Set formats, maximum size, retention, deletion/replacement behavior, quota handling, signed URL lifetime and post-revocation behavior.
- **Expected outcome:** Approved upload and retrieval policy.
- **Dependencies:** PLAN-01; institution privacy/records policy.
- **Priority:** P0.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `docs/phase-3-system-architecture/03_PRIVATE_STORAGE_SECURITY.md`, Phase 4 artifact policy/decision docs, Phase 5 upload/access specs; later `src/pages/ArtifactsPage.tsx`, Supabase Storage service.
- **Acceptance criteria:** Each supported file type/limit and lifecycle rule is explicit; no public object URLs; new signed URLs denied after revocation; remaining validity of existing URLs is specified.
- **Client approval required:** Yes.

### PLAN-06 â€” Approve operational, hosting and audit policies

- **Description:** Identify hosting provider/domain owner, budget/quota thresholds, account/portfolio data-retention and deletion policy, backup/export/recovery owner and schedule, audit event scope/retention, monitoring and restore tests.
- **Expected outcome:** Operations policy suitable for deployment planning.
- **Dependencies:** PLAN-01; client/institution assigns owners.
- **Priority:** P0.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `docs/phase-3-system-architecture/01_SUPABASE_FREE_PLAN_CONSTRAINTS.md`, architecture risk/decision docs, Phase 6 environment/deployment docs; future deployment configuration.
- **Acceptance criteria:** Named owner, protected destination, backup schedule/retention, account and portfolio deletion rules, restore authority/test cadence, host/domain, quota alert threshold and audit rules are recorded.
- **Client approval required:** Yes.

### ENV-01 â€” Establish repository and verify project configuration

- **Description:** Initialize/confirm Git tracking, secret exclusions and approved environment separation; verify Supabase project URL/public key against a client-authorized project without disclosing secrets.
- **Expected outcome:** Reproducible source tracking and verified local configuration.
- **Dependencies:** Client authorizes repository ownership and Supabase project access and confirms a secure public-credential workflow. Hosting/operational decisions in DEC-16 may remain open for this local setup task.
- **Priority:** P1.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `.gitignore`, `.env.example`, `src/services/supabase/client.ts`, repository metadata and environment documentation.
- **Acceptance criteria:** Git tracks intended source; local secrets remain ignored; only public client credentials are exposed to frontend; client initializes against the intended project; no live schema change occurs in this task.
- **Client approval required:** Yes for project access/credentials and repository ownership.

### DB-01 â€” Reconcile and version the database schema as migrations

- **Description:** Review the latest Phase 4 final schema against PLAN-01 and approved decisions, then prepare versioned migrations in the agreed workflow.
- **Expected outcome:** Reviewed, reproducible Supabase schema migration set; no review-only SQL applied blindly.
- **Dependencies:** PLAN-01, PLAN-02 through PLAN-05 as applicable, ENV-01.
- **Priority:** P1.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `docs/phase-4-database-design/04-validation-and-finalization/FINAL_DATABASE_SCHEMA.sql` (reference only), new `supabase/migrations/` artifacts, schema documentation.
- **Acceptance criteria:** Migration matches approved entities/relationships and content; applies to a controlled non-production project; rollback/recovery approach is documented; no student records are seeded.
- **Client approval required:** Yes before applying to any shared/production project; schema review is required before implementation.

### AUTH-01 â€” Implement student Supabase Auth and protected session shell

- **Description:** Build student sign-in, session restore, sign-out, password recovery and protected navigation using Supabase Auth and the approved provisioning workflow.
- **Expected outcome:** Real student identity/session replaces mock identity for student routes.
- **Dependencies:** PLAN-03, DEC-18, ENV-01, DB-01 for profile linkage and account lifecycle.
- **Priority:** P1.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `src/app/App.tsx`, `src/main.tsx`, new auth/session pages and services, `src/services/supabase/`.
- **Acceptance criteria:** Valid provisioned student signs in/out; protected pages deny anonymous access; invalid credentials and recovery errors are clear; session state is not simulated with local role selection.
- **Client approval required:** Yes for provisioning, recovery and account disablement rules.

### AUTH-02 â€” Implement instructor registration with trusted verification

- **Description:** Add instructor registration using the active shared invitation code and trusted role verification; registration cannot self-grant Instructor privileges.
- **Expected outcome:** Individual instructor account linked to a verified role only after approved checks.
- **Dependencies:** AUTH-01 foundations, PLAN-03, DEC-07, DB-01, ADMIN-01.
- **Priority:** P1.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** New registration page/auth service; trusted server-side operation if required; invitation-code schema/migration and RLS policies.
- **Acceptance criteria:** Invalid/disabled/replaced code is rejected; code cannot be enumerated or exposed in logs; role assignment is atomic and trusted; verified but ungranted instructors see no portfolio.
- **Client approval required:** Yes for identity verification and registration operation.

### ADMIN-01 â€” Implement authenticated administrator invitation-code management

- **Description:** Replace local code demo with protected admin workflow for create/reveal/replace/disable/expiry and audit of shared invitation code.
- **Expected outcome:** Only approved administrator accounts manage the code; replacement affects future registrations only.
- **Dependencies:** AUTH-01, PLAN-03, DEC-07, DB-01, SEC-01.
- **Priority:** P1.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `src/pages/AccessPage.tsx` or dedicated admin page, admin service, invitation-code migrations and trusted functions/policies.
- **Acceptance criteria:** Non-admin requests are denied server-side; raw code is not stored; reveal is protected/audited; replacing/disabling does not revoke existing accounts/grants; expiry and audit rules match approval.
- **Client approval required:** Yes.

### SEC-01 â€” Implement core RLS and role/ownership enforcement

- **Description:** Apply deny-by-default RLS for user profiles, student-owned portfolio rows, roles, active instructor grants and administrator-only operations.
- **Expected outcome:** Database, not UI role controls, enforces portfolio ownership and role capabilities.
- **Dependencies:** DB-01, AUTH-01, PLAN-03, DEC-08; feedback policy PLAN-04.
- **Priority:** P1.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** New Supabase migrations/policy files, `src/services/supabase/` data access.
- **Acceptance criteria:** Owner allowed; other student denied; anonymous denied; active verified instructor SELECT only on granted portfolios; revoked/unverified instructor denied; role/ownership fields cannot be changed by untrusted users; policy checks run independently of UI.
- **Client approval required:** Policy model is documented; client approval required for final access scope and role provisioning decisions.

### GRANT-01 â€” Implement student grant/revoke management

- **Description:** Connect student authorization UI to backend records for individually identified instructors, including revocation and audit events.
- **Expected outcome:** A student can grant/revoke access to their own portfolio; grants do not arise from invitation registration.
- **Dependencies:** AUTH-01, AUTH-02, DB-01, SEC-01, DEC-08.
- **Priority:** P1.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `src/pages/AccessPage.tsx`, grant service, `portfolio_access_grants`/event migrations and RLS policies.
- **Acceptance criteria:** Student can only grant/revoke own portfolio; duplicate/unknown instructors handled explicitly; revocation blocks subsequent data and Storage checks; event history records actor/time without sensitive content.
- **Client approval required:** Yes for instructor lookup, scope and open-session semantics.

### DATA-01 â€” Persist student profile and Home Page sections

- **Description:** Replace local profile/Home Page content storage with authenticated database operations and implement profile edit behavior.
- **Expected outcome:** Student-owned profile and four Home sections persist across devices/session changes.
- **Dependencies:** AUTH-01, DB-01, SEC-01, DEC-18, PLAN-01 for confirmed fields/content.
- **Priority:** P2.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `src/pages/HomePage.tsx`, `ProfilePage` in `src/app/App.tsx`, Supabase content service, profile/home schema.
- **Acceptance criteria:** Authenticated owner reads/creates/updates own content; another user cannot read/update it; save/error/loading state is truthful; identity values are sourced from the account/profile, not hard-coded demo constants.
- **Client approval required:** Yes for profile fields and any identity-data source not specified by restored SRS.

### DATA-02 â€” Persist academic structure and reflections

- **Description:** Load approved Level 1 structure/prompts and persist student reflection answers with exact academic context and approved lifecycle.
- **Expected outcome:** Reflections are durable, source-prompt-linked and owner-managed.
- **Dependencies:** PLAN-01, PLAN-02, DEC-13 where draft/published states apply, DEC-18 for retention/deletion, DB-01, AUTH-01, SEC-01.
- **Priority:** P2.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `src/data/level1Content.ts`, `src/app/App.tsx` subject/folder views, `src/pages/ReflectionEditor.tsx`, reflection services/schema.
- **Acceptance criteria:** All approved prompts appear verbatim with evidence instructions; saves persist and reload under correct subject/folder/domain; student edits/deletes only own allowed rows; instructors cannot mutate original answers; no unapproved completion semantics.
- **Client approval required:** Yes for labels/content/lifecycle if not resolved by PLAN-01/PLAN-02/DEC-13.

### ART-01 â€” Implement private artifact Storage and metadata workflow

- **Description:** Replace simulated object URL upload with private Supabase Storage upload, metadata/associations, authorized preview/download and safe deletion.
- **Expected outcome:** Artifacts are private, durable and linked to academic contexts without public URLs.
- **Dependencies:** PLAN-05, DEC-11, DEC-18, DB-01, AUTH-01, SEC-01, GRANT-01 for instructor access.
- **Priority:** P2.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `src/pages/ArtifactsPage.tsx`, reflection artifact picker in `src/pages/ReflectionEditor.tsx`, new Storage/data service, migrations and Storage policies.
- **Acceptance criteria:** Only approved type/size uploads succeed; object and metadata ownership agree; anonymous/unauthorized/ revoked requests fail; signed URLs are short-lived per approval; delete/replacement handles metadata and objects consistently; upload errors/retries are explicit.
- **Client approval required:** Yes for file policy, retention, deletion and signed URL rules.

### DATA-03 â€” Persist PLO evidence and Final Musings

- **Description:** Replace browser storage with authenticated database operations for PLO evidence and five Final Musings responses.
- **Expected outcome:** Durable evidence and reflective responses, with no automated PLO attainment declaration.
- **Dependencies:** AUTH-01, DB-01, SEC-01, ART-01, DEC-18 for evidence associations and deletion behavior, PLAN-01/PLAN-02 for authoritative prompts.
- **Priority:** P2.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `src/pages/PLOPage.tsx`, `src/pages/FinalMusingsPage.tsx`, content data and corresponding services/schema.
- **Acceptance criteria:** Eleven approved PLOs and five approved questions display; evidence association/description/significance/reflection persist; students manage own records; instructors only read authorized records; evidence does not automatically declare attainment.
- **Client approval required:** Yes if official content or edit/delete lifecycle differs from approved sources.

### INSTR-01 â€” Implement authorized instructor portfolio viewer

- **Description:** Replace static local summary with a data-backed, read-only viewer for active student grants and approved visibility scope.
- **Expected outcome:** Verified instructor sees only portfolios and sections authorized by active grants.
- **Dependencies:** AUTH-02, GRANT-01, SEC-01, DATA-01, DATA-02, ART-01, DATA-03, DEC-08.
- **Priority:** P2.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `src/pages/AccessPage.tsx` or dedicated instructor pages, route shell, data services and RLS/Storage policies.
- **Acceptance criteria:** No public directory; active grant required for every read/download; original content has no mutation controls and backend denies writes; revoked access fails on subsequent checks; viewer scope matches approval.
- **Client approval required:** Yes for section visibility and open-session behavior.

### INSTR-02 â€” Implement separate instructor reviews and feedback

- **Description:** Replace local feedback records with authorized database-backed review/feedback creation and student read view under approved lifecycle.
- **Expected outcome:** Attributed instructor guidance remains separate from student-owned records.
- **Dependencies:** PLAN-04, AUTH-02, GRANT-01, SEC-01, DB-01, INSTR-01.
- **Priority:** P2.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `src/pages/FeedbackPage.tsx`, feedback services/schema, RLS policies, Phase 1/3 documentation revisions.
- **Acceptance criteria:** Only verified active-grant instructor may create within authorized portfolio; student can read own feedback; original rows remain unchanged; edit/delete/publish/reply/notification behavior follows recorded policy.
- **Client approval required:** Yes for authority confirmation and lifecycle rules.

### ROUTE-01 â€” Add URL-based routing and route-aware breadcrumbs

- **Description:** Replace in-memory page switching with URL routes, browser history/deep-link behavior and accessible route-aware breadcrumb navigation.
- **Expected outcome:** Reloadable/shareable authenticated routes with clear current academic context.
- **Dependencies:** AUTH-01 for protected route behavior; PLAN-01/PLAN-02 for final sitemap/content routes.
- **Priority:** P2.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `src/app/App.tsx`, `src/main.tsx`, `package.json` if a router is selected, navigation components.
- **Acceptance criteria:** Direct URL and refresh resolve correctly; back/forward works; protected routes redirect/deny correctly; breadcrumbs reflect hierarchy and provide accessible parent navigation; no selected subject is lost on refresh.
- **Client approval required:** No for implementation; client approval required if sitemap changes are proposed.

### UX-01 â€” Close Phase 5 visual and accessibility implementation gaps

- **Description:** Finalize annotated screens/specifications and verify the prototype against responsive, keyboard, focus, screen-reader, reduced-motion and contrast requirements.
- **Expected outcome:** Measurable screen-level UI acceptance rather than prose-only high-fidelity claims.
- **Dependencies:** PLAN-01, PLAN-02, DEC-17, relevant feature screens.
- **Priority:** P2.
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** `src/styles/styles.css`, page components, Phase 5 visual/accessibility and acceptance documents.
- **Acceptance criteria:** Annotated reviewed designs exist; viewport and contrast thresholds are explicit; keyboard/focus/error announcements and reduced motion are verified; critical Phase 5 audit gaps are closed or accepted with rationale.
- **Client approval required:** Yes for final visual identity and design sign-off.

### OPS-01 â€” Implement backup, export, recovery and deployment operations

- **Description:** Configure approved hosting and protected backup/export/restore process, monitoring and operational runbook.
- **Expected outcome:** Recoverable production operation with explicit owner and cost/quota boundaries.
- **Dependencies:** PLAN-06, DEC-14, DEC-15, DEC-16, ENV-01; production data platform setup.
- **Priority:** P3 (release blocker despite lower feature priority).
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** New deployment configuration, backup/export scripts or provider configuration, operational runbook and environment docs.
- **Acceptance criteria:** Approved host/domain and ownership documented; encrypted/protected exports include database/files/Auth/configuration as approved; restore test succeeds; monitoring and quota escalation exist; rollback/recovery responsibilities are assigned.
- **Client approval required:** Yes.

### QA-01 â€” Execute acceptance, security and release verification

- **Description:** Verify all approved acceptance criteria across roles, data isolation, file access, revocation, responsive/accessibility, recovery and release readiness.
- **Expected outcome:** Evidence-based release recommendation tied to requirements and risks.
- **Dependencies:** PLAN-01; all applicable AUTH/SEC/GRANT/DATA/ART/INSTR/ROUTE/UX/OPS tasks.
- **Priority:** P3 (required before release).
- **Relevant roadmap phase:** See the task-to-phase crosswalk at the end of this backlog; supplied roadmap v2.0 approval is pending.
- **Files/components affected:** Acceptance/traceability reports and implementation test artifacts; no single feature component.
- **Acceptance criteria:** Every required criterion has a recorded pass/fail/deferred result; negative authorization cases are verified independently of UI; outstanding risks have named disposition; no â€œcompleteâ€ claim is based on design documents alone.
- **Client approval required:** Client sign-off required for release and accepted deferrals.

## Backlog boundary

This backlog is a planning artifact. Roadmap phase assignments follow UPDATED PROJECT ROADMAP.pdf v2.0, pending formal approval. It does not authorize code changes, schema execution, credentials access, deployment, or changes to academic source content.



## Requirements Finalization addendum (13 November 2026)

Decision status is authoritative in 02-requirements-conflicts-and-client-decisions.md. PLAN-04 does not reopen the confirmed separate-feedback direction; only lifecycle decisions remain. PLAN-02 does not reopen confirmed academic structure. Preserve all 18 phases named in the supplied v2.0 roadmap, pending formal approval. No item authorizes implementation without its dependencies.


### PLAN-02 status update (13 November 2026)

The official PDF confirms eight independent MED 102 sections, with required evidence, competencies, shared reflection guide, and pertinent artifacts. Four MED 102 parent folders are not a requirement or an open client decision. The reviewed schema stores independent learning_domains linked to the subject with nullable parent_folder_id; no schema change is required. Implementation must remove proposed parent cards from future UI requirements.

## Roadmap v2.0 task alignment

Planning crosswalk: PLAN-01 -> 1-5; PLAN-02 -> 2,10; PLAN-03 -> 1,3,4,8,14; PLAN-04 -> 1,3,4,14; PLAN-05 -> 1,3,4,12,14; PLAN-06 -> 1,3,6,17,18; ENV-01 -> 6; DB-01 -> 4,7; AUTH-01/AUTH-02/ROUTE-01 -> 8; DATA-01 -> 9; DATA-02 -> 10,11; ART-01 -> 12; DATA-03 -> 13; ADMIN-01/GRANT-01/INSTR-01/INSTR-02 -> 14; SEC-01 -> 7,8,14; QA-01 -> 15,16; OPS-01 -> 17,18; UX-01 -> 5,15. Phase 7 must not begin until its documented reconciliation and approval gate is met. Its read-only instructor permission checklist conflicts with the confirmed separate feedback rule and requires documented correction.
