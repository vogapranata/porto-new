import { Check, Loader2 } from 'lucide-react'

interface SaveIndicatorProps {
  status: 'idle' | 'saving' | 'saved' | 'error'
}

export default function SaveIndicator({ status }: SaveIndicatorProps) {
  if (status === 'idle') return null

  return (
    <div className="flex items-center gap-2 text-sm">
      {status === 'saving' && (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-gray-500 dark:text-gray-400">Saving...</span>
        </>
      )}
      {status === 'saved' && (
        <>
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-green-600 dark:text-green-400">Saved</span>
        </>
      )}
      {status === 'error' && (
        <span className="text-red-500">Failed to save</span>
      )}
    </div>
  )
}
