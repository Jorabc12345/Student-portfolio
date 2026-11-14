# Conceptual Design Decisions

## 1. Ownership Is Separate from Authorization

The student-to-portfolio relationship is ownership. The instructor-to-portfolio relationship is an explicit, revocable authorization grant. An instructor role or account registration never implies access.

## 2. Grant History Is Separate from Current Access

`PORTFOLIO_ACCESS_GRANT` represents the current lifecycle state. `PORTFOLIO_ACCESS_EVENT` preserves grant/revoke history. Historical events cannot satisfy an active-access check.

## 3. Instructor Verification Is Trusted Data

Instructor verification and role assignment require a trusted institutional/provisioning operation. No public registration field can create instructor privileges.

## 4. Reviews and Feedback Are Additive

Reviews and feedback have separate authorship and ownership. They are not student reflections, answers, artifacts, grades, or approval states. This avoids introducing a submission or grading workflow.

## 5. Feedback Targets Are Optional and Constrained

Feedback may apply to an entire portfolio, a review, one reflection, or one artifact. A target is optional for general feedback, but any target must belong to the addressed portfolio.

## 6. Academic Structure Is Data-Driven

The model preserves three Level 1 subjects, four Bimonthly sections in MED 101 and MED 103, eight independently accessible MED 102 domains, official content, and separate global sections.

## 7. Storage Is Separate

Artifact binaries remain in private Supabase Storage. The conceptual database stores metadata and links. Reusing an artifact uses junction relationships rather than duplicate uploads.

## Open Conceptual Issues

- Instructor verification authority and registration process.
- Grant expiry and existing signed URL behavior after revocation.
- Review/feedback draft, publication, edit, and deletion lifecycle.
- Student reply/acknowledgement and notification requirements.
- Audit retention and progress calculation.
- Whether completion records belong in the minimum model.
