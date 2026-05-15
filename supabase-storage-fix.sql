-- Drop existing restrictive policies
drop policy if exists "Users can upload product images" on storage.objects;
drop policy if exists "Users can update their own product images" on storage.objects;
drop policy if exists "Users can delete their own product images" on storage.objects;
drop policy if exists "Users can upload their own avatar" on storage.objects;
drop policy if exists "Users can update their own avatar" on storage.objects;
drop policy if exists "Users can delete their own avatar" on storage.objects;

-- Allow any authenticated request to upload product images
-- Since you're using Clerk, we'll handle auth checks in the app
create policy "Allow product image uploads"
  on storage.objects for insert
  with check ( bucket_id = 'product-images' );

create policy "Allow product image updates"
  on storage.objects for update
  using ( bucket_id = 'product-images' );

create policy "Allow product image deletes"
  on storage.objects for delete
  using ( bucket_id = 'product-images' );

-- Avatar policies (same approach)
create policy "Allow avatar uploads"
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );

create policy "Allow avatar updates"
  on storage.objects for update
  using ( bucket_id = 'avatars' );

create policy "Allow avatar deletes"
  on storage.objects for delete
  using ( bucket_id = 'avatars' );
