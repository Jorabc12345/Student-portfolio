# Database Entity Inventory

## Phase 4 – Stage 1

The following are conceptual entities, not implemented tables.

## 1. Identity and Access

| Entity | Purpose | Security concern |
|---|---|---|
| Auth user reference | Links application identity to Supabase Auth user ID | Never store passwords or tokens |
| User profile | Student/faculty display and approved profile information | Role/status fields are trusted |
| Role/status | Identifies student or faculty and account state | Not self-editable |
| Portfolio | Student-owned private portfolio | One owner initially |
| Faculty access assignment | Grants faculty read access to a student portfolio | Trusted, revocable |

## 2. Academic Configuration

- Academic level.
- Subject.
- Main folder.
- Academic period.
- Learning domain.
- Content prompt.
- Global portfolio section.
- Program Learning Outcome.

## 3. Portfolio Content

- Reflection.
- Reflection answer.
- Artifact.
- Artifact-domain association.
- Artifact-PLO association.
- Reflection-artifact association.
- PLO evidence entry.
- Home Page content.
- Final Musings response.

## 4. Operational Records

- Section completion.
- Portfolio progress.
- Activity/audit log.
- Faculty access history, if approved.
- Storage metadata.

Progress and audit entities require approved rules and retention policies before implementation.

## 5. Supabase Boundaries

Supabase Auth owns credentials, sessions, and authentication identity. PostgreSQL stores the Auth user ID reference and approved profile/access data. Supabase Storage owns artifact bytes. PostgreSQL stores Storage paths, metadata, and relationships.

## 6. Exclusions

- Password hashes or authentication tokens.
- Patient records or identifiable clinical data.
- Duplicate binary copies.
- Faculty comments, feedback, or grades.
- Unapproved administrator data.
- Future academic content not yet approved.
