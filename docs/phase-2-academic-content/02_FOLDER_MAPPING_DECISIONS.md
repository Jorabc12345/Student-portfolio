# Academic Structure Decisions

## Confirmed academic structure

Source: official BukSU-COM Portfolio Instructions.pdf, inspected directly. Exact MED 102 source wording and hierarchy are in 03_MED102_STRUCTURE_FINALIZATION.md.

| Subject | Required sections | Authority |
|---|---|---|
| MED 101 ? Integrated Basic Sciences | 1st Bimonthly; 2nd Bimonthly; 3rd Bimonthly; 4th Bimonthly | Official instructions, p. 4 |
| MED 102 - Family, Community, & Preventive Medicine I | Eight independent domains in official order | Official instructions, section 2.2, pp. 5-6 |
| MED 103 ? Medical Humanities I | 1st Bimonthly; 2nd Bimonthly; 3rd Bimonthly; 4th Bimonthly | Owner-confirmed bare section labels; source themes retained separately |

?   ?   ??? Eight independent MED 102 domains

## MED 102 domains

1. Patient-centered care
2. Family-focused care
3. Social determinants of health
4. Global and national health frameworks
5. Primary health care and UHC
6. Systems thinking
7. Community engagement and social accountability
8. Professional identity formation

Each has independent evidence and competency wording and shares four reflection questions; consult the finalization record for exact text.

## Database-design consequence

The reviewed Phase 4 design supports eight independent subject-linked domain rows with nullable parent_folder_id. No schema change is needed. Future UI requirements expose eight directly accessible domains and omit the proposed four-parent cards.

## Decision status

Current structure: MED 101 and MED 103 each have four Bimonthly sections; MED 102 has eight independent domains and no parent-folder layer.
