# Privacy and Data Protection

## Phase 3 – Stage 3

The portfolio is private academic data. The architecture must protect student information and prevent patient-identifiable information from entering the system.

For this portfolio, the owner explicitly chose to make all saved content and uploaded artifacts public. This changes the visibility model; it does not permit uploading confidential patient, clinical, or community information.

## 1. Data Classification

| Data | Classification | Protection |
|---|---|---|
| Student profile details | Public portfolio content by owner choice | Public read; owner-only edits |
| Portfolio portrait | Public personal image by owner choice | Dedicated public portrait bucket; owner-only upload, replacement, and deletion |
| Reflections, PLO evidence, and Final Musings | Public portfolio content by owner choice | Public read; owner-only edits |
| Artifact metadata and files | Public portfolio content by owner choice | Public read and file access; owner-only upload and deletion |
| Faculty assignments | Sensitive authorization data | Trusted provisioning only |
| Academic prompts and PLO definitions | Institutional configuration | Controlled content management |
| Auth credentials/tokens | Security-sensitive | Supabase Auth; never log or expose |
| Backup/export data | Private combined dataset | Protected storage and restricted operations |

## 2. Patient and Community Confidentiality

Before every artifact upload, warn against including:

- Patient names or identifying initials.
- Faces, photographs, voice recordings, or recognizable images.
- Medical record, case, or insurance numbers.
- Identifying dates, addresses, locations, or rare-event details.
- Phone numbers, email addresses, or other contact information.
- Any combination of facts that could identify a patient, family, or community member.

Students remain responsible for permissions, de-identification, academic integrity, references, collaborators, and artificial-intelligence-use acknowledgements.

## 3. Privacy by Design

- All saved portfolio content and artifact files are public by the owner's explicit choice.
- Only the configured owner can change portfolio data or upload/delete files.
- Never store patient-identifying or confidential information in a public section or file.
- No faculty comments, feedback, grading, or edits.
- Minimal data returned by list queries.
- No sensitive content in URLs, client logs, analytics, or error messages.
- Short-lived controlled file access.
- Protected exports and manual backups.
- Clear deletion and retention policies once approved.

## 4. Frontend and Secret Protection

The Supabase URL and publishable/anon key may be included in the frontend when RLS and grants are correctly configured. The service-role/secret key must never be included in frontend code, browser-exposed environment variables, source maps, or static build output.

Use environment variables for public configuration and protected deployment secret stores for server-only secrets. HTTPS is required in deployed environments.

## 5. Data Minimization

Store only information needed for portfolio management, academic reflection, evidence organization, access authorization, and approved audit purposes. Do not copy patient records into the portfolio. Do not store duplicate artifact binaries for cross-references.

## 6. Incident and Access Management

The project must define procedures for faculty assignment revocation, compromised-account disabling, removal of improperly uploaded artifacts, patient-information incident reporting, credential rotation, unauthorized-access review, and protected-backup restoration.

Exact retention, notification, audit, and institutional reporting requirements remain unresolved.

## 7. Official Supabase References

- [Supabase secure data](https://supabase.com/docs/guides/database/secure-data)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase Storage access control](https://supabase.com/docs/guides/storage/security/access-control)
- [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)
- [Supabase Auth overview](https://supabase.com/docs/guides/auth)
