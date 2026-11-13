# Implementation Backlog

**Status:** Proposed backlog; no tasks in this file have been implemented.  
**Source of truth:** `docs/VERIFIED_IMPLEMENTATION_PLAN.md` and `02-requirements-conflicts-and-client-decisions.md`.  
**Roadmap limitation:** The master roadmap is unavailable. â€œAvailable phase referenceâ€ uses extant Phase 1â€“6 document names and, where applicable, â€œPhase 7 planningâ€ as named in the Phase 6 validation report. It does not claim to reproduce roadmap phase numbering.

Priority definitions: **P0** = source/policy gate that blocks dependent implementation; **P1** = foundation/security needed before production feature work; **P2** = feature completion after foundations; **P3** = release hardening or conditional scope.

`PLAN-*` identifiers are backlog tasks. `DEC-*` identifiers refer to the separate decision register in `02-requirements-conflicts-and-client-decisions.md`. The planning tasks address these decision-register entries: PLAN-01 → DEC-01/DEC-02; PLAN-02 → DEC-09; PLAN-03 → DEC-05–DEC-07; PLAN-04 → DEC-04/DEC-12; PLAN-05 → DEC-10/DEC-11; PLAN-06 → DEC-14–DEC-16 and DEC-18. DEC-08 is a dependency of GRANT-01/INSTR-01; DEC-13 is relevant to DATA-02; DEC-17 is a dependency of UX-01. These mappings organize resolution work; they do not mark any decision approved.

## Backlog tasks

### PLAN-01 â€” Restore authoritative requirements and build source crosswalk

- **Description:** Obtain the approved SRS, original Level 1 PDF and master roadmap; reconcile stable requirement IDs, source pages, decisions and roadmap mapping.
- **Expected outcome:** Traceable, source-verified baseline without inferred content.
- **Dependencies:** Client supplies originals or approved replacements.
- **Priority:** P0.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 1 requirements; Phase 2 academic content; Phase 5 UI/UX; roadmap phase number unverified.
- **Files/components affected:** `docs/phase-1-requirements/REQUIREMENTS_TRACEABILITY_MATRIX.md`, `docs/phase-2-academic-content/`, `docs/VERIFIED_IMPLEMENTATION_PLAN.md`, new crosswalk/decision records.
- **Acceptance criteria:** Each in-scope requirement links to an authoritative source/section or approved decision; missing and superseded content is explicitly flagged; the roadmap phase mapping is sourced from the restored roadmap.
- **Client approval required:** Yes, for authoritative replacement/version and unresolved requirements.

### PLAN-02 â€” Approve academic labels and MED 102 grouping

- **Description:** Validate subject folder labels, MED 102's eight-domain-to-four-folder grouping, and any MED 103 labels against the original source and client decisions.
- **Expected outcome:** Approved academic configuration; eight MED 102 domains remain independently addressable.
- **Dependencies:** PLAN-01.
- **Priority:** P0.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 2 academic content; Phase 5 UI/UX.
- **Files/components affected:** `src/data/level1Content.ts` (later implementation), `docs/phase-2-academic-content/02_FOLDER_MAPPING_DECISIONS.md`, `docs/phase-5-ui-ux-design/` content specs.
- **Acceptance criteria:** Every displayed label and prompt has a source reference or explicit approval; all 3 subjects, 12 main folders, 8 domains, 11 PLOs and 5 Final Musings prompts are represented as approved; no invented questions.
- **Client approval required:** Yes.

### PLAN-03 â€” Resolve account provisioning and identity workflows

- **Description:** Define student provisioning/recovery/disablement, instructor identity verification, admin provisioning and registration failure handling.
- **Expected outcome:** Trusted role lifecycle with no self-assigned roles.
- **Dependencies:** PLAN-01; institution identifies responsible operators.
- **Priority:** P0.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 3 architecture; Phase 4 database design; roadmap mapping unverified.
- **Files/components affected:** `docs/phase-3-system-architecture/03_AUTHENTICATION_ARCHITECTURE.md`, `docs/phase-4-database-design/04-validation-and-finalization/DATABASE_DECISION_REGISTER.md`; later Auth pages/services.
- **Acceptance criteria:** Account creation, verification, password recovery, disablement, role assignment and support ownership are documented; instructor registration cannot assign trusted role without approved verification.
- **Client approval required:** Yes.

### PLAN-04 â€” Reconcile instructor feedback policy and lifecycle

- **Description:** Record source authority for separate instructor feedback and decide draft/publish, edit/delete, reply, notification, review cadence and retention.
- **Expected outcome:** Consistent policy across Phase 1, Phase 3, Phase 4, Phase 5, traceability and implementation.
- **Dependencies:** PLAN-01.
- **Priority:** P0.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 3 architecture revision; Phase 4 final decision register; Phase 5 UI/UX.
- **Files/components affected:** Phase 1 role/permission and acceptance docs; Phase 3 role matrix/RLS/blueprint/traceability; Phase 4 decision register/schema; Phase 5 specs; later `src/pages/FeedbackPage.tsx`.
- **Acceptance criteria:** Separate feedback is explicitly confirmed or rejected by the authoritative client record; stale restrictions are revised with history; feedback can never mutate student original content; lifecycle rules are testable.
- **Client approval required:** Yes, including source/provenance confirmation.

### PLAN-05 â€” Approve artifact policy and URL revocation behavior

- **Description:** Set formats, maximum size, retention, deletion/replacement behavior, quota handling, signed URL lifetime and post-revocation behavior.
- **Expected outcome:** Approved upload and retrieval policy.
- **Dependencies:** PLAN-01; institution privacy/records policy.
- **Priority:** P0.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 3 private Storage; Phase 4 database design; Phase 5 UI/UX.
- **Files/components affected:** `docs/phase-3-system-architecture/03_PRIVATE_STORAGE_SECURITY.md`, Phase 4 artifact policy/decision docs, Phase 5 upload/access specs; later `src/pages/ArtifactsPage.tsx`, Supabase Storage service.
- **Acceptance criteria:** Each supported file type/limit and lifecycle rule is explicit; no public object URLs; new signed URLs denied after revocation; remaining validity of existing URLs is specified.
- **Client approval required:** Yes.

### PLAN-06 â€” Approve operational, hosting and audit policies

- **Description:** Identify hosting provider/domain owner, budget/quota thresholds, account/portfolio data-retention and deletion policy, backup/export/recovery owner and schedule, audit event scope/retention, monitoring and restore tests.
- **Expected outcome:** Operations policy suitable for deployment planning.
- **Dependencies:** PLAN-01; client/institution assigns owners.
- **Priority:** P0.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 3 risk/decision register; Phase 6 environment; roadmap mapping unverified.
- **Files/components affected:** `docs/phase-3-system-architecture/01_SUPABASE_FREE_PLAN_CONSTRAINTS.md`, architecture risk/decision docs, Phase 6 environment/deployment docs; future deployment configuration.
- **Acceptance criteria:** Named owner, protected destination, backup schedule/retention, account and portfolio deletion rules, restore authority/test cadence, host/domain, quota alert threshold and audit rules are recorded.
- **Client approval required:** Yes.

### ENV-01 â€” Establish repository and verify project configuration

- **Description:** Initialize/confirm Git tracking, secret exclusions and approved environment separation; verify Supabase project URL/public key against a client-authorized project without disclosing secrets.
- **Expected outcome:** Reproducible source tracking and verified local configuration.
- **Dependencies:** Client authorizes repository ownership and Supabase project access and confirms a secure public-credential workflow. Hosting/operational decisions in DEC-16 may remain open for this local setup task.
- **Priority:** P1.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 6 environment; â€œPhase 7 planningâ€ per Phase 6 readiness report.
- **Files/components affected:** `.gitignore`, `.env.example`, `src/services/supabase/client.ts`, repository metadata and environment documentation.
- **Acceptance criteria:** Git tracks intended source; local secrets remain ignored; only public client credentials are exposed to frontend; client initializes against the intended project; no live schema change occurs in this task.
- **Client approval required:** Yes for project access/credentials and repository ownership.

### DB-01 â€” Reconcile and version the database schema as migrations

- **Description:** Review the latest Phase 4 final schema against PLAN-01 and approved decisions, then prepare versioned migrations in the agreed workflow.
- **Expected outcome:** Reviewed, reproducible Supabase schema migration set; no review-only SQL applied blindly.
- **Dependencies:** PLAN-01, PLAN-02 through PLAN-05 as applicable, ENV-01.
- **Priority:** P1.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 4 database design; Phase 7 planning per Phase 6 report.
- **Files/components affected:** `docs/phase-4-database-design/04-validation-and-finalization/FINAL_DATABASE_SCHEMA.sql` (reference only), new `supabase/migrations/` artifacts, schema documentation.
- **Acceptance criteria:** Migration matches approved entities/relationships and content; applies to a controlled non-production project; rollback/recovery approach is documented; no student records are seeded.
- **Client approval required:** Yes before applying to any shared/production project; schema review is required before implementation.

### AUTH-01 â€” Implement student Supabase Auth and protected session shell

- **Description:** Build student sign-in, session restore, sign-out, password recovery and protected navigation using Supabase Auth and the approved provisioning workflow.
- **Expected outcome:** Real student identity/session replaces mock identity for student routes.
- **Dependencies:** PLAN-03, DEC-18, ENV-01, DB-01 for profile linkage and account lifecycle.
- **Priority:** P1.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 3 authentication architecture; Phase 7 planning per Phase 6 report.
- **Files/components affected:** `src/app/App.tsx`, `src/main.tsx`, new auth/session pages and services, `src/services/supabase/`.
- **Acceptance criteria:** Valid provisioned student signs in/out; protected pages deny anonymous access; invalid credentials and recovery errors are clear; session state is not simulated with local role selection.
- **Client approval required:** Yes for provisioning, recovery and account disablement rules.

### AUTH-02 â€” Implement instructor registration with trusted verification

- **Description:** Add instructor registration using the active shared invitation code and trusted role verification; registration cannot self-grant Instructor privileges.
- **Expected outcome:** Individual instructor account linked to a verified role only after approved checks.
- **Dependencies:** AUTH-01 foundations, PLAN-03, DEC-07, DB-01, ADMIN-01.
- **Priority:** P1.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 3 authentication/authorization; Phase 4 final design; Phase 7 planning per Phase 6 report.
- **Files/components affected:** New registration page/auth service; trusted server-side operation if required; invitation-code schema/migration and RLS policies.
- **Acceptance criteria:** Invalid/disabled/replaced code is rejected; code cannot be enumerated or exposed in logs; role assignment is atomic and trusted; verified but ungranted instructors see no portfolio.
- **Client approval required:** Yes for identity verification and registration operation.

### ADMIN-01 â€” Implement authenticated administrator invitation-code management

- **Description:** Replace local code demo with protected admin workflow for create/reveal/replace/disable/expiry and audit of shared invitation code.
- **Expected outcome:** Only approved administrator accounts manage the code; replacement affects future registrations only.
- **Dependencies:** AUTH-01, PLAN-03, DEC-07, DB-01, SEC-01.
- **Priority:** P1.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 4 invitation-code model; Phase 5 admin UI; roadmap phase unverified.
- **Files/components affected:** `src/pages/AccessPage.tsx` or dedicated admin page, admin service, invitation-code migrations and trusted functions/policies.
- **Acceptance criteria:** Non-admin requests are denied server-side; raw code is not stored; reveal is protected/audited; replacing/disabling does not revoke existing accounts/grants; expiry and audit rules match approval.
- **Client approval required:** Yes.

### SEC-01 â€” Implement core RLS and role/ownership enforcement

- **Description:** Apply deny-by-default RLS for user profiles, student-owned portfolio rows, roles, active instructor grants and administrator-only operations.
- **Expected outcome:** Database, not UI role controls, enforces portfolio ownership and role capabilities.
- **Dependencies:** DB-01, AUTH-01, PLAN-03, DEC-08; feedback policy PLAN-04.
- **Priority:** P1.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 3 RLS design; Phase 4 security readiness; Phase 7 planning per Phase 6 report.
- **Files/components affected:** New Supabase migrations/policy files, `src/services/supabase/` data access.
- **Acceptance criteria:** Owner allowed; other student denied; anonymous denied; active verified instructor SELECT only on granted portfolios; revoked/unverified instructor denied; role/ownership fields cannot be changed by untrusted users; policy checks run independently of UI.
- **Client approval required:** Policy model is documented; client approval required for final access scope and role provisioning decisions.

### GRANT-01 â€” Implement student grant/revoke management

- **Description:** Connect student authorization UI to backend records for individually identified instructors, including revocation and audit events.
- **Expected outcome:** A student can grant/revoke access to their own portfolio; grants do not arise from invitation registration.
- **Dependencies:** AUTH-01, AUTH-02, DB-01, SEC-01, DEC-08.
- **Priority:** P1.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 3 authorization flow; Phase 4 access model; Phase 5 access UI.
- **Files/components affected:** `src/pages/AccessPage.tsx`, grant service, `portfolio_access_grants`/event migrations and RLS policies.
- **Acceptance criteria:** Student can only grant/revoke own portfolio; duplicate/unknown instructors handled explicitly; revocation blocks subsequent data and Storage checks; event history records actor/time without sensitive content.
- **Client approval required:** Yes for instructor lookup, scope and open-session semantics.

### DATA-01 â€” Persist student profile and Home Page sections

- **Description:** Replace local profile/Home Page content storage with authenticated database operations and implement profile edit behavior.
- **Expected outcome:** Student-owned profile and four Home sections persist across devices/session changes.
- **Dependencies:** AUTH-01, DB-01, SEC-01, DEC-18, PLAN-01 for confirmed fields/content.
- **Priority:** P2.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 1 requirements; Phase 4 content schema; Phase 5 student UI.
- **Files/components affected:** `src/pages/HomePage.tsx`, `ProfilePage` in `src/app/App.tsx`, Supabase content service, profile/home schema.
- **Acceptance criteria:** Authenticated owner reads/creates/updates own content; another user cannot read/update it; save/error/loading state is truthful; identity values are sourced from the account/profile, not hard-coded demo constants.
- **Client approval required:** Yes for profile fields and any identity-data source not specified by restored SRS.

### DATA-02 â€” Persist academic structure and reflections

- **Description:** Load approved Level 1 structure/prompts and persist student reflection answers with exact academic context and approved lifecycle.
- **Expected outcome:** Reflections are durable, source-prompt-linked and owner-managed.
- **Dependencies:** PLAN-01, PLAN-02, DEC-13 where draft/published states apply, DEC-18 for retention/deletion, DB-01, AUTH-01, SEC-01.
- **Priority:** P2.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 2 academic content; Phase 4 schema; Phase 5 reflection UI.
- **Files/components affected:** `src/data/level1Content.ts`, `src/app/App.tsx` subject/folder views, `src/pages/ReflectionEditor.tsx`, reflection services/schema.
- **Acceptance criteria:** All approved prompts appear verbatim with evidence instructions; saves persist and reload under correct subject/folder/domain; student edits/deletes only own allowed rows; instructors cannot mutate original answers; no unapproved completion semantics.
- **Client approval required:** Yes for labels/content/lifecycle if not resolved by PLAN-01/PLAN-02/DEC-13.

### ART-01 â€” Implement private artifact Storage and metadata workflow

- **Description:** Replace simulated object URL upload with private Supabase Storage upload, metadata/associations, authorized preview/download and safe deletion.
- **Expected outcome:** Artifacts are private, durable and linked to academic contexts without public URLs.
- **Dependencies:** PLAN-05, DEC-11, DEC-18, DB-01, AUTH-01, SEC-01, GRANT-01 for instructor access.
- **Priority:** P2.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 3 private Storage; Phase 4 Storage metadata; Phase 5 artifact UI.
- **Files/components affected:** `src/pages/ArtifactsPage.tsx`, reflection artifact picker in `src/pages/ReflectionEditor.tsx`, new Storage/data service, migrations and Storage policies.
- **Acceptance criteria:** Only approved type/size uploads succeed; object and metadata ownership agree; anonymous/unauthorized/ revoked requests fail; signed URLs are short-lived per approval; delete/replacement handles metadata and objects consistently; upload errors/retries are explicit.
- **Client approval required:** Yes for file policy, retention, deletion and signed URL rules.

### DATA-03 â€” Persist PLO evidence and Final Musings

- **Description:** Replace browser storage with authenticated database operations for PLO evidence and five Final Musings responses.
- **Expected outcome:** Durable evidence and reflective responses, with no automated PLO attainment declaration.
- **Dependencies:** AUTH-01, DB-01, SEC-01, ART-01, DEC-18 for evidence associations and deletion behavior, PLAN-01/PLAN-02 for authoritative prompts.
- **Priority:** P2.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 2 academic content; Phase 4 schema; Phase 5 global sections.
- **Files/components affected:** `src/pages/PLOPage.tsx`, `src/pages/FinalMusingsPage.tsx`, content data and corresponding services/schema.
- **Acceptance criteria:** Eleven approved PLOs and five approved questions display; evidence association/description/significance/reflection persist; students manage own records; instructors only read authorized records; evidence does not automatically declare attainment.
- **Client approval required:** Yes if official content or edit/delete lifecycle differs from approved sources.

### INSTR-01 â€” Implement authorized instructor portfolio viewer

- **Description:** Replace static local summary with a data-backed, read-only viewer for active student grants and approved visibility scope.
- **Expected outcome:** Verified instructor sees only portfolios and sections authorized by active grants.
- **Dependencies:** AUTH-02, GRANT-01, SEC-01, DATA-01, DATA-02, ART-01, DATA-03, DEC-08.
- **Priority:** P2.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 3 authorization; Phase 4 access schema; Phase 5 instructor navigation/viewer.
- **Files/components affected:** `src/pages/AccessPage.tsx` or dedicated instructor pages, route shell, data services and RLS/Storage policies.
- **Acceptance criteria:** No public directory; active grant required for every read/download; original content has no mutation controls and backend denies writes; revoked access fails on subsequent checks; viewer scope matches approval.
- **Client approval required:** Yes for section visibility and open-session behavior.

### INSTR-02 â€” Implement separate instructor reviews and feedback

- **Description:** Replace local feedback records with authorized database-backed review/feedback creation and student read view under approved lifecycle.
- **Expected outcome:** Attributed instructor guidance remains separate from student-owned records.
- **Dependencies:** PLAN-04, AUTH-02, GRANT-01, SEC-01, DB-01, INSTR-01.
- **Priority:** P2.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 4 revised final model; Phase 5 feedback UI; Phase 3 documentation reconciliation.
- **Files/components affected:** `src/pages/FeedbackPage.tsx`, feedback services/schema, RLS policies, Phase 1/3 documentation revisions.
- **Acceptance criteria:** Only verified active-grant instructor may create within authorized portfolio; student can read own feedback; original rows remain unchanged; edit/delete/publish/reply/notification behavior follows recorded policy.
- **Client approval required:** Yes for authority confirmation and lifecycle rules.

### ROUTE-01 â€” Add URL-based routing and route-aware breadcrumbs

- **Description:** Replace in-memory page switching with URL routes, browser history/deep-link behavior and accessible route-aware breadcrumb navigation.
- **Expected outcome:** Reloadable/shareable authenticated routes with clear current academic context.
- **Dependencies:** AUTH-01 for protected route behavior; PLAN-01/PLAN-02 for final sitemap/content routes.
- **Priority:** P2.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 5 sitemap/navigation; roadmap implementation phase unverified.
- **Files/components affected:** `src/app/App.tsx`, `src/main.tsx`, `package.json` if a router is selected, navigation components.
- **Acceptance criteria:** Direct URL and refresh resolve correctly; back/forward works; protected routes redirect/deny correctly; breadcrumbs reflect hierarchy and provide accessible parent navigation; no selected subject is lost on refresh.
- **Client approval required:** No for implementation; client approval required if sitemap changes are proposed.

### UX-01 â€” Close Phase 5 visual and accessibility implementation gaps

- **Description:** Finalize annotated screens/specifications and verify the prototype against responsive, keyboard, focus, screen-reader, reduced-motion and contrast requirements.
- **Expected outcome:** Measurable screen-level UI acceptance rather than prose-only high-fidelity claims.
- **Dependencies:** PLAN-01, PLAN-02, DEC-17, relevant feature screens.
- **Priority:** P2.
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 5 UI/UX design and completion audit.
- **Files/components affected:** `src/styles/styles.css`, page components, Phase 5 visual/accessibility and acceptance documents.
- **Acceptance criteria:** Annotated reviewed designs exist; viewport and contrast thresholds are explicit; keyboard/focus/error announcements and reduced motion are verified; critical Phase 5 audit gaps are closed or accepted with rationale.
- **Client approval required:** Yes for final visual identity and design sign-off.

### OPS-01 â€” Implement backup, export, recovery and deployment operations

- **Description:** Configure approved hosting and protected backup/export/restore process, monitoring and operational runbook.
- **Expected outcome:** Recoverable production operation with explicit owner and cost/quota boundaries.
- **Dependencies:** PLAN-06, DEC-14, DEC-15, DEC-16, ENV-01; production data platform setup.
- **Priority:** P3 (release blocker despite lower feature priority).
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 3 risk/Free Plan decisions; Phase 6 environment; later deployment phase unknown.
- **Files/components affected:** New deployment configuration, backup/export scripts or provider configuration, operational runbook and environment docs.
- **Acceptance criteria:** Approved host/domain and ownership documented; encrypted/protected exports include database/files/Auth/configuration as approved; restore test succeeds; monitoring and quota escalation exist; rollback/recovery responsibilities are assigned.
- **Client approval required:** Yes.

### QA-01 â€” Execute acceptance, security and release verification

- **Description:** Verify all approved acceptance criteria across roles, data isolation, file access, revocation, responsive/accessibility, recovery and release readiness.
- **Expected outcome:** Evidence-based release recommendation tied to requirements and risks.
- **Dependencies:** PLAN-01; all applicable AUTH/SEC/GRANT/DATA/ART/INSTR/ROUTE/UX/OPS tasks.
- **Priority:** P3 (required before release).
- **Relevant existing roadmap phase (phase mapping unverified):** Phase 1 acceptance criteria; Phase 3/4 scenario validation; Phase 5 completion audit; roadmap phase unverified.
- **Files/components affected:** Acceptance/traceability reports and implementation test artifacts; no single feature component.
- **Acceptance criteria:** Every required criterion has a recorded pass/fail/deferred result; negative authorization cases are verified independently of UI; outstanding risks have named disposition; no â€œcompleteâ€ claim is based on design documents alone.
- **Client approval required:** Client sign-off required for release and accepted deferrals.

## Backlog boundary

This backlog is a planning artifact. It does not authorize code changes, schema execution, credentials access, deployment, or changes to academic source content. Roadmap phase assignments must be updated after the missing roadmap is restored.


