# Role and Permission Matrix

## Phase 3 – Stage 3

## 1. Roles

### Student

The authenticated owner of one individual portfolio. A student can manage only their own profile and portfolio content.

### Faculty/Mentor

An authenticated read-only viewer with explicit assignment to one or more student portfolios. Faculty cannot modify any portfolio content.

### Unauthenticated user

Has no private portfolio access.

No unrestricted administrator role is defined.

## 2. Permission Matrix

| Resource/action | Student owner | Assigned faculty/mentor | Unassigned faculty | Unauthenticated |
|---|---:|---:|---:|---:|
| Sign in/out | Yes | Yes | Yes | No private access |
| View own profile | Yes | No unless assigned portfolio context | No | No |
| Edit own profile | Yes | No | No | No |
| View assigned student profile | No, except own | Read | No | No |
| View academic structure | Authenticated scoped read | Authenticated scoped read | Public/private policy dependent; no portfolio data | No private data |
| Create reflection | Yes, own | No | No | No |
| Edit reflection | Yes, own | No | No | No |
| Delete reflection | Yes, own | No | No | No |
| View reflection | Yes, own | Read assigned | No | No |
| Upload artifact | Yes, own | No | No | No |
| Replace artifact | Yes, own | No | No | No |
| Delete artifact | Yes, own | No | No | No |
| View artifact | Yes, own | Read assigned | No | No |
| Link artifact to domain/PLO | Yes, own | No | No | No |
| Manage PLO evidence/reflection | Yes, own | Read assigned | No | No |
| Manage Final Musings | Yes, own | No | No | No |
| Comment/feedback | No | No | No | No |
| Grade | No | No | No | No |
| Modify academic content | No | No | No | No |
| Assign faculty access | No | No | No | No |

## 3. Enforcement

The matrix is enforced by PostgreSQL RLS and Storage policies. React may hide unavailable controls, but a direct request must receive a denial. Role, ownership, and assignment values cannot be accepted from untrusted form fields.

## 4. Provisioning Requirements

- Student account creation and portfolio ownership must be trusted operations.
- Faculty account creation and portfolio assignment must be trusted operations.
- Role changes and assignment revocation must be auditable.
- A user profile update must not permit role, ownership, or assignment changes.
- Any operational account with provisioning authority must be explicitly approved and narrowly scoped.
