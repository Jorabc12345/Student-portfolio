# Requirements Traceability Matrix

Phase 1 – Stage 4 validation

This matrix links source requirements to functional/non-functional requirements, planned application modules, and measurable acceptance criteria. “Open” identifies a requirement whose principle is known but whose final detail still requires client confirmation.

| Trace ID | Requirement | Source | FR / NFR | Planned module | Acceptance criterion | Status |
|---|---|---|---|---|---|---|
| TR-001 | Portfolio is an individual student portfolio | Client decision; Stage 1 | FR-003, FR-015; NFR-008 | Student Profile; Privacy and File Access | AC-005 | Confirmed |
| TR-002 | Level 1 is the initial academic coverage | Client decision; Stage 1 | FR-005 | Academic Level Management | AC-012 | Confirmed |
| TR-003 | Level 1 contains exactly MED 101, MED 102, and MED 103 | Client decision; Stage 1 | FR-006 | Subject Management | AC-012 | Confirmed |
| TR-004 | MED 101 and MED 103 each have four Bimonthly sections; MED 102 has eight independent domains | Official PDF; Phase 2 | FR-007, FR-008 | Academic Sections and Learning Domains | AC-013, AC-014, AC-018 | Confirmed; no MED 102 parent folders |
| TR-005 | MED 101 contains four bimonthly periods and prescribed CERAE questions | PDF pp. 4–5; Stage 2 | FR-008, FR-009 | Learning Periods; Reflections | AC-017, AC-021 | Source requirement |
| TR-006 | MED 102 retains all eight independent required domains | PDF pp. 5-6; Stage 2 | FR-008 | Learning Domains | AC-018 | Confirmed; no parent grouping |
| TR-007 | MED 102 uses the four prescribed reflection questions for every domain | PDF pp. 5–6; Stage 2 | FR-009 | Reflections | AC-019 | Source requirement |
| TR-008 | MED 103 contains four bimonthly periods, themes, and prescribed CERAE questions | PDF pp. 6–8; Stage 2 | FR-008, FR-009 | Learning Periods; Reflections | AC-020 | Source requirement |
| TR-009 | Home Page contains All About Me, My Learning Philosophy, My Why, and The Good Doctor | PDF p. 4 | FR-003, FR-004 | Profile and Home Page | AC-010 | Source requirement |
| TR-010 | All eleven PLOs must be available for evidence documentation | PDF pp. 8–9 | FR-011 | PLO Documentation | AC-032, AC-033 | Source requirement |
| TR-011 | PLO evidence includes artifact links, descriptions, and short reflections | PDF pp. 8–9; Stage 2 | FR-010, FR-011 | Artifacts; PLO Documentation | AC-033 | Source requirement |
| TR-012 | Evidence does not automatically establish formal PLO attainment | PDF pp. 8–9; SRS | FR-011; NFR-012 | PLO Documentation | AC-035 | Confirmed constraint |
| TR-013 | Level 1 includes all five Final Musings questions | PDF p. 9 | FR-012 | Final Musings | AC-036, AC-037 | Source requirement |
| TR-014 | Artifacts must be authentic, relevant, reflectively significant, and professional | PDF p. 9 | FR-010; NFR-015 | Artifact Management | AC-026, AC-031 | Source requirement |
| TR-015 | Patient-identifiable information must not be uploaded | PDF p. 3 and p. 9 | FR-010, FR-015; NFR-010, NFR-011 | Artifact Management; Privacy | AC-030, AC-031 | Source requirement |
| TR-016 | References, collaborators, and AI use must be acknowledged | PDF p. 9 | FR-010; NFR-012 | Artifact and Reflection Guidance | AC-031 | Source requirement |
| TR-017 | Login is mandatory | Client decision; Stage 1 | FR-001; NFR-001 | Authentication | AC-001, AC-003 | Confirmed |
| TR-018 | Portfolio access is private | Client decision; PDF p. 3 | FR-001, FR-015; NFR-008, NFR-009 | Authentication; Privacy | AC-003, AC-030 | Confirmed |
| TR-019 | Student has full management access to their own portfolio | Client decision; Stage 1 | FR-002 through FR-012 | Student Management Modules | AC-005, AC-009, AC-022, AC-023, AC-028, AC-033, AC-037 | Confirmed within own portfolio |
| TR-020 | Authorized faculty have read-only access | Client decision; Stage 1 | FR-002, FR-013; NFR-002, NFR-003 | Faculty Viewer; Authorization | AC-006, AC-007, AC-008 | Confirmed |
| TR-021 | Faculty cannot comment, provide feedback, edit, delete, upload, or grade | Client decision; Stage 1 | FR-002, FR-009, FR-010, FR-011, FR-012, FR-013; NFR-003 | Backend Authorization | AC-007, AC-025, AC-029, AC-034, AC-038 | Confirmed exclusion |
| TR-022 | Faculty access requires explicit authorization assignment | Client decision; SRS | FR-002, FR-013, FR-015; NFR-002, NFR-008 | Faculty Assignment and Authorization | AC-006 | Assignment process open |
| TR-023 | Artifact storage and downloads must be private and authorized | PDF p. 3; SRS | FR-010, FR-015; NFR-004, NFR-006 | Private File Access | AC-029, AC-030 | Confirmed control; provider open |
| TR-024 | File type and size validation is required | SRS; Stage 1 open decision | FR-010; NFR-005 | Artifact Validation | AC-027 | Limits open |
| TR-025 | Future academic levels must be supportable | Client decision; Stage 1/2 | FR-005; NFR-022 through NFR-025 | Extensible Academic Content | AC-012; future-level design review | Confirmed objective |
| TR-026 | Responsive website supports desktop, tablet, and mobile | Client scope; Stage 3 | NFR-017, NFR-018 | Responsive Web Experience | AC-039 | Confirmed scope |
| TR-027 | Backend authorization must not depend on frontend visibility | Stage 3 requirement | FR-002, FR-015; NFR-002, NFR-003 | Authorization Policies | AC-007, AC-008 | Confirmed control |
| TR-028 | Progress dashboard and draft/completed behavior | Roadmap proposal; SRS OD-011 | FR-014 | Progress Dashboard | AC-042, AC-043 | Proposed; not baseline until approved |
| TR-029 | Exact folder names for all subjects | Stage 1/2 open decision | FR-007 | Subject Folder Management | AC-016 | Open |
| TR-030 | MED 102 domain-to-folder mapping | Stage 1/2 open decision | FR-007, FR-008 | Subject Folder; Learning Domain Management | AC-016, AC-018 | Open |
| TR-031 | Faculty visibility granularity | Stage 1/3 open decision | FR-013, FR-015 | Faculty Viewer | AC-006 | Open |
| TR-032 | Account creation and password recovery | Stage 1/3 open decision | FR-001 | Authentication | AC-001, AC-002 | Open |
| TR-033 | Hosting, storage provider, backups, retention, and recovery | Stage 1/3 open decision | FR-015; NFR-004, NFR-006 | Operations and Private Storage | AC-030, production readiness review | Open |

## Traceability Coverage Review

- Every confirmed academic requirement has at least one planned module and one acceptance criterion.
- Every confirmed access, privacy, and ownership requirement has both functional and non-functional coverage.
- The fixed subject and folder counts are covered by FR-006/FR-007 and AC-012–AC-014.
- The eight MED 102 domains, eleven PLOs, and five Final Musings questions have explicit content and acceptance links.
- Open decisions are not silently converted into approved requirements; each has a safe provisional behavior and a linked decision or acceptance boundary.
- The progress dashboard is the only listed functional module that remains conditional rather than a mandatory acceptance baseline.

## Missing or Incomplete Traceability Links

No confirmed requirement lacks a planned function and acceptance criterion. The following cannot be fully finalized until client decisions are recorded:

1. Folder labels and MED 102 domain grouping (TR-029, TR-030).
2. Exact faculty visibility scope and assignment process (TR-022, TR-031).
3. Account provisioning and recovery (TR-032).
4. Artifact limits and operational storage/backup policies (TR-024, TR-033).
5. Dashboard calculation and draft/completed behavior (TR-028).

