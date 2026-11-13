-- REVIEW-ONLY DRAFT. Do not execute or apply as a migration.
-- Supabase PostgreSQL logical schema for the revised student-authorized instructor model.

create table public.roles (
    code text primary key,
    description text not null
);

create table public.user_profiles (
    id uuid primary key default gen_random_uuid(),
    auth_user_id uuid not null unique references auth.users(id),
    account_status text not null default 'active',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    check (account_status in ('invited', 'active', 'suspended', 'disabled'))
);

create table public.student_profiles (
    user_profile_id uuid primary key references public.user_profiles(id),
    student_identifier text unique,
    display_name text not null
);

create table public.instructor_invitation_codes (
    id uuid primary key default gen_random_uuid(),
    code_digest text not null unique,
    created_by_user_id uuid not null references public.user_profiles(id),
    status text not null default 'active',
    expires_at timestamptz,
    disabled_at timestamptz,
    replaced_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    check (status in ('active', 'disabled', 'replaced')),
    check ((status = 'active' and disabled_at is null and replaced_at is null) or
           (status = 'disabled' and disabled_at is not null) or
           (status = 'replaced' and replaced_at is not null))
);

create table public.instructor_profiles (
    user_profile_id uuid primary key references public.user_profiles(id),
    invitation_code_id uuid not null references public.instructor_invitation_codes(id),
    institutional_email text not null unique,
    verification_status text not null default 'verified',
    verified_at timestamptz,
    verified_by_user_id uuid references public.user_profiles(id),
    check (verification_status in ('verified', 'suspended')),
    check (verification_status = 'suspended' or (verified_at is not null and verified_by_user_id is not null))
);

create table public.user_roles (
    user_profile_id uuid not null references public.user_profiles(id),
    role_code text not null references public.roles(code),
    created_at timestamptz not null default now(),
    primary key (user_profile_id, role_code)
);

create table public.portfolios (
    id uuid primary key default gen_random_uuid(),
    student_profile_id uuid not null unique references public.student_profiles(user_profile_id),
    visibility text not null default 'private',
    status text not null default 'active',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    check (visibility = 'private'),
    check (status in ('active', 'archived', 'deleted'))
);

create table public.portfolio_access_grants (
    id uuid primary key default gen_random_uuid(),
    portfolio_id uuid not null references public.portfolios(id),
    instructor_profile_id uuid not null references public.instructor_profiles(user_profile_id),
    status text not null default 'active',
    granted_at timestamptz not null default now(),
    revoked_at timestamptz,
    granted_by_user_id uuid not null references public.user_profiles(id),
    revoked_by_user_id uuid references public.user_profiles(id),
    unique (portfolio_id, instructor_profile_id),
    check (status in ('active', 'revoked')),
    check ((status = 'active' and revoked_at is null) or (status = 'revoked' and revoked_at is not null))
);

create table public.portfolio_access_events (
    id uuid primary key default gen_random_uuid(),
    grant_id uuid not null references public.portfolio_access_grants(id),
    event_type text not null,
    actor_user_id uuid references public.user_profiles(id),
    occurred_at timestamptz not null default now()
);

create table public.academic_levels (
    id uuid primary key default gen_random_uuid(),
    stable_code text not null unique,
    display_name text not null,
    display_order integer not null default 0,
    active boolean not null default true
);

create table public.subjects (
    id uuid primary key default gen_random_uuid(),
    academic_level_id uuid not null references public.academic_levels(id),
    stable_code text not null unique,
    official_name text not null,
    display_name text not null,
    display_order integer not null default 0
);

create table public.main_folders (
    id uuid primary key default gen_random_uuid(),
    subject_id uuid not null references public.subjects(id),
    stable_code text not null unique,
    official_name text,
    display_name text not null,
    display_order integer not null default 0
);

create table public.academic_periods (
    id uuid primary key default gen_random_uuid(),
    folder_id uuid not null references public.main_folders(id),
    official_title text not null,
    description text,
    sequence integer not null,
    unique (folder_id, sequence)
);

create table public.learning_domains (
    id uuid primary key default gen_random_uuid(),
    subject_id uuid not null references public.subjects(id),
    parent_folder_id uuid references public.main_folders(id),
    stable_code text not null unique,
    official_title text not null,
    display_order integer not null default 0
);

create table public.global_sections (
    id uuid primary key default gen_random_uuid(),
    academic_level_id uuid not null references public.academic_levels(id),
    section_type text not null,
    display_name text not null,
    unique (academic_level_id, section_type)
);

create table public.program_learning_outcomes (
    id uuid primary key default gen_random_uuid(),
    stable_code text not null unique,
    official_text text not null,
    active boolean not null default true
);

create table public.content_prompts (
    id uuid primary key default gen_random_uuid(),
    subject_id uuid references public.subjects(id),
    folder_id uuid references public.main_folders(id),
    domain_id uuid references public.learning_domains(id),
    global_section_id uuid references public.global_sections(id),
    prompt_type text not null,
    official_text text not null,
    source_reference text,
    display_order integer not null default 0,
    check (num_nonnulls(subject_id, folder_id, domain_id, global_section_id) > 0)
);

create table public.reflections (
    id uuid primary key default gen_random_uuid(),
    portfolio_id uuid not null references public.portfolios(id),
    subject_id uuid references public.subjects(id),
    folder_id uuid references public.main_folders(id),
    domain_id uuid references public.learning_domains(id),
    status text not null default 'draft',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    check (status in ('draft', 'published', 'archived', 'deleted'))
);

create table public.reflection_answers (
    id uuid primary key default gen_random_uuid(),
    reflection_id uuid not null references public.reflections(id),
    prompt_id uuid not null references public.content_prompts(id),
    response text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (reflection_id, prompt_id)
);

create table public.artifact_policy_settings (
    id uuid primary key default gen_random_uuid(),
    academic_level_id uuid references public.academic_levels(id),
    policy_code text not null unique,
    allowed_media_types text[] not null,
    max_file_size_bytes bigint not null check (max_file_size_bytes > 0),
    retention_days integer check (retention_days is null or retention_days > 0),
    permanent_deletion_enabled boolean not null default false,
    version integer not null default 1 check (version > 0),
    active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table public.artifacts (
    id uuid primary key default gen_random_uuid(),
    portfolio_id uuid not null references public.portfolios(id),
    policy_id uuid references public.artifact_policy_settings(id),
    title text not null,
    description text,
    status text not null default 'active',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    check (status in ('active', 'replaced', 'deleted', 'quarantined'))
);

create table public.artifact_storage_metadata (
    artifact_id uuid primary key references public.artifacts(id),
    owner_portfolio_id uuid not null references public.portfolios(id),
    bucket_name text not null,
    object_path text not null unique,
    original_filename text not null,
    media_type text not null,
    file_size_bytes bigint not null check (file_size_bytes >= 0),
    uploaded_at timestamptz not null default now(),
    storage_status text not null default 'active',
    check (storage_status in ('active', 'replaced', 'deleted', 'quarantined'))
);

create table public.reflection_artifacts (
    reflection_id uuid not null references public.reflections(id),
    artifact_id uuid not null references public.artifacts(id),
    primary key (reflection_id, artifact_id)
);

create table public.artifact_domains (
    artifact_id uuid not null references public.artifacts(id),
    domain_id uuid not null references public.learning_domains(id),
    relevance text,
    primary key (artifact_id, domain_id)
);

create table public.artifact_plos (
    artifact_id uuid not null references public.artifacts(id),
    plo_id uuid not null references public.program_learning_outcomes(id),
    relevance text,
    primary key (artifact_id, plo_id)
);

create table public.plo_evidence (
    id uuid primary key default gen_random_uuid(),
    portfolio_id uuid not null references public.portfolios(id),
    plo_id uuid not null references public.program_learning_outcomes(id),
    artifact_id uuid references public.artifacts(id),
    student_explanation text,
    status text not null default 'draft',
    check (status in ('draft', 'published', 'archived'))
);

create table public.home_page_content (
    portfolio_id uuid primary key references public.portfolios(id),
    introduction text,
    learning_philosophy text,
    my_why text,
    the_good_doctor text,
    portrait_artifact_id uuid references public.artifacts(id),
    updated_at timestamptz not null default now()
);

create table public.final_musings_responses (
    id uuid primary key default gen_random_uuid(),
    portfolio_id uuid not null references public.portfolios(id),
    global_section_id uuid not null references public.global_sections(id),
    prompt_id uuid not null references public.content_prompts(id),
    response text not null,
    status text not null default 'draft',
    unique (portfolio_id, prompt_id),
    check (status in ('draft', 'published', 'archived'))
);

create table public.portfolio_reviews (
    id uuid primary key default gen_random_uuid(),
    portfolio_id uuid not null references public.portfolios(id),
    instructor_profile_id uuid not null references public.instructor_profiles(user_profile_id),
    access_grant_id uuid not null references public.portfolio_access_grants(id),
    review_date date not null default current_date,
    summary text,
    status text not null default 'published',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    check (status in ('draft', 'published', 'archived'))
);

create table public.portfolio_feedback (
    id uuid primary key default gen_random_uuid(),
    portfolio_id uuid not null references public.portfolios(id),
    instructor_profile_id uuid not null references public.instructor_profiles(user_profile_id),
    review_id uuid references public.portfolio_reviews(id),
    reflection_id uuid references public.reflections(id),
    artifact_id uuid references public.artifacts(id),
    body text not null,
    status text not null default 'published',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    published_at timestamptz,
    check (status in ('draft', 'published', 'archived')),
    check (num_nonnulls(reflection_id, artifact_id) <= 1)
);

create table public.feedback_revisions (
    id uuid primary key default gen_random_uuid(),
    feedback_id uuid not null references public.portfolio_feedback(id),
    editor_user_id uuid not null references public.user_profiles(id),
    previous_body text not null,
    revised_at timestamptz not null default now()
);

create table public.completion_requirements (
    id uuid primary key default gen_random_uuid(),
    academic_level_id uuid references public.academic_levels(id),
    global_section_id uuid references public.global_sections(id),
    requirement_code text not null unique,
    description text not null,
    required boolean not null default true,
    active boolean not null default true
);

create table public.section_completions (
    portfolio_id uuid not null references public.portfolios(id),
    requirement_id uuid not null references public.completion_requirements(id),
    status text not null default 'not_started',
    completed_at timestamptz,
    primary key (portfolio_id, requirement_id),
    check (status in ('not_started', 'in_progress', 'completed'))
);

create table public.portfolio_progress (
    portfolio_id uuid not null references public.portfolios(id),
    academic_level_id uuid not null references public.academic_levels(id),
    calculated_status text not null,
    completion_percent numeric(5,2) not null default 0 check (completion_percent between 0 and 100),
    calculation_version text not null,
    calculated_at timestamptz not null default now(),
    primary key (portfolio_id, academic_level_id)
);

create table public.audit_logs (
    id uuid primary key default gen_random_uuid(),
    actor_user_id uuid references auth.users(id),
    portfolio_id uuid references public.portfolios(id),
    event_type text not null,
    target_type text,
    target_id uuid,
    safe_metadata jsonb not null default '{}'::jsonb,
    occurred_at timestamptz not null default now()
);

create index idx_grants_instructor_status on public.portfolio_access_grants (instructor_profile_id, status);
create index idx_grants_portfolio_status on public.portfolio_access_grants (portfolio_id, status);
create unique index idx_one_active_instructor_invitation_code
    on public.instructor_invitation_codes (status)
    where status = 'active';
create index idx_reflections_portfolio_status on public.reflections (portfolio_id, status, updated_at);
create index idx_artifacts_portfolio_status on public.artifacts (portfolio_id, status, updated_at);
create index idx_reviews_portfolio_date on public.portfolio_reviews (portfolio_id, review_date);
create index idx_feedback_portfolio_date on public.portfolio_feedback (portfolio_id, created_at);
create index idx_audit_portfolio_time on public.audit_logs (portfolio_id, occurred_at);

-- RLS, Storage policies, helper functions, seed data, and triggers are intentionally deferred.
