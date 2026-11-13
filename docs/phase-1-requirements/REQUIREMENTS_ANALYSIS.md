# Requirements Analysis

Phase 1 – Stage 3: System Requirements and Scope Definition

## Requirement Status

- **Confirmed**: explicitly stated by the client or required by the approved academic structure.
- **Source**: required by the college instructions.
- **Proposed**: developer recommendation that needs confirmation before being treated as an acceptance baseline.

## Functional Requirements

### FR-001 – Authentication and Account Access

**Status:** Confirmed requirement.

- **Purpose:** Protect the private portfolio and require login.
- **Users:** Student and authorized faculty.
- **Functionality:** Authenticate users, establish sessions, allow logout, reject unauthenticated access to portfolio pages, API operations, and private files.
- **Inputs:** Account credentials and logout request.
- **Outputs:** Authenticated session or explicit authentication error.
- **Permissions:** Student and faculty may authenticate; self-registration is not assumed.
- **Dependencies:** Approved account provisioning, authentication configuration, and password-recovery decision.
- **Acceptance:** A valid provisioned user can log in and log out; an unauthenticated request cannot access protected portfolio content or artifacts.

### FR-002 – Role-Based Access Control

- **Purpose:** Enforce the difference between student ownership and faculty viewing.
- **Users:** Authenticated student and faculty.
- **Functionality:** Assign roles, authorize each request server-side, deny operations outside the role and portfolio scope, and return an explicit authorization error.
- **Inputs:** Authenticated identity, role, portfolio ownership, and authorization assignment.
- **Outputs:** Authorized response or `403`-style denial.
- **Permissions:** Student manages their own portfolio; faculty is read-only for authorized content.
- **Dependencies:** Account identity and faculty assignment.
- **Acceptance:** Direct API attempts by faculty to create, update, delete, upload, comment, provide feedback, or grade are rejected even if a frontend control is bypassed.

### FR-003 – Student Profile Management

- **Purpose:** Maintain the student identity section of the individual portfolio.
- **Users:** Student; authorized faculty may view.
- **Functionality:** Create, view, edit, and delete permitted profile information and portrait photograph; display the brief introduction.
- **Inputs:** Profile text and approved image.
- **Outputs:** Saved profile or validation error.
- **Permissions:** Student manages their own profile; faculty read-only.
- **Dependencies:** Authentication, private file controls, and final profile-field decisions.
- **Acceptance:** The student can manage their profile; faculty can view it but cannot change it.

### FR-004 – Home Page and Personal Sections

- **Purpose:** Present the required personal and professional introduction.
- **Users:** Student and authorized faculty.
- **Functionality:** Provide All About Me, My Learning Philosophy, My Why, and The Good Doctor sections.
- **Inputs:** Student-authored text and profile photograph.
- **Outputs:** Saved and viewable personal sections.
- **Permissions:** Student manages; faculty views only.
- **Dependencies:** Profile management and source content.
- **Acceptance:** All four required sections are available and student-editable; faculty modification attempts fail.

### FR-005 – Academic Level Management

- **Purpose:** Organize academic content by level and support later expansion.
- **Users:** Student; faculty views authorized levels.
- **Functionality:** Display Level 1 and associate its approved subjects and portfolio-wide sections; preserve an extensible level structure for future releases.
- **Inputs:** Approved academic-level content.
- **Outputs:** Level navigation and content context.
- **Permissions:** Student manages portfolio content, not institutional curriculum definitions; faculty views authorized content.
- **Dependencies:** Academic content baseline and future-level rules.
- **Acceptance:** Level 1 is displayed; no Level 2 content is presented as part of Version 1.0.

### FR-006 – Subject Management

- **Purpose:** Present the exact Level 1 subject set.
- **Users:** Student and authorized faculty.
- **Functionality:** Display exactly MED 101, MED 102, and MED 103 with their official titles.
- **Inputs:** Approved subject content.
- **Outputs:** Subject navigation and subject context.
- **Permissions:** Student manages entries within subjects; faculty views.
- **Dependencies:** Academic content structure.
- **Acceptance:** Level 1 contains exactly three subjects with the approved titles and no additional subject.

### FR-007 – Subject Folder Management

- **Purpose:** Organize each subject into the required four main folders.
- **Users:** Student and authorized faculty.
- **Functionality:** Display exactly four main folders under each subject; preserve provisional mappings until folder names are approved.
- **Inputs:** Client-approved folder names and mappings.
- **Outputs:** Folder navigation and folder context.
- **Permissions:** Student manages content in folders; faculty views.
- **Dependencies:** Client approval of folder names; MED 102 domain mapping.
- **Acceptance:** Each of the three subjects displays exactly four main folders, for exactly twelve total; no unapproved academic folder name is presented as final.

### FR-008 – Learning Period and Domain Management

- **Purpose:** Preserve source-defined learning units.
- **Users:** Student and authorized faculty.
- **Functionality:** Present MED 101’s four bimonthly periods, MED 102’s eight domains and recurring prompts, and MED 103’s four bimonthly periods with their prescribed content.
- **Inputs:** Approved source questions, themes, domains, and evidence guidance.
- **Outputs:** Learning-unit context for reflections and artifacts.
- **Permissions:** Student manages entries; faculty views.
- **Dependencies:** Academic content structure and pending MED 102 mapping.
- **Acceptance:** All four MED 101 periods, all eight MED 102 domains, and all four MED 103 periods are available; no domain is removed or arbitrarily assigned before approval.

### FR-009 – Reflection Management

- **Purpose:** Support guided student reflection.
- **Users:** Student; faculty views.
- **Functionality:** Display exact prescribed prompts, create/edit/delete student reflections, associate reflections with academic context, and display saved reflections.
- **Inputs:** Reflection responses and academic context.
- **Outputs:** Saved reflection, validation error, or authorization error.
- **Permissions:** Student full management of their own reflections; faculty read-only; no faculty comments or feedback.
- **Dependencies:** Learning units, authentication, and authorization.
- **Acceptance:** Student can create, edit, and delete their own reflections; all source prompts are displayed in the correct context; faculty write attempts fail.

### FR-010 – Academic Artifact Management

- **Purpose:** Store supporting academic evidence.
- **Users:** Student; faculty views/downloads authorized artifacts.
- **Functionality:** Upload, describe, view, replace, and delete student artifacts; associate artifacts with relevant academic context and, where applicable, PLO evidence.
- **Inputs:** File, title, description, academic context, and relevance information.
- **Outputs:** Protected artifact record or explicit validation/authorization error.
- **Permissions:** Student manages own artifacts; faculty may view/download only.
- **Dependencies:** Private storage, file restrictions, and confidentiality guidance.
- **Acceptance:** Valid artifacts can be managed by the student; invalid files are rejected; faculty cannot upload, modify, or delete.

### FR-011 – Program Learning Outcomes

- **Purpose:** Document evidence related to all eleven PLOs.
- **Users:** Student; faculty views.
- **Functionality:** Display all eleven PLOs and allow student evidence entries with artifact associations, descriptions, and short reflections.
- **Inputs:** PLO evidence description, short reflection, and supporting artifact links.
- **Outputs:** Saved PLO evidence record.
- **Permissions:** Student manages; faculty read-only; the system does not formally grade or declare attainment.
- **Dependencies:** PLO source content and artifact management.
- **Acceptance:** All eleven PLOs are available; evidence can be recorded; uploading evidence does not automatically mark a PLO attained.

### FR-012 – Final Musings

- **Purpose:** Capture the five required Level 1 concluding reflections.
- **Users:** Student; faculty views.
- **Functionality:** Display all five prescribed questions and allow student responses to be created, saved, edited, and deleted.
- **Inputs:** Student essay responses.
- **Outputs:** Saved responses or validation/authorization error.
- **Permissions:** Student manages; faculty read-only and cannot comment.
- **Dependencies:** Level 1 content and authorization.
- **Acceptance:** All five questions are present and student responses can be managed; faculty changes are rejected.

### FR-013 – Faculty Read-Only Portfolio Access

- **Purpose:** Allow authorized faculty to review the portfolio without changing it.
- **Users:** Authorized faculty.
- **Functionality:** Display authorized profile, Home Page, subjects, folders, learning content, reflections, artifacts, PLO evidence, and Final Musings.
- **Inputs:** Authenticated faculty identity and authorization assignment.
- **Outputs:** View responses or denial for unauthorized content.
- **Permissions:** Strictly read-only; no create, edit, delete, upload, comment, feedback, or grading.
- **Dependencies:** Faculty assignment and visibility-scope decision.
- **Acceptance:** Authorized faculty can view authorized content; unauthorized faculty cannot; every write endpoint rejects faculty requests.

### FR-014 – Portfolio Progress Dashboard

**Status:** Proposed roadmap feature; acceptance is subject to client confirmation.

- **Purpose:** Provide a summary of portfolio completion and missing content.
- **Users:** Student; faculty may view only if approved.
- **Functionality:** Summarize completion using an approved calculation without declaring PLO attainment.
- **Inputs:** Saved sections, reflections, artifacts, PLO evidence, and Final Musings.
- **Outputs:** Progress summary and links to incomplete areas.
- **Permissions:** Student views own progress; faculty visibility and calculation are unresolved.
- **Dependencies:** Client approval of completion rules, draft/completed states, and faculty visibility.
- **Acceptance:** If approved, the dashboard produces a reproducible summary and does not infer formal competency or PLO attainment.

### FR-015 – Privacy and File Access Controls

- **Purpose:** Keep the portfolio and artifacts private.
- **Users:** Authenticated users subject to authorization.
- **Functionality:** Enforce server-side ownership and faculty authorization on every portfolio and file operation; serve files through protected access rather than unrestricted public URLs.
- **Inputs:** Session, requested resource, and authorization scope.
- **Outputs:** Authorized content or explicit denial.
- **Permissions:** Student owns their content; faculty only authorized read access.
- **Dependencies:** Authentication, authorization, private storage, and file validation.
- **Acceptance:** Unauthenticated and unauthorized users cannot retrieve portfolio content or artifact files, including by guessing URLs or calling endpoints directly.

## Non-Functional Requirements

### Security

| ID | Requirement |
|---|---|
| NFR-001 | Protected pages, API operations, and artifact access shall require authentication. |
| NFR-002 | Backend authorization shall enforce role, ownership, and faculty assignment independently of frontend visibility. |
| NFR-003 | Faculty shall have no write permission for portfolio resources, including hidden or undocumented endpoints. |
| NFR-004 | Artifacts shall be stored privately and retrieved through authorized server-side access. |
| NFR-005 | Artifact uploads shall validate configured file type, size, content, and storage name before acceptance. Exact limits remain open. |
| NFR-006 | Secure downloads shall check authorization at request time and shall not expose unrestricted public file URLs. |
| NFR-007 | Authentication failures, authorization failures, invalid uploads, and storage failures shall produce explicit errors and appropriate audit records where logging is approved. |

### Privacy

| ID | Requirement |
|---|---|
| NFR-008 | Portfolio access shall be restricted to the student and authorized faculty. |
| NFR-009 | Student profile and academic information shall not be exposed to public or unrelated users. |
| NFR-010 | The system shall communicate that patient-identifiable information must not be uploaded. |
| NFR-011 | Clinical and community artifacts shall support confidentiality and required-permission guidance. |
| NFR-012 | References, collaborators, and artificial-intelligence use shall be acknowledged in accordance with the academic instructions. |

### Usability

| ID | Requirement |
|---|---|
| NFR-013 | Navigation shall make Level 1, subjects, four-folder structures, learning units, PLOs, and Final Musings understandable without relying on hidden controls. |
| NFR-014 | Reflection forms shall display the applicable source question and its academic context. |
| NFR-015 | Artifact forms shall clearly communicate required metadata, confidentiality guidance, and validation errors. |
| NFR-016 | Destructive student actions shall provide a clear confirmation and error outcome. |

### Responsiveness

| ID | Requirement |
|---|---|
| NFR-017 | Required portfolio functions shall be usable on desktop, tablet, and mobile viewport sizes. |
| NFR-018 | Academic navigation, reflection entry, artifact metadata, and read-only faculty viewing shall remain readable and operable without horizontal scrolling caused by the application layout. |

### Maintainability

| ID | Requirement |
|---|---|
| NFR-019 | The implementation shall use a modular codebase with reusable components and services. |
| NFR-020 | API resources and authorization rules shall be organized consistently so that each protected operation has an identifiable policy boundary. |
| NFR-021 | Academic content shall be maintainable without duplicating prompt text across unrelated modules. |

### Expandability

| ID | Requirement |
|---|---|
| NFR-022 | The content model shall support additional academic levels without replacing the Level 1 structure. |
| NFR-023 | The content model shall support additional subjects and configurable subject-folder counts in future releases, while enforcing the approved count for Level 1. |
| NFR-024 | The content model shall support different learning structures, including bimonthly periods and domains, without assuming that every subject uses the same structure. |
| NFR-025 | Future extensibility shall not weaken authentication, privacy, ownership, or faculty read-only rules. |

## Requirements Traceability

- Stage 1 confirmed the individual scope, access model, privacy, custom-development decision, and future-level objective.
- Stage 2 established three subjects, twelve folders, the MED 101 and MED 103 periods, the eight MED 102 domains, eleven PLOs, and five Final Musings questions.
- The original PDF supplies the academic prompts, evidence expectations, confidentiality, and academic-integrity requirements.

