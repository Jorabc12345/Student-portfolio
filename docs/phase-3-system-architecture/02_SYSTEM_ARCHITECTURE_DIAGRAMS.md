# System Architecture Diagrams

## Phase 3 – Stage 2

These Mermaid diagrams describe the high-level design. They are not database ERDs, migrations, or implementation diagrams.

## 1. Overall System Architecture

```mermaid
flowchart LR
    Browser[Student or Faculty Browser]
    UI[React + Vite UI]
    Style[Tailwind CSS + Framer Motion + Lucide React]
    Auth[Supabase Authentication]
    DB[Supabase PostgreSQL]
    RLS[PostgreSQL RLS]
    Storage[Private Supabase Storage]
    Functions[Optional Edge Functions]
    Host[Free-tier Frontend Hosting]

    Host --> UI
    Browser --> UI
    UI --> Style
    UI --> Auth
    UI --> DB
    DB --> RLS
    UI --> Storage
    UI --> Functions
    Functions --> DB
    Functions --> Storage
```

## 2. Application Component Architecture

```mermaid
flowchart TB
    App[React Application]
    Shell[Authenticated App Shell]
    Student[Student Workspace]
    Faculty[Faculty Read-only Workspace]
    Academic[Academic Content Module]
    Portfolio[Portfolio and Reflection Module]
    Artifact[Artifact Module]
    PLO[PLO and Final Musings Module]
    Client[Supabase Client Boundary]
    Auth[Supabase Auth]
    Postgres[PostgreSQL + RLS]
    Storage[Private Storage Policies]
    Function[Optional Edge Function]

    App --> Shell
    Shell --> Student
    Shell --> Faculty
    Student --> Academic
    Student --> Portfolio
    Student --> Artifact
    Student --> PLO
    Faculty --> Academic
    Faculty --> Portfolio
    Faculty --> Artifact
    Faculty --> PLO
    Academic --> Client
    Portfolio --> Client
    Artifact --> Client
    PLO --> Client
    Client --> Auth
    Client --> Postgres
    Client --> Storage
    Client --> Function
    Function --> Postgres
    Function --> Storage
```

## 3. Academic Content Hierarchy

```mermaid
flowchart TD
    Portfolio[Individual Portfolio]
    Home[Home Page]
    Level1[Level 1]
    MED101[MED 101]
    MED102[MED 102]
    MED103[MED 103]
    Folders[Four Main Folders per Subject]
    Domains[MED 102: Eight Separate Domains]
    Content[Learning Content]
    Reflections[Reflections]
    Artifacts[Artifacts]
    PLO[PLO Attainment]
    Musings[Final Musings]
    Future[Future Levels: Configurable]

    Portfolio --> Home
    Portfolio --> Level1
    Level1 --> MED101
    Level1 --> MED102
    Level1 --> MED103
    MED101 --> Folders
    MED102 --> Folders
    MED103 --> Folders
    MED102 --> Domains
    Folders --> Content
    Domains --> Content
    Content --> Reflections
    Content --> Artifacts
    Level1 --> PLO
    Level1 --> Musings
    Portfolio --> Future
```

## 4. Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant R as React App
    participant A as Supabase Auth
    participant P as PostgreSQL RLS

    U->>R: Submit credentials
    R->>A: Sign in
    A-->>R: Authenticated session or error
    R->>P: Request scoped profile/portfolio
    P->>P: Evaluate identity, role, ownership/assignment
    P-->>R: Authorized data or denial
    R-->>U: Workspace or actionable error
```

## 5. Reflection and Artifact Data Flow

```mermaid
sequenceDiagram
    participant S as Student
    participant R as React App
    participant P as PostgreSQL + RLS
    participant O as Private Storage

    S->>R: Write reflection
    R->>P: Submit scoped reflection
    P->>P: Verify student ownership
    P-->>R: Saved reflection or error
    S->>R: Select artifact and metadata
    R->>P: Prepare artifact metadata
    P->>P: Verify ownership
    R->>O: Upload private object
    O->>O: Evaluate Storage policy
    O-->>R: Object result or denial
    R->>P: Save associations to domains/PLOs
    P-->>R: Saved links or error
```

## 6. Faculty Read-only Access Flow

```mermaid
sequenceDiagram
    participant F as Faculty
    participant R as React App
    participant P as PostgreSQL + RLS
    participant O as Private Storage

    F->>R: Sign in
    R->>P: Request assigned portfolios
    P->>P: Check faculty assignment
    P-->>R: Authorized portfolio list
    F->>R: Open portfolio/reflection
    R->>P: SELECT assigned content
    P-->>R: Read-only content
    F->>R: Open artifact
    R->>O: Request private object
    O->>O: Check assigned read access
    O-->>R: Controlled object or denial
    F->>R: Attempt write
    R->>P: Mutation request
    P-->>R: Denied by RLS
```
