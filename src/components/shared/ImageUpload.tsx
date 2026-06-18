import { useState, useRef, useCallback } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { uploadImage, validateImageFile } from '../../services/mediaService'
import { cn } from '../../lib/utils'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  folder: string
  label?: string
  className?: string
  placeholder?: string
}

export default function ImageUpload({
  value,
  onChange,
  folder,
  label,
  className,
  placeholder = 'Drag & drop or click to upload',
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    async (file: File) => {
      const validation = validateImageFile(file)
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
        return
      }

      setError(null)
      setIsUploading(true)

      // Create local preview immediately
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      try {
        const url = await uploadImage(file, folder)
        onChange(url)
        setPreview(url)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Upload failed'
        setError(message)
        if (value) setPreview(value)
      } finally {
        setIsUploading(false)
      }
    },
    [folder, onChange, value]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
      e.target.value = ''
    },
    [handleFile]
  )

  const handleRemove = useCallback(() => {
    setPreview(null)
    onChange('')
    setError(null)
  }, [onChange])

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div
        ref={inputRef}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={cn(
          'relative border-2 border-dashed rounded-xl cursor-pointer transition-colors overflow-hidden',
          'border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary-400',
          'bg-gray-50 dark:bg-gray-800/50',
          preview ? 'aspect-video' : 'py-8'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
          onChange={handleChange}
          className="hidden"
        />

        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRemove()
              }}
              className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-lg text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center px-4">
            {isUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            ) : (
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isUploading ? 'Uploading...' : placeholder}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              PNG, JPG, JPEG, WEBP, SVG (max 5MB)
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
