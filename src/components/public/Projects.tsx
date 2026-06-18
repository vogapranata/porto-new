import { useCMSStore } from '../../store/cmsStore'
import { motion } from 'framer-motion'
import { Folder, ArrowUpRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../../types'
import ImagePreview from '../shared/ImagePreview'

export default function Projects() {
  const { language, cmsData } = useCMSStore()
  const projects = cmsData.projects
    .filter((p) => p.is_published)
    .sort((a, b) => a.sort_order - b.sort_order)

  const featured = projects.filter((p) => p.is_featured)
  const others = projects.filter((p) => !p.is_featured)

  const renderProjectCard = (project: Project, index: number, size: 'large' | 'normal' = 'normal') => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/project/${project.slug}`} className="group block">
        <div className={
          "relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 " +
          "hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300"
        }>
          <div className={size === 'large' ? 'aspect-[16/10]' : 'aspect-video'}>
            <ImagePreview
              src={project.thumbnail_url}
              alt={project.title}
              className="w-full h-full"
              aspect="auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex items-center gap-2 text-white">
                <span className="text-sm font-medium">{language === 'id' ? 'Lihat Detail' : 'View Details'}</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              {project.is_featured && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">
                  <Star className="h-3 w-3 fill-current" />
                  Featured
                </span>
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400">{project.category}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {project.client} · {project.year}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tech_stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
                >
                  {tech}
                </span>
              ))}
              {project.tech_stack.length > 3 && (
                <span className="text-xs text-gray-400 dark:text-gray-500">+{project.tech_stack.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )

  return (
    <section id="projects" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Folder className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              {language === 'id' ? 'Portfolio' : 'Portfolio'}
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {language === 'id' ? 'Project Terbaru' : 'Latest Projects'}
          </h2>
        </motion.div>

        {featured.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {featured.map((p, i) => renderProjectCard(p, i, 'large'))}
          </div>
        )}

        {others.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((p, i) => renderProjectCard(p, i + featured.length))}
          </div>
        )}
      </div>
    </section>
  )
}
