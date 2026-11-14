# Academic Hierarchy Architecture

## Phase 3 - Stage 2

## 1. Academic hierarchy

Portfolio
- Home Page
- Level 1
  - MED 101
    - 1st Bimonthly
    - 2nd Bimonthly
    - 3rd Bimonthly
    - 4th Bimonthly
  - MED 102
    - Patient-centered care
    - Family-focused care
    - Social determinants of health
    - Global and national health frameworks
    - Primary health care and UHC
    - Systems thinking
    - Community engagement and social accountability
    - Professional identity formation
  - MED 103
    - 1st Bimonthly
    - 2nd Bimonthly
    - 3rd Bimonthly
    - 4th Bimonthly
  - PLO Attainment
  - Final Musings

The eight MED 102 domains are separate, directly accessible academic sections. MED 102 has no four-parent-folder requirement. The official MED 102 wording, source numbering, evidence, competencies, recurring reflection questions, and artifact requirement are recorded in docs/phase-2-academic-content/03_MED102_STRUCTURE_FINALIZATION.md.

## 2. Academic content relationships

- Each MED 102 domain is independently addressable and linked to MED 102.
- Each domain retains its own official evidence and competency description.
- The same four official reflection questions apply to every MED 102 domain.
- Students provide pertinent artifacts as evidence of achievement.
- Artifacts may be associated with multiple domains without merging domain identity.
- Home Page, PLO Attainment, and Final Musings are portfolio-level sections, not MED 102 parent folders.

## 3. Database representation

The reviewed data model supports separate learning_domains records linked to the MED 102 subject. Its nullable parent_folder_id allows these records to remain ungrouped. This supports the confirmed hierarchy without a schema change.

This document records architecture requirements only. It does not authorize schema or application changes.
