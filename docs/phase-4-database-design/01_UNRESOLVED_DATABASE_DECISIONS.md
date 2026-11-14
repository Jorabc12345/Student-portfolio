# Unresolved Database Decisions

## Phase 4 – Stage 1

| Decision | Owner | Severity | Database impact | Blocks Stage 2? |
|---|---|---:|---|---|
| Supabase ownership, administrators, and region | Client/developer | High | Deployment, data location, backup access | No, confirm before production |
| Manual invitations and recovery/disablement rules | Client/developer | High | Profile/status and provisioning workflows | No |
| Individual faculty assignment/revocation | Client | High | Assignment lifecycle and RLS conditions | No; model configurable status |
| Exact artifact formats and size limits | Client | High | Storage metadata validation and quota planning | No; use configurable policy |
| Artifact retention, replacement, and deletion | Client | High | Lifecycle fields and cleanup behavior | Yes for final deletion design |
| Scheduled backup destination and restore tests | Developer | High | Export scope and operations | No, required before production |
| MED 103 official titles and shorter labels | Client | Medium | Display label/version data | No; separate labels from IDs |
| Basic activity logs and event retention | Client/developer | Medium | Audit entity and retention fields | No if minimal set is defined |
| Portfolio completion rules | Client/developer | Medium | Progress/completion design | Yes for final progress design |
| Faculty access history | Client/developer | Low | Optional history entity | No |
| Cloudflare Pages Free approval | Developer | Medium | Deployment metadata only | No |

## Configurable Without Schema Redesign

- Display names and navigation labels.

- Academic periods and future-level structure.
- Artifact policy values where governed as configuration.
- Faculty assignment active/revoked state.

## Must Be Confirmed Before Implementation

- Artifact deletion/retention.
- Backup ownership and restore procedure.
- Completion rules if progress is Version 1.
- Faculty assignment lifecycle.
- Confirm exact MED 102 source wording before content seeding; completed in the Phase 2 finalization record.

## Prohibited Assumptions

- Future levels use four folders.
- PLO association proves attainment.
- Faculty assignments are permanent.
- Free Plan quotas are unlimited or permanent.
- Files should be stored in PostgreSQL to avoid Storage limits.
- An unrestricted administrator role is approved.

## Current MED 102 structure (13 November 2026)

The official instructions PDF, section 2.2 (pp. 5-6), defines eight independent MED 102 domains, with required evidence, competency descriptions, one shared four-question reflection guide, and pertinent artifacts. MED 102 has no four-parent-folder requirement. Earlier proposed-parent and unresolved-grouping text in this document is superseded. See docs/phase-2-academic-content/03_MED102_STRUCTURE_FINALIZATION.md for exact wording and the database representation review.
