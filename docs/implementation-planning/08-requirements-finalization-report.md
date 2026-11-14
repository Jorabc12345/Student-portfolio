# Requirements Finalization Report

**Status:** Planning review complete; no feature implementation performed.  
**Review date:** 13 November 2026.  
**Decision register:** `02-requirements-conflicts-and-client-decisions.md` (DEC-01–DEC-18).  
**Scope:** Planning review snapshot dated before the owner supplied the updated SRS and roadmap v2.0; see the source update at the end.

## 1. Confirmed requirements and provisional assumptions

### Confirmed direction

- Approved technical baseline is Supabase PostgreSQL, Supabase Auth, private Supabase Storage and RLS. Laravel, Sanctum, MySQL and Firebase references are historical/superseded by Phase 3/4.
- Level 1 has MED 101, MED 102 and MED 103. MED 101 and MED 103 each have four Bimonthly sections; MED 102 has eight independent source-confirmed domains.
- Home Page, PLO Attainment and Final Musings are separate global sections; available content has 11 PLOs and five Final Musings prompts. No automatic PLO attainment. Patient-identifiable information is prohibited.
- Portfolio records are student-owned/private. Student explicitly grants/revokes instructor access. Registration does not grant portfolio access; no public directory/automatic assignment. Revocation blocks subsequent authorization checks and issuance of new signed URLs.
- Authorized instructors may add separate reviews/feedback without changing student originals. Instructor registration uses a current client-issued shared code; multiple instructors may use it. Validation and role assignment occur atomically through a trusted operation. Replacing/disabling the code affects future registration only, not extant accounts/grants.
- The supplied UPDATED PROJECT ROADMAP.pdf v2.0 names the existing 18 phases; this report's prior unavailable-file statement is historical and superseded. Formal approval remains pending.

The Phase 2 records now treat all eight MED 102 domains as independent sections; no parent-folder semantics remain open.

### Provisional, not approved


- Full prompt-by-prompt crosswalk against the official PDF has not been completed in this task; the source PDF is now available.
- Prototype upload types/10 MB limit and sample behavior.
- All feedback lifecycle controls beyond the confirmed separate additive model.
- Instructor eligibility/search/scope/expiry and treatment of cached/open-session data or already issued URLs.
- Account provisioning/recovery/retention/deletion; admin operator/process; artifact retention/deletion; audit retention; hosting, domain, budget, backups/recovery; optional progress states; final visual/accessibility thresholds.

## 2. Decisions still requiring client/institution approval

| Decision | Approval/input required | Backlog blocked |
|---|---|---|
| DEC-01/02 authoritative sources | Supply approved SRS and existing roadmap (or approved versioned replacements). The official instructions PDF is available and inspected. | PLAN-01 SRS/source crosswalk and roadmap phase mapping; exact PDF content has been checked. |
| DEC-05 student lifecycle | Provisioning, identity checks, password recovery/support, disablement and session lifecycle. | PLAN-03; AUTH-01; dependent data/RLS tasks. |
| DEC-06/07 trusted roles and admin | Instructor identity-verification operator/process; authorized administrator identity/provisioning; code issuance/reveal/expiry, safeguards, audit and emergency process. Shared-code model is already confirmed. | PLAN-03; AUTH-02; ADMIN-01; trusted role policies. |
| DEC-08 access grant details | Instructor eligibility/lookup, whole portfolio vs selected sections, grant expiry, cached/open sessions and post-revocation treatment of existing URLs. Student grant/revoke control is confirmed. | GRANT-01; SEC-01 scope; INSTR-01; ART-01 URL behavior. |
| DEC-09 MED 102 structure | Eight independent official domains; evidence, competencies, shared reflection guide, and artifacts confirmed. No parent folders. | No client approval; PLAN-02 implements direct-domain navigation. |
| DEC-10/11 artifacts and URL lifetime | Allowed types/size/quota, retention, replacement/deletion, sensitive-content review, URL expiry and existing-URL behavior. | PLAN-05; ART-01; related RLS/Storage acceptance. |
| DEC-12 feedback lifecycle | Draft/publication/immediate visibility; edit/delete and revision rules; student acknowledgement/reply/report; notification; cadence and history retention. Core separate feedback is confirmed. | PLAN-04 lifecycle; DB-01 final feedback model; INSTR-02. |
| DEC-13 optional progress | Whether to add dashboard/status features and define calculations. Not required for baseline if deferred. | Only conditional DATA-02/progress scope. |
| DEC-14/15 audit and recovery | Event set, visibility and retention; backup/export owner, destination, schedule, security, retention, restore authority and test cadence. | PLAN-06; OPS-01; audit/backup release readiness. |
| DEC-16 operations | Host/domain ownership, budget/quota thresholds and escalation. | PLAN-06; OPS-01 deployment. |
| DEC-17 presentation acceptance | Identity assets and measurable accessibility/responsive criteria. | UX-01 sign-off. |
| DEC-18 retention/deletion | Account/portfolio policy, retention periods, holds and audit-history treatment. | PLAN-06; AUTH lifecycle; content cleanup; OPS-01. |

These are decisions genuinely left open by available records; do not substitute prototype defaults or assumed institutional rules.

## 3. Documentation conflicts

1. Older Phase 1/3 and some top-level Phase 4 records say instructors are read-only/no-feedback or refer to trusted faculty assignment. Latest Phase 4 final decisions and Phase 5 specifications establish separate additive feedback and student-controlled grants. Treat older wording as stale and reconcile editorially; do not request approval again for the confirmed direction. Phase 1 overview/summary includes internally inconsistent feedback statements.
Current structure: MED 101 and MED 103 each have four Bimonthly sections; MED 102 has eight independent domains and no parent-folder layer.
3. Historical SRS/roadmap backend references (Laravel REST/Sanctum/MySQL) conflict with the later approved Supabase architecture. Direct SRS verification is impossible because the SRS is absent; follow the later approved architecture.
4. Earlier planning docs described the roadmap as unavailable at that review time. UPDATED PROJECT ROADMAP.pdf v2.0 now supplies the 18 named phases; formal approval remains pending.
5. Phase 5 completion audit is marked NEEDS REVISION. Phase 4 final SQL/schema is review/design material; it is not evidence of a deployed schema.

## 4. Work that can proceed without additional approval

- Editorial reconciliation of stale Phase 1/3/older Phase 4 feedback and access statements to the already confirmed later Phase 4/5 direction, preserving history and open lifecycle decisions.
- Restore/read-only inventory of the requested authoritative source files when supplied; source crosswalk preparation without making inferred text normative.
- Non-mutating review of the Phase 4 schema against confirmed ownership, roles, grants, invitation, and feedback boundaries, explicitly leaving undecided policy fields provisional. No migrations or DB changes are authorized by this plan.
- Implementation planning and mapping against the 18-phase roadmap once the actual file is available, without changing its phases.
- ENV-01 is reported complete in `07-env-01-completion-report.md`; it need not be repeated absent a configuration change.

No production feature task is fully free of dependencies under the current backlog. In particular, authentication, RLS, storage and instructor flows depend on unresolved identity, scope, artifact or retention decisions. The above are planning/documentation tasks only.

## 5. Blocked tasks and dependency summary

| Backlog task | Blocking decisions/source | Key technical dependencies |
|---|---|---|
| PLAN-01 | DEC-01/02 sources absent; roadmap mapping cannot be verified. | None; source receipt. |
| PLAN-02 | Official MED 102 domain structure and source content are confirmed; prototype parent cards are a known implementation gap. | Implement eight direct domain sections and source text; no client approval required. |
| PLAN-03 | DEC-05/06/07 account, identity-verification and administrator workflows. | PLAN-01 as applicable. |
| PLAN-04 | DEC-12 feedback lifecycle only; core separate feedback direction is settled. | PLAN-01 for source provenance; feedback-specific DB/policy work. |
| PLAN-05 | DEC-10/11 file policy and signed URL lifetime/revocation behavior. | PLAN-01 and institutional privacy/records policy. |
| PLAN-06 / OPS-01 | DEC-14/15/16/18 audit, backup/recovery, hosting and deletion/retention. | ENV-01 (complete), DB/storage as applicable. |
| DB-01 | Finalize only after PLAN-01 and relevant PLAN-02–05 decisions; do not encode open policy as settled. | ENV-01 complete; controlled environment and explicit execution authorization for any apply. |
| AUTH-01 | DEC-05 and DEC-18 account lifecycle; role model depends on PLAN-03. | DB-01 reviewed, ENV-01 complete. |
| AUTH-02 / ADMIN-01 | DEC-06/07 identity verification and admin/code safeguards. | AUTH-01, DB-01, trusted server-side role operation; ADMIN-01 before/alongside registration as designed. |
| SEC-01 | DEC-05/06/08 role and access scope; DEC-12 feedback writes if included. | DB-01, AUTH-01. |
| GRANT-01 | DEC-08 lookup/scope/expiry/revocation edge behavior. | AUTH-01/02, DB-01, SEC-01. |
| DATA-01 | Confirm profile fields/Home content source where not already authoritative. | AUTH-01, SEC-01. |
| DATA-02 | Exact prompts/source verification await DEC-01/02; MED 102 navigation depends on the open DEC-09 structure only; DEC-13 only if progress is included. | AUTH-01, SEC-01. |
| ART-01 | DEC-10/11 and DEC-18 retention/deletion; grant behavior. | DB-01, SEC-01, GRANT-01, authenticated owner. |
| DATA-03 | Confirm exact PLO/prompt source if primary-source fidelity required; DEC-18 retention. | AUTH-01, SEC-01; ART-01 if artifact relationships are implemented. |
| INSTR-01 | DEC-08 instructor scope/eligibility and source content decisions. | AUTH-02, GRANT-01, student data slices, RLS/Storage. |
| INSTR-02 | DEC-12 lifecycle; core additive feedback already confirmed. | INSTR-01, active grant, AUTH, feedback write policies. |
| ROUTE-01 | Source-backed information architecture and settled protected-navigation requirements. | AUTH-01; can be isolated from data integration. |
| UX-01 | DEC-17 and final content/labels. | Implemented screens/content for final conformance. |
| QA-01 | Approved acceptance baseline and all relevant implementations/policies. | Applicable backlog tasks complete. |

## 6. Recommended next implementation task

**Recommendation: no application implementation task is ready to start yet.** The existing backlog has prerequisite client decisions for identity/provisioning and access policy before its secure foundation can be implemented safely. Do not treat ENV-01 completion as approval to proceed to DB-01 or feature work.

The next authorized work should be a non-code documentation reconciliation (PLAN-04 portion) using the confirmed Phase 4/5 direction:

- **Scope:** Mark stale Phase 1/3/older Phase 4 no-feedback and trusted-assignment language as superseded; align statements to separate additive instructor feedback and student-controlled grants. Retain unresolved lifecycle/scope rules as open. Preserve the Supabase architecture and all 18 roadmap phases.
- **Dependencies:** Available latest Phase 4 final decision register/schema and Phase 5 final specs; no additional client approval for the already confirmed core directions. SRS restoration remains needed for full requirements traceability; the attached PDF is available and was checked for academic structure.
- **Acceptance criteria:** All inspected documents describe the same confirmed access/feedback direction or clearly label historical text; no feedback may mutate student content; feedback lifecycle and instructor scope remain explicitly undecided; no new academic labels, lifecycle defaults, database changes or feature code; the 18-phase roadmap is not renamed, reordered or reconstructed.

If “implementation task” means application code, defer it until the relevant DEC items above are approved and schema dependencies are reviewed. Then the first feature-stage candidate is DB-01 as review and migration preparation, with no schema application until separately authorized.

## 7. Files updated and validation

Updated planning files: `02-requirements-conflicts-and-client-decisions.md`, `03-implementation-backlog.md`, `04-implementation-dependency-map.md`, `05-implementation-priority-matrix.md`; created this report as `08-requirements-finalization-report.md`. Existing `VERIFIED_IMPLEMENTATION_PLAN.md`, `06-step-1-completion-report.md`, and `07-env-01-completion-report.md` were retained. No application code, package, schema, migration, credentials or deployment files were changed; no tests or migrations were run.

Validation was a consistency review against available documents plus the exact academic wording supplied by the owner. The SRS and master roadmap remain absent; SRS reconciliation and roadmap phase mapping remain unverified. The attached PDF was checked at pp. 4-8.

## Academic source update (13 November 2026)

The approved structure has eight independent domains and no parent-folder placement decision.
## Source and decision distinction (13 November 2026)

**From the PDF:** MED 101 has four Bimonthly sections (p. 4). MED 102 has eight separately named domains, including `Primary health care and UHC` (pp. 5-6). MED 103 headings on pp. 6-8 include each Bimonthly label, `(CERAE)`, and a period theme. The document does not specify four MED 102 parent folders.

**From the user's request:** MED 102 has eight independent domains, no parent folders, exact source wording and evidence, shared reflection questions, and artifact evidence. MED 101/MED 103 labels and themes are described separately.
### Exact MED 103 source headings

The PDF headings are retained verbatim in `docs/phase-2-academic-content/02_FOLDER_MAPPING_DECISIONS.md`. The user-selected folder names are the bare Bimonthly labels; the source's `(CERAE)` and period themes are separate official descriptors. This preserves both the attached instructions and the user's explicit naming decision.

## Updated source set (13 November 2026)

The project owner supplied UPDATED SRS.pdf v2.0, UPDATED PROJECT ROADMAP.pdf v2.0, and BukSU-COM Portfolio Instructions.pdf on 13 November 2026. The SRS and roadmap covers state Pending Client Approval. These are the current review sources replacing earlier SRS/roadmap versions, but are not described as formally approved until approval metadata is recorded. The roadmap names the existing 18 phases; use those names and do not reconstruct or renumber the roadmap. The earlier statements in this report that the SRS and roadmap were unavailable describe the earlier review date and are superseded. The roadmap Phase 7 gate requires source/schema/permission reconciliation and approval; its read-only permission checklist conflicts with the confirmed separate feedback direction and needs documented correction.
