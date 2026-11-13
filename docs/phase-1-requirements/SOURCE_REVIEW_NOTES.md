# Source Review Notes

Internal working record for Phase 1 – Stage 1. Original source documents were reviewed but not modified.

## Documents Reviewed

1. `BukSU-COM Portfolio Instructions.pdf` — original BukSU-COM college instructions, supplied as a nine-page PDF.
2. `Approved_SRS_BukSU_COM_Digital_Portfolio.md` — latest supplied SRS baseline for the digital portfolio.
3. `MASTER_PROJECT_ROADMAP.md.docx` — supplied master project roadmap.
4. Existing workspace documentation — none found in the workspace at review time.

The SRS identifies the PDF as R1, the roadmap as R2, and client-confirmed decisions as R3. Those reference labels are retained below for traceability.

## Academic Requirements Extracted from the College PDF

Page references use the PDF's printed/page-section layout as identified in the supplied SRS and the extracted source text.

### Purpose and objectives — PDF pp. 1–3

The portfolio is a structured, longitudinal, evidence-based record of academic, personal, and professional development. It supports progressive attainment of eleven PLOs, reflective practice, self-directed and lifelong learning, professional identity formation, integration across curricular experiences, cultural responsiveness, social accountability, competency development, mentoring/formative assessment, quality assurance, and continuous improvement.

The portfolio should tell the student's development story through meaningful evidence and critical reflection, rather than operate only as a file repository.

### General platform and privacy requirements — PDF p. 3

Each medical student maintains an individual portfolio. The college recommends an institutionally approved digital platform, preferably Google Sites with organized Google Drive folders and institutional accounts. Access must be limited to the student and authorized faculty, mentors, or assessors. Patient-identifiable information must never be uploaded.

### Home Page — PDF p. 4

Required sections:

- All About Me: three-quarter portrait photograph and brief personal introduction.
- My Learning Philosophy.
- My Why.
- The Good Doctor.

### MED 101 — PDF pp. 4–5

MED 101 is organized into four bimonthly periods. Each period has a CERAE section and prescribed reflection questions. The first, second, and third periods include artifact requirements for personal milestones; the first and second also include artifact requirements for improvement plans. The fourth period contains three listed questions, and no fourth question should be invented.

The exact wording of all MED 101 questions is preserved in the SRS, Section 5.2.

### MED 102 — PDF pp. 5–6

MED 102 has eight learning domains:

1. Patient-centered care.
2. Family-focused care.
3. Social determinants of health.
4. Global and national health frameworks.
5. Primary health care and UHC.
6. Systems thinking.
7. Community engagement and social accountability.
8. Professional identity formation.

Each domain uses the recurring four-question reflection guide: learning; changed understanding; relevance to people and communities served; and application as a future physician. The PDF also specifies domain-related evidence, including case analysis, genogram/family assessment, social-determinants analysis, SDG mapping, mock Rural Health Unit output, systems map or causal-loop analysis, community health analysis/proposal, and an integrative professional-identity reflection.

### MED 103 — PDF pp. 6–8

MED 103 is organized into four bimonthly periods, each with four CERAE questions:

1. Learning Identity, Historical Perspectives, and Humanistic Foundations.
2. Patient-Centered Relationships, Advocacy, and Cultural Understanding.
3. Professional Identity, Ethics, Accountability, and Well-Being.
4. Ethical Leadership, Disaster Preparedness, Social Responsibility, and Year-End Integration.

The prescribed questions address learning responsibility, medical history, patient-doctor relationships, empathy, advocacy, cultural humility, ethics, confidentiality, accountability, teamwork, well-being, leadership, disaster preparedness, social responsibility, and year-end integration. The fourth period includes an artifact requirement for the Student Social Responsibility Project or another community-oriented learning experience.

### Eleven Program Learning Outcomes — PDF pp. 8–9

1. Demonstrate clinical competence.
2. Communicate effectively.
3. Lead and manage health care teams.
4. Engage in research activities.
5. Collaborate within interprofessional teams.
6. Utilize systems-based approach to healthcare.
7. Engage in continuing personal and professional development.
8. Adhere to ethical, professional, and legal standards.
9. Demonstrate nationalism, internationalism and dedication to service.
10. Practice the principles of social accountability.
11. Apply the core values of BukSU-COM to the medical practice in the communities.

### Final Musings — PDF p. 9

The five required Level 1 essay prompts concern changes in learning philosophy, reasons for pursuing medicine, why those changed or remained, how the Level 1 journey contributes to becoming a good doctor, and the single most important Level 1 learning.

### Supporting artifacts, confidentiality, and academic integrity — PDF p. 9

Evidence must be authentic, relevant to one or more PLOs, reflectively significant, and professionally presented. Patient names, faces, identifying dates, record numbers, and other identifying details must be removed. Required permissions must be obtained for clinical or community material. References, collaborators, and any use of artificial intelligence must be acknowledged.

## Confirmed Client Decisions

These are treated as client-approved requirements, separate from source-document recommendations:

- The product is an individual medical student portfolio.
- Initial coverage is Level 1.
- Level 1 contains exactly MED 101, MED 102, and MED 103.
- MED 101 is Integrated Basic Sciences.
- MED 102 is Family, Community, & Preventive Medicine I.
- MED 103 is Medical Humanities I.
- Each subject contains exactly four main folders; total: twelve main subject folders.
- The student has full management access to their own portfolio.
- Authorized faculty have read-only access.
- Faculty cannot comment, provide feedback, edit, or delete.
- Login is mandatory.
- Portfolio access is private.
- Custom development is approved by the College.
- The architecture must support future academic levels.

## Important Distinctions

### A. Explicit college-document requirements

These include the educational purpose, Home Page sections, MED 101 four bimonthly periods and questions, MED 102 eight domains and recurring questions, MED 103 four bimonthly periods and questions, eleven PLOs, Final Musings, evidence standards, confidentiality, academic integrity, and the college's recommended platform format.

### B. Directly confirmed client requirements

These include the individual scope, exact three-subject Level 1 scope, four-folder-per-subject rule, twelve-folder total, student ownership, faculty read-only permissions, mandatory private login, custom development, and future-level support.

### C. Developer recommendations

The supplied SRS/roadmap proposed React/Vite, Tailwind CSS, Framer Motion, Lucide React, Laravel REST API, Laravel Sanctum, MySQL, and private file storage. Those earlier backend proposals, and the later historical Firebase direction, are superseded by the approved Supabase architecture: Supabase PostgreSQL on the Free Plan, Supabase Auth, private Supabase Storage, PostgreSQL RLS, and Edge Functions only when necessary. Progress dashboards, draft states, protected artifact endpoints, and a flexible future-level data structure remain implementation proposals unless separately confirmed.

### D. Unresolved requirements

- Exact names of the four folders under MED 101.
- Exact names of the four folders under MED 102.
- Exact names of the four folders under MED 103.
- The client-approved mapping of eight MED 102 domains into four folders.
- Which faculty members are authorized and who provisions authorization.
- Whether authorized faculty see the entire portfolio or selected sections.
- Account creation and password-recovery process.
- Allowed artifact file formats and maximum upload size.
- Hosting, domain, and storage provider.
- Backup frequency, retention, recovery, and long-term account/portfolio retention.
- Whether draft/completed statuses and a progress dashboard are required for acceptance.
- Whether students may revise or delete content after faculty viewing.

## Potential Conflicts and Reconciliation

1. **Recommended platform versus custom development:** The college recommends Google Sites and Google Drive (PDF p. 3), while the client has approved custom development. Custom development is the confirmed project direction, but it must preserve the college's privacy and academic requirements.
2. **Feedback language versus faculty permissions:** The college rationale discusses mentoring and formative feedback (PDF pp. 1–2), but the client explicitly excludes in-application comments and feedback. Version 1 faculty access is therefore view-only; external mentoring processes are outside the application.
3. **Four folders versus eight MED 102 domains:** Four main folders are client-confirmed, while eight domains are source-required. All eight domains must remain represented, but names and grouping must be approved rather than inferred.
4. **SRS status wording:** The supplied SRS header calls itself “Draft for Client Review and Baseline Approval,” while the current instruction identifies it as the latest approved SRS. This document follows the current instruction for the review baseline, but the document-control status should be formally reconciled.
5. **Roadmap proposed features:** A progress dashboard and draft/completion behavior are proposed in the roadmap/SRS and are not explicit college requirements or confirmed client decisions.

## Source-Based Facts Versus Recommendations

| Topic | Source-based fact | Recommendation or unresolved interpretation |
|---|---|---|
| Folder count | Four main folders per subject; twelve total is client-confirmed | Do not invent labels or MED 102 grouping |
| MED 101 | Four bimonthly periods and prescribed questions | Folder labels require client confirmation |
| MED 102 | Eight named learning domains and recurring questions | Map domains into four folders only after approval |
| MED 103 | Four bimonthly periods and prescribed questions | Folder labels require client confirmation |
| Platform | College recommends Google Sites/Drive | Custom Supabase-based application is the approved technical direction; hosting and domain remain open |
| Faculty | Client confirms read-only access | Authorization scope and provisioning remain open |
| Artifacts | Authentic, relevant, confidential, professionally presented evidence | File types, size limits, storage, and retention remain open |
| PLOs | Eleven outcomes must be documented | The application must not declare formal attainment automatically |
| Future levels | Client requires future-level support | Actual future content and detailed extensibility design belong to later stages |

## Review Boundary

This review establishes understanding and requirements traceability only. No application code, database migration, UI screen, dependency installation, or technical architecture was created in Stage 1.

