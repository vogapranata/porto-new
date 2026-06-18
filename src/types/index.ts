// Language
export type Language = 'id' | 'en'

// Hero
export interface HeroContent {
  name: string
  subtitle: string
  description: string
  image_url: string
  primary_button_text: string
  primary_button_link: string
  secondary_button_text: string
  secondary_button_link: string
}

// About
export interface AboutContent {
  title: string
  description: string
  image_url: string
}

// Skill
export interface Skill {
  id: string
  name: string
  category: string
  icon: string
  level: number
  is_visible: boolean
  sort_order: number
  created_at?: string
  updated_at?: string
}

// Experience
export interface Experience {
  id: string
  position: string
  company: string
  date: string
  description: string
  image_url: string
  sort_order: number
  is_visible: boolean
  created_at?: string
  updated_at?: string
}

// Project
export interface Project {
  id: string
  title: string
  slug: string
  category: string
  client: string
  year: string
  role: string
  description: string
  challenge: string
  solution: string
  result: string
  thumbnail_url: string
  banner_url: string
  gallery_urls: string[]
  tech_stack: string[]
  is_featured: boolean
  is_published: boolean
  sort_order: number
  created_at?: string
  updated_at?: string
}

// Gallery
export interface GalleryItem {
  id: string
  image_url: string
  category: string
  caption: string
  alt_text: string
  is_published: boolean
  sort_order: number
  created_at?: string
  updated_at?: string
}

// Contact
export interface ContactContent {
  title: string
  description: string
  email: string
  whatsapp: string
  instagram: string
  linkedin: string
  github: string
  address: string
}

// Footer
export interface FooterContent {
  logo: string
  description: string
  copyright: string
  social_links: SocialLink[]
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

// SEO
export interface SEOSettings {
  meta_title: string
  meta_description: string
  keywords: string
  og_image_url: string
  favicon_url: string
}

// Site Settings
export interface SiteSettings {
  website_name: string
  default_language: Language
  default_theme: 'light' | 'dark'
  primary_color: string
  dark_mode: boolean
  light_mode: boolean
}

// CMS Data
export interface CMSData {
  hero: HeroContent
  about: AboutContent
  skills: Skill[]
  experience: Experience[]
  projects: Project[]
  gallery: GalleryItem[]
  contact: ContactContent
  footer: FooterContent
  seo: SEOSettings
  settings: SiteSettings
}

// CMS Store State
export interface CMSState {
  cmsData: CMSData
  loading: boolean
  error: string | null
  language: Language
  theme: 'light' | 'dark'
  fetchCMS: () => Promise<void>
  saveCMS: (data: Partial<CMSData>) => Promise<void>
  initializeCMS: () => Promise<void>
  refreshCMS: () => void
  setLanguage: (lang: Language) => void
  setTheme: (theme: 'light' | 'dark') => void
}

// Auth
export interface User {
  id: string
  email: string
  role: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  checkAuth: () => Promise<void>
}
