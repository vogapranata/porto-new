import { cn } from '../../lib/utils'

interface ImagePreviewProps {
  src: string
  alt?: string
  className?: string
  aspect?: 'square' | 'video' | 'auto'
  fallback?: string
}

export default function ImagePreview({
  src,
  alt = 'Image',
  className,
  aspect = 'auto',
  fallback,
}: ImagePreviewProps) {
  if (!src) {
    if (fallback) {
      return (
        <div className={cn('bg-gray-100 dark:bg-gray-800 flex items-center justify-center', className)}>
          <span className="text-sm text-gray-500 dark:text-gray-400">{fallback}</span>
        </div>
      )
    }
    return null
  }

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: '',
  }

  return (
    <div className={cn('overflow-hidden rounded-lg', aspectClasses[aspect], className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none'
        }}
      />
    </div>
  )
}
