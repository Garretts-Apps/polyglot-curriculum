import pg from 'pg';
const { Client } = pg;

const client = new Client({
  host: 'aws-1-us-east-1.pooler.supabase.com',
  port: 6543,
  user: 'postgres.vadhscfnkmokgosieikg',
  password: 'G8zOky70YbYlGCsm',
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

const sql = `
create table if not exists public.user_progress (
  user_id uuid references auth.users on delete cascade not null primary key,
  progress jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.user_progress enable row level security;

-- Create RLS Policies (safely re-runnable)
drop policy if exists "Allow users to read their own progress" on public.user_progress;
create policy "Allow users to read their own progress" on public.user_progress
  for select using (auth.uid() = user_id);

drop policy if exists "Allow users to insert their own progress" on public.user_progress;
create policy "Allow users to insert their own progress" on public.user_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "Allow users to update their own progress" on public.user_progress;
create policy "Allow users to update their own progress" on public.user_progress
  for update using (auth.uid() = user_id);
`;

async function main() {
  console.log('Connecting to Supabase PostgreSQL...');
  await client.connect();
  console.log('Connected successfully!');

  console.log('Running database migrations...');
  await client.query(sql);
  console.log('Migrations completed successfully!');

  await client.end();
}

main().catch(err => {
  console.error('Migration error:', err);
  client.end().catch(() => {});
  process.exit(1);
});
