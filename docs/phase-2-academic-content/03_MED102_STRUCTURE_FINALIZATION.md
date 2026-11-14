# MED 102 Academic Structure Finalization

**Status:** Confirmed against the official BukSU-COM Portfolio Instructions PDF.  
**Source inspected:** BukSU-COM Portfolio Instructions.pdf, section 2.2, pages 5-6.  
**Scope:** Documentation only; no application or database changes.

## Confirmed structure

**MED 102 - Family, Community, & Preventive Medicine I** is section 2.2. The official PDF presents eight independent domains in this order. Its printed subsection identifiers are preserved below; no additional parent-folder level is introduced.

| Source numbering | Official domain | Required evidence | Competency demonstrated |
|---|---|---|---|
| 2.2.1 (evidence 2.2.1.1) | Patient-centered care | Patient case analysis identifying biological, psychological, and social factors | Holistic understanding of illness |
| 2.2.1.2 (evidence 2.2.1.2.1) | Family-focused care | Genogram or family assessment with reflection | Recognition of family influences on health |
| 2.2.1.3 (evidence 2.2.1.3.1) | Social determinants of health | Social determinants analysis of a patient or community case | Understanding of health inequities |
| 2.2.1.4 (evidence 2.2.1.4.1) | Global and national health frameworks | SDG mapping worksheet linking health priorities with Philippine health programs | Application of health frameworks |
| 2.2.1.5 (evidence 2.2.1.5.1) | Primary health care and UHC | Reflection and output from the mock Rural Health Unit activity | Understanding of primary care delivery, referral, and UHC |
| 2.2.1.6 (evidence 2.2.1.6.1) | Systems thinking | Map or causal loop diagram with written analysis | Recognition of interrelationships and unintended consequences |
| 2.2.1.7 (evidence 2.2.1.7.1) | Community engagement and social accountability | Community health needs analysis or community-oriented intervention proposal | Responsiveness to community health needs |
| 2.2.1.8 (evidence 2.2.1.8.1) | Professional identity formation | Integrative reflection on learning and growth throughout MED 102 | Self-awareness, professional values, commitment to service |

Each row is an independent academic section. Preserve the evidence and competency wording exactly.

## Recurring reflection guide and artifacts

The PDF states these questions recur for every Domain learned and requires pertinent artifacts as evidence of achievement:

- **a. What did I learn?** Identify the most important insight from the activity.
- **b. What changed in my understanding?** Explain how the experience challenged or strengthened your previous beliefs about health, illness, or healthcare delivery.
- **c. Why does this matter to the people and communities we serve?** Relate your learning to patient, family, or community needs, preferably in the context of Bukidnon.
- **d. How will I apply this as a future physician?** Identify a specific action or change in your future approach.

Do not infer file formats, size limits, or additional evidence requirements.

## Navigation requirement

Present all eight domains as separate, individually accessible sections under MED 102. The source does not define four MED 102 parent folders. Do not include four proposed parent cards, invent parent titles, map domains to parents, or make a parent-folder step necessary to reach a domain. Cross-domain artifact reuse may be supported without merging domain identity.

Current structure: MED 101 and MED 103 each have four Bimonthly sections; MED 102 has eight independent domains and no parent-folder layer.

## Database-design review

The reviewed Phase 4 model represents each domain as a separate learning_domains row linked to its subject, with nullable parent_folder_id. Eight MED 102 rows with no parent assignment remain individually addressable. The model therefore supports the confirmed structure without losing domains and needs no schema change for it. UI/navigation documentation must expose the domains directly.

No schema, seed data, SQL, migration, application code, or Supabase object was changed. Supabase PostgreSQL remains the approved architecture.

**Source:** BukSU-COM Portfolio Instructions.pdf, section 2.2, pp. 5-6. It confirms the heading, domain names/order, evidence, competencies, four shared questions, and artifact requirement; it specifies no parent folders or grouping.
