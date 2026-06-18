import { AlertCircle } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
  className?: string
}

export default function ErrorState({ message = 'Something went wrong.', onRetry, className }: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-600 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
