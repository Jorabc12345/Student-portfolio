# Private Storage Security

## Phase 3 – Stage 3

This design uses private Supabase Storage buckets. It does not create buckets, Storage policies, or upload code.

## 1. Bucket and Path Design

Use a private artifact bucket. Object paths should contain a trusted portfolio identifier and opaque artifact identifier:

```text
portfolio/{portfolio-id}/artifacts/{artifact-id}/{opaque-file-name}
```

The path must not use a user-supplied filename as an authorization key. Database metadata must record the owning portfolio and exact object path.

## 2. Proposed File Policy

These are technical defaults requiring confirmation:

- Accepted formats: PDF, DOCX, PPTX, XLSX, JPG, JPEG, and PNG.
- Maximum artifact size: 10 MB.
- Maximum profile image size: 5 MB.
- Reject executables, scripts, archives, and unknown binary types.
- Validate MIME type and file signature where practical.
- Optimize images and strip unnecessary metadata where appropriate.

These limits are recommendations, not academic requirements.

## 3. Upload Authorization

1. Authenticate through Supabase Auth.
2. Verify the target portfolio belongs to the student through RLS context.
3. Validate type, size, metadata, and confidentiality acknowledgement.
4. Permit Storage INSERT only under the student's portfolio path.
5. Finalize metadata only for the same owner/path.
6. Reject faculty and unauthenticated uploads.

Frontend validation is an early usability check; Storage policies remain authoritative.

## 4. Retrieval Authorization

- Students may retrieve objects in their own portfolio.
- Faculty may retrieve objects only for actively assigned portfolios.
- Unassigned faculty and unauthenticated users receive no object.
- Do not use public buckets or permanent public URLs.
- Use authenticated access or short-lived signed URLs after authorization.
- Suggested signed URL lifetime: five minutes, subject to approval.

## 5. Replacement and Deletion

Students may replace or delete only their own artifacts. Replacement verifies ownership before changing object and metadata. Deletion follows the approved retention policy and cleans up metadata/object relationships safely.

Faculty cannot replace or delete files.

## 6. Confidentiality Warning

Before upload, warn users not to include patient names, faces or identifiable photographs, medical record numbers, identifying dates, addresses, contact information, or any detail that could identify a patient, family, or community member.

An allowed file type does not make its contents safe.

## 7. Threats and Mitigations

| Threat | Mitigation |
|---|---|
| Public bucket or URL leakage | Private bucket, policy review, controlled access |
| Guessed object path | Opaque artifact IDs and Storage policy checks |
| Cross-portfolio access | Ownership/assignment checks on path and metadata |
| Faculty write access | Read-only policy; deny insert/update/delete |
| Malicious file | Restrict formats and size; approved review process |
| Storage exhaustion | Quotas, limits, optimization, deletion policy, monitoring |
| Stale signed URL | Short expiration and no permanent sharing |
| Orphaned object | Cleanup workflow and periodic review |

## 8. Official References

- [Supabase Storage access control](https://supabase.com/docs/guides/storage/security/access-control)
- [Supabase Storage security](https://supabase.com/docs/guides/storage/security)
- [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)
