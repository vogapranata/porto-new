import { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface FormFieldProps {
  label: string
  children: ReactNode
  required?: boolean
  error?: string
  className?: string
}

export function FormField({ label, children, required, error, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export function FormInput({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full px-3 py-2 rounded-lg border text-sm transition-colors',
        'bg-white dark:bg-gray-800',
        'text-gray-900 dark:text-white',
        'border-gray-300 dark:border-gray-600',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
        className
      )}
      {...props}
    />
  )
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export function FormTextArea({ className, error, ...props }: TextAreaProps) {
  return (
    <textarea
      className={cn(
        'w-full px-3 py-2 rounded-lg border text-sm transition-colors resize-y',
        'bg-white dark:bg-gray-800',
        'text-gray-900 dark:text-white',
        'border-gray-300 dark:border-gray-600',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
        className
      )}
      {...props}
    />
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
  error?: string
}

export function FormSelect({ options, className, error, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'w-full px-3 py-2 rounded-lg border text-sm transition-colors',
        'bg-white dark:bg-gray-800',
        'text-gray-900 dark:text-white',
        'border-gray-300 dark:border-gray-600',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
        className
      )}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
}

export function FormToggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative w-11 h-6 rounded-full transition-colors',
          checked ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm',
            checked && 'translate-x-5'
          )}
        />
      </button>
      {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
    </label>
  )
}

export function FormActions({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700', className)}>
      {children}
    </div>
  )
}

export function FormButton({
  children,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }) {
  const variants = {
    primary: 'bg-primary hover:bg-primary-600 text-white',
    secondary: 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  }

  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
        variants[variant],
        props.disabled && 'opacity-50 cursor-not-allowed'
      )}
      {...props}
    >
      {children}
    </button>
  )
}
