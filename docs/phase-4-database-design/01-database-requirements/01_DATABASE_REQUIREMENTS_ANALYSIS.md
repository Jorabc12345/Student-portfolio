# Database Requirements Analysis

## Status and Scope

This revised Phase 4 Stage 1 analysis reflects the updated student-authorized instructor access model. It identifies requirements only. It does not create tables, migrations, SQL, RLS policies, or live Supabase resources.

## Source Reconciliation

The current prompt changes the earlier Phase 1 and Phase 3 baseline in two material ways:

1. Earlier documents defined faculty as read-only viewers with no comments or feedback. The revised model permits authorized instructors to create reviews and constructive feedback, while prohibiting changes to original student content.
2. Earlier documents described trusted faculty-to-student assignment. The revised model requires individual authorization by the student, with no automatic assignment system or general instructor directory.

The revised prompt is recorded here as the current proposed access model. The older documents must be formally updated and approved before implementation.

## Approved Platform

Use Supabase PostgreSQL, Supabase Auth, private Supabase Storage, and PostgreSQL RLS. Authentication credentials remain in Supabase Auth. Artifact binaries remain in private Storage; PostgreSQL stores metadata and associations. Firebase, MySQL, Laravel, and paid backend services are excluded.

## Core Requirements

- One student owns one private portfolio.
- Students create accounts, authenticate, and manage their own portfolio content.
- Students can create, view, edit, and delete their own reflections, artifacts, responses, and portfolio sections, subject to approved retention rules.
- Students individually authorize named instructor accounts and can revoke authorization.
- Instructors may register accounts, but an instructor role must be verified by a trusted process. Registration input cannot grant that role.
- Instructors have no access by default and cannot discover private portfolios through a directory.
- An authorized instructor may view portfolio content and private files, conduct periodic reviews, and create general or item-linked feedback.
- Instructor reviews and feedback are separate records and cannot modify, replace, delete, or become the student's original content.
- Revocation must remove future database and Storage access, including access through direct requests.

## Academic Scope

Level 1 contains exactly MED 101, MED 102, and MED 103, with four Bimonthly sections each for MED 101 and MED 103. MED 102 has eight separate, directly accessible domains and no parent folders. MED 101 and MED 103 source reflection requirements remain preserved. Home Page, PLO Attainment, and Final Musings remain separate global sections. Future levels are represented as configurable data.

## Required Data Categories

Identity and verification, student portfolios, instructor authorization grants, academic configuration, reflections and answers, artifacts and private Storage metadata, PLO evidence, global sections, reviews, feedback, audit events, and optional progress/completion records.

## Deferred Decisions

The design must not assume whether instructor registration is open, whether a review is visible immediately, feedback editing/deletion rules, notification behavior, authorization expiry, audit retention, artifact retention, or completion calculations.
