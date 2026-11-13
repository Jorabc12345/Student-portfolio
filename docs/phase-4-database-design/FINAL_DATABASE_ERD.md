# Final Database ERD

The following Mermaid ERD is the consolidated logical model. It shows the principal entities and junctions; detailed columns are in the final dictionary.

```mermaid
erDiagram
  AUTH_USER ||--|| USER_PROFILE : identifies
  USER_PROFILE ||--o| STUDENT_PROFILE : specializes
  USER_PROFILE ||--o| FACULTY_PROFILE : specializes
  USER_PROFILE ||--o{ USER_ROLE : receives
  ROLE ||--o{ USER_ROLE : grants
  STUDENT_PROFILE ||--|| PORTFOLIO : owns
  FACULTY_PROFILE ||--o{ FACULTY_PORTFOLIO_ASSIGNMENT : receives
  PORTFOLIO ||--o{ FACULTY_PORTFOLIO_ASSIGNMENT : assigned
  FACULTY_PORTFOLIO_ASSIGNMENT ||--o{ FACULTY_ACCESS_HISTORY : records
  ACADEMIC_LEVEL ||--o{ SUBJECT : contains
  SUBJECT ||--o{ MAIN_FOLDER : contains
  MAIN_FOLDER ||--o{ ACADEMIC_PERIOD : schedules
  SUBJECT ||--o{ LEARNING_DOMAIN : defines
  MAIN_FOLDER o|--o{ LEARNING_DOMAIN : groups
  ACADEMIC_LEVEL ||--o{ GLOBAL_SECTION : contains
  GLOBAL_SECTION ||--o{ CONTENT_PROMPT : defines
  SUBJECT o|--o{ CONTENT_PROMPT : contextualizes
  MAIN_FOLDER o|--o{ CONTENT_PROMPT : contextualizes
  LEARNING_DOMAIN o|--o{ CONTENT_PROMPT : contextualizes
  PORTFOLIO ||--o{ REFLECTION : contains
  REFLECTION ||--o{ REFLECTION_ANSWER : has
  CONTENT_PROMPT ||--o{ REFLECTION_ANSWER : answers
  PORTFOLIO ||--o{ ARTIFACT : owns
  ARTIFACT ||--|| ARTIFACT_STORAGE_METADATA : stores
  REFLECTION }o--o{ ARTIFACT : references
  ARTIFACT }o--o{ LEARNING_DOMAIN : supports
  ARTIFACT }o--o{ PROGRAM_LEARNING_OUTCOME : supports
  PORTFOLIO ||--o{ PLO_EVIDENCE : records
  PROGRAM_LEARNING_OUTCOME ||--o{ PLO_EVIDENCE : attained
  PORTFOLIO ||--|| HOME_PAGE_CONTENT : has
  PORTFOLIO ||--o{ FINAL_MUSINGS_RESPONSE : writes
  PORTFOLIO ||--o{ SECTION_COMPLETION : tracks
  COMPLETION_REQUIREMENT ||--o{ SECTION_COMPLETION : measures
  PORTFOLIO ||--o{ PORTFOLIO_PROGRESS : summarizes
  ACADEMIC_LEVEL ||--o{ PORTFOLIO_PROGRESS : scopes
  PORTFOLIO o|--o{ AUDIT_LOG : concerns
```

`AUTH_USER` is Supabase Auth, not an application table. Faculty relationships are read-only by policy. Global sections remain separate from subject hierarchy.

The four-folder MED 102 grouping is organizational only. Each of the eight domains remains its own `LEARNING_DOMAIN` record and remains directly accessible for navigation, reflections, artifacts, and evidence associations.
