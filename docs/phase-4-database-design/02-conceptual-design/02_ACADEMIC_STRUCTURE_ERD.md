# Academic Structure ERD

```mermaid
erDiagram
  ACADEMIC_LEVEL ||--o{ SUBJECT : contains
  SUBJECT ||--o{ MAIN_FOLDER : contains
  MAIN_FOLDER ||--o{ ACADEMIC_PERIOD : has
  SUBJECT ||--o{ LEARNING_DOMAIN : defines
  MAIN_FOLDER o|--o{ LEARNING_DOMAIN : optionally_groups
  SUBJECT o|--o{ CONTENT_PROMPT : contextualizes
  MAIN_FOLDER o|--o{ CONTENT_PROMPT : contextualizes
  LEARNING_DOMAIN o|--o{ CONTENT_PROMPT : contextualizes
  ACADEMIC_LEVEL ||--o{ GLOBAL_SECTION : contains
  GLOBAL_SECTION ||--o{ CONTENT_PROMPT : defines
  PROGRAM_LEARNING_OUTCOME ||--o{ PLO_EVIDENCE : supports
```

## Constraints

- Level 1 contains exactly MED 101, MED 102, and MED 103.
- Each has four main-folder records.
- MED 102 has eight distinct `LEARNING_DOMAIN` records.
- A parent folder is organizational only; it must not merge or hide a domain.
- MED 101 and MED 103 period titles and prompts remain source-preserving.
- Home Page, PLO Attainment, and Final Musings are global sections.
- Future levels add rows, not new schema tables.
