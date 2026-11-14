# Requirements Conflicts and Client Decisions

**Status:** Planning register; not a record of new client approvals.  
**Basis:** `docs/VERIFIED_IMPLEMENTATION_PLAN.md` and the currently available Phase 1–6 documentation.  
**Source note:** Supplied UPDATED SRS.pdf v2.0 and UPDATED PROJECT ROADMAP.pdf v2.0 replace earlier versions for current review. Both covers say Pending Client Approval; formal approval remains to be recorded.

## Source and authority rules

1. The updated SRS and roadmap v2.0 are available but marked Pending Client Approval. The attached `BukSU-COM Portfolio Instructions.pdf` is available and was inspected directly for academic structure (MED 101 p. 4, MED 102 pp. 5-6, MED 103 pp. 6-8). Earlier source-review summaries are no longer needed for these checked academic names/domains.
2. The available Supabase technology decision in Phase 3 supersedes the earlier Laravel REST API, Laravel Sanctum, MySQL, and Firebase proposals. Mentions of those technologies in the source review or exclusion lists are historical, not active implementation requirements.
3. The latest Phase 4 final decision register/schema and Phase 5 final specifications model authorized instructor reviews/feedback as separate additive records. Older Phase 1, Phase 3 and some top-level Phase 4 records prohibit feedback. Apply the later revised direction for planning, and reconcile its provenance against restored approved sources before implementation.
4. A design document describing a capability does not mean the capability is implemented. Current implementation status is assessed in `docs/VERIFIED_IMPLEMENTATION_PLAN.md`.

## Conflict and decision register

| ID | Topic | Available evidence / conflict | Current safe planning position | Decision or input required | Blocks |
|---|---|---|---|---|---|
| DEC-01 | Formal SRS/roadmap approval | UPDATED SRS.pdf and UPDATED PROJECT ROADMAP.pdf v2.0 were supplied; both covers say Pending Client Approval. The roadmap identifies 18 phases and a Phase 7 approval gate. | Use v2.0 as current review baseline; do not rely on earlier versions. | Approve these versions or record revisions plus approver/date. | PLAN-01 baseline, phase mapping signoff, Phase 7/DB-01 gate. |
| DEC-02 | Original Level 1 portfolio instructions | Attached `BukSU-COM Portfolio Instructions.pdf` directly checked for academic structure: MED 101 p. 4, MED 102 pp. 5-6, MED 103 pp. 6-8. The attached filename omits the `(4)` suffix used in the request. | Treat exact source wording as verified against the attached PDF; record user-directed folder labels separately where they differ from fuller source headings. | No source-file request remains for this attached PDF; other exact content/SRS reconciliation may continue as needed. | Academic source crosswalk and content reconciliation. |
| DEC-03 | Backend technology | Historical SRS/roadmap proposal lists Laravel, Sanctum and MySQL in `SOURCE_REVIEW_NOTES.md`. Current Phase 3 technology decision selects Supabase PostgreSQL, Supabase Auth, private Storage and RLS; Phase 4 final docs agree. | Supabase is the active technical baseline. Laravel/Sanctum/MySQL remain historical and excluded. | No new client decision required unless the client formally changes the approved architecture. | Backend implementation baseline. |
| DEC-04 | Instructor feedback authority | Older Phase 1/3 records conflict with the supplied SRS v2.0, owner-confirmed decisions, and latest Phase 4/5 design for separate feedback and immutable student originals. | Separate additive feedback is confirmed; lifecycle remains DEC-12. The supplied SRS agrees but awaits formal approval. | No repeat approval for core permission; reconcile stale text. | Feedback lifecycle and authorization dependencies. |
| DEC-05 | Student account provisioning/recovery | Phase 3/4 identify Supabase Auth, but provisioning, recovery, disabling and session details remain open. | Use Supabase Auth; role assignment must be trusted and must not be self-selected. | Client/institution workflow: who provisions students, verification, recovery and disablement. | Student Auth release and support workflow. |
| DEC-06 | Instructor registration and verification | Phase 4 allows registration using the current client-issued shared code, but registration alone must not confer a verified Instructor role. Trusted identity verification process remains open. | Require valid shared code and trusted verification; no self-assigned role. | Approve who verifies instructor identity and how verification is performed and revoked. | Instructor registration and role assignment. |
| DEC-07 | Administrator access and code operations | Prototype has a local administrator selector. UI audit says administrator provisioning, authentication, code reveal, expiry and audit visibility are unresolved. | No browser role selector as a production boundary; preserve future-registration-only effects when replacing/disabling code. | Define administrator identity provisioning, allowed operators, expiry, reveal/copy safeguards, audit visibility and break-glass process. | Administrator console and secure code lifecycle. |
| DEC-08 | Portfolio grant and instructor scope | Phase 4 direction is student grant/revoke; exact lookup and visible-section granularity and open-session behavior need resolution. Earlier materials also refer to trusted faculty assignment. | No public portfolio directory; grants identify a specific instructor and portfolio; revocation blocks subsequent database/Storage checks. | Confirm lookup mechanism, whether all or selected sections are visible, and behavior for already-open sessions and cached content after revocation. | Grant UI, instructor viewer and policy design. |
| DEC-09 | Academic structure | Official portfolio instructions and SRS v2.0 specify four MED 101/103 periods and eight independent MED 102 domains; owner confirms no parent folders. | Preserve exact labels and domain evidence/competencies/questions. | No approval remains for names, counts, or MED 102 parent grouping. | PLAN-02. |
| DEC-10 | Artifact policy | Prototype accepts selected types up to 10 MB, but Phase 4 calls for institutional approval of formats, size, retention and deletion. | Treat prototype limits as demo-only; private Storage and short-lived signed URLs are design requirements. | Approve file formats/size, retention, permanent deletion, replacements, sensitive-content review and quota behavior. | Production uploads, Storage policy, UI copy and lifecycle. |
| DEC-11 | Signed URL and revocation semantics | Phase 4 requires preventing new signed URLs after revocation; Phase 5 audit says previously issued URL behavior and lifetime need clearer requirements. | Deny new URL issuance after grant revocation; avoid claiming immediate invalidation of an already-issued URL. | Approve URL lifetime and expected access during the remaining lifetime after revocation. | Artifact download flow and revocation acceptance criteria. |
| DEC-12 | Feedback lifecycle | Phase 4 records separate feedback but leaves editing/deletion, publication, replies, notifications, review period and history unresolved. | Create only separate instructor-authored rows; no changes to student originals. | Decide draft/publish, edit/delete, immutability, student reply/acknowledgment, notifications, retention and review cadence. | Feedback UI, schema constraints and write policies. |
| DEC-13 | Progress, draft and completion | Some early requirement/roadmap references propose dashboard, draft/completed states; Phase 1 traceability marks these conditional. | Do not make completion/progress a mandatory acceptance behavior until confirmed. | Confirm whether progress dashboard and status semantics are required and define calculation rules. | Dashboard scope and acceptance criteria. |
| DEC-14 | Audit events and retention | Phase 3/4 include audit structures but state taxonomy/retention and administrator visibility are open. | Log security-sensitive lifecycle events without secrets, signed URLs, patient identifiers or raw confidential content. | Approve event set, access to audit history and retention/deletion period. | Audit implementation and privacy notices. |
| DEC-15 | Backup, export and recovery | Architecture requires protected manual exports/backups and restore testing; owner, destination, schedule and recovery authority are unresolved. | Treat backup/export/recovery as release gates, not implemented features. | Name owner, destination, schedule, encryption/access rules, retention, restore authority and restore-test cadence. | Production readiness. |
| DEC-16 | Hosting and operating limits | Frontend host is open; Supabase Free Plan quotas and possible inactivity pausing are documented. Limits may change. | Do not deploy or promise indefinite free operation based on planning-era quota values. | Approve host, domain, ownership, budget threshold, quota monitoring and escalation. Recheck current provider terms before release. | Deployment and operations runbook. |
| DEC-17 | Visual identity / accessibility acceptance | Phase 5 high-fidelity design is prose, not validated mockups; final logo/font and measurable contrast/responsive criteria remain open. | Follow the documented design direction provisionally; do not claim visual sign-off. | Approve identity assets and measurable accessibility/viewport acceptance thresholds. | UI implementation closure and final review. |
| DEC-18 | Account, portfolio and data deletion/retention | The available documents do not settle account deletion, portfolio deletion, or overall data-retention rules. Artifact and feedback retention are separately unresolved. | Do not delete or retain user data based on an invented default; preserve only what an approved policy requires. | Approve user-requested account closure, portfolio/content deletion, retention periods, legal/academic holds and audit-history treatment. | Auth lifecycle, content deletion, storage cleanup, backup/export and support procedures. |

## Required client/source requests

The updated SRS and roadmap v2.0 and the official instructions PDF have been supplied. Obtain formal approval or record requested revisions; do not invent missing requirements.

## Client approvals versus technical work

The items below are decisions for the client/institution; they must not be silently converted into implementation defaults.

| Client/institution decision | Technical work that follows after approval |
|---|---|
| Formally approve supplied SRS/roadmap v2.0 or record revisions and approval metadata. | Build the remaining SRS/source crosswalk and assign backlog work to actual roadmap phases. |
| MED 101/MED 103 labels and eight MED 102 domains are verified from source and owner direction. | Record exact wording; expose eight independent MED 102 sections with no parent cards or grouping. |
| Confirm the revised separate-feedback direction and specify whether instructors may edit/delete, when feedback is visible, whether students may reply/acknowledge, notifications and retention. | Reconcile conflicting docs, then implement separate feedback rows and corresponding permissions/UI. |
| Define student account provisioning/recovery/disablement, instructor verification, administrator provisioning, grant lookup/scope and revocation/session behavior. | Implement Supabase Auth, trusted role assignment, admin workflow, grant/revoke operations and RLS/Storage enforcement. |
| Set artifact types, file-size limits, retention, permanent deletion/replacement, and signed URL expiry/post-revocation expectations. | Configure private Storage, upload validation, metadata lifecycle, signed URL issuance and error states. |
| Establish account/portfolio deletion and data-retention rules. No rule is present in the available sources. | Implement deletion/retention behavior and audit-safe cleanup after an approved policy exists. |
| Assign audit visibility/retention, account and portfolio data-retention/deletion rules, backup/export/recovery ownership and schedule, hosting/domain ownership, quota/budget escalation, and restore-test cadence. | Build audit controls, account/content deletion flows, operational runbook, deployment and protected export/restore processes. |
| Approve visual identity and measurable accessibility/viewport acceptance targets. | Close Phase 5 design gaps and verify UI against approved criteria. |

Technical tasks that do not determine these policies include repository/environment setup after access is authorized, schema migration preparation after design review, Supabase Auth/RLS/Storage implementation to the approved rules, and separate UI/data integration tasks. The prototype's 10 MB limit, file-type allowlist, local role selector, or sample text is not a client-approved value or policy.

## Planning status

The Supabase direction and the separation of instructor feedback from student originals are documented as current design directions. Operational details and the conflicts listed above remain open. Approval means an explicit client/institution decision recorded in the relevant decision register; a prototype behavior is not approval.

## Requirements Finalization Status Update (13 November 2026)

This update distinguishes confirmed policy direction from details still requiring approval. It supersedes earlier statements in this register that imply the client must reconfirm decisions already recorded in later Phase 4/5 documents.

### Confirmed direction — do not request approval again

- **Platform:** Supabase PostgreSQL, Auth, private Storage and RLS are the approved architecture (Phase 3 technology decision and Phase 4 final design). Historical Laravel/Sanctum/MySQL/Firebase references are superseded; the supplied SRS v2.0 selects Supabase too; formal approval remains pending.
- Current structure: MED 101 and MED 103 each have four Bimonthly sections; MED 102 has eight independent domains and no parent-folder layer.
- **Other content:** Home Page, PLO Attainment and Final Musings are separate global sections; the available content set has 11 PLOs and five Final Musings prompts. Patient-identifiable information is prohibited. Exact source wording still requires the original source.
- **Ownership/access:** Each portfolio is private and student-owned. Instructor access is explicitly granted and revoked by the student; registration or code redemption alone gives no portfolio access. Revocation blocks subsequent authorization checks and new signed URL issuance, subject to the unresolved lifetime of URLs already issued.
- **Instructor review:** An authorized instructor may create separate additive review/feedback records; those records do not mutate student-authored originals. This direction is in the latest Phase 4 final decision register/design and Phase 5 specs. It is resolved for planning; draft/publication/edit/delete/student-response and related lifecycle details remain open.
- **Instructor registration:** Registration uses the active client-issued shared invitation code, which may be used by multiple instructors. A trusted atomic operation validates it and assigns the Instructor role; code redemption alone is not client authorization. Replacing/disabling a code affects future registrations only, not existing accounts or grants.
- **No automatic PLO attainment.** Progress/completion behavior remains optional and outside baseline unless specifically approved.
- **Roadmap structure:** UPDATED PROJECT ROADMAP.pdf v2.0 names the existing 18 phases and is the current mapping source. Its cover is pending client approval; do not renumber or reconstruct phases.

### Client approvals and source inputs still open

DEC-01: formally approve the supplied SRS and roadmap v2.0 or record revisions and approver/date. Both covers say Pending Client Approval.

DEC-05: define student account provisioning, identity verification, recovery/support, disablement and session lifecycle.

DEC-06/07: define instructor identity verification and its operator; identify authorized administrator(s), admin account provisioning, and shared-code secure issuance/reveal, expiry, disablement, audit visibility and emergency process. The shared-code registration model itself is confirmed.

DEC-08: define instructor eligibility/lookup, whether access covers the whole portfolio or selected sections, access expiry, treatment of already-open sessions/cached data, and expected revocation behavior for previously issued signed URLs. Student grant/revoke control is confirmed.

DEC-09: the attached PDF confirms MED 101 period names (p. 4), eight MED 102 domains (pp. 5-6), and MED 103 period headings/themes (pp. 6-8). The user directs the bare Bimonthly labels as folder/section names; no reapproval is needed. MED 102 is confirmed as eight independent domains with no parent-folder layer. There is no client decision about MED 102 folder count, parent names, or grouping. Keep MED 103 PDF themes as separate source-defined descriptors.

DEC-10/11: approve artifact file types, size limits, quotas, retention, replacement/deletion and sensitive-content handling; set signed URL lifetime and the access expectation for URLs already issued at revocation. Private Storage and denial of new URLs after revocation are confirmed directions.

DEC-12: decide feedback draft/publish or immediate visibility, who can edit/delete, immutability/revision handling, student acknowledgement/reply/report rules, notifications, review cadence and feedback history retention. Separate additive instructor feedback is confirmed.

DEC-13: decide only if progress/dashboard/completion is to enter scope; define its calculation and status semantics. It is not a baseline blocker otherwise.

DEC-14/15/16/18: approve audit events/access/retention; backup/export destination, owner, schedule, encryption/access, retention, recovery authority and restore-test cadence; hosting/domain owner, budget/quota alert threshold and escalation; account/portfolio retention, deletion, legal/academic holds and audit treatment. No defaults are approved.

DEC-17: approve visual identity assets and measurable accessibility/responsive acceptance thresholds if required for final UI sign-off.

### Documentation conflicts to reconcile without reopening resolved decisions

Older Phase 1, Phase 3 and some Phase 4 documents say instructors are read-only/no-feedback or imply trusted faculty assignment. Latest Phase 4 final and Phase 5 records establish additive separate feedback and student-controlled grants. Update stale records as superseded; do not ask the client to approve these core directions again. Phase 1 overview/summary contains internally inconsistent feedback wording. Phase 3 architecture also incorrectly calls the provisional Phase 2 MED 102 mapping approved. Historical backend references are superseded by Phase 3/4 Supabase decisions. Phase 5 completion audit is marked NEEDS REVISION.

The Phase 2 checklist has been updated after direct PDF review. MED 102 names, structure, evidence, competencies, questions, and artifact requirement are source-confirmed; no parent-folder decision remains.


## Official academic wording and schema review update (13 November 2026)

The owner supplied and confirmed the exact names transcribed from `BukSU-COM Portfolio Instructions(4).pdf`. The attached PDF was directly inspected at the page references recorded in the Phase 2 source update. The Phase 2 academic content update contains the exact list. DEC-09 no longer requires approval of those names or domains. The eight official domains are independent sections; no MED 102 parent-folder decision remains open. Phase 4 `learning_domains` supports independent records with nullable `parent_folder_id`, so the current reviewed schema can preserve them without grouping; the UI must expose each as an individual section. No schema or application change is made by this documentation update.
## Academic terminology reconciliation (13 November 2026)

The older academic-name approval row in this document is superseded. The exact MED 101 and MED 103 period names and all eight MED 102 domain names supplied by the owner are confirmed; there is no remaining approval request for those labels. MED 102 parent-folder relationship is not an open decision. The UI requirement is to expose eight independent domain sections. The attached PDF was directly checked; its filename is `BukSU-COM Portfolio Instructions.pdf` (without the `(4)` suffix referenced in the request).
## PDF and user-decision distinction (13 November 2026)

**PDF requirements:** MED 101 period labels are the four Bimonthly terms (p. 4); MED 102 lists eight domains, including `Primary health care and UHC` (pp. 5-6); MED 103 period headings include `(CERAE)` and thematic wording in addition to each Bimonthly label (pp. 6-8). The PDF does not prescribe four MED 102 parent folders.

**User decisions:** Use the four bare Bimonthly labels as MED 101 and MED 103 section names; retain the eight MED 102 domains as separate, individually identifiable sections; do not invent MED 102 parent-folder names. The official MED 102 structure is eight independent sections; do not carry over the former four-folder-per-subject assumption to MED 102.