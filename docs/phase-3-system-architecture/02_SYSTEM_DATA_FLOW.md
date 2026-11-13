# System Data Flow

## Phase 3 – Stage 2

All flows assume no service-role key is present in the browser. Supabase Auth supplies identity; PostgreSQL RLS and Storage policies enforce authorization.

## 1. Student Login

1. Student submits credentials through React.
2. Supabase Authentication validates them.
3. The client receives an authenticated session.
4. The application loads the student's profile and portfolio.
5. RLS returns only owned records.
6. The student workspace is displayed.

Authentication or profile errors are reported explicitly.

## 2. Faculty Login

1. Faculty submits credentials.
2. Supabase Auth establishes the session.
3. The application identifies the account and role context.
4. RLS returns only portfolios covered by explicit faculty assignments.
5. The read-only faculty workspace is displayed.

An authenticated but unassigned faculty account receives no portfolio content.

## 3. Student Creates a Reflection

1. Student opens a permitted subject, folder, domain, or global section.
2. The application loads the exact approved prompt and context.
3. Student enters a response and permitted metadata/evidence references.
4. The client submits the scoped record.
5. RLS verifies ownership and permits the write.
6. Validation errors are shown; successful saves are confirmed.

## 4. Student Uploads an Artifact

1. Student selects an approved file and enters metadata.
2. The client performs basic type and size validation.
3. The application prepares artifact metadata scoped to the portfolio.
4. Storage policy verifies authenticated ownership and path.
5. The file is uploaded to a private bucket.
6. Metadata and associations are finalized after upload success.
7. The UI displays the result or an actionable quota/error state.

One binary is uploaded even when linked to multiple domains or PLOs.

## 5. Student Associates Artifact with Domains or PLOs

1. Student selects an existing artifact.
2. Valid domains/PLOs are loaded for the academic context.
3. The student submits association records and relevance explanations where required.
4. RLS verifies artifact ownership.
5. The artifact remains one binary with multiple relational links.

## 6. Faculty Opens an Authorized Portfolio

1. Faculty requests the assigned-portfolio list.
2. RLS evaluates the faculty assignment.
3. Only permitted portfolio summaries are returned.
4. Faculty selects one portfolio.
5. Every subsequent query remains assignment-scoped.
6. Any write request is denied by RLS.

## 7. Faculty Views a Reflection

1. Faculty requests a reflection in an assigned portfolio.
2. RLS checks the assignment and allows SELECT.
3. The application loads the reflection, prompt context, and permitted evidence metadata.
4. No edit, comment, feedback, or grading mutation is accepted.

## 8. Faculty Accesses a Private Artifact

1. Faculty opens artifact metadata from an assigned portfolio.
2. The application verifies the artifact's portfolio context.
3. The client requests controlled access to the private Storage object.
4. Storage policy checks faculty identity and assigned read access.
5. Only an authorized object response or short-lived controlled URL is returned.
6. Denied access returns an explicit authorization error.

Public buckets and unrestricted permanent URLs are not used.

## 9. Generic Request Boundary

```text
React component
  -> Supabase client request with authenticated session
  -> Auth identity context
  -> PostgreSQL RLS or Storage policy
  -> authorized result or explicit denial/error
  -> React state and user-facing feedback
```

## 10. Quota and Recovery Flow

```text
Upload/query request
  -> classify success, validation, authorization, quota, or transient failure
  -> preserve unsaved input where safe
  -> show actionable message
  -> administrator reviews usage and backup state
```
