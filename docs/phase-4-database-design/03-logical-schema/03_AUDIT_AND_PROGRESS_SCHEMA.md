# Audit and Progress Schema

## Audit Logs

`audit_logs` should record only necessary security and lifecycle events: account verification, grant/revocation, denied access, review creation, feedback creation/update, artifact lifecycle events, and approved portfolio changes. Do not store passwords, tokens, signed URLs, patient identifiers, or raw confidential content.

Suggested fields are UUID id, actor Auth UUID, optional portfolio, event type, target type/id, safe JSON metadata, and occurred timestamp. Ordinary students and instructors cannot update or delete audit records.

## Progress

Use `completion_requirements`, `section_completions`, and `portfolio_progress` only if the client approves completion rules. Progress is informational and is not instructor grading. Calculated fields should include a calculation version and timestamp.

## Access History

`portfolio_access_events` records grant and revocation history. Historical events must never be used by RLS as current authorization.

## Logging Limits

Keep event types bounded, metadata minimal, and retention explicit to control Free Plan database usage. Avoid logging every read or every UI interaction unless a documented security requirement exists.
