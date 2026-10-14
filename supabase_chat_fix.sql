-- ==============================================================================
-- PETMILY Supabase Fix: User-Scoped Chat Threads & Message Isolation
-- ==============================================================================
-- Run this SQL in your Supabase Dashboard SQL Editor to:
-- 1. Ensure all columns exist for user-scoped chat threads and messages
-- 2. Clean up contaminated/legacy shared mock chat rows
-- 3. Set up indexes and public RLS policies
-- ==============================================================================

-- 1. Alter / Update chat_threads table
CREATE TABLE IF NOT EXISTS public.chat_threads (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    doctor_id TEXT,
    doctor_name TEXT,
    doctor_avatar TEXT,
    clinic_name TEXT,
    last_message TEXT,
    last_time TEXT,
    unread_count INTEGER DEFAULT 0,
    online BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.chat_threads ADD COLUMN IF NOT EXISTS user_id TEXT;
ALTER TABLE public.chat_threads ADD COLUMN IF NOT EXISTS doctor_id TEXT;
ALTER TABLE public.chat_threads ADD COLUMN IF NOT EXISTS doctor_name TEXT;
ALTER TABLE public.chat_threads ADD COLUMN IF NOT EXISTS doctor_avatar TEXT;
ALTER TABLE public.chat_threads ADD COLUMN IF NOT EXISTS clinic_name TEXT;
ALTER TABLE public.chat_threads ADD COLUMN IF NOT EXISTS last_message TEXT;
ALTER TABLE public.chat_threads ADD COLUMN IF NOT EXISTS last_time TEXT;
ALTER TABLE public.chat_threads ADD COLUMN IF NOT EXISTS unread_count INTEGER DEFAULT 0;
ALTER TABLE public.chat_threads ADD COLUMN IF NOT EXISTS online BOOLEAN DEFAULT true;
ALTER TABLE public.chat_threads ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());
ALTER TABLE public.chat_threads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

ALTER TABLE public.chat_threads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public all chat_threads" ON public.chat_threads;
CREATE POLICY "Allow public all chat_threads" ON public.chat_threads
    FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_chat_threads_user_id ON public.chat_threads (user_id);
CREATE INDEX IF NOT EXISTS idx_chat_threads_doctor_id ON public.chat_threads (doctor_id);

-- 2. Alter / Update chat_messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id TEXT PRIMARY KEY,
    thread_id TEXT NOT NULL,
    user_id TEXT,
    doctor_id TEXT,
    sender TEXT,
    sender_role TEXT DEFAULT 'user',
    sender_name TEXT,
    text TEXT,
    message TEXT,
    time TEXT,
    timestamp TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS thread_id TEXT NOT NULL;
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS user_id TEXT;
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS doctor_id TEXT;
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS sender TEXT;
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS sender_role TEXT DEFAULT 'user';
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS sender_name TEXT;
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS text TEXT;
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS time TEXT;
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS timestamp TEXT;
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public all chat_messages" ON public.chat_messages;
CREATE POLICY "Allow public all chat_messages" ON public.chat_messages
    FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_chat_messages_thread_id ON public.chat_messages (thread_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON public.chat_messages (user_id);

-- 3. Clean up old shared test mock messages from prior global threads
DELETE FROM public.chat_messages 
WHERE thread_id IN (
    'a0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000003',
    'vet-1',
    'vet-2',
    'vet-3'
) OR user_id IS NULL;

DELETE FROM public.chat_threads 
WHERE id IN (
    'a0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000003',
    'vet-1',
    'vet-2',
    'vet-3'
) OR user_id IS NULL;

-- 4. Verification Check
SELECT count(*) AS remaining_user_scoped_messages FROM public.chat_messages;
SELECT count(*) AS remaining_user_scoped_threads FROM public.chat_threads;
