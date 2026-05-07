-- Storage policies for product-images bucket
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Allow public access to read product images
create policy "Product images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'product-images' );

-- Allow authenticated users to upload product images
create policy "Users can upload product images"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images' and
    auth.role() = 'authenticated'
  );

-- Allow users to update their own product images
create policy "Users can update their own product images"
  on storage.objects for update
  using (
    bucket_id = 'product-images' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to delete their own product images
create policy "Users can delete their own product images"
  on storage.objects for delete
  using (
    bucket_id = 'product-images' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Avatar policies
create policy "Avatars are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can update their own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete their own avatar"
  on storage.objects for delete
  using (
    bucket_id = 'avatars' and
    auth.uid()::text = (storage.foldername(name))[1]
  );
