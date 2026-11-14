# Database Relationship Requirements

## Phase 4 – Stage 1

These are conceptual relationship requirements. They do not define SQL or physical tables.

| Relationship | Cardinality | Requirement |
|---|---|---|
| Auth user to profile | One-to-one | One application profile references one Supabase Auth user |
| Student to portfolio | One-to-one initially | Each student owns one individual portfolio |
| Academic level to subject | One-to-many | Level 1 contains exactly three subjects |
| Subject to academic section | One-to-many | MED 101/MED 103 have source periods; MED 102 has eight independent domains |
| Folder to content context | One-to-many | Folder context contains domains, prompts, reflections, and artifacts |
| Folder to academic period | One-to-one or one-to-many | Flexible for future structures |
| Subject/folder to domain | One-to-many or many-to-many | MED 102 domains are eight independent direct sections; no grouping |
| Portfolio to reflections | One-to-many | A student may create multiple reflections |
| Reflection to answers | One-to-many | Supports multiple source questions |
| Portfolio to artifacts | One-to-many | A student may own multiple evidence items |
| Reflection to artifacts | Many-to-many | Evidence may support multiple reflections |
| Artifact to domains | Many-to-many | One artifact may cross-reference domains |
| Artifact to PLOs | Many-to-many | One artifact may support PLOs |
| Portfolio to PLO evidence | One-to-many | Student records evidence and explanation |
| Level/portfolio to Final Musings | One-to-many | Five Level 1 responses belong to the portfolio/level |
| Faculty to portfolios | Many-to-many | Faculty may view multiple assignments |
| Portfolio to faculty | Many-to-many | Students may have multiple authorized faculty |
| Assignment to history | One-to-many | Optional assignment/revocation history |
| Portfolio to activity logs | One-to-many | Approved events may be recorded |

## Ownership Propagation

Every student content entity must resolve to one portfolio owner. Child records cannot point to a different portfolio from their parent artifact, reflection, PLO evidence, or association.

## Cross-Reference Rules

- Association records reference valid artifacts and domains/PLOs.
- Reflection-artifact links remain within one portfolio.
- Multiple links do not copy the Storage object.
- Removing one association does not delete the artifact or other associations.
- Artifact deletion must define dependent association and Storage cleanup.

## Access Relationships

Faculty assignments provide read access and require active/revoked lifecycle information. Students and ordinary faculty cannot write assignment records.

## Derived Relationships

Progress and completion may be derived from approved rules or stored as auditable state. No relationship implies PLO attainment, grading, or feedback.
