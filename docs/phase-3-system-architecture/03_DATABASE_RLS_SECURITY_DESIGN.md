# Database RLS Security Design

## Phase 3 – Stage 3

This is a conceptual RLS design. It does not create tables, SQL policies, migrations, or a live Supabase project.

## 1. General RLS Rules

- Enable RLS on every client-exposed table.
- Use the authenticated Supabase identity as the source of user identity.
- Resolve ownership and faculty assignment from trusted database relationships.
- Never trust a client-supplied `user_id`, `portfolio_id`, role, or assignment claim by itself.
- Separate SELECT, INSERT, UPDATE, and DELETE policies.
- Keep academic configuration read-only to ordinary students and faculty.
- Test unauthenticated, student-owner, other-student, assigned-faculty, and unassigned-faculty cases.

## 2. Policy Matrix

| Resource | SELECT | INSERT | UPDATE | DELETE | Ownership/role condition |
|---|---|---|---|---|---|
| Student profiles | Own profile; assigned faculty may read permitted student profile | Trusted provisioning only | Student own permitted fields; trusted provisioning for role/status | Trusted retention process only | `auth.uid()` must match owner for student writes; faculty assignment required for reads |
| Portfolios | Student owner; assigned faculty read | Trusted portfolio provisioning or owner-only creation flow | Student owner only | Trusted retention process or owner policy approved later | Portfolio owner must equal authenticated student |
| Academic levels | Authenticated configured read | Trusted content management only | Trusted content management only | Trusted content management only | No student/faculty content-management writes |
| Subjects | Authenticated configured read | Trusted content management only | Trusted content management only | Trusted content management only | Parent level is trusted academic configuration |
| Folders | Authenticated configured read | Trusted content management only | Trusted content management only | Trusted content management only | Stable IDs; labels are configuration |
| Learning domains | Authenticated configured read | Trusted content management only | Trusted content management only | Trusted content management only | Domain identity remains independent of provisional grouping |
| Reflection prompts/content configuration | Authenticated contextual read | Trusted content management only | Trusted content management only | Trusted content management only | Exact source content protected from student mutation |
| Reflections | Owner read; assigned faculty read | Student owner only | Student owner only | Student owner only | Portfolio ownership and academic context must be valid |
| Artifact metadata | Owner read; assigned faculty read | Student owner only | Student owner only | Student owner only | Metadata portfolio owner must match authenticated user |
| Artifact-domain links | Owner read/write; assigned faculty read | Student owner only | Student owner only | Student owner only | Linked artifact must belong to owner's portfolio |
| PLO records | Authenticated configured read | Trusted content management only | Trusted content management only | Trusted content management only | Eleven PLO definitions are not student-editable |
| PLO evidence/mappings | Owner read/write; assigned faculty read | Student owner only | Student owner only | Student owner only | Evidence and artifact must belong to same portfolio |
| Final Musings prompts | Authenticated configured read | Trusted content management only | Trusted content management only | Trusted content management only | Five source questions are protected configuration |
| Final Musings responses | Owner read/write; assigned faculty read | Student owner only | Student owner only | Student owner only | Response portfolio must equal authenticated owner |
| Faculty access assignments | Trusted provisioning read/write; faculty may read only their effective assignment if needed | Trusted provisioning only | Trusted provisioning only | Trusted provisioning only | Never writable by student or ordinary faculty |
| Audit records | Trusted operational read; no ordinary student access | Trusted system/provisioning only | No ordinary updates | Trusted retention only | Do not expose sensitive payloads |

## 3. Policy Details by Operation

### SELECT

Student SELECT requires ownership. Faculty SELECT requires an active assignment to the portfolio. Unauthenticated users receive no private portfolio, profile, reflection, artifact metadata, PLO evidence, or Final Musings data.

### INSERT

Only a student may insert portfolio content when the new row's portfolio resolves to that student's portfolio. Faculty INSERT is denied for all student content. Academic configuration, role, assignment, and audit inserts use trusted provisioning or approved server operations.

### UPDATE

Student UPDATE requires ownership and must exclude role, owner, assignment, and protected academic configuration fields. Faculty UPDATE is denied. Database constraints and policy design must prevent changing a row's ownership during an update.

### DELETE

Student DELETE is limited to their own reflections, artifacts, associations, and Final Musings where approved. Faculty DELETE is denied. Deletion of academic configuration, assignments, profiles, or audit history requires a trusted operational process.

## 4. Privilege Escalation Avoidance

- Do not allow profile updates to alter role or ownership.
- Do not use client-provided portfolio IDs as the sole authorization condition.
- Verify parent portfolio ownership for every child row and association.
- Keep assignment tables inaccessible to ordinary client writes.
- Prevent faculty from being treated as an owner through broad authenticated policies.
- Review views, RPCs, triggers, and Edge Functions for equivalent authorization.
- Keep service-role/secret credentials outside the frontend.

## 5. RLS Test Set

Required tests include:

1. Anonymous SELECT/INSERT/UPDATE/DELETE.
2. Student access to own and another student's rows.
3. Assigned and unassigned faculty SELECT.
4. Faculty mutation attempts on every portfolio resource.
5. Ownership-changing update attempts.
6. Cross-portfolio artifact-domain/PLO associations.
7. Revoked faculty assignment after an existing session.
8. Direct Storage requests using guessed object paths.

## 6. Official References

- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase secure data](https://supabase.com/docs/guides/database/secure-data)
- [Supabase Storage access control](https://supabase.com/docs/guides/storage/security/access-control)
