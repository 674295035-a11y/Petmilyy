-- Supabase Schema for PETMILY Pageview Tracker

CREATE TABLE IF NOT EXISTS public.page_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path TEXT NOT NULL,
    user_agent TEXT,
    referrer TEXT,
    session_id TEXT,
    user_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert page_views" ON public.page_views
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select page_views" ON public.page_views
    FOR SELECT USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_page_views_path ON public.page_views (page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views (created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON public.page_views (session_id);
