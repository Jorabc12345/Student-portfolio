# Academic Structure ERD

## Phase 4 – Stage 2

```mermaid
erDiagram
    ACADEMIC_LEVEL ||--o{ SUBJECT : contains
    SUBJECT ||--o{ MAIN_FOLDER : contains
    MAIN_FOLDER ||--o| ACADEMIC_PERIOD : represents
    MAIN_FOLDER ||--o{ LEARNING_DOMAIN : organizes
    SUBJECT ||--o{ CONTENT_PROMPT : provides
    MAIN_FOLDER ||--o{ CONTENT_PROMPT : contextualizes
    LEARNING_DOMAIN ||--o{ CONTENT_PROMPT : contextualizes
    ACADEMIC_LEVEL ||--o{ GLOBAL_SECTION : contains
    PROGRAM_LEARNING_OUTCOME }o--o{ ACADEMIC_LEVEL : applies_to

    ACADEMIC_LEVEL {
        uuid id PK
        string stable_code UK
        string display_name
        boolean active
    }
    SUBJECT {
        uuid id PK
        uuid academic_level_id FK
        string stable_code UK
        string display_name
        int display_order
    }
    MAIN_FOLDER {
        uuid id PK
        uuid subject_id FK
        string stable_code UK
        string display_name
        int display_order
    }
    ACADEMIC_PERIOD {
        uuid id PK
        uuid folder_id FK
        string official_title
        int sequence
    }
    LEARNING_DOMAIN {
        uuid id PK
        uuid subject_id FK
        uuid parent_folder_id FK
        string stable_code UK
        string official_title
    }
    CONTENT_PROMPT {
        uuid id PK
        uuid subject_id FK
        uuid folder_id FK
        uuid domain_id FK
        string prompt_type
        text official_text
        string source_reference
    }
    GLOBAL_SECTION {
        uuid id PK
        uuid academic_level_id FK
        string section_type
        string display_name
    }
    PROGRAM_LEARNING_OUTCOME {
        uuid id PK
        string stable_code UK
        text official_text
    }
```

## Constraints

- Level 1 contains exactly three subjects and four main folders per subject.
- MED 102 contains eight `LEARNING_DOMAIN` records, not four.
- `parent_folder_id` remains configurable/provisional for MED 102.
- Stable codes do not change when display labels change.
- Global sections are separate from subject folders.
- Future levels may use different period/domain arrangements.
