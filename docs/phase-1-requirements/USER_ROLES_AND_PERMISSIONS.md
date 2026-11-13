# User Roles and Permissions

## Access Principles

1. The portfolio is private and login is mandatory.
2. The student is the owner of one individual portfolio.
3. Authorized faculty are strictly read-only.
4. Frontend hiding is not authorization. Every backend operation must enforce the same rule.
5. Faculty comments, feedback, editing, deletion, uploading, and grading are not Version 1.0 capabilities.

## Roles

### Student portfolio owner

The student can manage their own profile, Home Page sections, Level 1 content, reflections, artifacts, PLO documentation, and Final Musings. The student cannot administer institutional users or change the approved curriculum structure.

### Authorized faculty viewer

An authenticated faculty member can view the portfolio content explicitly included in their authorization scope. Faculty cannot create, edit, delete, upload, comment, provide feedback, or grade through the application.

## Permission Matrix

| Capability | Student owner | Authorized faculty | Unauthenticated visitor |
|---|---:|---:|---:|
| Log in / log out | Yes | Yes | No |
| View own portfolio | Yes | No | No |
| View authorized portfolio | N/A | Yes | No |
| Edit student profile | Yes | No | No |
| Manage Home Page sections | Yes | No | No |
| View Home Page sections | Yes | Yes, if authorized | No |
| View Level 1 | Yes | Yes, if authorized | No |
| Change academic curriculum definitions | No | No | No |
| View subjects and folders | Yes | Yes, if authorized | No |
| Create/edit/delete reflections | Yes, own | No | No |
| View reflections | Yes | Yes, if authorized | No |
| Upload artifacts | Yes, own | No | No |
| Edit/delete artifact records | Yes, own | No | No |
| View/download artifacts | Yes, own | Yes, if authorized | No |
| Manage PLO evidence | Yes, own | No | No |
| View PLO evidence | Yes | Yes, if authorized | No |
| Manage Final Musings | Yes, own | No | No |
| View Final Musings | Yes | Yes, if authorized | No |
| View progress dashboard | Yes | Only if separately approved | No |
| Comment or provide feedback | No | No | No |
| Grade portfolio content | No | No | No |
| Manage users or faculty assignments | No, unless separately approved | No | No |

## Backend Authorization Requirements

For every protected operation, the backend must verify:

1. The request has an authenticated session.
2. The requested portfolio belongs to the student or is within the faculty member’s authorization assignment.
3. The operation is permitted for the caller’s role.
4. The requested artifact is associated with an authorized portfolio and is served through protected access.

The backend must reject, rather than silently ignore, unauthorized requests. A faculty request using a direct API call, altered form, guessed identifier, or hidden endpoint must not create, update, delete, upload, comment, provide feedback, or grade.

## Faculty Visibility Boundary

Faculty visibility is confirmed in principle but its exact granularity remains unresolved. Until the client confirms otherwise, the safe default is that a faculty member sees only the portfolio explicitly assigned to them, and no unrelated student portfolio. Whether the assigned view includes the entire portfolio or selected sections must be decided before implementation.

## Account Assignment Boundary

The application must not assume public self-registration or automatic faculty access. The account creation, password recovery, faculty list, and authorization-provisioning process remain open decisions.

