# High-Level System Architecture

## Phase 3 – Stage 2

This is a high-level design for the private BukSU-COM Student Learning and Reflective Digital Portfolio. It does not define migrations, database tables, policies, UI code, or a live Supabase configuration.

## 1. Architecture Overview

The React/Vite frontend communicates with Supabase through the Supabase client APIs. Supabase Authentication establishes identity. PostgreSQL stores structured portfolio data and applies Row Level Security (RLS). Private Supabase Storage holds artifact files and profile images. Edge Functions are exceptional trusted operations only.

The browser is not a security boundary. RLS and Storage policies enforce ownership and faculty assignment regardless of which interface makes the request.

## 2. Layered Design

### Presentation layer

Provides authenticated layouts, Level 1 navigation, subject/folder/domain views, reflection forms, artifact forms, PLO and Final Musings pages, profile pages, and responsive feedback. It uses Tailwind CSS, Framer Motion, and Lucide React. It hides unavailable controls for usability but never relies on hiding for authorization.

### Application layer

Coordinates portfolio operations, academic-content lookup, validation, reflection and artifact association workflows, PLO evidence explanations, progress presentation, and error handling. Ordinary operations use Supabase client APIs. Business rules that require trusted execution use narrowly scoped Edge Functions.

### Authentication and authorization layer

Supabase Auth manages identity and sessions. PostgreSQL RLS determines row access using the authenticated user, portfolio ownership, role, and faculty assignment. Storage policies apply equivalent checks to objects. Faculty permissions are read-only by policy, not by frontend convention.

### Data layer

PostgreSQL stores profiles, roles, portfolios, academic configuration, reflections, artifact metadata, associations, PLO evidence, Final Musings, assignments, and approved audit records. Relationships use stable IDs and join records. RLS applies to every client-exposed table.

### File storage layer

Private Storage buckets hold binaries. PostgreSQL stores metadata and associations, not duplicate file copies. The application validates metadata and checks authorization before requesting a controlled file URL or download.

## 3. Main Modules

| Module | Responsibility |
|---|---|
| Authentication and account management | Sign-in, sign-out, session state, recovery, account status |
| Student dashboard and Home Page | Portfolio identity, introduction, learning philosophy, My Why, The Good Doctor, progress presentation |
| Faculty dashboard | List and open only explicitly authorized portfolios; no write controls |
| Academic content | Configurable levels, subjects, folders, domains, prompts, and global sections |
| Subject navigation | Level 1 subjects and twelve main folders; domain-aware navigation |
| Reflection management | Source prompt display, student response CRUD, evidence links |
| Artifact management | Metadata, private upload, replacement/deletion, domain/PLO associations |
| PLO Attainment | Eleven PLO records, student evidence links, descriptions, and reflections |
| Final Musings | Five global Level 1 questions and student responses |
| Profile management | Student personal information and approved profile image |

Version 1 implements only the approved Level 1 content. The academic model remains configurable for later levels.

## 4. Access Model

### Student

Authenticated student reads and manages only the owned portfolio, including permitted profile data, reflections, artifacts, PLO evidence, and Final Musings.

### Faculty/mentor

Authenticated faculty reads only portfolios explicitly assigned to that account. Faculty cannot create, edit, upload, replace, delete, comment, provide feedback, or grade.

### Unauthenticated user

No private portfolio, reflection, metadata, or artifact access.

## 5. Cross-Layer Interaction

1. Presentation obtains the Supabase session.
2. Application requests scoped data through the Supabase client.
3. Authenticated requests carry the user identity to PostgreSQL/Storage.
4. RLS or Storage policy evaluates ownership/assignment and operation type.
5. Approved data is returned; denied requests produce explicit errors.
6. Presentation renders the result without receiving privileged credentials.

## 6. Free Plan Design

Queries are scoped and paginated, artifact binaries are not duplicated, images are optimized, uploads have approved limits, and unnecessary realtime/background processing is avoided. Usage and quota states must be visible to administrators. Manual backup/export is required because the Free Plan does not provide the assumed automatic daily backup coverage.

## 7. Unresolved Decisions

- Free-tier frontend host.
- Auth providers and provisioning.
- Faculty assignment/revocation workflow.
- Artifact limits and retention.
- Manual backup schedule and restore testing.
- Final MED 102 parent-folder grouping and permanent display names.
- Final MED 103 folder/period organization.
- Progress calculation and audit logging rules.
