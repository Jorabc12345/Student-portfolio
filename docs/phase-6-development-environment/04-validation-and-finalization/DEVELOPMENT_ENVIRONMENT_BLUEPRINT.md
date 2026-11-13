# Development Environment Blueprint

## Validated Baseline

- Windows development environment.
- Node.js `v24.15.0`.
- npm `11.12.1`.
- Git executable `2.54.0.windows.1`.
- React `18.3.1`.
- Vite `6.4.6`.
- TypeScript `5.9.3`.
- Tailwind CSS `3.4.17`.
- Framer Motion `14.12.0`.
- Lucide React `1.72.0`.
- Supabase JavaScript client `2.119.0`.

## Application Structure

The existing prototype is preserved under `src/app/App.tsx`, with the entry point, styles, Supabase service boundary, configuration, and planned architectural directories in place.

## Validation Boundary

This stage validates the local development environment only. It does not validate live Supabase credentials, database schema, RLS policies, Storage policies, Auth flows, or production deployment.
