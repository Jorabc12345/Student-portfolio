# Portfolio Content ERD

```mermaid
erDiagram
  STUDENT_PROFILE ||--|| PORTFOLIO : owns
  PORTFOLIO ||--o{ PORTFOLIO_REFLECTION : contains
  PORTFOLIO_REFLECTION ||--o{ REFLECTION_ANSWER : has
  CONTENT_PROMPT ||--o{ REFLECTION_ANSWER : answers
  PORTFOLIO ||--o{ ARTIFACT : owns
  ARTIFACT ||--|| ARTIFACT_STORAGE_METADATA : has
  PORTFOLIO_REFLECTION }o--o{ ARTIFACT : references
  ARTIFACT }o--o{ LEARNING_DOMAIN : maps
  ARTIFACT }o--o{ PROGRAM_LEARNING_OUTCOME : maps
  PORTFOLIO ||--o{ PLO_EVIDENCE : records
  ARTIFACT o|--o{ PLO_EVIDENCE : evidences
  PORTFOLIO ||--|| HOME_PAGE_CONTENT : has
  PORTFOLIO ||--o{ FINAL_MUSINGS_RESPONSE : contains
  GLOBAL_SECTION ||--o{ FINAL_MUSINGS_RESPONSE : scopes
```

Artifacts are stored once in private Supabase Storage. Metadata is relational, and junction entities allow one artifact to support multiple reflections, domains, and PLOs without duplicate files. All original content is owned by the student portfolio.
