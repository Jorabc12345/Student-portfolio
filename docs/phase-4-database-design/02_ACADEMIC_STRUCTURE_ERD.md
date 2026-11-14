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

- Current structure: MED 101 and MED 103 each have four Bimonthly sections; MED 102 has eight independent domains and no parent-folder layer.
- MED 102 contains eight `LEARNING_DOMAIN` records, not four.
- `parent_folder_id` remains configurable/provisional for MED 102.
- Stable codes do not change when display labels change.
- Global sections are separate from subject folders.
- Future levels may use different period/domain arrangements.

## Current MED 102 structure (13 November 2026)

The official instructions PDF, section 2.2 (pp. 5-6), defines eight independent MED 102 domains, with required evidence, competency descriptions, one shared four-question reflection guide, and pertinent artifacts. MED 102 has no four-parent-folder requirement. Earlier proposed-parent and unresolved-grouping text in this document is superseded. See docs/phase-2-academic-content/03_MED102_STRUCTURE_FINALIZATION.md for exact wording and the database representation review.
