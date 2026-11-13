# User Journey Maps

## Student

1. Login → authenticated dashboard → private portfolio home.
2. Profile/Home Page → edit personal sections → validate → save → success confirmation.
3. Level 1 → subject → folder → domain or reflection prompt.
4. Reflection → read official prompt → write answer → save draft/current content → continue.
5. Artifact → choose allowed file → upload progress → metadata/associations → completion or recoverable failure.
6. PLO Attainment → choose PLO → link existing evidence → add significance/reflection → save.
7. Final Musings → answer five questions → review completeness → save.
8. Access management → enter registered instructor identifier/code flow → confirm authorization → active grant shown.
9. Feedback → open review/feedback → distinguish instructor guidance from original content.
10. Revoke access → select instructor → confirm consequence → grant becomes revoked and future access is denied.

## Instructor

1. Registration → select Instructor → enter current shared invitation code → validation → account and Instructor role creation.
2. Login → instructor dashboard → only explicitly authorized portfolios.
3. Portfolio viewer → read student sections → inspect reflection/artifact context.
4. Start review → choose authorized portfolio → add review date/summary → save according to approved lifecycle.
5. Add feedback → choose general, reflection, or artifact context → write guidance → publish/save.
6. Revoked access → dashboard no longer shows portfolio; direct requests and new file URLs are denied.

## Client Administrator

1. Restricted login → invitation-code status.
2. Generate current code → reveal/copy once through protected screen → confirm active status.
3. Replace code → warning that old code will no longer register new instructors → confirm → new code active.
4. Disable code → confirmation → no new instructor registrations until a new code is generated.

## Cross-Cutting Failure Paths

- Invalid/expired invitation code: explain failure without revealing code details.
- Upload rejected: preserve entered metadata where safe and explain allowed limits.
- Unauthorized route: show a private-access message without confirming another student's existence.
- Revoked grant: explain that access is no longer authorized; do not expose cached/private content.
- Unsaved changes: warn before leaving and provide save/cancel choices.
