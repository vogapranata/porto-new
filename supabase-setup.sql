-- Kiki Voga Portfolio CMS - Clean Supabase Setup

-- Drop existing CMS tables if this is a fresh setup
DROP TABLE IF EXISTS cms_hero CASCADE;
DROP TABLE IF EXISTS cms_about CASCADE;
DROP TABLE IF EXISTS cms_contact CASCADE;
DROP TABLE IF EXISTS cms_footer CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS seo_settings CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- HERO
CREATE TABLE cms_hero (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT DEFAULT 'Kiki Voga',
  subtitle TEXT DEFAULT 'Digital Marketing Specialist, UI/UX Designer & Web Developer',
  description TEXT DEFAULT 'Saya membantu brand membangun identitas digital yang kuat melalui strategi marketing, desain visual, website, konten, dan campaign digital yang terukur.',
  image_url TEXT DEFAULT '/images/hero-fullbody.png',
  primary_button_text TEXT DEFAULT 'Lihat Project',
  primary_button_link TEXT DEFAULT '#projects',
  secondary_button_text TEXT DEFAULT 'Hubungi Saya',
  secondary_button_link TEXT DEFAULT '#contact',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ABOUT
CREATE TABLE cms_about (
  id TEXT PRIMARY KEY DEFAULT 'main',
  title TEXT DEFAULT 'Tentang Saya',
  description TEXT DEFAULT 'Saya adalah creative digital talent yang berfokus pada digital marketing, UI/UX design, web development, branding, dan content strategy.',
  image_url TEXT DEFAULT '/images/profile.jpg',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CONTACT
CREATE TABLE cms_contact (
  id TEXT PRIMARY KEY DEFAULT 'main',
  title TEXT DEFAULT 'Mari Bekerja Sama',
  description TEXT DEFAULT 'Jika Anda membutuhkan bantuan untuk digital marketing, desain, website, branding, atau campaign kreatif, saya siap membantu.',
  email TEXT DEFAULT 'hello@kikivoga.com',
  whatsapp TEXT DEFAULT '+6281234567890',
  instagram TEXT DEFAULT 'kikivoga',
  linkedin TEXT DEFAULT 'kikivoga',
  github TEXT DEFAULT 'kikivoga',
  address TEXT DEFAULT 'Yogyakarta, Indonesia',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FOOTER
CREATE TABLE cms_footer (
  id TEXT PRIMARY KEY DEFAULT 'main',
  logo TEXT DEFAULT 'Kiki Voga',
  description TEXT DEFAULT 'Digital Marketing Specialist, UI/UX Designer & Web Developer.',
  copyright TEXT DEFAULT '© 2026 Kiki Voga. All rights reserved.',
  social_links JSONB DEFAULT '[{"name":"Instagram","url":"https://instagram.com/kikivoga","icon":"Instagram"}]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PROJECTS
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT DEFAULT '',
  client TEXT DEFAULT '',
  year TEXT DEFAULT '',
  role TEXT DEFAULT '',
  description TEXT DEFAULT '',
  challenge TEXT DEFAULT '',
  solution TEXT DEFAULT '',
  result TEXT DEFAULT '',
  thumbnail_url TEXT DEFAULT '',
  banner_url TEXT DEFAULT '',
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  tech_stack JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SKILLS
CREATE TABLE skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT DEFAULT '',
  icon TEXT DEFAULT '',
  level INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EXPERIENCES
CREATE TABLE experiences (
  id TEXT PRIMARY KEY,
  position TEXT NOT NULL,
  company TEXT NOT NULL,
  date TEXT DEFAULT '',
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- GALLERY
CREATE TABLE gallery (
  id TEXT PRIMARY KEY,
  caption TEXT DEFAULT '',
  alt_text TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  category TEXT DEFAULT '',
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SEO SETTINGS
CREATE TABLE seo_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  meta_title TEXT DEFAULT 'Kiki Voga - Digital Marketing Specialist & UI/UX Designer',
  meta_description TEXT DEFAULT 'Portfolio Kiki Voga, Digital Marketing Specialist, UI/UX Designer, and Web Developer.',
  keywords TEXT DEFAULT 'digital marketing, UI/UX design, web developer, portfolio',
  og_image_url TEXT DEFAULT '/images/og-image.jpg',
  favicon_url TEXT DEFAULT '/images/favicon.png',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SITE SETTINGS
CREATE TABLE site_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  website_name TEXT DEFAULT 'Kiki Voga Portfolio',
  default_language TEXT DEFAULT 'id',
  default_theme TEXT DEFAULT 'light',
  primary_color TEXT DEFAULT '#6366f1',
  dark_mode BOOLEAN DEFAULT TRUE,
  light_mode BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert singleton default rows
INSERT INTO cms_hero (id) VALUES ('main') ON CONFLICT (id) DO NOTHING;
INSERT INTO cms_about (id) VALUES ('main') ON CONFLICT (id) DO NOTHING;
INSERT INTO cms_contact (id) VALUES ('main') ON CONFLICT (id) DO NOTHING;
INSERT INTO cms_footer (id) VALUES ('main') ON CONFLICT (id) DO NOTHING;
INSERT INTO seo_settings (id) VALUES ('main') ON CONFLICT (id) DO NOTHING;
INSERT INTO site_settings (id) VALUES ('main') ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE cms_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_about ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_footer ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read cms_hero" ON cms_hero FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read cms_about" ON cms_about FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read cms_contact" ON cms_contact FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read cms_footer" ON cms_footer FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read experiences" ON experiences FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read seo_settings" ON seo_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);

-- Authenticated write policies
CREATE POLICY "Auth write cms_hero" ON cms_hero FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write cms_about" ON cms_about FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write cms_contact" ON cms_contact FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write cms_footer" ON cms_footer FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write skills" ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write experiences" ON experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write gallery" ON gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write seo_settings" ON seo_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);