# Portfolio Storage Security

## Phase 3 – Stage 3

The portfolio owner explicitly chose to make all saved portfolio content and uploaded artifacts public so visitors can view changes without signing in. This supersedes the earlier private-by-default assumption for this portfolio. Never upload patient-identifying information, confidential records, or material that the owner does not have permission to publish.

## 1. Shared Content and Bucket Design

Portfolio text and metadata are stored in `public.portfolio_items`. Anonymous and authenticated visitors can read the rows; only the configured owner can insert, update, or delete them.

The portrait and uploaded artifacts use separate public Storage buckets: `portfolio-portraits` and `portfolio-artifacts`. Public reads are intentional. Storage policies restrict writes and deletes to the configured owner, and artifact paths are scoped under the authenticated owner's user ID.

## 2. File Policy

These are technical defaults requiring confirmation:

- Accepted artifact formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, JPG, PNG, and WebP.
- Maximum artifact size: 10 MB.
- Maximum profile image size: 2 MB.
- Reject executables, scripts, archives, and unknown binary types.
- The application checks MIME type and size; uploaded content still requires owner review.

These limits do not make a file safe to publish.

## 3. Write Authorization

1. Authenticate through Supabase Auth.
2. Restrict database writes and Storage upload/delete operations to the configured owner.
3. Validate file type, size, and public-sharing acknowledgement.

Frontend validation is an early usability check; database and Storage policies remain authoritative.

## 4. Public Retrieval

Any visitor can read the saved portfolio rows and fetch files from these two public buckets. Do not store private files in these buckets. If the owner later wants private sections, they need a separate private data path and access policies.

## 5. Replacement and Deletion

Only the configured owner may replace or delete artifacts. Deletion removes the Storage object and its portfolio metadata.

## 6. Confidentiality

Before saving or uploading public content, warn the owner not to include patient names, faces or identifiable photographs, medical record numbers, identifying dates, addresses, contact information, or any detail that could identify a patient, family, or community member.

An allowed file type does not make its contents safe.

## 7. Threats and Mitigations

| Threat | Mitigation |
|---|---|
| Unintended content exposure | Public access is an explicit owner decision; warn before saving and never upload confidential material |
| Unauthorized edits | Database and Storage policies allow writes only for the configured owner |
| Artifact path misuse | Storage policies scope artifact paths to the authenticated owner's user ID |
| Malicious file | Restrict formats and size; approved review process |
| Storage exhaustion | Quotas, limits, optimization, deletion policy, monitoring |
| Stale signed URL | Short expiration and no permanent sharing |
| Orphaned object | Cleanup workflow and periodic review |

## 8. Official References

- [Supabase Storage access control](https://supabase.com/docs/guides/storage/security/access-control)
- [Supabase Storage security](https://supabase.com/docs/guides/storage/security)
- [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)
