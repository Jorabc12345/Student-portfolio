-- Shared public portfolio content and owner-managed public images.
-- Do not upload patient-identifying information or confidential records.
-- Keep the policy email aligned with VITE_PORTFOLIO_OWNER_EMAIL.

create table if not exists public.portfolio_items (
  key text primary key check (key like 'buksu-%'),
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_items enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.portfolio_items to anon, authenticated;
grant insert, update, delete on public.portfolio_items to authenticated;

drop policy if exists "portfolio_items_public_read" on public.portfolio_items;
create policy "portfolio_items_public_read"
on public.portfolio_items
for select
to anon, authenticated
using (true);

drop policy if exists "portfolio_items_owner_insert" on public.portfolio_items;
create policy "portfolio_items_owner_insert"
on public.portfolio_items
for insert
to authenticated
with check (
  (select auth.jwt() ->> 'email') = '2601109078@student.buksu.edu.ph'
);

drop policy if exists "portfolio_items_owner_update" on public.portfolio_items;
create policy "portfolio_items_owner_update"
on public.portfolio_items
for update
to authenticated
using (
  (select auth.jwt() ->> 'email') = '2601109078@student.buksu.edu.ph'
)
with check (
  (select auth.jwt() ->> 'email') = '2601109078@student.buksu.edu.ph'
);

drop policy if exists "portfolio_items_owner_delete" on public.portfolio_items;
create policy "portfolio_items_owner_delete"
on public.portfolio_items
for delete
to authenticated
using (
  (select auth.jwt() ->> 'email') = '2601109078@student.buksu.edu.ph'
);

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'portfolio-portraits',
  'portfolio-portraits',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
),
(
  'portfolio-artifacts',
  'portfolio-artifacts',
  true,
  10485760,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
)
on conflict (id) do update
set
  name = excluded.name,
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "portfolio_portraits_owner_select" on storage.objects;
create policy "portfolio_portraits_owner_select"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'portfolio-portraits'
  and name = 'owner/portrait'
  and (select auth.jwt() ->> 'email') = '2601109078@student.buksu.edu.ph'
);

drop policy if exists "portfolio_portraits_owner_insert" on storage.objects;
create policy "portfolio_portraits_owner_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'portfolio-portraits'
  and name = 'owner/portrait'
  and (select auth.jwt() ->> 'email') = '2601109078@student.buksu.edu.ph'
);

drop policy if exists "portfolio_portraits_owner_update" on storage.objects;
create policy "portfolio_portraits_owner_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'portfolio-portraits'
  and name = 'owner/portrait'
  and (select auth.jwt() ->> 'email') = '2601109078@student.buksu.edu.ph'
)
with check (
  bucket_id = 'portfolio-portraits'
  and name = 'owner/portrait'
  and (select auth.jwt() ->> 'email') = '2601109078@student.buksu.edu.ph'
);

drop policy if exists "portfolio_portraits_owner_delete" on storage.objects;
create policy "portfolio_portraits_owner_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'portfolio-portraits'
  and name = 'owner/portrait'
  and (select auth.jwt() ->> 'email') = '2601109078@student.buksu.edu.ph'
);

drop policy if exists "portfolio_artifacts_owner_insert" on storage.objects;
create policy "portfolio_artifacts_owner_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'portfolio-artifacts'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
  and (select auth.jwt() ->> 'email') = '2601109078@student.buksu.edu.ph'
);

drop policy if exists "portfolio_artifacts_owner_delete" on storage.objects;
create policy "portfolio_artifacts_owner_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'portfolio-artifacts'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
  and (select auth.jwt() ->> 'email') = '2601109078@student.buksu.edu.ph'
);

do $$
begin
  if exists (
    select 1
    from pg_publication
    where pubname = 'supabase_realtime'
  ) and not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'portfolio_items'
  ) then
    execute 'alter publication supabase_realtime add table public.portfolio_items';
  end if;
end;
$$;
