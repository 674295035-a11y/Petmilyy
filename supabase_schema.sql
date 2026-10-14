-- =========================================================
-- PETMILY - Supabase Complete Database Schema & RLS Setup
-- =========================================================

-- 1. Profiles & Premium Status
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    phone TEXT,
    role TEXT DEFAULT 'user',
    avatar_url TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    premium_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert/update profiles" ON public.profiles
    FOR ALL USING (true) WITH CHECK (true);

-- 2. Pets Table
CREATE TABLE IF NOT EXISTS public.pets (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    breed TEXT,
    gender TEXT,
    birth_date TEXT,
    weight NUMERIC,
    microchip_no TEXT,
    is_sterilized BOOLEAN DEFAULT FALSE,
    allergies TEXT,
    notes TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public all pets" ON public.pets
    FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_pets_user_id ON public.pets (user_id);

-- 3. Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    pet_id TEXT,
    pet_name TEXT,
    doctor_name TEXT,
    clinic_name TEXT,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    service_type TEXT,
    status TEXT DEFAULT 'confirmed',
    notes TEXT,
    cost NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public all appointments" ON public.appointments
    FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON public.appointments (user_id);

-- 4. Chat Threads Table (User-Scoped per Doctor)
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

-- 5. Chat Messages Table (Scoped by User and Doctor Thread)
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

-- 6. Activity Buttons & Tracking
CREATE TABLE IF NOT EXISTS public.activity_buttons (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    name TEXT NOT NULL,
    icon TEXT,
    color TEXT,
    unit TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.activity_buttons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public all activity_buttons" ON public.activity_buttons
    FOR ALL USING (true) WITH CHECK (true);

-- 7. Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    pet_id TEXT,
    pet_name TEXT,
    button_id TEXT,
    name TEXT NOT NULL,
    icon TEXT,
    color TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public all activity_logs" ON public.activity_logs
    FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON public.activity_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_pet_id ON public.activity_logs (pet_id);

-- 8. Expenses Table
CREATE TABLE IF NOT EXISTS public.expenses (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    pet_id TEXT,
    category TEXT NOT NULL,
    amount NUMERIC NOT NULL DEFAULT 0,
    date TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public all expenses" ON public.expenses
    FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON public.expenses (user_id);

-- 9. Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'system',
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public all notifications" ON public.notifications
    FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications (user_id);

-- 10. Analytics Page Views Table
CREATE TABLE IF NOT EXISTS public.page_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path TEXT NOT NULL,
    visitor_id TEXT, -- Persistent device/browser ID from localStorage
    session_id TEXT, -- Unique tab/session ID from sessionStorage
    user_agent TEXT,
    referrer TEXT,
    user_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert page_views" ON public.page_views
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select page_views" ON public.page_views
    FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_page_views_visitor ON public.page_views (visitor_id);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON public.page_views (page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views (created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON public.page_views (session_id);
