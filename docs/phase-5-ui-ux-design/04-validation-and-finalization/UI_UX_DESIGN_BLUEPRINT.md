# UI/UX Design Blueprint

## Validation Status

Phase 5 is **conditionally complete for Phase 6 planning**. The design documentation is coherent and covers the approved Version 1 experience. Implementation should wait for the unresolved client and institutional decisions listed in this package.

## Product Experience

SLRP is a private academic reflection and evidence portfolio for BukSU-COM medical students. It emphasizes reflective writing, academic context, evidence, professional identity, and feedback—not task completion, ranking, or grading.

## Roles

- **Student:** owns and manages one portfolio, original content, artifacts, reflections, PLO evidence, Final Musings, and instructor authorizations.
- **Instructor:** registers with the current shared invitation code, views only student-authorized portfolios, and creates separate reviews/feedback without modifying originals.
- **Client administrator:** manages the shared invitation code only; code replacement/disablement affects future registrations, not existing accounts or portfolio grants.

## Academic UX

Level 1 contains MED 101, MED 102, and MED 103, with four folders per subject and twelve total. MED 102 exposes eight distinct domains even when organized under provisional folders. PLO Attainment and Final Musings remain separate global sections. Future levels are data-driven.

## Technology Alignment

The design is implementable with React + Vite, Tailwind CSS, Framer Motion, Lucide React, Supabase Auth, Supabase PostgreSQL/RLS, and private Supabase Storage. No UI assumption requires a new backend or paid service.
