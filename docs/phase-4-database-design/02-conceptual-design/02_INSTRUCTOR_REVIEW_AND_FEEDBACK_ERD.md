# Instructor Reviews and Feedback ERD

```mermaid
erDiagram
  PORTFOLIO ||--o{ PORTFOLIO_REVIEW : receives
  INSTRUCTOR_PROFILE ||--o{ PORTFOLIO_REVIEW : conducts
  PORTFOLIO_ACCESS_GRANT ||--o{ PORTFOLIO_REVIEW : authorizes
  PORTFOLIO_REVIEW ||--o{ PORTFOLIO_FEEDBACK : contains
  PORTFOLIO ||--o{ PORTFOLIO_FEEDBACK : receives
  INSTRUCTOR_PROFILE ||--o{ PORTFOLIO_FEEDBACK : authors
  PORTFOLIO_REFLECTION o|--o{ PORTFOLIO_FEEDBACK : targets
  ARTIFACT o|--o{ PORTFOLIO_FEEDBACK : targets
```

## Constraints

- A review has one portfolio and one reviewing instructor.
- The instructor must have an active grant when creating the review or feedback.
- Feedback may be general or target one reflection/artifact, but the target must belong to the same portfolio.
- Students can read feedback for their own portfolio.
- Feedback cannot update or delete the original reflection, answer, artifact, or PLO evidence.
- Review and feedback history requires timestamps and an approved lifecycle policy.
- Draft review states, instructor editing after publication, student replies, and notifications are unresolved.
