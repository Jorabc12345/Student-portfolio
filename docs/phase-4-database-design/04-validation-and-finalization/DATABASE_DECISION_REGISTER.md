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
| MED 102 domains | Eight distinct accessible domain records with the owner-confirmed official names recorded in the Phase 2 update | Confirmed requirement; attached PDF checked at pp. 5-6 |
| MED 102 academic structure | Eight independent official domains, separately identifiable and subject-linked; no parent-folder layer | Confirmed by official instructions, section 2.2, pp. 5-6; no client decision remains |
| Review lifecycle | Separate review/feedback records; preservation policy required | Edit/delete and retention policy needed |
| Artifact retention | Allowed formats and file-size limits required; retention/deletion configurable | Institutional approval needed |
| Audit/progress scope | Bounded events; progress optional | Client/institution approval needed |
| Backup/restore | Owner, destination, schedule, and restoration responsibility must be established | Institutional approval needed |
| RLS/Storage policies | Student ownership, active instructor grants, private buckets, and revocation tests required | Developer implementation required |

## Official section-name clarification (13 November 2026)

The attached official `BukSU-COM Portfolio Instructions.pdf` was inspected at pp. 4-8. The PDF gives MED 101 period names, eight MED 102 domains, and fuller MED 103 period headings with themes. The user confirms the bare Bimonthly terms as MED 101/MED 103 section names; preserve MED 103 themes separately. The approved MED 102 structure is eight independent domains with no parent-folder layer. The reviewed schema supports separate learning_domains linked to the subject and a nullable parent_folder_id; no schema change is needed. UI specifications must expose the domains directly and omit proposed parent cards.