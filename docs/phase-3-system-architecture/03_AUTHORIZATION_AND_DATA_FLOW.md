# Authorization and Data Flow

## Phase 3 – Stage 3

The frontend improves usability; Supabase Auth, PostgreSQL RLS, and Storage policies enforce security.

## 1. Student Authentication

```mermaid
sequenceDiagram
    participant S as Student
    participant R as React
    participant A as Supabase Auth
    participant P as PostgreSQL RLS
    S->>R: Submit email/password
    R->>A: Sign in
    A-->>R: Session or error
    R->>P: Request own profile/portfolio
    P->>P: Check auth identity and ownership
    P-->>R: Own data or denial
    R-->>S: Workspace or error
```

## 2. Faculty Authentication

```mermaid
sequenceDiagram
    participant F as Faculty
    participant R as React
    participant A as Supabase Auth
    participant P as PostgreSQL RLS
    F->>R: Submit email/password
    R->>A: Sign in
    A-->>R: Session or error
    R->>P: Request assigned portfolios
    P->>P: Check active faculty assignment
    P-->>R: Authorized list or empty result
    R-->>F: Read-only workspace
```

## 3. Student Portfolio Authorization

```mermaid
flowchart TD
    Request[Authenticated request] --> Identity[Supabase Auth identity]
    Identity --> Context[Resolve portfolio ownership]
    Context --> Check{Student owns target?}
    Check -->|Yes| Allow[Allow permitted operation]
    Check -->|No| Deny[Deny request]
```

## 4. Faculty Read-only Authorization

```mermaid
flowchart TD
    Request[Authenticated faculty request] --> Identity[Supabase Auth identity]
    Identity --> Assignment[Resolve active assignment]
    Assignment --> Check{Assigned and read operation?}
    Check -->|Yes| Allow[Allow SELECT/file retrieval]
    Check -->|No| Deny[Deny request]
    Mutation[INSERT/UPDATE/DELETE/upload/delete] --> Deny
```

## 5. Secure Artifact Upload

```mermaid
sequenceDiagram
    participant S as Student
    participant R as React
    participant P as PostgreSQL RLS
    participant O as Private Storage
    S->>R: Select file and confirm warning
    R->>R: Basic type/size validation
    R->>P: Prepare scoped metadata
    P->>P: Verify student ownership
    P-->>R: Metadata authorization
    R->>O: Upload to private owner path
    O->>O: Evaluate Storage INSERT policy
    O-->>R: Object result or denial
    R->>P: Finalize metadata and associations
    P-->>R: Success or explicit error
```

## 6. Secure Artifact Retrieval

```mermaid
sequenceDiagram
    participant U as Student or Faculty
    participant R as React
    participant P as PostgreSQL RLS
    participant O as Private Storage
    U->>R: Request artifact
    R->>P: Load artifact in permitted context
    P->>P: Check owner or active faculty assignment
    P-->>R: Authorized metadata or denial
    R->>O: Request private object/short-lived URL
    O->>O: Check matching Storage policy
    O-->>R: Object or denial
```

## 7. Unauthorized Access Rejection

```mermaid
flowchart LR
    Request[Direct or UI request] --> Auth{Authenticated?}
    Auth -->|No| Reject[Reject]
    Auth -->|Yes| Scope{Owner or assigned faculty?}
    Scope -->|No| Reject
    Scope -->|Yes| Operation{Permitted operation?}
    Operation -->|No| Reject
    Operation -->|Yes| Allow[Authorized result]
```

## 8. Check Locations

| Check | Frontend | Supabase Auth | PostgreSQL RLS | Storage policy |
|---|---:|---:|---:|---:|
| Login | UX gate | Identity/session | Denies unauthenticated rows | Denies unauthenticated objects |
| Student ownership | Display only | Identity | Authoritative | Authoritative for objects |
| Faculty assignment | Display only | Identity | Authoritative | Authoritative for objects |
| Faculty read-only | Hide controls | Identity only | Deny mutations | Deny upload/replace/delete |
| File type/size | Early validation | No | Metadata checks as approved | Object policy and limits |
