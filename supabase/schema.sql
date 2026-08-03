-- Portfolio CMS Supabase Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)

-- Create Tables
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.about_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  level INT NOT NULL,
  category TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.experiences (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT,
  start_date TEXT,
  end_date TEXT,
  is_current BOOLEAN DEFAULT false,
  description JSONB DEFAULT '[]'::jsonb,
  tech_stack JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.education (
  id TEXT PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  start_year TEXT,
  end_year TEXT,
  grade TEXT,
  achievements TEXT,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech JSONB DEFAULT '[]'::jsonb,
  gradient TEXT,
  image TEXT,
  github_url TEXT,
  live_url TEXT,
  category TEXT DEFAULT 'Full Stack',
  is_featured BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  credential_id TEXT,
  credential_url TEXT,
  image TEXT,
  gradient TEXT,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  caption TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  date_added TEXT,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.resume (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  last_updated TEXT,
  title TEXT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS public.contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.social_links (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  username TEXT NOT NULL,
  subtext TEXT,
  gradient TEXT,
  url TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_read BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.seo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

-- Read Access Policies (Public can view all portfolio content)
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Read About" ON public.about_data FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Experience" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Resume" ON public.resume FOR SELECT USING (true);
CREATE POLICY "Public Read Contact Info" ON public.contact_info FOR SELECT USING (true);
CREATE POLICY "Public Read Social Links" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Public Read SEO" ON public.seo_settings FOR SELECT USING (true);

-- Messages Policy: Anyone can insert messages, only admin can view/delete
CREATE POLICY "Public Insert Messages" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Read Messages" ON public.messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Delete Messages" ON public.messages FOR DELETE USING (auth.role() = 'authenticated');

-- Write Access Policies (Authenticated Admin user can manage content)
CREATE POLICY "Admin Manage Profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Manage About" ON public.about_data FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Manage Skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Manage Experience" ON public.experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Manage Education" ON public.education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Manage Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Manage Certificates" ON public.certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Manage Gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Manage Resume" ON public.resume FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Manage Contact Info" ON public.contact_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Manage Social Links" ON public.social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Manage SEO" ON public.seo_settings FOR ALL USING (auth.role() = 'authenticated');
