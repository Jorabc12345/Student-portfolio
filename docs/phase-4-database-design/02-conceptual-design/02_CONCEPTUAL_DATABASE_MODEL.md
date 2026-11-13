# Conceptual Database Model

## Scope

This conceptual model applies the revised student-authorized instructor access model. It is not executable SQL and does not finalize unresolved workflow or institutional decisions.

## Entity Groups

### Identity and ownership

`AUTH_USER` (Supabase Auth identity), `USER_PROFILE`, `STUDENT_PROFILE`, `INSTRUCTOR_PROFILE`, `ROLE`, `USER_ROLE`, and `PORTFOLIO`.

### Authorization

`PORTFOLIO_ACCESS_GRANT` represents an explicit student authorization. `PORTFOLIO_ACCESS_EVENT` preserves grant and revocation history. A registered instructor has no portfolio access without an active grant.

### Academic configuration

`ACADEMIC_LEVEL`, `SUBJECT`, `MAIN_FOLDER`, `ACADEMIC_PERIOD`, `LEARNING_DOMAIN`, `CONTENT_PROMPT`, `GLOBAL_SECTION`, and `PROGRAM_LEARNING_OUTCOME`.

Level 1 has three subjects and twelve folders. MED 102 has eight independent domains that remain accessible even when grouped under four folders.

### Student content

`PORTFOLIO_REFLECTION`, `REFLECTION_ANSWER`, `ARTIFACT`, `ARTIFACT_STORAGE_METADATA`, `REFLECTION_ARTIFACT`, `ARTIFACT_DOMAIN`, `ARTIFACT_PLO`, `PLO_EVIDENCE`, `HOME_PAGE_CONTENT`, and `FINAL_MUSINGS_RESPONSE`.

### Instructor collaboration

`PORTFOLIO_REVIEW` belongs to an instructor and portfolio. `PORTFOLIO_FEEDBACK` is authored by an instructor and may be general, review-linked, reflection-linked, or artifact-linked. These entities never replace student content.

### Monitoring

`AUDIT_LOG`, `COMPLETION_REQUIREMENT`, `SECTION_COMPLETION`, and `PORTFOLIO_PROGRESS`.

## Ownership Rules

The student owns the portfolio and all original content. Instructor authorization grants access but transfers no ownership. Instructor reviews and feedback are instructor-authored records. RLS and Storage policies must enforce these distinctions.

## Conceptual Issues

Instructor verification, grant expiry, feedback lifecycle, review visibility, notifications, audit retention, and progress calculations remain unresolved. These can be represented conceptually without silently finalizing them.
