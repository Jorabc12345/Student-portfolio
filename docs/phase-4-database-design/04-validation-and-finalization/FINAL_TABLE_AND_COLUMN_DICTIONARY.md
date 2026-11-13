# Final Table and Column Dictionary

The final reviewed schema contains 35 proposed tables, including a client-controlled shared instructor invitation-code record, configurable artifact policy settings, and the optional `feedback_revisions` table.

| Area | Tables |
|---|---|
| Identity | `roles`, `user_profiles`, `student_profiles`, `instructor_invitation_codes`, `instructor_profiles`, `user_roles` |
| Ownership/access | `portfolios`, `portfolio_access_grants`, `portfolio_access_events` |
| Academic | `academic_levels`, `subjects`, `main_folders`, `academic_periods`, `learning_domains`, `content_prompts`, `global_sections`, `program_learning_outcomes` |
| Student content | `home_page_content`, `reflections`, `reflection_answers`, `artifacts`, `artifact_policy_settings`, `artifact_storage_metadata`, `reflection_artifacts`, `artifact_domains`, `artifact_plos`, `plo_evidence`, `final_musings_responses` |
| Instructor collaboration | `portfolio_reviews`, `portfolio_feedback`, `feedback_revisions` |
| Monitoring | `completion_requirements`, `section_completions`, `portfolio_progress`, `audit_logs` |

UUIDs identify application records. Auth identity is referenced by UUID. Timestamps use `timestamptz`. Status, verification, and visibility fields use constrained values. No password, token, signed URL, or binary artifact content is stored in application tables.

`artifact_policy_settings` stores allowed MIME types, maximum size, retention days, permanent-deletion enablement, and active/version timestamps. Exact values remain pending institutional approval.
