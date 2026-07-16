-- Supabase Schema and RLS Policies for StudySphere AI

-- Enable vector extension for RAG embeddings
create extension if not exists vector;

-- 1. Profiles Table (extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url text,
  college text,
  department text,
  semester text,
  bio text,
  timezone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on profiles
alter table profiles enable row level security;
create policy "Users can view own profile." on profiles for select using (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Trigger to automatically create profile on signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. Documents Table
create table documents (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  file_url text not null,
  file_type text,
  size_bytes bigint,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table documents enable row level security;
create policy "Users can view own documents." on documents for select using (auth.uid() = user_id);
create policy "Users can insert own documents." on documents for insert with check (auth.uid() = user_id);
create policy "Users can update own documents." on documents for update using (auth.uid() = user_id);
create policy "Users can delete own documents." on documents for delete using (auth.uid() = user_id);


-- 3. Document Chunks Table (for RAG)
create table document_chunks (
  id uuid default uuid_generate_v4() primary key,
  document_id uuid references documents on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  content text not null,
  page_number integer,
  embedding vector(1536),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table document_chunks enable row level security;
create policy "Users can view own chunks." on document_chunks for select using (auth.uid() = user_id);
create policy "Users can insert own chunks." on document_chunks for insert with check (auth.uid() = user_id);
create policy "Users can update own chunks." on document_chunks for update using (auth.uid() = user_id);
create policy "Users can delete own chunks." on document_chunks for delete using (auth.uid() = user_id);


-- 4. Notes Table
create table notes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  content text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table notes enable row level security;
create policy "Users can manage own notes" on notes for all using (auth.uid() = user_id);


-- 5. Planner Tasks Table
create table study_tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  task text not null,
  scheduled_for timestamp with time zone not null,
  duration text,
  is_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table study_tasks enable row level security;
create policy "Users can manage own tasks" on study_tasks for all using (auth.uid() = user_id);


-- 6. Storage Bucket Configuration
-- Ensure you manually create a bucket named 'documents' in the Supabase Dashboard
-- Storage RLS Policies:
-- create policy "Users can view own files" on storage.objects for select using (auth.uid() = owner);
-- create policy "Users can upload files" on storage.objects for insert with check (auth.uid() = owner);
-- create policy "Users can update own files" on storage.objects for update using (auth.uid() = owner);
-- create policy "Users can delete own files" on storage.objects for delete using (auth.uid() = owner);
