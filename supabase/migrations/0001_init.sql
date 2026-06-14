-- BuyLater schema — accounts + per-user cloud sync.
-- Primary keys are TEXT to match the app's client-generated ids
-- (e.g. "order_…", "product_…"). Every table has RLS so each user only ever
-- sees their own rows. The anon/publishable key is public, so RLS is the only
-- thing protecting this data — it must stay enabled.

-- 1. Profile (1:1 with auth.users)
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  locale text not null default 'en',
  currency text not null default 'EUR',
  created_at timestamptz not null default now()
);
alter table profiles enable row level security;
create policy "own profile" on profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- 2. User-added products
create table if not exists products (
  id text primary key,
  user_id uuid not null references auth.users on delete cascade,
  title text not null,
  description text,
  price numeric(10,2) not null,
  currency text not null default 'EUR',
  category text not null,
  image_url text,
  store_name text,
  product_url text,
  tags text[],
  rating numeric(2,1),
  original_price numeric(10,2),
  source text not null default 'manual',
  created_at timestamptz not null default now()
);
alter table products enable row level security;
create policy "own rows" on products
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 3. Virtual orders (the core: pauses, decisions, savings)
create table if not exists orders (
  id text primary key,
  user_id uuid not null references auth.users on delete cascade,
  order_number text not null,
  items jsonb not null,
  total numeric(10,2) not null,
  currency text not null default 'EUR',
  delivery_vibe text,
  current_status text not null default 'confirmed',
  status_history jsonb not null default '[]',
  cooling_off_until timestamptz not null,
  decision text,
  decided_at timestamptz,
  demo_mode boolean not null default false,
  created_at timestamptz not null default now()
);
alter table orders enable row level security;
create policy "own rows" on orders
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists orders_user_decided_idx on orders (user_id, decided_at);

-- 4. Watchlist
create table if not exists watchlist (
  user_id uuid not null references auth.users on delete cascade,
  product_id text not null,
  product jsonb not null,
  added_at timestamptz not null default now(),
  primary key (user_id, product_id)
);
alter table watchlist enable row level security;
create policy "own rows" on watchlist
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 5. Reflections
create table if not exists reflections (
  id text primary key,
  user_id uuid not null references auth.users on delete cascade,
  product_id text not null,
  body text not null,
  price numeric(10,2),
  created_at timestamptz not null default now()
);
alter table reflections enable row level security;
create policy "own rows" on reflections
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Auto-create a profile row on signup
create or replace function public.handle_new_user() returns trigger
  language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
