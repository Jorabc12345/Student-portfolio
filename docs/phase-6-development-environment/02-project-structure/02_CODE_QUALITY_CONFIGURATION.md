# Code Quality Configuration

## ESLint

`eslint.config.js` uses the flat ESLint configuration with:

- JavaScript recommended rules.
- TypeScript ESLint recommended rules.
- React Hooks rules.
- React Refresh component-export guidance.
- Browser globals for application source.
- Node globals for the CommonJS PostCSS configuration.
- Ignores for `dist/` and `node_modules/`.

Run:

```powershell
npm run lint
```

## Prettier

`.prettierrc.json` defines:

- Semicolons.
- Double quotes.
- Trailing commas.
- 100-character print width.

`.prettierignore` excludes generated dependencies, build output, documentation, and the lockfile.

Run:

```powershell
npm run format
npm run format:check
```

## Development Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | Run TypeScript project checks |
| `npm run lint` | Run ESLint |
| `npm run format` | Format configured source/configuration files |
| `npm run format:check` | Verify formatting without editing |

## Validation Results

- TypeScript: passed.
- ESLint: passed.
- Prettier check: passed.
- Vite production build: passed.
- Tailwind emitted a non-blocking warning because the preserved prototype currently contains no Tailwind utility classes.
