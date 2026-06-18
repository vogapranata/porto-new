import { useCMSStore } from '../../store/cmsStore'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import type { Experience } from '../../types'

export default function ExperienceSection() {
  const { language, cmsData } = useCMSStore()
  const experiences = cmsData.experience.filter((e) => e.is_visible).sort((a, b) => a.sort_order - b.sort_order)

  return (
    <section id="experience" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            {language === 'id' ? 'Pengalaman' : 'Experience'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {language === 'id' ? 'Pengalaman Kerja' : 'Work Experience'}
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />

          <div className="space-y-8">
            {experiences.map((exp: Experience, index: number) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6"
              >
                <div className="hidden sm:flex flex-col items-center shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-4 border-white dark:border-gray-900">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <div className="flex-1 p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {exp.position}
                    </h3>
                    <span className="text-sm text-primary font-medium px-3 py-1 bg-primary/10 rounded-full shrink-0">
                      {exp.date}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
