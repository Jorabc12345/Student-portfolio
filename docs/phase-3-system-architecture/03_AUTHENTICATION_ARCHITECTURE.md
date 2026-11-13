# Authentication Architecture

## Phase 3 – Stage 3

This design uses Supabase Authentication with email/password accounts. It is descriptive only; no live configuration or implementation is created.

## 1. Authentication Principles

- Login is mandatory for private portfolio access.
- Authentication establishes identity; PostgreSQL RLS and Storage policies establish authorization.
- The browser uses only the Supabase publishable/anon key intended for client use.
- The service-role/secret key is never included in React code, browser storage, or public build output.
- No anonymous public portfolio access is supported.

## 2. Account Provisioning

Student accounts are created through an approved provisioning process. Faculty/mentor accounts are created only through a trusted process controlled by the institution/project owner. The client must approve whether invitations, institutional email verification, or manual account approval is required.

Role and access assignments must be written by trusted provisioning operations, not by a normal profile form. A user cannot set their own role, faculty status, student ownership, or portfolio assignment.

No unrestricted administrator role is introduced. If a provisioning operator is later required, it must be a narrowly scoped trusted operational capability and separately approved.

## 3. Login and Logout

1. User submits email and password.
2. Supabase Auth validates credentials and returns a session or explicit error.
3. React stores session state using the Supabase client session mechanism.
4. Protected data requests carry the authenticated identity to RLS.
5. Logout clears the local session and returns the user to the login boundary.

The application must handle expired, revoked, or invalid sessions by clearing stale state and requiring reauthentication.

## 4. Session Management

- Use Supabase-supported session handling rather than custom tokens.
- Do not place access or refresh tokens in URLs or application content.
- Protect browser storage according to the final Supabase client configuration and deployment policy.
- Subscribe to auth state changes so UI state cannot remain authenticated after logout or revocation.
- Keep sensitive data out of client logs.
- Use HTTPS in every deployed environment.

Exact session duration, refresh behavior, inactivity policy, and device/session revocation require approval.

## 5. Password Recovery

The recovery flow sends a Supabase Auth recovery email and routes the user to a controlled password-update page. Recovery links must be short-lived according to Supabase Auth behavior, used only over HTTPS, and invalidated after use where supported. The application must not reveal whether an arbitrary email belongs to a student or faculty account.

## 6. Account Status and Revocation

Trusted provisioning must support disabling or revoking accounts and removing faculty assignments. Removing an assignment must prevent future portfolio reads through RLS and Storage policies. Existing client sessions must not be treated as permanent authorization; access is re-evaluated for protected requests.

Account deletion, retention, and recovery procedures remain unresolved operational decisions.

## 7. Official Supabase Guidance

- [Supabase Auth overview](https://supabase.com/docs/guides/auth)
- [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)
- [Supabase secure data](https://supabase.com/docs/guides/database/secure-data)
- [Supabase password reset](https://supabase.com/docs/guides/auth/auth-password-reset)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)

## 8. Authentication Risks

- Self-assigned roles or assignments.
- Faculty account incorrectly linked to a student portfolio.
- Stale sessions after revocation.
- Password recovery account enumeration.
- Service-role key exposure.
- Auth identity and profile record becoming inconsistent.

These require trusted provisioning, RLS policy tests, secure secret management, and explicit revocation procedures.
