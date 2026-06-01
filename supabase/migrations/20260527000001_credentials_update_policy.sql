-- Allow owners to update their own credentials (needed for name sync)
create policy "credentials_owner_update"
  on public.credentials for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
