# Documentation Reconciliation Traceability Matrix

| Requirement or decision | Phase 3 evidence | Phase 4 evidence | Phase 5 evidence | Reconciliation result |
|---|---|---|---|---|
| React + Vite frontend | Technology stack decision | Database design does not constrain frontend | UI/UX blueprint | Consistent |
| Tailwind CSS, Framer Motion, Lucide React | Technology stack decision | Not applicable | Visual and interaction specifications | Consistent |
| Supabase PostgreSQL Free Plan | Architecture blueprint and stack decision | Database blueprint and final schema reference | UI/UX blueprint | Consistent |
| Supabase Auth | Authentication architecture | Auth references and profile relationships | Authentication journeys | Consistent |
| Private Supabase Storage | Private storage security design | Storage metadata and security readiness | Artifact upload/viewing specifications | Consistent |
| PostgreSQL RLS | RLS security design | Database security readiness and permission matrix | UI privacy/authorization states | Consistent |
| Edge Functions only when necessary | Architecture constraints | No required function is introduced | No UI dependency | Consistent |
| Student portfolio ownership | Authorization/data-flow design | Portfolio ownership and access grants | Student role and access management | Consistent |
| Instructor registration using shared code | Authentication/authorization design | Invitation-code lifecycle schema | Instructor registration journey | Consistent |
| Code replacement does not revoke existing access | Authorization design | Invitation-code and grant model | Administrator UI specifications | Consistent |
| Student authorization/revocation | Authorization/data-flow design | Portfolio access grant and audit model | Access management UI | Consistent |
| Instructor reviews/feedback separate from originals | Role/permission documentation; older wording conflict noted | Review/feedback schema | Instructor UI and feedback specifications | Consistent after applying revised model |
| Private artifact downloads and signed URLs | Private storage security design | Storage policy requirements | Artifact UI guidance | Partially consistent; expiry/revocation copy needs finalization |
| Academic hierarchy and future levels | Academic hierarchy architecture | Academic tables and relationships | Level 1/future-level navigation | Consistent |
| No Firebase dependency | Explicit exclusions/historical notes | Explicit exclusions | No active Firebase references | Consistent; historical terms remain traceable |
| SRS requirements | Not available | Traceability references exist | UI traceability is conceptual | Not fully verifiable until SRS is restored |
| Roadmap phase dependencies | Not available | Design sequence assumptions only | Phase summaries | Not fully verifiable until roadmap is restored |

## Source-of-Truth Order

1. Approved client decisions and original academic source.
2. Finalized Phase 3 architecture documents.
3. Finalized Phase 4 database design documents.
4. Phase 5 UI/UX documents.
5. Historical Phase 1/2 records, where explicitly marked.

## Validation Result

The available technical documents agree on Supabase. Full cross-document validation remains blocked only by the missing SRS and roadmap source files and the documented instructor-model wording that requires a controlled Phase 3 editorial update.
