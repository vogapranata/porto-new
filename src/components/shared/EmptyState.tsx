import { Package } from 'lucide-react'
import { cn } from '../../lib/utils'

interface EmptyStateProps {
  message?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export default function EmptyState({ message = 'No data available.', actionLabel, onAction, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <Package className="h-10 w-10 text-gray-400 dark:text-gray-600 mb-4" />
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-600 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
