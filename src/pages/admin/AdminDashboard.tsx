import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useCMSStore } from '../../store/cmsStore'
import { motion } from 'framer-motion'
import {
  FolderOpen, Image, Star, Wrench,
  Globe, Settings, LogOut, TrendingUp
} from 'lucide-react'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { signOut } = useAuthStore()
  const { cmsData } = useCMSStore()

  useEffect(() => {
    const title = document.querySelector('title')
    if (title) title.textContent = 'Dashboard - Admin'
  }, [])

  const stats = [
    { label: 'Projects', value: cmsData.projects.length, icon: FolderOpen, color: 'bg-blue-500', link: '/admin/projects' },
    { label: 'Featured', value: cmsData.projects.filter(p => p.is_featured).length, icon: Star, color: 'bg-amber-500', link: '/admin/projects' },
    { label: 'Gallery', value: cmsData.gallery.length, icon: Image, color: 'bg-purple-500', link: '/admin/gallery' },
    { label: 'Skills', value: cmsData.skills.length, icon: Wrench, color: 'bg-green-500', link: '/admin/skills' },
  ]

  const quickLinks = [
    { label: 'Edit Content', icon: Globe, path: '/admin/content', desc: 'Hero, About, Contact, Footer' },
    { label: 'Manage Projects', icon: FolderOpen, path: '/admin/projects', desc: 'Add, edit, and publish projects' },
    { label: 'Gallery Manager', icon: Image, path: '/admin/gallery', desc: 'Upload and organize gallery images' },
    { label: 'SEO Settings', icon: TrendingUp, path: '/admin/seo', desc: 'Meta tags, keywords, OG image' },
    { label: 'Site Settings', icon: Settings, path: '/admin/settings', desc: 'Theme, language, colors' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back to your portfolio CMS</p>
        </div>
        <button
          onClick={() => { signOut(); navigate('/admin/login') }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(stat.link)}
            className="p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/30 cursor-pointer transition-all"
          >
            <div className={`inline-flex p-2 rounded-lg ${stat.color} bg-opacity-10 mb-3`}>
              <stat.icon className={`h-5 w-5 ${stat.color.replace('bg-', 'text-')}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h2>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="w-full text-left flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <link.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">{link.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{link.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Projects</h2>
          <div className="space-y-3">
            {cmsData.projects.slice(0, 5).map((project) => (
              <button
                key={project.id}
                onClick={() => navigate('/admin/projects')}
                className="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-500 dark:text-gray-400">
                  {project.title[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{project.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{project.category} · {project.year}</p>
                </div>
                <span className={`px-2 py-0.5 text-xs rounded-full ${project.is_published ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                  {project.is_published ? 'Published' : 'Draft'}
                </span>
              </button>
            ))}
            {cmsData.projects.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No projects yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
