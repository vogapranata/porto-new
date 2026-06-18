import { useCMSStore } from '../../store/cmsStore'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import ImagePreview from '../shared/ImagePreview'

export default function Hero() {
  const { language, theme, cmsData } = useCMSStore()
  const hero = cmsData.hero

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm font-semibold text-primary uppercase tracking-wider mb-4"
            >
              {language === 'id' ? 'Creative Digital Talent' : 'Creative Digital Talent'}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
            >
              {hero.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-primary font-medium mb-4"
            >
              {hero.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-base text-gray-600 dark:text-gray-300 max-w-xl mb-8 leading-relaxed"
            >
              {hero.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => scrollTo(hero.primary_button_link || '#projects')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-600 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
              >
                {hero.primary_button_text}
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollTo(hero.secondary_button_link || '#contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Mail className="h-4 w-4" />
                {hero.secondary_button_text}
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-3xl blur-2xl" />
              <div className={
                "relative rounded-3xl overflow-hidden shadow-2xl border-4 " +
                (theme === 'dark' ? 'border-gray-800' : 'border-white')
              }>
                <ImagePreview
                  src={hero.image_url}
                  alt="Kiki Voga"
                  className="w-full max-w-md aspect-[3/4] object-cover"
                  fallback={language === 'id' ? 'Foto Hero' : 'Hero Image'}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-500 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500"
          />
        </div>
      </motion.div>
    </section>
  )
}
