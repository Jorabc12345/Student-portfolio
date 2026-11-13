# Phase 4 Validation Report

## Result

**Conditionally complete and ready for Phase 5 planning.** The logical model supports the revised student-authorized instructor model. The supplied decisions resolve the policy direction for registration, authorization, private Storage, and separated feedback; implementation and operational details remain outstanding.

## Academic Validation

- Three Level 1 subjects: supported.
- Four folders per subject and twelve total: supported by configurable data and seed checks.
- Eight MED 102 domains: supported as separate accessible records.
- MED 101 and MED 103 prompts: represented through protected prompt configuration.
- Home Page, PLO Attainment, and Final Musings: separate global sections.
- Future levels: supported without new schema tables.
- Artifact policy settings: supported as configurable data; exact formats, limits, and retention remain pending.
- Provisional MED 102 grouping is not treated as approved.

## Scenario Validation

| Scenario | Expected result |
|---|---|
| Student views own portfolio | Allowed |
| Student edits own reflection | Allowed |
| Student uploads own artifact | Allowed |
| Student accesses another portfolio | Denied |
| Authorized instructor views portfolio | Allowed |
| Unauthorized instructor views portfolio | Denied |
| Revoked instructor views portfolio/file | Denied for subsequent checks |
| Instructor edits reflection | Denied |
| Instructor deletes artifact | Denied |
| Instructor creates authorized feedback | Allowed |
| Instructor creates unauthorized feedback | Denied |
| Student views own feedback | Allowed |
| Student views another student's feedback | Denied |
| Anonymous private portfolio/file access | Denied |

## Quality Findings

Naming, UUID usage, foreign keys, uniqueness, indexes, and future hierarchy support are consistent. Cross-portfolio contextual integrity requires RLS/trusted functions. Feedback revisions, completion, and progress should remain optional until approved.

## Seed Validation Requirements

Seed/configuration validation must run before student records are created:

- Exactly three Level 1 subjects with stable codes for MED 101, MED 102, and MED 103.
- Exactly four main folders per subject and exactly twelve total.
- Exactly eight distinct MED 102 domain records, each directly accessible and optionally linked to a parent folder.
- All required MED 101 and MED 103 reflection prompts, preserving official wording and source references.
- Exactly eleven PLO records.
- All five Final Musings prompts under the Level 1 global section.
- Home Page, PLO Attainment, and Final Musings represented as global sections rather than subject folders.
- No sample seed row may reference a student portfolio or student-owned artifact.

## Resolved Policy Directions

- Instructor registration is allowed, but registration cannot self-assign the instructor role.
- Instructor identity and role require an approved verification process.
- Students grant and revoke instructor access.
- Private Storage and short-lived signed URLs are required.
- Revoked access must prevent new signed URLs from being generated.
- Reviews and feedback remain separate from student portfolio content.
- Instructor registration requires the current valid client-issued shared invitation code.
- Multiple instructors may use the active code; each registration creates an individual account.
- Code replacement or disablement blocks future registration but does not affect existing accounts or portfolio grants.
- Successful validation atomically grants the Instructor role; registration alone does not.

## Remaining Blocking Issues

1. Client operational process for securely storing, replacing, and disabling the shared invitation code.
2. Exact allowed artifact formats and file-size limits.
3. Institutional retention and permanent-deletion rules.
4. Who may edit/delete feedback and whether prior reviews are immutable.
5. Backup owner, destination, schedule, restoration authority, and restore-test cadence.
6. RLS and Storage policy implementation/testing.

No SQL was executed, no live database was modified, and no Phase 5 implementation was started.
