# Supabase Migration Changelog

## Approved Migration

The project backend has been migrated in the documentation baseline from the earlier Firebase direction to Supabase Free Plan. This is a documentation reconciliation only; no Supabase project, database, Storage bucket, or migration was executed.

## Changes Applied

### Phase 1

- Replaced Cloud Firestore with Supabase PostgreSQL.
- Replaced Firebase Authentication with Supabase Auth.
- Replaced Firebase Cloud Storage with private Supabase Storage.
- Replaced Firebase security rules with PostgreSQL RLS and Storage policies.
- Added short-lived signed URL terminology for private artifact access.
- Updated faculty wording to the approved instructor review/feedback model.
- Updated Supabase project/configuration references.

### Phase 2

- Updated the source-reference technology row to identify Supabase as the selected data, authentication, and storage direction.
- Preserved the academic source register and page references.

### Phase 3

- No technical decision was changed. Phase 3 already identifies Supabase as active and Firebase as excluded or historical.
- The older architecture wording about faculty no-feedback remains a functional-model reconciliation item, not a backend migration decision.

### Phase 4

- No technical decision was changed. Phase 4 already defines PostgreSQL, Supabase Auth, private Storage, RLS, signed URLs, invitation-code lifecycle, reviews, feedback, and audit structures.

### Phase 5

- No technology changes were required. Phase 5 final UI/UX documents already reference the approved Supabase architecture.

## Historical References Retained

Firebase is retained only where a document explicitly records:

- A previous project direction.
- An excluded technology.
- A migration history or conflict that must remain traceable.

No retained Firebase reference is an implementation dependency.

## Not Performed

- No SRS update, because the SRS file is absent.
- No roadmap update, because the roadmap file is absent.
- No frontend code changes.
- No database migrations.
- No Supabase services or configurations.
