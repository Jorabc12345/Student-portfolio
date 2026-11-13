# Table and Column Dictionary

## Phase 4 – Stage 3

Proposed columns only; no tables are implemented.

| Table | Core columns |
|---|---|
| `roles` | `code` text PK, `description` text |
| `user_profiles` | `id` uuid PK, `auth_user_id` uuid UNIQUE NOT NULL, `account_status`, timestamps |
| `student_profiles` | `user_profile_id` uuid PK/FK, identifier, display name |
| `faculty_profiles` | `user_profile_id` uuid PK/FK, identifier, display name |
| `user_roles` | profile FK, role code FK, composite PK |
| `portfolios` | `id`, student profile FK UNIQUE, status, timestamps |
| `faculty_portfolio_assignments` | id, faculty FK, portfolio FK, status, assigned/revoked timestamps |
| `faculty_access_history` | id, assignment FK, event, actor, timestamp |
| `academic_levels` | id, stable code UNIQUE, display name, active, sort order |
| `subjects` | id, level FK, stable code, official/display names, sort order |
| `main_folders` | id, subject FK, stable code, official/display names, sort order |
| `academic_periods` | id, folder FK, official title, description, sequence |
| `learning_domains` | id, subject FK, optional parent folder FK, stable code, title |
| `content_prompts` | id, academic context FKs, prompt type, official text, source reference |
| `global_sections` | id, level FK, section type, display name, sort order |
| `program_learning_outcomes` | id, stable code, official text, active |
| `home_page_content` | portfolio FK UNIQUE, introduction, philosophy, why, good doctor, portrait FK |
| `reflections` | portfolio/subject/folder/domain FKs, status, timestamps |
| `reflection_answers` | reflection FK, prompt FK, response, status, timestamps |
| `artifacts` | portfolio FK, title, description, status, timestamps |
| `artifact_storage_metadata` | artifact FK PK, owner portfolio FK, bucket, path, filename, MIME, size, timestamps |
| `reflection_artifacts` | reflection FK, artifact FK, composite PK |
| `artifact_domains` | artifact FK, domain FK, relevance, composite PK |
| `artifact_plos` | artifact FK, PLO FK, relevance, composite PK |
| `plo_evidence` | portfolio/PLO/artifact FKs, reflection, status |
| `final_musings_responses` | portfolio/section/prompt FKs, response, status |
| `completion_requirements` | academic context, code, description, required/order, active |
| `section_completions` | portfolio/requirement FKs, status, completed timestamp |
| `portfolio_progress` | portfolio/level FKs, status, percent, version, calculated timestamp |
| `audit_logs` | actor, portfolio, event, target, safe JSONB metadata, timestamp |

Use `uuid`, `timestamptz`, `text`, `boolean`, `integer`, `bigint`, `numeric`, and constrained `jsonb` only where appropriate.
