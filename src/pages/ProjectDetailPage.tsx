import { useParams, useNavigate } from 'react-router-dom'
import { useCMSStore } from '../store/cmsStore'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Users, Wrench, Star, Eye } from 'lucide-react'
import ImagePreview from '../components/shared/ImagePreview'
import type { Project } from '../types'

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { language, cmsData } = useCMSStore()
  const project = cmsData.projects.find((p: Project) => p.slug === slug)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {language === 'id' ? 'Project tidak ditemukan' : 'Project not found'}
          </h1>
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:underline"
          >
            {language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {project.category}
            </span>
            {project.is_featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 rounded-full">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </span>
            )}
            <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${project.is_published ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
              <Eye className="h-3 w-3" />
              {project.is_published ? (language === 'id' ? 'Dipublikasikan' : 'Published') : (language === 'id' ? 'Draf' : 'Draft')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {project.title}
          </h1>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Users className="h-4 w-4 text-primary" />
              <span><strong>{language === 'id' ? 'Klien:' : 'Client:'}</strong> {project.client}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Calendar className="h-4 w-4 text-primary" />
              <span><strong>{language === 'id' ? 'Tahun:' : 'Year:'}</strong> {project.year}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Wrench className="h-4 w-4 text-primary" />
              <span><strong>{language === 'id' ? 'Peran:' : 'Role:'}</strong> {project.role}</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden mb-12 shadow-lg">
            <ImagePreview
              src={project.banner_url}
              alt={project.title}
              className="w-full aspect-video"
              aspect="auto"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {language === 'id' ? 'Deskripsi' : 'Description'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {language === 'id' ? 'Tantangan' : 'Challenge'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {language === 'id' ? 'Solusi' : 'Solution'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {language === 'id' ? 'Hasil' : 'Result'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.result}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                  {language === 'id' ? 'Tech Stack' : 'Tech Stack'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.gallery_urls.length > 0 && (
                <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                    {language === 'id' ? 'Galeri' : 'Gallery'}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {project.gallery_urls.map((url, index) => (
                      <ImagePreview
                        key={index}
                        src={url}
                        alt={`Gallery ${index + 1}`}
                        className="rounded-lg aspect-square"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
