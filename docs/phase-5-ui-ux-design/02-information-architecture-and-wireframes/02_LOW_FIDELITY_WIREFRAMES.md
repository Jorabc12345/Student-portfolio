# Low-Fidelity Wireframes

These are structural wireframes, not visual designs. `+` marks a primary action; `[ ]` marks a field or control.

## Login and Registration

```text
[Logo] BukSU-COM SLRP
[Email________________] [Password____________]
[ Log in ]  [Forgot password?]
New user: [Student registration] [Instructor registration]
```

```text
Instructor registration
[Email] [Password] [Confirm password]
[Current invitation code________________]
[ ] I understand access requires student authorization
[Create instructor account]
```

## Student Dashboard / Home Page

```text
[Menu] SLRP                         [Profile] [Logout]
Breadcrumb: Home
Welcome, [Student]
Your Portfolio
[Open Home Page] [Open Level 1]
Continue reflecting: [recent academic location]
Artifacts: [library link]     Reviews and Feedback: [count/status]
Privacy: Private portfolio
```

## Level 1 and Subject

```text
Breadcrumb: Home / Level 1
Level 1
[MED 101] [MED 102] [MED 103]
[PLO Attainment] [Final Musings]
```

```text
Breadcrumb: Level 1 / MED 102
MED 102 – Family, Community, & Preventive Medicine I
Folders: [F1] [F2] [F3] [F4]  (provisional grouping)
Learning Domains (8): [Domain 1] ... [Domain 8]
[Open domain] [View reflections] [View artifacts]
```

## Folder and Domain

```text
Breadcrumb: Level 1 / Subject / Folder / Domain
Folder title
Domain title
Official context / evidence guidance
[Reflection prompts] [Artifacts]
Prompt list:
1. [Open prompt]
2. [Open prompt]
```

## Reflection Editor

```text
Breadcrumb: ... / Reflection
Official question (read-only)
[Student answer textarea________________________]
[Save] [Delete] [Cancel]
Related artifacts: [Attach existing] [Upload artifact]
Status message / unsaved changes warning
```

## Artifact Upload and Viewing

```text
Upload artifact
[Choose file]  Allowed formats / size guidance
Title [________] Description [________]
Associations: [Reflection] [Domain] [PLO]
[Upload]
Progress: [========----]  Cancel / Retry
```

```text
Artifact detail
Title | type | size | uploaded date
[Open securely] [Edit metadata] [Delete]
Associations: reflections / domains / PLOs
Privacy warning: private portfolio file
```

## PLO Attainment and Final Musings

```text
PLO Attainment
PLO list (1–11)
[PLO statement]
Evidence: [Select existing artifact]
What it demonstrates: [textarea]
Reflection: [textarea]
[Save]
```

```text
Final Musings – Level 1
Question 1 of 5 (official wording)
[Response textarea________________]
[Previous] [Save and continue] [Next]
Completion: 2 / 5 answered
```

## Instructor Access and Feedback

```text
Instructor Access
[Authorize instructor]
Active authorizations
Instructor name/email | Granted | Status | [Revoke]
Revoked history
```

```text
Reviews and Feedback
Original student content (read-only)
Instructor feedback / review cards
Author | date | context
[View feedback]
```

## Instructor Dashboard and Portfolio

```text
Instructor Dashboard
Authorized portfolios
[Student portfolio card] [Open]
Empty state: No students have authorized access.
```

```text
Portfolio viewer (read-only)
Breadcrumb: Portfolio / Level 1 / Subject / Folder
[Home] [Level 1] [Artifacts] [Reviews]
Student content (no edit/delete controls)
[Start review] [Add feedback]
```

## Review and Feedback

```text
Review
Portfolio: [Student]
Review date [____] Summary [textarea]
[Save review]

Feedback context: [General / Reflection / Artifact]
[Feedback textarea________________]
[Save feedback]
Notice: This does not edit student content.
```

## Client Administrator Invitation Settings

```text
Invitation Code
Status: Active | Created | Expires
Current code: [Reveal / Copy]
[Replace code] [Disable code]
Warning: replacement/disablement blocks future registrations only.
Existing accounts and authorizations are unchanged.
```
