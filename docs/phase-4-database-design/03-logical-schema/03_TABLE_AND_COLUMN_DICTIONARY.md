# Table and Column Dictionary

All application identifiers are UUID unless stated otherwise. Timestamps use `timestamptz`.

| Table | Principal columns and purpose |
|---|---|
| `roles` | `code` PK, `description`; controlled role definitions |
| `user_profiles` | `id` PK, `auth_user_id` UNIQUE FK, `account_status`, timestamps; Auth-linked profile |
| `student_profiles` | `user_profile_id` PK/FK, `student_identifier`, `display_name` |
| `instructor_invitation_codes` | code digest, creator, active/disabled/replaced status, expiry, and lifecycle timestamps; one current shared registration credential |
| `instructor_profiles` | `user_profile_id` PK/FK, invitation-code FK, institutional email UNIQUE, verification status |
| `user_roles` | `user_profile_id`, `role_code`, timestamps; trusted role assignment |
| `portfolios` | `id` PK, `student_profile_id` UNIQUE FK, `visibility`, `status`, timestamps |
| `portfolio_access_grants` | `id`, `portfolio_id`, `instructor_profile_id`, `status`, grant/revoke timestamps, grantor |
| `portfolio_access_events` | grant FK, event type, actor, timestamp; authorization history |
| `academic_levels` | stable code, display name, order, active |
| `subjects` | level FK, stable code, official/display names, order |
| `main_folders` | subject FK, stable code, official/display names, order |
| `academic_periods` | folder FK, official title, description, sequence |
| `learning_domains` | subject FK, optional parent folder FK, stable code, official title |
| `content_prompts` | academic context FKs, prompt type, official text, source reference |
| `global_sections` | level FK, section type, display name |
| `program_learning_outcomes` | stable code, official text, active |
| `home_page_content` | portfolio PK/FK, introduction, learning philosophy, My Why, The Good Doctor |
| `reflections` | portfolio and academic context FKs, status, timestamps |
| `reflection_answers` | reflection FK, prompt FK, response, status, timestamps |
| `artifact_policy_settings` | academic level FK, policy code, allowed media types, maximum size, retention days, permanent-deletion flag, version, active status |
| `artifacts` | portfolio/policy FKs, title, description, lifecycle status, timestamps |
| `artifact_storage_metadata` | artifact PK/FK, portfolio FK, bucket, object path, filename, media type, size |
| `reflection_artifacts` | reflection/artifact composite PK |
| `artifact_domains` | artifact/domain composite PK, relevance |
| `artifact_plos` | artifact/PLO composite PK, relevance |
| `plo_evidence` | portfolio/PLO/artifact FKs, student explanation, status |
| `final_musings_responses` | portfolio/section/prompt FKs, response, status |
| `portfolio_reviews` | portfolio FK, instructor FK, active grant FK, review date, summary, status |
| `portfolio_feedback` | portfolio FK, instructor FK, optional review/reflection/artifact target, body, timestamps |
| `feedback_revisions` | feedback FK, editor, prior body, revision timestamp; optional history |
| `completion_requirements` | academic context, requirement code, description, required/active |
| `section_completions` | portfolio/requirement composite PK, status, completed timestamp |
| `portfolio_progress` | portfolio/level composite PK, calculated status, percentage, version, timestamp |
| `audit_logs` | actor, portfolio, event, target, safe metadata, timestamp |

No table stores passwords, refresh tokens, signed URLs, or artifact binaries.
