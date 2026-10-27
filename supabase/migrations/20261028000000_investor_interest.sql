-- Investor expressions of interest (Kenya-based investors for now).
-- Collects interest only: no offer is made and no money is taken through the platform.

create table public.investor_interest (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  phone text not null check (phone ~ '^\+254[17][0-9]{8}$'),
  email text check (email is null or (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 254)),
  county text not null check (char_length(county) between 2 and 60),
  investor_type text not null check (investor_type in ('individual', 'chama', 'sacco', 'company')),
  route text not null check (route in ('equity', 'livestock', 'both')),
  ticket text check (ticket is null or ticket in ('under_500k', '500k_2m', '2m_10m', 'over_10m', 'undisclosed')),
  message text check (message is null or char_length(message) <= 1500),
  acknowledged_no_offer boolean not null check (acknowledged_no_offer),
  consent boolean not null check (consent),
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.investor_interest enable row level security;

create policy "investor interest: anyone may register" on public.investor_interest
  for insert to anon, authenticated
  with check (acknowledged_no_offer and consent and status = 'new');
create policy "investor interest: admin reads and manages" on public.investor_interest
  for all using (public.is_admin()) with check (public.is_admin());
