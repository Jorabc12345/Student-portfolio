# Final Architecture Decision Register

## Phase 3 – Stage 4

| ID | Decision | Status |
|---|---|---|
| ADR-001 | React + Vite frontend | Confirmed |
| ADR-002 | Tailwind CSS, Framer Motion, Lucide React | Confirmed |
| ADR-003 | Supabase Free Plan backend | Confirmed |
| ADR-004 | Supabase PostgreSQL for structured data | Confirmed |
| ADR-005 | Supabase Authentication with email/password direction | Confirmed direction; provider/provisioning details open |
| ADR-006 | PostgreSQL RLS as authoritative row authorization | Required architecture decision |
| ADR-007 | Private Supabase Storage for artifacts | Confirmed direction; exact bucket/file policy open |
| ADR-008 | Edge Functions only when genuinely necessary | Constrained decision |
| ADR-009 | Cloudflare Pages Free for frontend hosting, separate from Supabase | Recommended; developer approval |
| ADR-010 | Stable academic IDs with configurable display names | Confirmed |
| ADR-011 | Twelve Level 1 subject folders and separate global sections | Confirmed |
| ADR-012 | Eight MED 102 domains retain independent identities | Confirmed |
| ADR-013 | Many-to-many artifact/domain/PLO relationships without duplicate files | Confirmed requirement |
| ADR-014 | Faculty access is assigned, authenticated, and strictly read-only | Confirmed requirement |
| ADR-015 | Scheduled manual database and file backups | Recommended; developer approval |
| ADR-016 | Initial accounts are manually invited | Recommended; client and developer approval |
| ADR-017 | Client individually assigns and revokes authorized faculty | Recommended; client approval |
| ADR-018 | Upload limits and documented retention policy are required | Required direction; exact policy client approval |
| ADR-019 | Show eight official MED 102 domains as independent sections; omit proposed four-group mapping | Confirmed by official PDF; no client approval required |
| ADR-020 | Preserve official MED 103 period titles; use shorter navigation labels | Recommended; client approval |
| ADR-021 | Basic activity logs and defined completion rules | Recommended; client and developer approval |

## Architecture Invariants

1. No Firebase, Laravel, MySQL, paid backend, or unapproved third-party API.
2. No unauthenticated private portfolio or artifact access.
3. Faculty cannot mutate student content.
4. Frontend visibility is never authorization.
5. Student ownership and faculty assignment are checked by RLS/Storage policies.
6. Academic content is not invented or silently regrouped.
7. One artifact binary may support multiple domains and PLOs.
8. Future academic levels remain configurable.

## Decisions Still Open

- Developer approval of Cloudflare Pages Free.
- Supabase project owner, administrators, and region.
- Authentication recovery, disablement, and session policy.
- Exact artifact formats, size limits, retention, review, and deletion policy.
- Backup destination, schedule details, and restore testing procedure.
- Client approval of the proposed MED 102 parent-folder grouping.
- Client approval of shortened MED 103 navigation labels.
- Detailed audit events and completion-rule definitions.

These are not silently resolved by this register.
