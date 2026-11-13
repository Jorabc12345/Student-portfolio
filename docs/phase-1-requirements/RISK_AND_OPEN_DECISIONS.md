# Risk and Open Decisions

## Risk Register

| ID | Risk | Impact | Mitigation or control | Status |
|---|---|---|---|---|
| RISK-001 | Weak authentication or authorization exposes private portfolio content. | High | Require authenticated sessions and server-side role, ownership, and faculty-scope checks on every protected operation. | Must control before implementation |
| RISK-002 | Frontend-only read-only controls can be bypassed with direct API requests. | High | Test every faculty write path at the backend and reject unauthorized methods explicitly. | Must control before implementation |
| RISK-003 | Public or guessable artifact URLs expose confidential files. | High | Use private Supabase Storage with restrictive Storage policies, short-lived signed URLs, and authorized downloads; do not expose unrestricted public file URLs. | Must control before implementation |
| RISK-004 | Patient-identifiable information is uploaded. | High | Display confidentiality guidance, require student responsibility, validate files where possible, and define reporting/removal procedures. | Operational decision required |
| RISK-005 | Incorrect transcription or alteration of academic questions causes non-compliance. | High | Treat the original PDF as academic authority and maintain content traceability and review checks. | Stage 2 controlled; preserve during implementation |
| RISK-006 | Incorrect folder names or MED 102 grouping misrepresents the curriculum. | High | Use provisional labels only and block final mapping until client approval. | Open |
| RISK-007 | Unauthorized instructor authorization grants access to the wrong portfolio. | High | Require explicit student portfolio grants, PostgreSQL RLS/Storage policy checks, and audit authorization changes where approved. | Open |
| RISK-008 | File type or size decisions cause unsafe or unusable uploads. | Medium | Confirm allowed formats, maximum size, content validation, and storage limits before upload implementation. | Open |
| RISK-009 | Data or artifacts are lost through inadequate backup and recovery. | High | Approve backup frequency, retention, restore testing, and recovery ownership before production. | Open |
| RISK-010 | Future-level changes require redesign because the content model is too rigid. | Medium | Keep levels, subjects, folders, periods, domains, reflections, and artifacts distinguishable and configurable. | Design constraint for later stage |
| RISK-011 | A progress calculation implies formal competency or PLO attainment. | Medium | Treat dashboard as proposed; document calculation and prohibit automatic attainment claims. | Open |
| RISK-012 | SRS status and client approval status are interpreted inconsistently. | Medium | Reconcile document control before baseline approval and keep confirmed decisions separate from proposals. | Open |

## Open Client Decisions

These are not re-asked client decisions; they are the unresolved items carried forward from Stages 1 and 2.

| ID | Decision | Why it matters | Current safe default |
|---|---|---|---|
| OD-001 | Exact names of the four MED 101 folders | Required for final navigation and content labels | Use provisional labels; do not finalize names |
| OD-002 | Exact names of the four MED 102 folders | Required for final navigation and content labels | Use provisional labels |
| OD-003 | Exact names of the four MED 103 folders | Required for final navigation and content labels | Use provisional labels |
| OD-004 | Mapping of eight MED 102 domains to four folders | Prevents incorrect academic grouping | Preserve domains independently; assign none until approved |
| OD-005 | Which faculty members are authorized and who assigns them | Controls portfolio confidentiality | No access without explicit assignment |
| OD-006 | Whether faculty see the entire assigned portfolio or selected sections | Defines read-only visibility scope | Restrict to explicitly authorized content; exact granularity pending |
| OD-007 | Account creation and password-recovery process | Affects onboarding and support | Use Supabase Auth; provisioning and recovery workflow remain open |
| OD-008 | Allowed artifact file formats and maximum upload size | Required for safe upload validation | Do not finalize limits before approval |
| OD-009 | Hosting and domain; Supabase project and service configuration | Affects deployment, privacy, and operations | Use Supabase PostgreSQL, Supabase Auth, and private Supabase Storage on the Free Plan; hosting, domain, and configuration remain open |
| OD-010 | Backup frequency, retention, and recovery expectations | Required to protect longitudinal portfolio data | No production launch without an approved recovery plan |
| OD-011 | Draft/completed states and progress-dashboard behavior | Determines optional workflow and progress calculation | Treat as proposed, not acceptance baseline |
| OD-012 | Whether students may revise/delete content after faculty viewing | Affects audit and retention behavior | Preserve student ownership; exact audit behavior pending |
| OD-013 | Retention and account deactivation after level change or graduation | Affects long-term portfolio access | Retention policy pending |

## Technical Defaults Versus Client Decisions

### Confirmed client decisions

- Individual portfolio.
- Level 1 with exactly MED 101, MED 102, and MED 103.
- Four main folders per subject and twelve total.
- Student full management of their own portfolio.
- Faculty authenticated read-only access.
- No faculty comments, feedback, editing, deletion, uploading, or grading.
- Mandatory login and private access.
- Custom development approval.
- Future academic-level support.

### Approved technical direction

- Supabase PostgreSQL on the Free Plan.
- Supabase Auth.
- Private Supabase Storage.
- PostgreSQL RLS and Storage policies must enforce authenticated access, student ownership, active instructor authorization, and instructor write restrictions.

### Remaining technical proposals or defaults

- Frontend framework and component approach.
- Styling and motion libraries.
- Hosting and domain.
- Supabase project/environment configuration.
- Artifact file limits and validation.
- Short-lived signed URL flow, revocation behavior, and operational logging.
- A progress dashboard and draft/completed states.

Technical choices must not override an unresolved academic or client decision. The dashboard and draft behavior require explicit confirmation before being treated as mandatory Version 1.0 scope.

## Future Enhancements Outside Version 1.0

- Actual Level 2 and later academic content.
- Additional subjects and approved folder structures.
- Institutional administration for multiple student portfolios.
- Formal grading or assessment workflows.
- Additional feedback workflows beyond the approved separate instructor review/feedback model.
- More advanced progress and reporting features after calculation rules are approved.

