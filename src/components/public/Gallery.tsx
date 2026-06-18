import { useCMSStore } from '../../store/cmsStore'
import { motion } from 'framer-motion'
import { Images } from 'lucide-react'
import ImagePreview from '../shared/ImagePreview'
import type { GalleryItem } from '../../types'
import { useState } from 'react'

export default function Gallery() {
  const { language, cmsData } = useCMSStore()
  const gallery = cmsData.gallery.filter((g: GalleryItem) => g.is_published).sort((a, b) => a.sort_order - b.sort_order)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const categories = ['All', ...Array.from(new Set(gallery.map((g) => g.category)))]
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? gallery
    : gallery.filter((g) => g.category === activeCategory)

  return (
    <section id="gallery" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Images className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              {language === 'id' ? 'Galeri' : 'Gallery'}
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {language === 'id' ? 'Galeri Karya' : 'Work Gallery'}
          </h2>
        </motion.div>

        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item: GalleryItem, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800"
              onClick={() => setSelectedImage(item.image_url)}
            >
              <ImagePreview
                src={item.image_url}
                alt={item.alt_text || item.caption}
                className="w-full h-full"
                aspect="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Gallery"
              className="max-w-full max-h-full rounded-lg object-contain"
            />
          </div>
        )}
      </div>
    </section>
  )
}
