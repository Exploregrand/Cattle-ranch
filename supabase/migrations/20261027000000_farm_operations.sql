-- Cattle Buy — farm operations
-- Fodder beds and activity, fodder stock, animal status history and the farm ledger.
-- Internal data only: customers have no access to anything in this file.

-- ---------------------------------------------------------------------------
-- Fodder: 120 beds in Sections A, B and C (40 each)
-- ---------------------------------------------------------------------------

create table public.fodder_beds (
  id text primary key check (id ~ '^[ABC][0-9]{2}$'),
  section text not null check (section in ('A', 'B', 'C')),
  position integer not null check (position between 1 and 40),
  unique (section, position)
);

insert into public.fodder_beds (id, section, position)
select s || lpad(n::text, 2, '0'), s, n
from unnest(array['A', 'B', 'C']) as s, generate_series(1, 40) as n;

create table public.bed_plantings (
  id uuid primary key default gen_random_uuid(),
  bed_id text not null references public.fodder_beds (id),
  crop text not null check (crop in ('sugargraze', 'super_napier', 'alfalfa', 'desmodium')),
  planted_on date not null,
  ended_on date,
  notes text,
  recorded_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  check (ended_on is null or ended_on >= planted_on)
);

-- At most one current planting per bed.
create unique index bed_plantings_one_current on public.bed_plantings (bed_id) where ended_on is null;

create table public.fodder_activities (
  id uuid primary key default gen_random_uuid(),
  bed_id text not null references public.fodder_beds (id),
  kind text not null check (kind in ('irrigation', 'harvest', 'fertiliser', 'weeding', 'pest_control', 'note')),
  occurred_on date not null,
  yield_kg numeric(8, 1) check (yield_kg is null or yield_kg >= 0),
  notes text,
  recorded_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  check (kind = 'harvest' or yield_kg is null)
);

create index fodder_activities_bed_idx on public.fodder_activities (bed_id, occurred_on desc);

create table public.fodder_stock_movements (
  id uuid primary key default gen_random_uuid(),
  occurred_on date not null,
  crop text not null check (crop in ('sugargraze', 'super_napier', 'alfalfa', 'desmodium', 'other')),
  form text not null default 'fresh' check (form in ('fresh', 'silage', 'hay')),
  direction text not null check (direction in ('in', 'out')),
  reason text not null check (reason in ('harvest', 'purchased', 'fed', 'sold', 'spoiled', 'adjustment')),
  quantity_kg numeric(10, 1) not null check (quantity_kg > 0),
  animal_id uuid references public.animals (id),
  notes text,
  recorded_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  check (
    (direction = 'in' and reason in ('harvest', 'purchased', 'adjustment'))
    or (direction = 'out' and reason in ('fed', 'sold', 'spoiled', 'adjustment'))
  )
);

create index fodder_stock_date_idx on public.fodder_stock_movements (occurred_on desc);

-- ---------------------------------------------------------------------------
-- Animal status history (sales, deaths, transfers) and tag numbering
-- ---------------------------------------------------------------------------

create table public.animal_status_events (
  id uuid primary key default gen_random_uuid(),
  animal_id uuid not null references public.animals (id) on delete cascade,
  occurred_on date not null,
  status text not null check (status in ('active', 'sold', 'transferred', 'deceased')),
  notes text,
  recorded_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create index animal_status_events_animal_idx on public.animal_status_events (animal_id, occurred_on desc);

-- Next free tag for a species, e.g. TGM-SH-0001. Serialised by an advisory lock.
create or replace function public.next_animal_tag(p_species text)
returns text
language plpgsql
as $$
declare
  code text := case p_species when 'sheep' then 'SH' when 'goats' then 'GT' when 'cattle' then 'CT' end;
  next_no integer;
begin
  if code is null then
    raise exception 'Unknown species %', p_species;
  end if;
  perform pg_advisory_xact_lock(hashtext('animal_tag_' || code));
  select coalesce(max(substring(tag from 8)::integer), 0) + 1 into next_no
  from public.animals where tag like 'TGM-' || code || '-%';
  return 'TGM-' || code || '-' || lpad(next_no::text, 4, '0');
end;
$$;

-- ---------------------------------------------------------------------------
-- Farm ledger: everything not already recorded as a per-animal cost
-- ---------------------------------------------------------------------------

create table public.farm_transactions (
  id uuid primary key default gen_random_uuid(),
  occurred_on date not null,
  direction text not null check (direction in ('income', 'expense')),
  category text not null check (category in (
    'livestock_sale', 'fodder_sale', 'other_income',
    'fodder_inputs', 'labour', 'equipment', 'water', 'transport', 'other_expense'
  )),
  amount_kes numeric(12, 2) not null check (amount_kes > 0),
  description text not null,
  animal_id uuid references public.animals (id),
  customer_id uuid references public.profiles (id),
  recorded_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  check (
    (direction = 'income' and category in ('livestock_sale', 'fodder_sale', 'other_income'))
    or (direction = 'expense' and category not in ('livestock_sale', 'fodder_sale', 'other_income'))
  ),
  check (category <> 'livestock_sale' or animal_id is not null)
);

create index farm_transactions_date_idx on public.farm_transactions (occurred_on desc);

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------

alter table public.fodder_beds enable row level security;
alter table public.bed_plantings enable row level security;
alter table public.fodder_activities enable row level security;
alter table public.fodder_stock_movements enable row level security;
alter table public.animal_status_events enable row level security;
alter table public.farm_transactions enable row level security;

create policy "beds: staff read" on public.fodder_beds for select using (public.is_staff());
create policy "plantings: staff manage" on public.bed_plantings for all using (public.is_staff()) with check (public.is_staff());
create policy "fodder activity: staff manage" on public.fodder_activities for all using (public.is_staff()) with check (public.is_staff());
create policy "fodder stock: staff manage" on public.fodder_stock_movements for all using (public.is_staff()) with check (public.is_staff());
create policy "status events: owners and staff read" on public.animal_status_events
  for select using (public.can_view_animal(animal_id));
create policy "status events: staff manage" on public.animal_status_events
  for all using (public.is_staff()) with check (public.is_staff());
create policy "ledger: admin manages" on public.farm_transactions for all using (public.is_admin()) with check (public.is_admin());
