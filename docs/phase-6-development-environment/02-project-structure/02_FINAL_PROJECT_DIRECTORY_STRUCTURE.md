# Final Project Directory Structure

## Current Structure

```text
BukSU-COM Portfolio/
├── docs/
│   ├── phase-1-requirements/
│   ├── phase-2-academic-content/
│   ├── phase-3-system-architecture/
│   ├── phase-4-database-design/
│   ├── phase-5-ui-ux-design/
│   └── phase-6-development-environment/
├── src/
│   ├── app/
│   │   └── App.tsx
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── index.ts
│   ├── styles/
│   │   └── styles.css
│   ├── utils/
│   └── main.tsx
├── index.html
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.cjs
├── eslint.config.js
├── .prettierrc.json
├── .prettierignore
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.node.json
```

## Directory Responsibilities

- `app/`: application composition and top-level providers.
- `pages/`: route-level screens.
- `components/`: reusable presentation and interaction components.
- `layouts/`: role-aware shells and page layouts.
- `hooks/`: reusable React hooks.
- `context/`: shared React context providers and state boundaries.
- `services/`: Supabase and other external-service adapters.
- `utils/`: pure helpers and formatting/validation functions.
- `styles/`: global CSS and design-token layers.
- `assets/`: local images, icons, and static assets.

The existing prototype remains the application composition in `src/app/App.tsx`; feature extraction into pages/components should occur incrementally in later development stages.
