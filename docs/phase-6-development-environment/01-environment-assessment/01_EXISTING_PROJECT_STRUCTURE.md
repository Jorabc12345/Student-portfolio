# Existing Project Structure

## Root

```text
BukSU-COM Portfolio/
├── docs/
├── dist/
├── node_modules/
├── src/
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## Source Files

### `src/App.tsx`

The current application shell and prototype page routing. It contains mock student content and role-oriented screens represented as local page state.

### `src/main.tsx`

React entry point using `createRoot` and `StrictMode`.

### `src/styles.css`

The current visual prototype stylesheet. It includes the approved white/pink/butter-yellow direction and responsive breakpoints.

## Configuration

- `vite.config.ts` configures the React Vite plugin.
- `tsconfig.json` references application and Node/Vite TypeScript configurations.
- `tsconfig.app.json` enables strict browser TypeScript and bundler module resolution.
- `tsconfig.node.json` configures Vite configuration type checking.
- `package.json` provides `dev`, `build`, and `preview` scripts.

## Generated or Installed Content

- `node_modules/` contains installed dependencies and must remain untracked in Git.
- `dist/` is generated production output and should normally be excluded from Git.
- `package-lock.json` records the installed dependency graph and should be preserved.

## Documentation

The `docs/` tree contains requirements, academic content, architecture, database, UI/UX, and Supabase reconciliation records. It is project evidence and must be preserved while implementation proceeds.

## Repository Condition

The project directory is not currently a Git repository. No existing branch, remote, commit history, or tracked-file state can be inspected.
