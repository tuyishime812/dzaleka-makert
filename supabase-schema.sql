-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Categories table
create table if not exists categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  icon text,
  description text,
  parent_id uuid references categories(id),
  created_at timestamp with time zone default now()
);

-- Products table
create table if not exists products (
  id uuid default uuid_generate_v4() primary key,
  seller_id text not null,
  category_id uuid references categories(id),
  title text not null,
  description text,
  price decimal(10,2) not null,
  original_price decimal(10,2),
  images text[] default '{}',
  stock integer default 1,
  is_event_ticket boolean default false,
  event_date timestamp with time zone,
  event_location text,
  status text default 'active' check (status in ('active', 'sold', 'inactive')),
  views integer default 0,
  average_rating decimal(2,1) default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Conversations table (for chat between buyers and sellers)
create table if not exists conversations (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references products(id) on delete cascade,
  buyer_id text not null,
  seller_id text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(product_id, buyer_id, seller_id)
);

-- Messages table
create table if not exists messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references conversations(id) on delete cascade not null,
  sender_id text not null,
  content text not null,
  is_read boolean default false,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table products enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;

-- Products policies
create policy "Products are viewable by everyone" on products
  for select using (status = 'active');

create policy "Users can insert their own products" on products
  for insert with check (seller_id = auth.uid()::text);

create policy "Users can update their own products" on products
  for update using (seller_id = auth.uid()::text);

create policy "Users can delete their own products" on products
  for delete using (seller_id = auth.uid()::text);

-- Conversations policies
create policy "Users can view their own conversations" on conversations
  for select using (buyer_id = auth.uid()::text or seller_id = auth.uid()::text);

create policy "Buyers can create conversations" on conversations
  for insert with check (buyer_id = auth.uid()::text);

create policy "Users can update their own conversations" on conversations
  for update using (buyer_id = auth.uid()::text or seller_id = auth.uid()::text);

-- Messages policies
create policy "Users can view messages in their conversations" on messages
  for select using (
    conversation_id in (
      select id from conversations where buyer_id = auth.uid()::text or seller_id = auth.uid()::text
    )
  );

create policy "Users can send messages in their conversations" on messages
  for insert with check (
    sender_id = auth.uid()::text and
    conversation_id in (
      select id from conversations where buyer_id = auth.uid()::text or seller_id = auth.uid()::text
    )
  );

create policy "Users can update their own messages" on messages
  for update using (sender_id = auth.uid()::text);

-- Indexes
create index if not exists products_seller_id_idx on products(seller_id);
create index if not exists products_category_id_idx on products(category_id);
create index if not exists products_status_idx on products(status);
create index if not exists products_created_at_idx on products(created_at desc);
create index if not exists conversations_buyer_id_idx on conversations(buyer_id);
create index if not exists conversations_seller_id_idx on conversations(seller_id);
create index if not exists conversations_product_id_idx on conversations(product_id);
create index if not exists messages_conversation_id_idx on messages(conversation_id);
create index if not exists messages_created_at_idx on messages(created_at);

-- Insert default categories
insert into categories (name, slug, icon, description) values
  ('Events', 'events', 'Calendar', 'Concerts, festivals, and events'),
  ('Electronics', 'electronics', 'Smartphone', 'Phones, laptops, and gadgets'),
  ('Fashion', 'fashion', 'Shirt', 'Clothing, shoes, and accessories'),
  ('Home & Living', 'home', 'Home', 'Furniture, decor, and home goods'),
  ('Sports', 'sports', 'Dumbbell', 'Sports equipment and fitness gear')
on conflict (slug) do nothing;
