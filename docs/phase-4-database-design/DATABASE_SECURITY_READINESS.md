# Database Security Readiness

## Supported Controls

The schema provides Auth identity references, portfolio ownership paths, role records, individually revocable faculty assignments, private Storage metadata, and append-oriented audit structures.

## Required Next-Phase Controls

1. Enable RLS on every client-exposed table.
2. Permit student mutations only for rows reachable from the authenticated student's portfolio.
3. Permit assigned faculty SELECT only while an assignment is active.
4. Deny faculty INSERT, UPDATE, DELETE, uploads, replacement, deletion, comments, feedback, and grading.
5. Restrict role and assignment administration to trusted provisioning processes; users must not self-grant faculty roles.
6. Add Storage policies for private bucket paths derived from portfolio ownership.
7. Prevent ordinary users from modifying or deleting audit records.
8. Test unauthorized portfolio, metadata, and file access with positive and negative cases.

The schema is not a security guarantee until policies, helper functions, Storage rules, and tests are implemented.
