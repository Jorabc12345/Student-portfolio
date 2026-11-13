# Application Component Design

## Phase 3 – Stage 2

## 1. Component Boundaries

### React application shell

Owns routing, session-aware layouts, responsive navigation, loading states, and global error presentation. It does not make authorization decisions.

### Student workspace

Contains Home Page, profile management, Level 1 subject navigation, reflections, artifacts, PLO Attainment, Final Musings, and progress presentation. Write controls are rendered for the student but remain protected by RLS and Storage policies.

### Faculty workspace

Displays assigned-portfolio lists and read-only portfolio views. It must not expose mutation controls, and backend policy still denies mutation attempts made outside the UI.

### Academic content service

Reads configurable levels, subjects, folders, domains, prompts, PLOs, and global section definitions. It preserves stable IDs and labels. It does not finalize provisional MED 102 grouping.

### Portfolio service

Coordinates profile, reflection, Final Musings, and portfolio reads/writes. It sends narrow queries and validates required context before submission.

### Artifact service

Coordinates artifact metadata, private Storage upload/retrieval, replacement/deletion, and domain/PLO association. It uploads one binary per artifact and creates multiple associations where permitted.

### Supabase client boundary

The only browser data boundary to Supabase. It uses the public client configuration intended for browser use. The service-role key is never included.

### Optional Edge Function boundary

Reserved for exceptional trusted operations. A Function must validate the caller and operation, avoid bypassing policy intent, and remain within Free Plan limits.

## 2. Component Interaction Rules

- Components request data by portfolio and academic scope.
- Components use stable IDs, not display labels, as relationship values.
- Faculty components request reads only; RLS independently denies writes.
- Artifact components never expose public storage paths.
- Cross-references use association records and do not duplicate files.
- Exact academic questions are read from approved content configuration.

## 3. Page and Feature Map

| Area | Student | Faculty |
|---|---:|---:|
| Login/session | Yes | Yes |
| Home Page/profile | Own manage/view | Authorized read |
| Subject/folder navigation | Own read/manage | Authorized read |
| Reflections | Create/edit/delete | Read only |
| Artifacts | Upload/manage/delete | Read only |
| PLO Attainment | Manage evidence/reflections | Read only |
| Final Musings | Manage responses | Read only |
| Comments/feedback/grading | No | No |

## 4. Data Access Patterns

- Load the current user's portfolio by authenticated identity.
- Load academic navigation by level and subject.
- Load a folder/domain page with paginated reflections and artifact metadata.
- Load artifact associations separately when needed.
- Load faculty portfolios only through assignment-scoped queries.
- Request a private artifact only after the parent portfolio and artifact authorization context is known.

## 5. Error and Quota Behavior

The application must distinguish authentication failure, authorization denial, validation error, missing content, unavailable file, quota exhaustion, and transient service failure. It must not display success when an upload or association failed. Quota warnings should explain the next action without exposing administrative credentials or internal policy details.

## 6. Responsive Presentation Guidance

The visual system uses the approved white/pink/butter-yellow proportions, readable contrast, restrained motion, keyboard-accessible controls, and layouts that work on mobile, tablet, and desktop. This document does not define UI wireframes.
