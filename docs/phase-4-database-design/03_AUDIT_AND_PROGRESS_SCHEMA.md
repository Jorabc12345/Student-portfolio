# Audit and Progress Schema

## Phase 4 – Stage 3

These are logical proposals; activity and completion rules require approval.

## Audit Logs

Proposed fields:

- `id` UUID primary key.
- `actor_user_id` UUID referencing Supabase Auth identity.
- Nullable `portfolio_id`.
- `event_type`.
- `target_type`.
- Nullable `target_id`.
- `safe_metadata` JSONB.
- `occurred_at` timestamptz.

Do not store passwords, tokens, signed URLs, raw reflection content, patient information, or file contents. Ordinary students and faculty cannot update or delete audit records.

## Candidate Events

Account status changes, faculty assignment/revocation, reflection changes, artifact upload/replace/delete/access denial, PLO evidence changes, Final Musings changes, and security denials. Final events and retention remain open.

## Completion Requirements

Proposed fields include academic context, stable requirement code, description, required flag, display order, and active status. Requirements are configurable for future levels.

## Section Completion

Proposed fields include portfolio/requirement keys, `not_started`/`in_progress`/`completed` status, completed timestamp, and updated timestamp. Whether completion is manually marked or derived is unresolved.

## Portfolio Progress

Proposed fields include portfolio/level keys, calculated status, completion percentage, calculation version, and calculated timestamp. Progress is not formal PLO attainment or grading.

## Faculty Access History

If approved, retain assignment lifecycle events separately from current active assignment status. Historical rows must never grant access.

## Free Plan

Scope audit/progress queries, avoid sensitive payloads, and avoid repeated recalculation or unnecessary background processing.
