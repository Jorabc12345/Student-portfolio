# UI/UX Requirements Analysis

## Status

Phase 5 Stage 1 planning document. No frontend code or UI screens have been implemented.

## Documentation Reconciliation

The current architecture documents describe faculty as read-only viewers with no feedback, while the revised Phase 4 model permits verified instructors with active student authorization to conduct reviews and provide separate feedback. Phase 5 uses the revised model and flags the older architecture wording for reconciliation.

The workspace contains the Phase 1–4 documentation, but no separate roadmap, SRS, or original PDF file was available at the project root during this review. Academic UX requirements are based on the approved Phase 2 academic blueprint and existing source-review records.

## Product Experience

SLRP is a private academic reflection and evidence portfolio, not a task-management dashboard. The interface should emphasize learning narrative, reflection prompts, evidence context, professional identity, and longitudinal growth.

## User Types

### Student / Portfolio Owner

Owns one private portfolio, creates and manages original content, uploads artifacts, documents PLO attainment, completes Final Musings, and controls instructor access.

### Instructor

Registers using the current client-controlled shared invitation code, receives a verified Instructor role, and sees no portfolio until individually authorized by a student. An authorized instructor views portfolio content, conducts reviews, and creates separate guidance/feedback. They cannot modify original student content.

### Client Administrator

Controls the current shared instructor invitation code by generating, replacing, or disabling it. This role is a narrowly scoped operational capability, not a general portfolio administrator or academic-content editor.

## Core UX Requirements

- Private authenticated access with clear ownership boundaries.
- Calm academic presentation suitable for medical students and faculty review.
- Prompts must preserve official wording and context.
- MED 102 has eight separately navigable domains and no parent folders.
- Uploads must communicate file rules, progress, failure, and privacy.
- Instructor review/feedback must be visually distinct from student-authored content.
- Access grants and revocations must be understandable and explicit.
- No invented grading, submission, approval, or task-management workflow.

## Required Interface States

- Loading and route-transition states that preserve context.
- Empty states for a new portfolio, no artifacts, no feedback, and no authorized portfolios.
- Inline validation for required answers, file type/size, invitation codes, and access actions.
- Explicit success confirmations for saves, uploads, grants, revocations, reviews, and feedback.
- Actionable errors for failed saves, failed uploads, expired sessions, and unavailable files.
- Unauthorized and revoked-access states that do not reveal another student's existence.
- Upload progress, cancellation/retry, and partial-failure handling.
- No-search-results state where search is approved.
- Unsaved-change warning before navigation or logout.

## Usability, Accessibility, and Responsive Requirements

- Use clear academic language and preserve official prompts without truncation that changes meaning.
- Support keyboard navigation, visible focus, semantic headings, descriptive labels, error association, and sufficient color contrast.
- Do not communicate status by color alone; pair icons/text with status.
- Provide accessible upload progress and screen-reader announcements for success/failure.
- Support desktop, tablet, and mobile layouts without hiding required academic context.
- Keep actions predictable: save, cancel, revoke, delete, and publish/feedback actions require clear labels and confirmation where destructive.
- Avoid dense dashboard cards, gamification, ranking, or task-list metaphors.

## Privacy and Academic Integrity

- Show private-portfolio status and authorized-viewer context.
- Warn users not to upload patient-identifying information.
- Do not expose private file URLs, unrelated user names, or unauthorized portfolio existence.
- Preserve student authorship and visually distinguish instructor guidance.
- Provide appropriate acknowledgement/context for artifacts, collaborators, references, and permitted AI use.
