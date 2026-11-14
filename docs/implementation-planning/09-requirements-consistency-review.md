# Requirements Consistency Review

**Review date:** 13 November 2026  
**Scope:** Planning registers, verified assessment, finalization records, and available Phase 1-5 academic, architecture, database, and UI/UX documents. Documentation audit only.

## Audit result

The approved direction is recoverable, but material conflicts remain in older architecture records. Status: **NOT READY — DOCUMENTATION CONFLICTS REMAIN**. Reconcile the identified documents before backend implementation.

## Confirmed requirements

- Supabase PostgreSQL, Supabase Auth, private Supabase Storage, and RLS are the approved architecture. Firebase and earlier Laravel/MySQL/Sanctum designs are superseded.
- MED 101 and MED 103 have four official Bimonthly sections. MED 103 CERAE and period themes are separate descriptors.
- MED 102 has exactly eight independent, individually identifiable domains. Each retains its required evidence and competency description; the four shared reflection questions apply to each. No four parent folders are required.
- The reviewed Phase 4 design models domains as separate subject-linked learning_domains with nullable parent_folder_id. This can represent all eight without losing identity; this is not verification of a deployed schema.
- Students own and control original portfolio content and explicitly grant/revoke instructor access.
- Instructors may view portfolios only under student authorization and add separate feedback. They cannot modify or delete student-authored originals.
- Administrators manage faculty registration/invitation operations and do not automatically receive portfolio access.
- Registration, invitation-code redemption, and administrator status do not themselves grant portfolio access.

## Unresolved approvals and sources

See 10-final-open-decisions.md for decisions requiring approval: account provisioning/recovery; instructor verification; admin identity/code safeguards; instructor lookup/scope/expiry/revocation details; artifact and URL policy; feedback lifecycle/target scope; audit; backup/recovery; hosting/domain; retention/deletion; visual/accessibility criteria; and optional progress. Supplied SRS and roadmap v2.0 replace earlier versions and are pending formal approval. The roadmap names 18 phases. No academic folder-name approval remains open.

## Cross-document audit

| Area | Finding and evidence | Result |
|---|---|---|
| Academic structure | Phase 2 03_MED102_STRUCTURE_FINALIZATION.md, CLIENT_CONTENT_CONFIRMATION.md, and Phase 4 final DATABASE_DECISION_REGISTER.md record eight separate domains and no parent layer. Older Phase 2 parent proposals are marked superseded. | Confirmed. |
| MED 101/103 | Phase 2 records preserve four Bimonthly labels; MED 103 CERAE/themes are separate descriptors. | Confirmed. |
| Ownership and grants | Phase 4 final database blueprint/security readiness and Phase 5 role/access specifications support student ownership and explicit grants. | Confirmed direction; scope and revocation details remain open. |
| Instructor feedback | Phase 4 final DATABASE_SECURITY_READINESS.md permits separate feedback under active grant; Phase 5 UI requirements describe separate feedback. Phase 3 PHASE_3_VALIDATION_REPORT.md, ARCHITECTURE_DECISION_REGISTER.md ADR-014, 03_PRIVATE_STORAGE_SECURITY.md, 03_AUTHORIZATION_AND_DATA_FLOW.md, and ARCHITECTURE_TRACEABILITY_MATRIX.md still say no feedback, assigned faculty, or read-only. | Conflict remains. |
| Administrator boundary | Phase 5 01_USER_ROLES_AND_EXPERIENCE.md and Phase 4 final model restrict admin to invitation operations without portfolio access. Some Phase 3 role/auth docs omit a narrow admin role or say it is absent. | Partially consistent. |
| Registration | Phase 4 final DATABASE_DESIGN_BLUEPRINT.md records a shared client-issued code, multiple instructor use, trusted atomic validation/role assignment, and no effect on existing grants when replaced. Older architecture records still describe manual invitation/trusted assignment. | Confirmed direction; reconcile older wording. Verification operator and safeguards remain open. |
| Storage/artifacts | Private Storage and grant-aware policies are specified; types, limits, quotas, retention/deletion, and signed URL lifetime remain open client decisions. Prototype values are not approved policy. | Partially specified; implementation blocked. |
| Supabase architecture | Phase 3/4 final documents and supplied SRS v2.0 select Supabase; SRS formal approval remains pending. Historical Firebase/Laravel/MySQL/Sanctum references are superseded. | Architecture direction confirmed by owner; baseline approval pending. |
| Database/RLS | Latest Phase 4 security readiness supports ownership, grant checks, and separate feedback writes; older Phase 3/4 policy records contain read-only/no-feedback rules. SQL files are design artifacts; deployment state was not checked. | Permission conflict remains. |
| Backlog | Backlog gates Auth, grants, RLS, Storage, feedback and operations on dependencies. PLAN-04 must not imply core additive feedback awaits approval; only lifecycle details are open. | Align task acceptance language with decision register. |
| SRS and roadmap | Supplied UPDATED SRS.pdf and UPDATED PROJECT ROADMAP.pdf v2.0 replace earlier versions; both covers say Pending Client Approval. The roadmap names 18 phases. | Crosswalk and phase mapping possible; formal approval remains open. |

## Required documentation reconciliation

Update Phase 3 role/permission matrix, authorization flow, RLS and Storage security, traceability, architecture decision register, validation report, and supplied roadmap Phase 7 checklist; check older Phase 4 summaries. State: instructor SELECT requires active student grant; instructor INSERT is only into a separate feedback record; instructors cannot mutate/delete student originals; admin registration duties provide no portfolio access. Align PLAN-04 while leaving lifecycle controls open. Do not alter schema or SQL in this editorial pass.


## Updated source PDFs reviewed

The project owner supplied UPDATED SRS.pdf v2.0, UPDATED PROJECT ROADMAP.pdf v2.0, and BukSU-COM Portfolio Instructions.pdf on 13 November 2026. The SRS and roadmap covers state Pending Client Approval. These are the current review sources replacing earlier SRS/roadmap versions, but are not described as formally approved until approval metadata is recorded. The roadmap names the existing 18 phases; use those names and do not reconstruct or renumber the roadmap. The SRS v2.0 agrees with confirmed Supabase, role/access boundaries, separate feedback, independent MED 102 domains, private artifacts and RLS. It leaves feedback lifecycle/attachment scope, invitation limits, post-graduation retention, file limits, backup/recovery, and hosting open. The roadmap records ENV-01 complete in Phase 6 and gates Phase 7 on reconciliation/approval; its instructor read-only checklist conflicts with the confirmed feedback rule.
