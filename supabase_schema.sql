-- ========================================================
-- PETMILY Database Schema for Supabase PostgreSQL
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Users & Vets)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'vet')),
    avatar_url TEXT,
    clinic_name TEXT,
    license_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. PETS TABLE
CREATE TABLE IF NOT EXISTS public.pets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- e.g. 'cat', 'dog', 'rabbit'
    breed TEXT,
    birthdate DATE,
    age TEXT,
    weight TEXT,
    height TEXT,
    drug_allergy TEXT,
    avatar TEXT DEFAULT 'cat',
    owner_name TEXT,
    latest_vaccine TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ACTIVITY BUTTONS TABLE (Preset & Custom Quick Buttons)
CREATE TABLE IF NOT EXISTS public.activity_buttons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    emoji TEXT NOT NULL,
    type TEXT NOT NULL,
    badge_dot_color TEXT,
    is_preset BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    emoji TEXT NOT NULL,
    time TEXT NOT NULL,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. CHAT THREADS TABLE
CREATE TABLE IF NOT EXISTS public.chat_threads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    vet_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    doctor_name TEXT NOT NULL,
    clinic_name TEXT,
    avatar_type TEXT DEFAULT 'da',
    last_message TEXT,
    unread_count INT DEFAULT 0,
    online BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CHAT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    thread_id UUID REFERENCES public.chat_threads(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'doctor')),
    text TEXT NOT NULL,
    time TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. VET PATIENTS TABLE (For Vet Role)
CREATE TABLE IF NOT EXISTS public.vet_patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vet_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    pet_id UUID REFERENCES public.pets(id) ON DELETE SET NULL,
    owner_name TEXT NOT NULL,
    pet_name TEXT NOT NULL,
    is_vip BOOLEAN DEFAULT FALSE,
    avatar_type TEXT DEFAULT 'reangmaew',
    last_vaccine TEXT,
    weight TEXT,
    checked BOOLEAN DEFAULT FALSE,
    last_message TEXT,
    unread_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. EXPENSES TABLE
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    category TEXT NOT NULL, -- e.g. 'food', 'medical', 'grooming', 'toy'
    date DATE DEFAULT CURRENT_DATE,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. APPOINTMENTS TABLE (ตารางการจอง / นัดหมายหมอ)
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    pet_id UUID REFERENCES public.pets(id) ON DELETE SET NULL,
    vet_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    clinic_name TEXT NOT NULL,
    doctor_name TEXT,
    service_type TEXT NOT NULL, -- e.g. 'ฉีดวัคซีน', 'ตรวจสุขภาพ', 'อาบน้ำตัดขน', 'ผ่าตัด/ทำหมัน'
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    pet_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    note TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) & Add Basic Public Access Policies (For Development)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_buttons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vet_patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow all actions for dev testing
CREATE POLICY "Allow public read/write access to profiles" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Allow public read/write access to pets" ON public.pets FOR ALL USING (true);
CREATE POLICY "Allow public read/write access to activity_buttons" ON public.activity_buttons FOR ALL USING (true);
CREATE POLICY "Allow public read/write access to activity_logs" ON public.activity_logs FOR ALL USING (true);
CREATE POLICY "Allow public read/write access to chat_threads" ON public.chat_threads FOR ALL USING (true);
CREATE POLICY "Allow public read/write access to chat_messages" ON public.chat_messages FOR ALL USING (true);
CREATE POLICY "Allow public read/write access to vet_patients" ON public.vet_patients FOR ALL USING (true);
CREATE POLICY "Allow public read/write access to expenses" ON public.expenses FOR ALL USING (true);
CREATE POLICY "Allow public read/write access to appointments" ON public.appointments FOR ALL USING (true);

-- Insert Sample Initial Data (Presets)
INSERT INTO public.activity_buttons (name, emoji, type, badge_dot_color, is_preset) VALUES
('อาหาร', '🍲', 'food', '#10B981', TRUE),
('ขับถ่าย', '💩', 'poop', NULL, TRUE),
('เดินเล่น', '🐕', 'walk', NULL, TRUE),
('อาบน้ำ', '🛁', 'bath', NULL, TRUE);

