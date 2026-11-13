# User and Portfolio Ownership and Access ERD

```mermaid
erDiagram
  AUTH_USER ||--|| USER_PROFILE : identifies
  USER_PROFILE ||--o| STUDENT_PROFILE : is
  USER_PROFILE ||--o| INSTRUCTOR_PROFILE : is
  USER_PROFILE ||--o{ USER_ROLE : receives
  ROLE ||--o{ USER_ROLE : defines
  STUDENT_PROFILE ||--|| PORTFOLIO : owns
  PORTFOLIO ||--o{ PORTFOLIO_ACCESS_GRANT : has
  INSTRUCTOR_PROFILE ||--o{ PORTFOLIO_ACCESS_GRANT : is_authorized
  PORTFOLIO_ACCESS_GRANT ||--o{ PORTFOLIO_ACCESS_EVENT : records
```

## Relationship Rules

- Ownership is one-to-one from student to portfolio.
- Authorization is many-to-many through `PORTFOLIO_ACCESS_GRANT`.
- A grant includes conceptual grantor, grant date, status, and optional revocation date.
- Only an active grant permits instructor reads and review/feedback creation.
- A registered or verified instructor without a grant has no portfolio access.
- Grant history is retained for audit but revoked history never authorizes access.
