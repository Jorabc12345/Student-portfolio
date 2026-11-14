# Client Content Confirmation Checklist

This checklist records academic decisions that require explicit client approval before provisional content organization is treated as final. It does not propose new academic requirements.

## A. Confirmed and Not Requiring Re-approval

- [x] Individual student portfolio.
- [x] Initial coverage is Level 1.
- [x] MED 101 – Integrated Basic Sciences.
- [x] MED 102 – Family, Community, & Preventive Medicine I.
- [x] MED 103 – Medical Humanities I.
- Current structure: MED 101 and MED 103 each have four Bimonthly sections; MED 102 has eight independent domains and no parent-folder layer.
- [x] Twelve total main subject folders.
- [x] All four MED 101 periods are preserved.
- [x] All eight MED 102 domains are preserved.
- [x] All four MED 103 periods are preserved.
- [x] All eleven PLOs are preserved.
- [x] All five Final Musings questions are preserved.
- [x] Home Page, PLOs, and Final Musings are separate global sections.
- [x] Home Page is in main portfolio navigation.
- [x] MED 101, MED 102, and MED 103 are under Level 1.
- [x] Program Learning Outcomes and Final Musings are separate sections under Level 1.
- [x] Future-level placement remains configurable according to eventual academic requirements.
- [x] Patient-identifiable information is prohibited.

## B. Confirmed Section Names and Stable IDs

- [x] MED 101: MED101-F01 — 1st Bimonthly; MED101-F02 — 2nd Bimonthly; MED101-F03 — 3rd Bimonthly; MED101-F04 — 4th Bimonthly (official PDF p. 4).
- [x] MED 102: eight official domains are independent sections (official PDF pp. 5-6); no parent folders are specified or required.
- [x] MED 103: MED103-F01 — 1st Bimonthly; MED103-F02 — 2nd Bimonthly; MED103-F03 — 3rd Bimonthly; MED103-F04 — 4th Bimonthly. Retain source headings' CERAE and theme wording separately (PDF pp. 6-8).

## C. MED 102 Domain Structure

Current structure: MED 101 and MED 103 each have four Bimonthly sections; MED 102 has eight independent domains and no parent-folder layer.
## D. Confirmation Record

**Client/approver:** ____________________________________

**Date:** ______________________________________________

**Decision notes or required changes:**  
__________________________________________________________________

__________________________________________________________________

**Approval signature or recorded approval:**  
__________________________________________________________________

MED 101 bimonthly periods are confirmed as the four main folders. Each contains CERAE, Reflections, and Artifacts. The official PDF confirms eight independent MED 102 domains; no grouping is required.


## Official academic wording update (13 November 2026)

**Authority note:** The project owner supplied the exact academic wording below as transcribed from `BukSU-COM Portfolio Instructions(4).pdf` and confirmed it as official. The attached PDF was directly inspected. MED 101 and MED 102 wording appears on pp. 4-5; MED 103 headings appear on pp. 6-8. This owner-confirmed wording supersedes the earlier temporary-label statuses below; do not infer any additional wording or parent-folder names.

### Confirmed official section names

**MED 101 - Integrated Basic Sciences**

- 1st Bimonthly
- 2nd Bimonthly
- 3rd Bimonthly
- 4th Bimonthly

**MED 102 - Family, Community, & Preventive Medicine I**

These eight domains are separate, individually identifiable sections:

1. Patient-centered care
2. Family-focused care
3. Social determinants of health
4. Global and national health frameworks
5. Primary health care and UHC
6. Systems thinking
7. Community engagement and social accountability
8. Professional identity formation

**MED 103 - Medical Humanities I**

- 1st Bimonthly
- 2nd Bimonthly
- 3rd Bimonthly
- 4th Bimonthly

The official MED 102 structure is eight independent sections with no parent-folder layer.

### Representation in the reviewed database design

The review-only Phase 4 schema can represent the eight official sections without loss: `learning_domains` has its own primary key, stable code, `official_title`, `display_order`, and `subject_id`; `parent_folder_id` is nullable. Therefore, all eight MED 102 domains can be records under MED 102 with no invented parent-folder mapping. `main_folders` separately represents the four folder slots. The schema's data model needs no change solely to preserve the eight domains.

The eight MED 102 domains are the direct sections beneath the subject. No four-folder arrangement or clarification is required. The UI must expose the eight domains as distinct sections and must not hide them behind an unapproved grouping. Record a UI/navigation design review; no schema migration or application change is authorized here.

## Official terminology confirmation (13 November 2026)

The project owner supplied the exact official MED 101 and MED 103 period names and eight MED 102 domain names in the current project conversation. These names are confirmed and supersede the temporary-name status above. The attached `BukSU-COM Portfolio Instructions.pdf` has been checked directly on pages 4-8. No MED 102 parent folder names or domain assignments are confirmed.
## Direct source cross-check (13 November 2026)

MED 102 has eight independent domains; no four-folder count applies to this subject.
## PDF hierarchy verification

The attached source confirms MED 101 period labels (p. 4), the eight distinct MED 102 domains (pp. 5-6), and MED 103 Bimonthly headings (pp. 6-8). MED 103 headings include `(CERAE)` and themes; the user has confirmed the bare Bimonthly terms as the section/folder names. The source does not name or group four MED 102 parent folders. No four-folder-per-subject count applies to MED 102.

## Current MED 102 structure (13 November 2026)

The official instructions PDF, section 2.2 (pp. 5-6), defines eight independent MED 102 domains, with required evidence, competency descriptions, one shared four-question reflection guide, and pertinent artifacts. MED 102 has no four-parent-folder requirement. Earlier proposed-parent and unresolved-grouping text in this document is superseded. See docs/phase-2-academic-content/03_MED102_STRUCTURE_FINALIZATION.md for exact wording and the database representation review.
