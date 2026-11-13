# Final Table and Column Dictionary

All application identifiers use UUID unless noted. Timestamps use `timestamptz`.

| Group | Tables and principal columns |
|---|---|
| Identity | `roles(code, description)`; `user_profiles(id, auth_user_id, account_status, created_at, updated_at)`; `student_profiles(user_profile_id, student_identifier, display_name)`; `faculty_profiles(user_profile_id, faculty_identifier, display_name)`; `user_roles(user_profile_id, role_code, created_at)` |
| Ownership | `portfolios(id, student_profile_id, status, created_at, updated_at)`; `faculty_portfolio_assignments(id, faculty_profile_id, portfolio_id, status, assigned_at, revoked_at)`; `faculty_access_history(id, assignment_id, event_type, actor_user_id, occurred_at)` |
| Academic | `academic_levels(id, stable_code, display_name, display_order, active)`; `subjects(id, academic_level_id, stable_code, official_name, display_name, display_order)`; `main_folders(id, subject_id, stable_code, official_name, display_name, display_order)`; `academic_periods(id, folder_id, official_title, description, sequence)`; `learning_domains(id, subject_id, parent_folder_id, stable_code, official_title)` |
| Configuration | `global_sections(id, academic_level_id, section_type, display_name)`; `content_prompts(id, subject_id, folder_id, domain_id, global_section_id, prompt_type, official_text, source_reference, display_order)`; `program_learning_outcomes(id, stable_code, official_text, active)` |
| Content | `reflections(id, portfolio_id, subject_id, folder_id, domain_id, status, timestamps)`; `reflection_answers(id, reflection_id, prompt_id, response, status, timestamps)`; `artifacts(id, portfolio_id, title, description, status, timestamps)`; `reflection_artifacts(reflection_id, artifact_id)`; `artifact_domains(artifact_id, domain_id, relevance)`; `artifact_plos(artifact_id, plo_id, relevance)`; `plo_evidence(id, portfolio_id, plo_id, artifact_id, reflection, status)` |
| Global content | `home_page_content(portfolio_id, introduction, learning_philosophy, my_why, the_good_doctor, portrait_artifact_id, updated_at)`; `final_musings_responses(id, portfolio_id, global_section_id, prompt_id, response, status)` |
| Storage | `artifact_storage_metadata(artifact_id, owner_portfolio_id, bucket_name, object_path, original_filename, media_type, file_size_bytes, uploaded_at, storage_status)` |
| Monitoring | `completion_requirements(id, academic_level_id, global_section_id, requirement_code, description, required, active)`; `section_completions(portfolio_id, requirement_id, status, completed_at)`; `portfolio_progress(portfolio_id, academic_level_id, calculated_status, completion_percent, calculation_version, calculated_at)`; `audit_logs(id, actor_user_id, portfolio_id, event_type, target_type, target_id, safe_metadata, occurred_at)` |

Auth credentials are never duplicated. Artifact binaries are never stored in PostgreSQL.
