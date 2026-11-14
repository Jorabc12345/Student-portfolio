# Documentation Conflict Report – Supabase Migration

## Status

The approved backend migration is Supabase. This report records the reconciliation audit; it does not reconsider that decision.

## Source Availability

The workspace does not contain a file matching `*SRS*.md` or `MASTER_PROJECT_ROADMAP.md`. Existing Phase 1 source notes refer to supplied files named `Approved_SRS_BukSU_COM_Digital_Portfolio.md` and `MASTER_PROJECT_ROADMAP.md.docx`, but those source files are not currently available at the project root or under `docs/`.

Consequently:

- The SRS and roadmap could not be updated without creating competing copies.
- The Phase 3 and Phase 4 documents were used as the current technical source of truth.
- The absence of the primary SRS and roadmap remains an unresolved documentation-control issue.

## Conflicts Found and Resolution

| Location | Conflict | Resolution |
|---|---|---|
| `docs/phase-1-requirements/PROJECT_OVERVIEW.md` | Active Cloud Firestore/Firebase direction and faculty no-feedback wording | Updated to Supabase PostgreSQL, Supabase Auth, private Storage, RLS, and revised instructor review/feedback permissions. |
| `docs/phase-1-requirements/PHASE_1_SUMMARY.md` | Active Firebase stack and Firebase rules | Updated to the approved Supabase stack and RLS/Storage policy enforcement. |
| `docs/phase-1-requirements/RISK_AND_OPEN_DECISIONS.md` | Firebase Storage, Firebase Auth, Firebase project, and Firebase security rules | Updated to private Supabase Storage, signed URLs, Supabase Auth, Supabase project configuration, and RLS/Storage policies. |
| `docs/phase-1-requirements/SOURCE_REVIEW_NOTES.md` | Firebase described as the client-selected direction | Updated to identify Firebase as historical and Supabase as approved. |
| `docs/phase-2-academic-content/01_SOURCE_CONTENT_REFERENCE.md` | Historical technology row still named Firebase as selected | Updated to identify Supabase as the selected direction. |
| Phase 3 documents | Firebase appears only in exclusions or historical migration notes | Retained. These references explicitly state that Firebase is not active. |
| Phase 4 documents | Firebase appears only in exclusions or validation statements | Retained. These references explicitly state that Supabase is active and Firebase is excluded. |
| Phase 5 documents | Supabase is used in the final UI/UX blueprint; no active Firebase dependency found | No change required. |

## Approved Technical Baseline

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Lucide React.
- Database: Supabase PostgreSQL on the Free Plan.
- Authentication: Supabase Auth.
- File storage: private Supabase Storage.
- Authorization: PostgreSQL RLS and Storage policies.
- Edge Functions: only when necessary and compatible with the approved plan.

## Functional Requirements Preserved

The reconciliation changes technology references only. It does not change:

- Individual student portfolio scope.
- Level 1, MED 101, MED 102, and MED 103 coverage.
- Current structure: MED 101 and MED 103 each have four Bimonthly sections; MED 102 has eight independent domains and no parent-folder layer.
- Student ownership and private access.
- Shared faculty invitation-code registration.
- Separate student authorization and revocation.
- Instructor read-only access to original content with separate reviews/feedback.
- Academic reflections, artifacts, PLO documentation, Final Musings, confidentiality, or academic integrity.

## Remaining Conflicts

1. The source SRS and roadmap are unavailable and therefore cannot be reconciled in place.
2. Phase 3 contains older no-feedback faculty wording that is already documented as superseded; it should be corrected in a future controlled architecture-document revision.
3. Early Phase 1 documents retain some historical Firebase terms in explicitly historical/exclusion statements. They are not active dependencies.
