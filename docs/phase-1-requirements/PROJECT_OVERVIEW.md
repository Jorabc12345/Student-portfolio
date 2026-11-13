# BukSU-COM Student Learning and Reflective Digital Portfolio

## Project Background

Bukidnon State University – College of Medicine (BukSU-COM) requires an individual Student Learning and Reflective Portfolio. The portfolio is intended to document a medical student's academic, personal, and professional development through learning experiences, reflections, and supporting evidence.

The college describes the portfolio as a longitudinal, outcomes-based record supporting reflective practice, self-directed learning, professional identity formation, competency development, and social accountability. It is not merely a repository of completed work.

## Purpose and Objectives

The portfolio is intended to:

- Document evidence of progressive development against the eleven BukSU-COM Program Learning Outcomes (PLOs).
- Guide reflection on what the student learned, how the student grew, and how learning supports becoming a better physician.
- Support self-directed and lifelong learning.
- Support professional identity formation, ethical practice, cultural responsiveness, and social accountability.
- Connect learning across basic sciences, medical humanities, community activities, research, and other academic experiences.
- Preserve an authentic, professional, confidential, and academically honest record over time.

These objectives are extracted from the college instructions. The application records evidence and reflections; it does not itself determine formal PLO attainment or replace institutional assessment.

## Target Users

### Student portfolio owner

One medical student owns the individual portfolio and has full management access to their own content. The student may create, edit, organize, and delete permitted reflections, artifacts, PLO evidence, profile content, and Final Musings.

### Authorized instructor

An explicitly authorized instructor may log in and view the portfolio within the approved access scope. Under the revised approved model, an instructor may create separate reviews and feedback for an authorized portfolio, but cannot edit, upload, delete, grade, or alter original student content.

## Confirmed Project Scope

- Individual medical student portfolio.
- Initial coverage: Level 1.
- Exactly three Level 1 subjects:
  1. **MED 101 – Integrated Basic Sciences**
  2. **MED 102 – Family, Community, & Preventive Medicine I**
  3. **MED 103 – Medical Humanities I**
- Exactly four main folders under each subject.
- Twelve main subject folders in total.
- Mandatory login and authenticated access.
- Private portfolio access; no unrestricted public access.
- Student full management access to their own portfolio.
- Authorized faculty read-only access.
- No faculty comments, feedback, editing, deletion, or grading features.
- Custom development approved by the College.
- Future academic levels must be supportable by the eventual system structure, although their content is outside the initial release.
- Home Page, eleven PLOs, and Level 1 Final Musings are portfolio-wide sections and are not counted as the twelve subject folders.

## Initial Academic Coverage

### Home Page

The college instructions require:

- All About Me, including a three-quarter portrait photograph and brief personal introduction.
- My Learning Philosophy.
- My Why.
- The Good Doctor.

### MED 101

The source specifies four bimonthly periods, each with CERAE reflection questions. Supporting artifacts are required where the source says to provide them. The application must preserve the source questions, including the fact that the fourth period contains three questions rather than an invented fourth question.

### MED 102

The source specifies eight learning domains. Each domain uses four recurring reflection questions:

1. What did I learn?
2. What changed in my understanding?
3. Why does this matter to the people and communities we serve?
4. How will I apply this as a future physician?

The eight domains and their evidence expectations must remain represented. The client-required four-folder arrangement and domain-to-folder mapping remain to be approved; no grouping is assumed here.

### MED 103

The source specifies four bimonthly periods, each with four CERAE questions and named academic themes. The source questions, themes, and artifact requirements must be preserved.

### PLOs and Final Musings

Level 1 must provide documentation areas for all eleven BukSU-COM PLOs, with relevant evidence descriptions and reflections. It must also provide the five prescribed Final Musings questions:

1. Has your learning philosophy changed?
2. Has your reason to pursue medicine changed?
3. What made them change? What made them remain as is?
4. How do you see your entire Level 1 journey contribute to your goal as a good doctor?
5. What was the single most important thing you learned in Level 1?

### Evidence and integrity

Artifacts must be authentic, relevant, professionally presented, and accompanied by an explanation of their significance. Patient-identifiable information must not be uploaded. Patient names, faces, identifying dates, record numbers, and other identifying details must be removed, and required permissions must be obtained. References, collaborators, and use of artificial intelligence must be acknowledged.

## Approved Supabase Technology Direction

The approved technical direction is:

- Frontend: React, Vite, Tailwind CSS, Framer Motion, and Lucide React.
- Database: Supabase PostgreSQL on the Free Plan.
- Authentication: Supabase Auth.
- Artifact storage: private Supabase Storage.
- Authorization: PostgreSQL Row Level Security (RLS).
- Edge Functions: only when necessary and compatible with the approved plan.

Supabase Auth owns credentials and sessions, PostgreSQL stores relational metadata and authorization relationships, private Storage stores artifact binaries, and RLS enforces service-boundary access decisions. Frontend visibility alone is not sufficient authorization.

The college document recommends an institutionally approved platform, preferably Google Sites with organized Google Drive folders. The separate client decision approving custom development means the approved Supabase-based custom application may be pursued instead, while retaining the college's academic, confidentiality, and access requirements. The backend change does not change the approved academic structure.

## Future Expansion Objectives

The structure should allow additional academic levels, subjects, learning units, domains, reflections, artifacts, and outcome evidence to be added without redesigning the entire product. Level 2 and later academic content is not included in the initial scope. Future expansion must preserve the same ownership, privacy, confidentiality, and academic-integrity principles unless separately approved.

