-- Investors own livestock, not shares: replace the equity/livestock/both options
-- with the animals an investor wants to own.

alter table public.investor_interest drop constraint if exists investor_interest_route_check;
update public.investor_interest set route = 'mixed' where route in ('equity', 'livestock', 'both');
alter table public.investor_interest
  add constraint investor_interest_route_check check (route in ('sheep', 'goats', 'cattle', 'mixed'));
