# System Entity Relationship Diagram

## Phase 4 – Stage 2

Conceptual Mermaid ERD only. It is not executable schema.

```mermaid
erDiagram
    AUTH_USER_REF ||--|| USER_PROFILE : identifies
    USER_PROFILE ||--o| STUDENT_PROFILE : specializes
    USER_PROFILE ||--o| FACULTY_PROFILE : specializes
    STUDENT_PROFILE ||--|| PORTFOLIO : owns
    FACULTY_PROFILE ||--o{ FACULTY_PORTFOLIO_ASSIGNMENT : receives
    PORTFOLIO ||--o{ FACULTY_PORTFOLIO_ASSIGNMENT : grants
    ACADEMIC_LEVEL ||--o{ SUBJECT : contains
    SUBJECT ||--o{ MAIN_FOLDER : contains
    MAIN_FOLDER ||--o{ LEARNING_DOMAIN : organizes
    PORTFOLIO ||--o{ REFLECTION : owns
    REFLECTION ||--o{ REFLECTION_ANSWER : contains
    REFLECTION }o--o{ ARTIFACT : references
    PORTFOLIO ||--o{ ARTIFACT : owns
    ARTIFACT ||--|| ARTIFACT_STORAGE_METADATA : stores
    ARTIFACT }o--o{ LEARNING_DOMAIN : supports
    ARTIFACT }o--o{ PROGRAM_LEARNING_OUTCOME : supports
    PORTFOLIO ||--o{ PLO_EVIDENCE : documents
    PORTFOLIO ||--o{ FINAL_MUSINGS_RESPONSE : owns
    PORTFOLIO ||--o{ HOME_PAGE_CONTENT : owns
    PORTFOLIO ||--o{ SECTION_COMPLETION : tracks
    PORTFOLIO ||--o{ PORTFOLIO_PROGRESS : summarizes
    PORTFOLIO ||--o{ AUDIT_LOG : concerns
```

## Key Constraints

- `AUTH_USER_REF` references the Supabase Auth user ID.
- A portfolio has one student owner.
- Faculty assignments are active/revocable and never grant writes.
- Content and junction rows resolve to one portfolio owner.
- Storage bytes remain outside PostgreSQL.
