# Architecture Traceability Matrix

## Phase 3 – Stage 4

| Requirement | Architecture response | Evidence |
|---|---|---|
| Private individual portfolio | Portfolio owner boundary and private RLS/Storage | `SYSTEM_ARCHITECTURE_BLUEPRINT.md` |
| Mandatory login | Supabase Auth session required for private access | `03_AUTHENTICATION_ARCHITECTURE.md` |
| Student owns portfolio | Owner checks on every portfolio child resource | `03_DATABASE_RLS_SECURITY_DESIGN.md` |
| Faculty authorized read-only access | Assignment-scoped SELECT; all mutations denied | `03_ROLE_AND_PERMISSION_MATRIX.md` |
| Exactly three Level 1 subjects | Configurable Level 1 with MED 101, MED 102, MED 103 | `02_ACADEMIC_HIERARCHY_ARCHITECTURE.md` |
| Four folders per subject | Twelve main subject folders; global sections excluded | `02_ACADEMIC_HIERARCHY_ARCHITECTURE.md` |
| Eight MED 102 domains | Independent domain identities and association links | `02_ACADEMIC_HIERARCHY_ARCHITECTURE.md` |
| No duplicate cross-referenced files | One artifact binary with many association records | `02_SYSTEM_DATA_FLOW.md` |
| MED 101 reflection requirements | Period folders preserve CERAE/reflection/artifact pattern | Phase 2 blueprint; `02_ACADEMIC_HIERARCHY_ARCHITECTURE.md` |
| MED 103 reflection requirements | Official themes/questions remain source-controlled | Phase 2 blueprint; `02_ACADEMIC_HIERARCHY_ARCHITECTURE.md` |
| Home Page separate | Global navigation section outside subject folders | `SYSTEM_ARCHITECTURE_BLUEPRINT.md` |
| PLO Attainment separate | Eleven PLO section with evidence links | `02_ACADEMIC_HIERARCHY_ARCHITECTURE.md` |
| Final Musings separate | Five-question Level 1 global section | `02_ACADEMIC_HIERARCHY_ARCHITECTURE.md` |
| Future academic levels | Configurable levels and academic units | `02_SYSTEM_ARCHITECTURE.md` |
| Private artifacts | Private Storage, policy checks, controlled URLs | `03_PRIVATE_STORAGE_SECURITY.md` |
| Patient confidentiality | Upload warnings and prohibited identifying data | `03_PRIVACY_AND_DATA_PROTECTION.md` |
| No faculty feedback/grading | Matrix and RLS deny those operations | `03_ROLE_AND_PERMISSION_MATRIX.md` |
| Free Plan operation | Query/storage/bandwidth controls and manual backup | `01_SUPABASE_FREE_PLAN_CONSTRAINTS.md` |
| No service-role exposure | Public key only in frontend; secrets protected | `03_AUTHENTICATION_ARCHITECTURE.md` |
| Future cost awareness | Quotas and possible paid-usage risk documented | `01_ARCHITECTURE_RISK_REGISTER.md` |

## Validation Result

All confirmed requirements have an architecture response. Provisional academic and operational decisions remain flagged rather than being represented as finalized.
