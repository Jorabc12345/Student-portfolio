# User and Faculty Access ERD

## Phase 4 – Stage 2

```mermaid
erDiagram
    AUTH_USER_REF ||--|| USER_PROFILE : identifies
    USER_PROFILE ||--o| STUDENT_PROFILE : has
    USER_PROFILE ||--o| FACULTY_PROFILE : has
    USER_PROFILE ||--o{ USER_ROLE : receives
    ROLE ||--o{ USER_ROLE : defines
    STUDENT_PROFILE ||--|| PORTFOLIO : owns
    FACULTY_PROFILE ||--o{ FACULTY_PORTFOLIO_ASSIGNMENT : receives
    PORTFOLIO ||--o{ FACULTY_PORTFOLIO_ASSIGNMENT : assigned
    FACULTY_PORTFOLIO_ASSIGNMENT ||--o{ FACULTY_ACCESS_HISTORY : records

    AUTH_USER_REF {
        uuid auth_user_id PK
    }
    USER_PROFILE {
        uuid id PK
        uuid auth_user_id FK, UK
        string account_status
    }
    STUDENT_PROFILE {
        uuid user_profile_id PK, FK
        string student_identifier
    }
    FACULTY_PROFILE {
        uuid user_profile_id PK, FK
        string faculty_identifier
    }
    ROLE {
        string code PK
        string description
    }
    USER_ROLE {
        uuid user_profile_id FK
        string role_code FK
    }
    PORTFOLIO {
        uuid id PK
        uuid student_profile_id FK, UK
    }
    FACULTY_PORTFOLIO_ASSIGNMENT {
        uuid id PK
        uuid faculty_profile_id FK
        uuid portfolio_id FK
        string status
        timestamp assigned_at
        timestamp revoked_at
    }
    FACULTY_ACCESS_HISTORY {
        uuid id PK
        uuid assignment_id FK
        string event_type
        timestamp occurred_at
    }
```

Only trusted provisioning creates roles and assignments. Active assignments permit read access only; revoked assignments no longer satisfy authorization checks.
