# Final Database ERD

```mermaid
erDiagram
  AUTH_USER ||--|| USER_PROFILE : identifies
  USER_PROFILE ||--o| STUDENT_PROFILE : specializes
  USER_PROFILE ||--o| INSTRUCTOR_PROFILE : specializes
  USER_PROFILE ||--o{ INSTRUCTOR_INVITATION_CODE : creates_or_redeems
  INSTRUCTOR_INVITATION_CODE ||--|| INSTRUCTOR_PROFILE : redeems
  USER_PROFILE ||--o{ USER_ROLE : receives
  ROLE ||--o{ USER_ROLE : defines
  STUDENT_PROFILE ||--|| PORTFOLIO : owns
  PORTFOLIO ||--o{ PORTFOLIO_ACCESS_GRANT : authorizes
  INSTRUCTOR_PROFILE ||--o{ PORTFOLIO_ACCESS_GRANT : receives
  PORTFOLIO_ACCESS_GRANT ||--o{ PORTFOLIO_ACCESS_EVENT : records
  ACADEMIC_LEVEL ||--o{ SUBJECT : contains
  SUBJECT ||--o{ MAIN_FOLDER : contains
  MAIN_FOLDER ||--o{ ACADEMIC_PERIOD : has
  SUBJECT ||--o{ LEARNING_DOMAIN : defines
  MAIN_FOLDER o|--o{ LEARNING_DOMAIN : groups
  ACADEMIC_LEVEL ||--o{ GLOBAL_SECTION : contains
  GLOBAL_SECTION ||--o{ CONTENT_PROMPT : defines
  PORTFOLIO ||--o{ REFLECTION : owns
  REFLECTION ||--o{ REFLECTION_ANSWER : contains
  PORTFOLIO ||--o{ ARTIFACT : owns
  ARTIFACT ||--|| ARTIFACT_STORAGE_METADATA : stores
  ARTIFACT_POLICY_SETTINGS ||--o{ ARTIFACT : governs
  REFLECTION }o--o{ ARTIFACT : references
  ARTIFACT }o--o{ LEARNING_DOMAIN : supports
  ARTIFACT }o--o{ PROGRAM_LEARNING_OUTCOME : supports
  PORTFOLIO ||--o{ PLO_EVIDENCE : documents
  PORTFOLIO ||--o{ PORTFOLIO_REVIEW : receives
  INSTRUCTOR_PROFILE ||--o{ PORTFOLIO_REVIEW : conducts
  PORTFOLIO_REVIEW ||--o{ PORTFOLIO_FEEDBACK : contains
  INSTRUCTOR_PROFILE ||--o{ PORTFOLIO_FEEDBACK : authors
  PORTFOLIO ||--o{ PORTFOLIO_FEEDBACK : receives
  REFLECTION o|--o{ PORTFOLIO_FEEDBACK : targets
  ARTIFACT o|--o{ PORTFOLIO_FEEDBACK : targets
  PORTFOLIO ||--o{ AUDIT_LOG : concerns
  PORTFOLIO ||--o{ SECTION_COMPLETION : tracks
  PORTFOLIO ||--o{ PORTFOLIO_PROGRESS : summarizes
```

`AUTH_USER` is managed by Supabase Auth. Current access depends only on active portfolio grants, not registration or invitation-code redemption.

`ARTIFACT_POLICY_SETTINGS` is configurable policy data. Its allowed formats, size limits, retention, and permanent-deletion values remain institution-dependent.
