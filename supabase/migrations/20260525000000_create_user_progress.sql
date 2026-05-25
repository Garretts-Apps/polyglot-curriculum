-- Create user_progress table
create table public.user_progress (
  user_id uuid references auth.users on delete cascade not null primary key,
  progress jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.user_progress enable row level security;

-- Create RLS Policies
create policy "Allow users to read their own progress" on public.user_progress
  for select using (auth.uid() = user_id);

create policy "Allow users to insert their own progress" on public.user_progress
  for insert with check (auth.uid() = user_id);

create policy "Allow users to update their own progress" on public.user_progress
  for update using (auth.uid() = user_id);
