# Supabase Client Setup

## Client Location

Import the centralized client from:

```ts
import { supabase } from "../../services/supabase";
```

Feature services should be placed under `src/services/` and should depend on this client. React pages and components should not create their own Supabase clients or read environment variables directly.

## Client Behavior

The client:

- Uses the configured project URL and public anon/publishable key.
- Persists browser sessions using the official Supabase client defaults/configuration.
- Refreshes sessions automatically.
- Detects Auth callback URLs.
- Throws a clear configuration error when required environment values are missing.

## Future Service Boundaries

Later stages may add focused modules such as:

- `authService.ts`
- `portfolioService.ts`
- `artifactService.ts`
- `authorizationService.ts`

Those modules must rely on RLS and Storage policies rather than treating frontend checks as authorization.

## Type Generation

Generated database types are intentionally not added in this stage because no live schema has been created or approved for execution. They should be introduced only after the Phase 4 schema implementation stage is authorized.
