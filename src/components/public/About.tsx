import { useCMSStore } from '../../store/cmsStore'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import ImagePreview from '../shared/ImagePreview'

export default function About() {
  const { language, cmsData } = useCMSStore()
  const about = cmsData.about

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <ImagePreview
                src={about.image_url}
                alt="About"
                className="w-full aspect-[4/5] object-cover"
                fallback={language === 'id' ? 'Foto Profil' : 'Profile Image'}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                {language === 'id' ? 'Tentang Saya' : 'About Me'}
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {about.title}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {about.description}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <p className="text-2xl font-bold text-primary">5+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {language === 'id' ? 'Tahun Pengalaman' : 'Years Experience'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <p className="text-2xl font-bold text-primary">50+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {language === 'id' ? 'Project Selesai' : 'Projects Completed'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <p className="text-2xl font-bold text-primary">20+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {language === 'id' ? 'Klien Puas' : 'Happy Clients'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <p className="text-2xl font-bold text-primary">14+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {language === 'id' ? 'Skill Keahlian' : 'Expert Skills'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
