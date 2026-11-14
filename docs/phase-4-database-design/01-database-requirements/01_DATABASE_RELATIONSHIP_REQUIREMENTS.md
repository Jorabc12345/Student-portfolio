# Database Relationship Requirements

## Ownership

- One student has one student profile and one portfolio.
- A portfolio belongs to exactly one student.
- Portfolio content belongs to the portfolio owner.
- A student may create many reflections, answers, artifacts, global responses, and PLO evidence records.

## Authorization

- One student may authorize many instructors.
- One instructor may be authorized by many students.
- `portfolio_access_grants` is therefore many-to-many and must contain lifecycle state, grant timestamp, revocation timestamp, and the authorizing student identity.
- Only active grants permit access. Revoked grants remain historical records but never authorize reads.

## Academic Hierarchy

Academic level has subjects; MED 101/MED 103 have period sections and MED 102 has eight direct domain sections linked to the subject.

## Portfolio Content

- Portfolio to reflections, artifacts, global content, PLO evidence, reviews, feedback, completion, and audit events: one-to-many.
- Reflection to answers: one-to-many.
- Reflection to artifact: many-to-many.
- Artifact to learning domain: many-to-many.
- Artifact to PLO: many-to-many.
- A review belongs to one portfolio and one instructor.
- Feedback belongs to one review or portfolio and may optionally target one reflection or artifact; it must not target an unrelated portfolio.

## Integrity Requirements

Parent and child portfolio ownership must be consistent. An artifact-domain, artifact-PLO, reflection-artifact, feedback target, or review record must not cross portfolio boundaries. Database foreign keys provide identity integrity; RLS, trusted functions, or triggers must enforce contextual ownership.
