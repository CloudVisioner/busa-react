'use client'

import { cn } from '@/lib/utils/cn'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function FormInput({ label, error, className, id, ...props }: FormInputProps) {
  const inputId = id ?? props.name

  return (
    <label className="block">
      {label ? <span className="mb-1.5 block text-sm font-medium text-[#1d1d1f]">{label}</span> : null}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-[#1d1d1f] outline-none transition focus:border-[#00236f] focus:ring-2 focus:ring-[#00236f]/20',
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : '',
          className
        )}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  )
}
