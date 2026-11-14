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

Level 1 contains MED 101 and MED 103 with four Bimonthly sections each, and MED 102 with eight independent, directly accessible domains. PLO Attainment and Final Musings remain separate global sections. Future levels are data-driven.

## Technology Alignment

The design is implementable with React + Vite, Tailwind CSS, Framer Motion, Lucide React, Supabase Auth, Supabase PostgreSQL/RLS, and private Supabase Storage. No UI assumption requires a new backend or paid service.

## Current MED 102 structure (13 November 2026)

The official instructions PDF, section 2.2 (pp. 5-6), defines eight independent MED 102 domains, with required evidence, competency descriptions, one shared four-question reflection guide, and pertinent artifacts. MED 102 has no four-parent-folder requirement. Earlier proposed-parent and unresolved-grouping text in this document is superseded. See docs/phase-2-academic-content/03_MED102_STRUCTURE_FINALIZATION.md for exact wording and the database representation review.
