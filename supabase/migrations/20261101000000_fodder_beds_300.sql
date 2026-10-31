-- Fodder layout grows from 120 to 300 beds: three sections of 100 (A, B, C).
-- Bed IDs keep their form (A01 … A99, then A100); positions now run to 100.

alter table public.fodder_beds drop constraint if exists fodder_beds_id_check;
alter table public.fodder_beds drop constraint if exists fodder_beds_position_check;
alter table public.fodder_beds add constraint fodder_beds_id_check check (id ~ '^[A-Z][0-9]{2,3}$');
alter table public.fodder_beds add constraint fodder_beds_position_check check (position between 1 and 200);

insert into public.fodder_beds (id, section, position)
-- lpad() truncates longer values (lpad('100', 2) = '10'), so only pad positions below 10.
select s || case when n < 10 then '0' || n::text else n::text end, s, n
from unnest(array['A', 'B', 'C']) as s, generate_series(1, 100) as n
on conflict (id) do nothing;
