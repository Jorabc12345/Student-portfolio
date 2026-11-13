# Database Traceability Matrix

| Requirement | Database support | Status |
|---|---|---|
| Supabase PostgreSQL/Auth/Storage | Auth UUID FK, relational tables, Storage metadata | Supported |
| Private student portfolio | Portfolio owner and ownership paths | Requires RLS |
| Faculty read-only access | Assignment status and history | Requires RLS/Storage policies |
| Three Level 1 subjects | Seed/configuration data, not table hard-coding | Supported by design |
| Four folders per subject | `main_folders` data rows | Supported by design; seed validation required |
| Eight MED 102 domains | Separate `learning_domains` rows | Supported |
| MED 101/MED 103 questions | `content_prompts` and answers | Supported |
| Global Home Page/PLO/Final Musings | `global_sections` and global content tables | Supported |
| Artifact reuse | Junction tables | Supported |
| PLO attainment evidence | `plo_evidence`, artifact-PLO mapping | Supported |
| Future academic levels | Configurable hierarchy | Supported |
| Audit and progress | Audit, completion, progress tables | Rules unresolved |
| Private files | Storage metadata and object path | Requires Storage policies |
| Free Plan operation | Bounded files, queries, egress, backups | Operational controls required |
