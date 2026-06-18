import { useCMSStore } from '../../store/cmsStore'
import { motion } from 'framer-motion'
import {
  Target, BarChart3, TrendingUp, Share2, Calendar,
  Palette, Layout, Code2, FileCode, PenTool, Image, Video, Search, PieChart
} from 'lucide-react'
import type { Skill } from '../../types'

const iconMap: Record<string, React.ElementType> = {
  Target, BarChart3, TrendingUp, Share2, Calendar,
  Palette, Layout, Code2, FileCode, PenTool, Image, Video, Search, PieChart
}

function getIcon(iconName: string) {
  return iconMap[iconName] || Target
}

export default function Skills() {
  const { language, cmsData } = useCMSStore()
  const skills = cmsData.skills.filter((s) => s.is_visible)

  const categories = Array.from(new Set(skills.map((s) => s.category)))

  return (
    <section id="skills" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            {language === 'id' ? 'Keahlian' : 'Skills'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {language === 'id' ? 'Skill & Keahlian' : 'Skills & Expertise'}
          </h2>
        </motion.div>

        {categories.map((category) => {
          const catSkills = skills.filter((s) => s.category === category)
          return (
            <div key={category} className="mb-12">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catSkills.map((skill: Skill, index: number) => {
                  const Icon = getIcon(skill.icon)
                  return (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-primary/10 rounded-lg shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {skill.name}
                          </p>
                          <div className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-primary to-primary-400 rounded-full"
                            />
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-primary shrink-0">
                          {skill.level}%
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
