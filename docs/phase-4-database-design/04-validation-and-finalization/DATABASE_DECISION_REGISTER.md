# Phase 4 Database Decision Register

| Decision | Current position | Approval |
|---|---|---|
| Database platform | Supabase PostgreSQL | Approved technical direction |
| Authentication | Supabase Auth; no password tables | Approved technical direction |
| Artifact storage | Private Supabase Storage with metadata | Approved technical direction |
| Student ownership | One private portfolio per student | Confirmed requirement |
| Instructor access | Explicit student grant; no automatic assignment; private Storage and short-lived signed URLs | Confirmed direction |
| Instructor role | Client administrator controls one shared active invitation code; multiple instructors may use it; replacement/disablement affects future registration only | Confirmed direction; secure code handling pending operational approval |
| Instructor feedback | Separate additive records; no original-content mutation | Confirmed direction; edit/delete policy needed |
| MED 102 domains | Eight distinct accessible domain records | Confirmed requirement |
| MED 102 grouping | Four-folder organization remains provisional | Client approval needed |
| Review lifecycle | Separate review/feedback records; preservation policy required | Edit/delete and retention policy needed |
| Artifact retention | Allowed formats and file-size limits required; retention/deletion configurable | Institutional approval needed |
| Audit/progress scope | Bounded events; progress optional | Client/institution approval needed |
| Backup/restore | Owner, destination, schedule, and restoration responsibility must be established | Institutional approval needed |
| RLS/Storage policies | Student ownership, active instructor grants, private buckets, and revocation tests required | Developer implementation required |
