create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_method text not null check (contact_method in ('phone', 'email')),
  phone text,
  email text,
  source text not null default 'site_cta',
  prompt_text text,
  attached_urls text[] not null default '{}',
  attached_file_names text[] not null default '{}',
  selected_design text,
  page_path text,
  page_url text,
  host text,
  created_at timestamptz not null default timezone('utc', now()),
  constraint leads_contact_required check (
    (contact_method = 'phone' and phone is not null and btrim(phone) <> '')
    or
    (contact_method = 'email' and email is not null and btrim(email) <> '')
  )
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_source_idx on public.leads (source);
create index if not exists leads_host_idx on public.leads (host);

revoke all on table public.leads from anon, authenticated;
grant usage on schema public to anon, authenticated;
grant insert on table public.leads to anon, authenticated;

alter table public.leads enable row level security;

drop policy if exists "Allow anonymous lead inserts" on public.leads;
drop policy if exists "Allow public lead inserts" on public.leads;
create policy "Allow public lead inserts"
on public.leads
for insert
to anon, authenticated
with check (true);

drop policy if exists "Deny anonymous lead reads" on public.leads;
drop policy if exists "Deny public lead reads" on public.leads;
create policy "Deny public lead reads"
on public.leads
for select
to anon, authenticated
using (false);

drop policy if exists "Deny anonymous lead updates" on public.leads;
drop policy if exists "Deny public lead updates" on public.leads;
create policy "Deny public lead updates"
on public.leads
for update
to anon, authenticated
using (false)
with check (false);

drop policy if exists "Deny anonymous lead deletes" on public.leads;
drop policy if exists "Deny public lead deletes" on public.leads;
create policy "Deny public lead deletes"
on public.leads
for delete
to anon, authenticated
using (false);
