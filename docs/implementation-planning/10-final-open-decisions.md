# Final Open Decisions

This register contains only remaining approvals and owner inputs. It does not reopen Supabase, the confirmed academic structure, student ownership/grant-revoke control, separate additive instructor feedback, the prohibition on instructor modification/deletion of student originals, or the administrator's lack of automatic portfolio access.

## Required source inputs

### OI-01 - Formal approval of supplied SRS and roadmap v2.0

- **Question/action:** Confirm formal approval of UPDATED SRS.pdf v2.0 and UPDATED PROJECT ROADMAP.pdf v2.0, or provide revisions and approval metadata. Both covers say Pending Client Approval.
- **Why it matters:** These provide the requirements baseline and all 18 phase names, but formal approval remains pending. Phase 7 is gated on reconciliation and approval.
- **Options:** Approve the v2.0 PDFs; provide revisions and approve a new version; or identify another authorized baseline.
- **Recommendation:** Approve or revise the supplied pair and record approver/date, preserving the roadmap phases.
- **Affected:** PLAN-01, requirement traceability, phase mapping, Phase 7 entry gate and DB-01 readiness; no schema/RLS object directly.
## Client and project-owner approvals

### OI-02 - Student account lifecycle

- **Question:** Who provisions/verifies student identity, handles recovery/support, disables accounts, and defines session termination?
- **Why it matters:** Prevents unauthorized account creation and defines lifecycle security.
- **Options:** Institution-managed invitations, verified self-registration, or another approved workflow.
- **Recommendation:** Institution-controlled eligibility verification with Supabase Auth handling credentials. Trade-off: requires a trusted operator.
- **Affected:** profiles/identity linkage, trusted role assignment, AUTH-01, RLS identity predicates, recovery/disable workflows.

### OI-03 - Instructor verification and administrator/code operations

- **Question:** Who verifies instructor eligibility and provisions administrators? Who may issue/reveal/replace/disable the shared faculty invitation code, and what expiry, usage limits, audit, and emergency safeguards apply?
- **Why it matters:** Code redemption alone cannot safely self-assign the instructor role; admin access must remain narrow.
- **Options:** Named institutional operator; delegated least-privilege operators with logs; another approved process.
- **Recommendation:** Named authorized operators, audited code lifecycle, and trusted atomic validation plus role assignment. Trade-off: operational ownership and recovery must be assigned.
- **Affected:** profile roles, invitation-code record/operation, trusted functions, AUTH-02, ADMIN-01 and role RLS; no admin portfolio grant.

### OI-04 - Instructor lookup, grant scope, expiry and revocation edge cases

- **Question:** How does a student identify an eligible instructor; whole portfolio or selected sections; optional expiry; behavior for open/cached data and previously issued Storage URLs after revocation?
- **Why it matters:** Defines least privilege and whether revocation applies to data already delivered.
- **Options:** Whole portfolio is simpler; section-level access is narrower. Previously issued signed URLs generally remain usable until expiry unless invalidation is engineered.
- **Recommendation:** Explicit instructor-specific grants, deny new database/Storage authorization after revocation, and short configurable URL lifetimes. Choose scope and prior-URL behavior with the institution. Trade-off: fine-grained scope and immediate URL invalidation add complexity.
- **Affected:** portfolio_access_grants and possible section-scope relation, grant/revoke flow, RLS/Storage policies, signed URL service, GRANT-01, SEC-01, INSTR-01, ART-01.

### OI-05 - Artifact policy and URL lifetime

- **Question:** Which file types, size/quota limits, replacement/deletion rules, sensitive-content checks, retention, and signed URL lifetime are approved?
- **Why it matters:** Prototype values cannot safely define production upload validation or private Storage policy.
- **Options:** Narrow allowlist with conservative limits; broader allowlist with documented scanning/quota controls. Exact values require approval.
- **Recommendation:** Approve a narrow coursework-focused allowlist and limits, private buckets, short-lived URLs. Trade-off: safer/simple review, but formats may need later addition. No file type or size value is assumed here.
- **Affected:** artifact metadata/policy, Storage bucket/object policies, upload flow, RLS, ART-01, DATA-02 and retention.

### OI-06 - Feedback lifecycle and attachment scope

- **Question:** May instructors edit/delete feedback; draft/publish or immediate visibility; may students acknowledge/reply/report; whether feedback attaches to the portfolio, a section, reflection, or artifact; what notifications, cadence, and history retention apply?
- **Why it matters:** Separate additive feedback is confirmed; lifecycle determines visibility, auditability and allowed mutations.
- **Options:** Immutable published feedback with append-only corrections; editable/deletable with audit trail; immediate visibility or explicit publication. Student response may be disabled or separately recorded.
- **Recommendation:** Immutable published feedback with append-only corrections; separate student response record only if approved. Trade-off: stronger history, but corrections require a new record/workflow.
- **Affected:** feedback/review tables, relations, RLS INSERT/SELECT/UPDATE/DELETE rules, publication/response workflows, INSTR-02 and audit events. Original student content remains unmodifiable by instructors in every option.

### OI-07 - Account, portfolio, artifact and audit retention/deletion

- **Question:** What are retention periods and deletion/closure rules, including academic/legal holds, artifact cleanup, backup copies and audit history?
- **Why it matters:** Cascading deletion and retention exceptions affect privacy, records obligations, backups and account closure.
- **Options:** Timed policy retention; account closure with retained/de-identified records; deletion on approved request subject to holds.
- **Recommendation:** Approve an institutional schedule and request/hold workflow before destructive deletion. Trade-off: better compliance control, requires records ownership.
- **Affected:** profiles, portfolios, content/artifacts, feedback, audit log, backups, Auth deletion, RLS/Storage cleanup, AUTH-01, ART-01, OPS-01.

### OI-08 - Audit history

- **Question:** Which lifecycle/security events are logged, who can view them, and for how long?
- **Why it matters:** Balances accountability with sensitive-data minimization.
- **Options:** Security-only; security plus grant/feedback lifecycle; broader operational events.
- **Recommendation:** Log role, invitation, grant/revocation, access-sensitive and feedback lifecycle metadata; exclude secrets, signed URLs and content bodies. Trade-off: useful history with lower data exposure.
- **Affected:** audit events/table, trusted functions/triggers, narrowly scoped admin views, RLS and retention.

### OI-09 - Backup, export, recovery and restore testing

- **Question:** Who owns backups/exports, destination, schedule, encryption/access, retention, recovery authority and restore-test cadence?
- **Why it matters:** Recoverability cannot be promised without ownership and restoration verification.
- **Options:** Institution-controlled encrypted exports; approved managed backup service; combined approach.
- **Recommendation:** Named institutional owner, encrypted access-controlled backup and documented scheduled restore tests. Trade-off: operational cost and maintenance.
- **Affected:** database/storage backup, export and operations runbook, retention, OPS-01; backup is not an RLS substitute.

### OI-10 - Hosting, domain and budget

- **Question:** Who owns production hosting/domain accounts; what budget/quota thresholds and escalation path apply?
- **Why it matters:** Deployment ownership, continuity and billing limits need responsible parties.
- **Options:** Institution-owned accounts/domain; owner account transferred to institution; other authorized arrangement.
- **Recommendation:** Institution-owned accounts/domain with named maintainers and quota alerts. Trade-off: requires institutional account administration.
- **Affected:** deployment, secrets ownership, monitoring, backup destination, DNS, OPS-01.

### OI-11 - Visual identity and accessibility acceptance

- **Question:** Which identity assets are approved, and what measurable accessibility/responsive criteria are required?
- **Why it matters:** Current design records do not establish brand approval or measurable acceptance.
- **Options:** Retain documented direction provisionally; provide official brand kit and test criteria.
- **Recommendation:** Provide official assets and a named accessibility target/viewport criteria. Trade-off: measurable review may require design revision.
- **Affected:** UI assets/styles, responsive/accessibility review, UX-01 and Phase 5 closure.

### OI-12 - Optional progress/completion states

- **Question:** Should dashboard progress, draft/completed states or completion calculations be in baseline?
- **Why it matters:** This adds state and may imply academic evaluation not otherwise approved.
- **Options:** Defer; student-only tracking; broader views after approved calculation rules.
- **Recommendation:** Defer unless an academic use case is approved. Trade-off: simpler model, no progress dashboard.
- **Affected:** optional progress fields/table, dashboard queries, DATA-02/UX; no effect on required content capture.

## Not open for approval

No approval is needed for Supabase; MED 101/103 official Bimonthly labels; eight separate MED 102 domains with no parent folders; student ownership and explicit grant/revoke; separate additive instructor feedback; instructor inability to edit/delete original student content; or no automatic admin access to portfolios. These are confirmed.


## Source-driven reconciliation (not a new client decision)

The supplied roadmap v2.0 Phase 7 checklist asks to confirm instructor read-only permissions. The owner has already confirmed authorized instructors may submit separate additive feedback and cannot modify/delete original student content. Correct the roadmap wording through documented change control; do not ask the client to decide this core permission again.
