# Scope and Acceptance Criteria

## Version 1.0 Included Scope

- One individual medical student portfolio.
- Level 1 only.
- MED 101, MED 102, and MED 103.
- Exactly four main folders under each subject; twelve total.
- Official academic content, reflection questions, evidence guidance, eleven PLOs, and five Final Musings questions.
- Student authentication and portfolio ownership.
- Faculty authentication and authorized read-only access.
- Student reflection management.
- Student artifact upload and management with private storage.
- PLO evidence documentation.
- Final Musings response management.
- Responsive website for desktop, tablet, and mobile.
- Server-side authorization and protected artifact retrieval.
- A future-capable content structure, without future academic content.

The progress dashboard is a roadmap-proposed feature. It is included in the requirements analysis as conditional and becomes a Version 1.0 acceptance item only if the client approves its calculation, display, and faculty visibility.

## Version 1.0 Exclusions

- Multiple student portfolios as an institution-wide administration platform.
- Institutional-wide curriculum or user administration.
- Faculty comments, feedback, editing, deletion, uploading, or grading.
- AI-generated reflections.
- Real-time messaging.
- Native mobile application.
- Actual Level 2 or later academic content.
- Public portfolio access.
- Automatic declaration of PLO attainment.

## System Boundary

### Inside the system

Authentication, authorization, student-owned portfolio content, the approved Level 1 academic structure, reflections, artifact metadata and protected files, PLO evidence, Final Musings, and approved progress summaries.

### Outside the system

Institutional identity provisioning unless later integrated, formal academic grading and PLO assessment, external mentoring conversations, hosting/vendor decisions, source-document editing, and future-level academic content.

## Measurable Acceptance Criteria

### Authentication and account access

- **AC-001:** A provisioned student can authenticate and log out.
- **AC-002:** A provisioned faculty member can authenticate and log out.
- **AC-003:** An unauthenticated request to a protected page, API operation, or artifact URL is denied.
- **AC-004:** Invalid credentials produce an explicit authentication failure and do not establish a session.

### Roles and permissions

- **AC-005:** The student can manage only their individual portfolio.
- **AC-006:** Authorized faculty can view only portfolios within their authorization scope.
- **AC-007:** Direct faculty API requests to create, edit, delete, upload, comment, provide feedback, or grade are denied.
- **AC-008:** Hiding a frontend control does not serve as the only authorization mechanism; backend tests demonstrate denial independently.

### Profile and Home Page

- **AC-009:** The student can create, edit, and delete permitted profile and personal-section content.
- **AC-010:** The Home Page displays All About Me, My Learning Philosophy, My Why, and The Good Doctor.
- **AC-011:** Authorized faculty can view these sections but cannot modify them.

### Academic hierarchy

- **AC-012:** Level 1 displays exactly three subjects: MED 101, MED 102, and MED 103.
- **AC-013:** Each subject displays exactly four main folders.
- **AC-014:** The Level 1 subject structure contains exactly twelve main subject folders.
- **AC-015:** Home Page, PLO documentation, and Final Musings are not counted as subject folders.
- **AC-016:** Folder names are not finalized in the system until client approval is recorded.

### Academic content

- **AC-017:** MED 101 displays all four bimonthly periods and their prescribed CERAE questions.
- **AC-018:** MED 102 displays all eight required domains.
- **AC-019:** MED 102 displays all four prescribed reflection questions for each domain.
- **AC-020:** MED 103 displays all four bimonthly periods, their official themes, and all prescribed CERAE questions.
- **AC-021:** The MED 101 fourth period displays three source questions and no invented fourth question.

### Reflections

- **AC-022:** The student can create a reflection in the correct subject and learning-unit context.
- **AC-023:** The student can edit and delete their own reflection.
- **AC-024:** Saved reflections display the applicable source prompt and academic context.
- **AC-025:** Faculty can view authorized reflections but cannot modify or comment on them.

### Artifacts

- **AC-026:** The student can upload an accepted artifact with title, description, and academic context.
- **AC-027:** Invalid or disallowed artifact submissions are rejected with an explicit validation message.
- **AC-028:** The student can view, update, and delete their own artifact records.
- **AC-029:** Authorized faculty can view or download authorized artifacts but cannot upload, update, or delete them.
- **AC-030:** An unauthenticated or unauthorized request cannot retrieve an artifact, including by guessed or copied URL.
- **AC-031:** Artifact guidance communicates authenticity, relevance, reflective significance, professionalism, confidentiality, permissions, and academic-integrity expectations.

### PLOs

- **AC-032:** All eleven PLOs are displayed.
- **AC-033:** The student can attach relevant artifacts, descriptions, and short reflections to PLO documentation.
- **AC-034:** Authorized faculty can view PLO documentation but cannot edit or formally grade it.
- **AC-035:** Uploading or associating evidence does not automatically declare a PLO attained.

### Final Musings

- **AC-036:** All five prescribed Final Musings questions are displayed.
- **AC-037:** The student can create, save, edit, and delete their responses.
- **AC-038:** Authorized faculty can view Final Musings but cannot modify or comment on them.

### Responsiveness and usability

- **AC-039:** Required student and faculty viewing workflows are usable on desktop, tablet, and mobile viewport sizes.
- **AC-040:** Users can navigate from Level 1 to subject, folder, learning unit, reflection, artifact, PLO, and Final Musings context without relying on inaccessible hidden controls.
- **AC-041:** Validation, authorization, upload, and storage failures are explicit to the requesting user.

### Progress dashboard

- **AC-042:** If approved, the dashboard calculates progress using documented rules and links incomplete areas.
- **AC-043:** If approved, the dashboard never states that a PLO is formally attained based only on content or artifact counts.

## Completion Boundary

Stage 3 defines requirements and acceptance checks only. It does not implement, test, migrate, design, or deploy the application.

