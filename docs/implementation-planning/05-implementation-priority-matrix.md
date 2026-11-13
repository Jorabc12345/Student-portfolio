# Implementation Priority Matrix

**Status:** Proposed priority order; priorities express dependency and risk, not promised dates.  
**Roadmap:** The master roadmap is unavailable; mappings below use current Phase 1â€“6 references and leave roadmap phase numbers unverified.

## Priority definitions

| Priority | Meaning |
|---|---|
| **P0 â€” Baseline/decision gate** | Restore authoritative sources or resolve decisions before dependent implementation. |
| **P1 â€” Foundation/security** | Establish controlled project, schema, identity and authorization foundations. |
| **P2 â€” Product workflows** | Implement and complete user-facing capabilities on the secure foundation. |
| **P3 â€” Release gate** | Operational readiness and acceptance evidence; may be scheduled later but blocks release. |

## Matrix

| Priority | Task IDs | Why this priority | Gate / approval condition |
|---|---|---|---|
| P0 | PLAN-01 | Without approved SRS/PDF/roadmap, completeness, exact academic content and roadmap phases cannot be confirmed. | Client supplies originals or approved versioned replacements. |
| P0 | PLAN-02 | Provisional academic labels/grouping must not be frozen into production. | Client approves against authoritative sources. |
| P0 | PLAN-03 | Account provisioning, recovery and trusted role assignment define Auth and support boundaries. | Client/institution names process and responsible operators. |
| P0 | PLAN-04 | Phase 1/3 conflicts with revised Phase 4/5 feedback model; policies cannot be implemented consistently until reconciled. | Confirm separate feedback authority and lifecycle. |
| P0 | PLAN-05 | File policy and signed URL/revocation rules determine storage, validation and privacy behavior. | Client/institution approves limits, retention, deletion and URL behavior. |
| P0 | PLAN-06 | Hosting, account/data deletion, backups, exports, recovery and audit retention are operational release requirements. | Named owners, host, deletion/retention rules, schedule and recovery process approved. |
| P1 | ENV-01 | Source tracking, secret handling and authorized Supabase project configuration precede migration work. | Repository/project ownership and credential handling authorized. |
| P1 | DB-01 | Versioned database structure is a prerequisite for reliable Auth/data/RLS integration. | Schema reconciled; controlled project selected; execution authorized where applicable. |
| P1 | AUTH-01 | Real identity/session handling must replace prototype state before production data workflows. | Account lifecycle decisions accepted. |
| P1 | AUTH-02 | Instructor registration needs trusted identity verification and invitation policy. | PLAN-03, DEC-07 and secure code flow approved. |
| P1 | ADMIN-01 | Admin invitation-code operations are a privileged trust boundary. | Administrator lifecycle and code safeguards approved. |
| P1 | SEC-01 | Database authorization must exist before production reads/writes; front-end controls are insufficient. | Ownership, role and scope decisions confirmed. |
| P1 | GRANT-01 | Instructor access is individually student-controlled; viewer/storage depend on grants and revocation. | Instructor lookup and revocation behavior approved. |
| P2 | DATA-01 | Profile and Home Page are core student portfolio workflows after Auth/RLS. | Confirm profile fields and Home content source. |
| P2 | DATA-02 | Reflections depend on approved prompt content and owner-scoped persistence. | PLAN-01 and academic labels/prompts approved. |
| P2 | ART-01 | File upload/retrieval carries privacy and lifecycle risk and depends on RLS/grants plus approved policy. | PLAN-05 complete; policies tested before production files. |
| P2 | DATA-03 | PLO/Final Musings persistence requires Auth/RLS; artifact relationships also depend on ART-01. | Approved questions/outcomes and evidence relationship. |
| P2 | INSTR-01 | Real instructor viewer depends on identity, grants and student content flows. | Visibility scope approved; all read policies verified. |
| P2 | INSTR-02 | Feedback depends on policy reconciliation, active grants and viewer context. | PLAN-04 complete; separate-record policy enforced. |
| P2 | ROUTE-01 | Route state should reflect protected Auth flows and finalized information architecture. | Sitemap and auth navigation settled. |
| P2 | UX-01 | Accessibility and visual closure should be validated against final screens/content. | Design/identity and measurable criteria accepted. |
| P3 | OPS-01 | Backups, restore, monitoring and deployment are mandatory before production despite later sequencing. | Operations/hosting policy approved and restore evidence produced. |
| P3 | QA-01 | End-to-end acceptance/security evidence requires implemented features and decisions. | Required tasks complete; client accepts explicit deferrals. |

## Recommended execution waves

1. **Wave 0 â€” Baseline:** PLAN-01, PLAN-02â€“PLAN-06. Do not hard-code unresolved policy or academic assumptions.
2. **Wave 1 â€” Foundation:** ENV-01, DB-01, AUTH-01, AUTH-02, ADMIN-01, SEC-01, GRANT-01. Test denial paths before data rollout.
3. **Wave 2 â€” Student portfolio:** DATA-01, DATA-02, ART-01 and DATA-03 as separate deliverables.
4. **Wave 3 â€” Instructor/product UI:** INSTR-01, INSTR-02, ROUTE-01 and UX-01.
5. **Wave 4 â€” Release readiness:** OPS-01 then QA-01. Hosting/deployment remains blocked until backup, restore, monitoring, privacy and budget decisions are in place.

Actual dates, staffing and master-roadmap phase numbers are intentionally omitted because no approved roadmap is available.

