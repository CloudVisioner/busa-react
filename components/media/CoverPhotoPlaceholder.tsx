import { FiImage } from 'react-icons/fi'
import { cn } from '@/lib/utils/cn'

export function CoverPhotoPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex items-center justify-center bg-gray-200 text-gray-400', className)}
      role="img"
      aria-label="Rasm mavjud emas"
    >
      <FiImage className="h-10 w-10 shrink-0" aria-hidden />
    </div>
  )
}
