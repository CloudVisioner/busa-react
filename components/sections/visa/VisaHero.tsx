import { FiSearch } from 'react-icons/fi'
import { cn } from '@/lib/utils/cn'

interface VisaHeroProps {
  className?: string
}

function VisaHero({ className }: VisaHeroProps) {
  return (
    <div className={cn('mb-20', className)}>
      <div className="max-w-3xl">
        <h1 className="mb-6 font-headline text-7xl font-bold leading-none tracking-tighter text-primary md:text-9xl">Viza bo&apos;limi</h1>
        <p className="mb-8 max-w-2xl text-lg font-light leading-relaxed text-outline md:text-xl">
          Koreyadagi har bir viza — oddiy tilda. Talabalar va yosh mutaxassislar uchun aniq, tushunarli ma&apos;lumotlar.
        </p>
        <div className="group relative max-w-xl">
          <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center">
            <FiSearch className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-[#00236f]" />
          </div>
          <input
            type="text"
            placeholder="Savol yozing... 🔍"
            className="w-full rounded-full border border-slate-200 bg-white py-4 pl-16 pr-8 text-lg text-on-surface shadow-sm placeholder:text-slate-400 focus:border-[#00236f] focus:outline-none focus:ring-2 focus:ring-[#00236f]/25"
          />
        </div>
      </div>
    </div>
  )
}

export default VisaHero
