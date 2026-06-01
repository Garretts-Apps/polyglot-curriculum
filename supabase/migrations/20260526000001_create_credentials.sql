create table public.credentials (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  language text not null,
  phase_level integer not null,
  earner_handle text not null,
  issued_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, language, phase_level)
);

alter table public.credentials enable row level security;

-- Credentials are publicly readable by design — they are shareable URLs
create policy "credentials_public_read"
  on public.credentials for select
  using (true);

-- Only the authenticated owner can issue their own credentials
create policy "credentials_owner_insert"
  on public.credentials for insert
  with check (auth.uid() = user_id);
