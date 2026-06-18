import { useCMSStore } from '../../store/cmsStore'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Instagram, Linkedin, Github, MapPin } from 'lucide-react'

export default function Contact() {
  const { language, cmsData } = useCMSStore()
  const contact = cmsData.contact

  const links = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: MessageCircle, label: 'WhatsApp', value: contact.whatsapp, href: contact.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}` : undefined },
    { icon: Instagram, label: 'Instagram', value: contact.instagram, href: contact.instagram ? `https://instagram.com/${contact.instagram.replace('@', '')}` : undefined },
    { icon: Linkedin, label: 'LinkedIn', value: contact.linkedin, href: contact.linkedin || undefined },
    { icon: Github, label: 'GitHub', value: contact.github, href: contact.github || undefined },
    { icon: MapPin, label: 'Address', value: contact.address, href: undefined },
  ].filter((l) => l.value)

  return (
    <section id="contact" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              {language === 'id' ? 'Kontak' : 'Contact'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {contact.title}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {contact.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            {links.map((link, index) => {
              const Icon = link.icon
              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200 group"
                    >
                      <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{link.label}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">{link.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                      <div className="p-2.5 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{link.label}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{link.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
