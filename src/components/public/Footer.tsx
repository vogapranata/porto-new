import { useCMSStore } from '../../store/cmsStore'
import { motion } from 'framer-motion'
import { ArrowUp, Instagram, Linkedin, Github } from 'lucide-react'

const socialIconMap: Record<string, React.ElementType> = {
  Instagram, Linkedin, Github
}

export default function Footer() {
  const { language, cmsData } = useCMSStore()
  const footer = cmsData.footer

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {footer.logo}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {footer.description}
            </p>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              {language === 'id' ? 'Navigasi' : 'Navigation'}
            </h4>
            <div className="space-y-2">
              {['about', 'skills', 'experience', 'projects', 'gallery', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className="block text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              {language === 'id' ? 'Sosial Media' : 'Social Media'}
            </h4>
            <div className="flex gap-3">
              {footer.social_links.map((link) => {
                const Icon = socialIconMap[link.icon] || Instagram
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors group"
                    title={link.name}
                  >
                    <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800 gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {footer.copyright}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
