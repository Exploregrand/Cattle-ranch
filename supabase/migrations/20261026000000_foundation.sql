-- Tangama Livestock — foundation schema
-- Roles, early-access registrations, livestock records and customer ownership.
-- Every table has row-level security. Customers can only read animals they own;
-- staff (admin, farm_manager) manage records; only admins see finances and leads.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Roles and profiles
-- ---------------------------------------------------------------------------

create type public.app_role as enum ('admin', 'farm_manager', 'customer');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  county text,
  role public.app_role not null default 'customer',
  created_at timestamptz not null default now()
);

-- Role helpers are SECURITY DEFINER so policies can call them without recursion.
create or replace function public.current_app_role()
returns public.app_role
language sql stable security definer set search_path = public
as $$ select role from public.profiles where id = auth.uid() $$;

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$ select coalesce(public.current_app_role() = 'admin', false) $$;

create or replace function public.is_staff()
returns boolean
language sql stable security definer set search_path = public
as $$ select coalesce(public.current_app_role() in ('admin', 'farm_manager'), false) $$;

-- New sign-ups always start as customers; staff roles are granted by an admin.
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Users may edit their own contact details but never their own role.
-- Runs as the caller (not SECURITY DEFINER) so current_user is the request role;
-- the SQL editor and service role can still bootstrap the first admin.
create or replace function public.protect_profile_role()
returns trigger
language plpgsql set search_path = public
as $$
begin
  if new.role is distinct from old.role
     and current_user in ('anon', 'authenticated')
     and not public.is_admin() then
    raise exception 'Only an admin can change roles';
  end if;
  return new;
end;
$$;

create trigger profiles_protect_role
  before update on public.profiles
  for each row execute function public.protect_profile_role();

alter table public.profiles enable row level security;

create policy "profiles: read own or staff" on public.profiles
  for select using (id = auth.uid() or public.is_staff());
create policy "profiles: update own" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());
create policy "profiles: admin manages" on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Early access registrations (public insert only)
-- ---------------------------------------------------------------------------

create table public.early_access_registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  phone text not null check (phone ~ '^\+254[17][0-9]{8}$'),
  email text check (email is null or char_length(email) <= 254),
  location text check (location is null or char_length(location) <= 120),
  interests text[] not null default '{}'
    check (interests <@ array['sheep', 'goats', 'cattle', 'managed', 'qurbani']),
  message text check (message is null or char_length(message) <= 1000),
  consent boolean not null check (consent),
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.early_access_registrations enable row level security;

create policy "early access: anyone may register" on public.early_access_registrations
  for insert to anon, authenticated
  with check (consent and status = 'new');
create policy "early access: admin reads and manages" on public.early_access_registrations
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Livestock programmes — configurable, closed to the public by default
-- ---------------------------------------------------------------------------

create table public.livestock_programmes (
  id text primary key,
  name text not null,
  kind text not null check (kind in ('farm_owned', 'customer_owned', 'fattening', 'qurbani')),
  summary text,
  public_enabled boolean not null default false,
  legal_approved_at timestamptz,
  created_at timestamptz not null default now(),
  -- A programme can only open to the public once legal review is recorded.
  constraint programme_requires_legal_approval
    check (not public_enabled or legal_approved_at is not null)
);

insert into public.livestock_programmes (id, name, kind, summary) values
  ('farm-owned', 'Farm livestock sales', 'farm_owned', 'Animals bred or finished by Tangama, sold directly with full records.'),
  ('customer-owned', 'Managed ownership', 'customer_owned', 'Customer-owned animals managed by Tangama under a service agreement.'),
  ('fattening', 'Fattening programme', 'fattening', 'Animals fed for a defined period with documented costs and outcomes.'),
  ('qurbani', 'Qurbani services', 'qurbani', 'Seasonal reservation, preparation and delivery for Eid al-Adha.');

alter table public.livestock_programmes enable row level security;

create policy "programmes: readable by everyone" on public.livestock_programmes
  for select using (true);
create policy "programmes: admin manages" on public.livestock_programmes
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Animals and ownership
-- ---------------------------------------------------------------------------

create table public.animals (
  id uuid primary key default gen_random_uuid(),
  tag text not null unique check (tag ~ '^TGM-(SH|GT|CT)-[0-9]{4}$'),
  species text not null check (species in ('sheep', 'goats', 'cattle')),
  breed text not null,
  sex text not null check (sex in ('male', 'female')),
  date_of_birth date,
  est_age_months_at_intake integer check (est_age_months_at_intake >= 0),
  intake_date date not null,
  location text not null default 'Tangama Farm, Isinya',
  status text not null default 'active' check (status in ('active', 'sold', 'transferred', 'deceased')),
  programme_id text references public.livestock_programmes (id),
  created_at timestamptz not null default now()
);

create table public.animal_ownerships (
  id uuid primary key default gen_random_uuid(),
  animal_id uuid not null references public.animals (id) on delete cascade,
  customer_id uuid not null references public.profiles (id) on delete restrict,
  starts_on date not null,
  ends_on date,
  agreement_ref text,
  created_at timestamptz not null default now(),
  check (ends_on is null or ends_on >= starts_on)
);

create index animal_ownerships_customer_idx on public.animal_ownerships (customer_id);
create index animal_ownerships_animal_idx on public.animal_ownerships (animal_id);

-- True when the signed-in user is staff, or currently owns the animal.
create or replace function public.can_view_animal(target uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select public.is_staff() or exists (
    select 1 from public.animal_ownerships o
    where o.animal_id = target
      and o.customer_id = auth.uid()
      and o.starts_on <= current_date
      and (o.ends_on is null or o.ends_on >= current_date)
  )
$$;

alter table public.animals enable row level security;
alter table public.animal_ownerships enable row level security;

create policy "animals: owners and staff read" on public.animals
  for select using (public.can_view_animal(id));
create policy "animals: staff manage" on public.animals
  for all using (public.is_staff()) with check (public.is_staff());

create policy "ownerships: own or staff read" on public.animal_ownerships
  for select using (customer_id = auth.uid() or public.is_staff());
create policy "ownerships: admin manages" on public.animal_ownerships
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Animal records
-- ---------------------------------------------------------------------------

create table public.animal_weights (
  id uuid primary key default gen_random_uuid(),
  animal_id uuid not null references public.animals (id) on delete cascade,
  recorded_on date not null,
  weight_kg numeric(6, 1) not null check (weight_kg > 0 and weight_kg < 2000),
  recorded_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create table public.animal_health_events (
  id uuid primary key default gen_random_uuid(),
  animal_id uuid not null references public.animals (id) on delete cascade,
  occurred_on date not null,
  kind text not null check (kind in ('vaccination', 'treatment', 'check')),
  title text not null,
  detail text,
  recorded_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create table public.animal_feedings (
  id uuid primary key default gen_random_uuid(),
  animal_id uuid not null references public.animals (id) on delete cascade,
  started_on date not null,
  ration text not null,
  notes text,
  recorded_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create table public.animal_costs (
  id uuid primary key default gen_random_uuid(),
  animal_id uuid not null references public.animals (id) on delete cascade,
  incurred_on date not null,
  category text not null check (category in ('purchase', 'feed', 'veterinary', 'other')),
  label text not null,
  amount_kes numeric(12, 2) not null check (amount_kes >= 0),
  -- Internal costs (e.g. on farm-owned stock) can be hidden from customers.
  customer_visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.animal_photos (
  id uuid primary key default gen_random_uuid(),
  animal_id uuid not null references public.animals (id) on delete cascade,
  taken_on date not null,
  caption text,
  -- Object path inside the private "animal-photos" bucket: <animal_id>/<file>
  storage_path text not null,
  created_at timestamptz not null default now()
);

create index animal_weights_animal_idx on public.animal_weights (animal_id, recorded_on);
create index animal_health_animal_idx on public.animal_health_events (animal_id, occurred_on);
create index animal_feedings_animal_idx on public.animal_feedings (animal_id, started_on);
create index animal_costs_animal_idx on public.animal_costs (animal_id, incurred_on);
create index animal_photos_animal_idx on public.animal_photos (animal_id, taken_on);

alter table public.animal_weights enable row level security;
alter table public.animal_health_events enable row level security;
alter table public.animal_feedings enable row level security;
alter table public.animal_costs enable row level security;
alter table public.animal_photos enable row level security;

create policy "weights: owners and staff read" on public.animal_weights
  for select using (public.can_view_animal(animal_id));
create policy "weights: staff manage" on public.animal_weights
  for all using (public.is_staff()) with check (public.is_staff());

create policy "health: owners and staff read" on public.animal_health_events
  for select using (public.can_view_animal(animal_id));
create policy "health: staff manage" on public.animal_health_events
  for all using (public.is_staff()) with check (public.is_staff());

create policy "feedings: owners and staff read" on public.animal_feedings
  for select using (public.can_view_animal(animal_id));
create policy "feedings: staff manage" on public.animal_feedings
  for all using (public.is_staff()) with check (public.is_staff());

-- Finances: owners see customer-visible costs; only admins see or edit everything.
create policy "costs: owners read visible" on public.animal_costs
  for select using (customer_visible and public.can_view_animal(animal_id));
create policy "costs: admin manages" on public.animal_costs
  for all using (public.is_admin()) with check (public.is_admin());

create policy "photos: owners and staff read" on public.animal_photos
  for select using (public.can_view_animal(animal_id));
create policy "photos: staff manage" on public.animal_photos
  for all using (public.is_staff()) with check (public.is_staff());

-- ---------------------------------------------------------------------------
-- Farm updates and customer documents
-- ---------------------------------------------------------------------------

create table public.farm_updates (
  id uuid primary key default gen_random_uuid(),
  published_on date not null,
  title text not null,
  body text not null,
  -- null = shared with every customer; otherwise only with that animal's owner.
  animal_id uuid references public.animals (id) on delete cascade,
  published boolean not null default false,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create table public.customer_documents (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  kind text not null check (kind in ('agreement', 'certificate', 'statement', 'receipt')),
  issued_on date not null,
  -- Object path inside the private "customer-documents" bucket: <customer_id>/<file>
  storage_path text not null,
  created_at timestamptz not null default now()
);

alter table public.farm_updates enable row level security;
alter table public.customer_documents enable row level security;

create policy "updates: customers read published" on public.farm_updates
  for select to authenticated using (
    public.is_staff()
    or (published and (animal_id is null or public.can_view_animal(animal_id)))
  );
create policy "updates: staff manage" on public.farm_updates
  for all using (public.is_staff()) with check (public.is_staff());

create policy "documents: own or admin read" on public.customer_documents
  for select using (customer_id = auth.uid() or public.is_admin());
create policy "documents: admin manages" on public.customer_documents
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Private storage buckets
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('animal-photos', 'animal-photos', false), ('customer-documents', 'customer-documents', false)
on conflict (id) do nothing;

-- Folder-name parsing must never throw for paths that aren't a UUID.
create or replace function public.try_uuid(value text)
returns uuid
language plpgsql immutable
as $$
begin
  return value::uuid;
exception when others then
  return null;
end;
$$;

create policy "animal photos: owners and staff read" on storage.objects
  for select using (
    bucket_id = 'animal-photos'
    and public.can_view_animal(public.try_uuid((storage.foldername(name))[1]))
  );
create policy "animal photos: staff write" on storage.objects
  for insert with check (bucket_id = 'animal-photos' and public.is_staff());
create policy "animal photos: staff delete" on storage.objects
  for delete using (bucket_id = 'animal-photos' and public.is_staff());

create policy "customer documents: own or admin read" on storage.objects
  for select using (
    bucket_id = 'customer-documents'
    and (
      public.try_uuid((storage.foldername(name))[1]) = auth.uid()
      or public.is_admin()
    )
  );
create policy "customer documents: admin write" on storage.objects
  for insert with check (bucket_id = 'customer-documents' and public.is_admin());
create policy "customer documents: admin delete" on storage.objects
  for delete using (bucket_id = 'customer-documents' and public.is_admin());
