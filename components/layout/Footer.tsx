import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

interface FooterProps {
  className?: string
}

const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL ?? ROUTES.HOME
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? ROUTES.HOME

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('w-full border-t border-black/5 bg-[#f5f5f7]', className)}>
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-8 md:py-16">
        <div className="flex max-h-[200px] flex-col items-center justify-center text-center md:hidden">
          <Link className="mb-2 inline-block font-headline text-xl font-black text-[#E53935]" href={ROUTES.HOME}>
            BUSA
          </Link>
          <p className="mb-4 max-w-xs text-sm text-slate-600">Busan shahridagi O&apos;zbekistonlik talabalar uyushmasi.</p>
          <div className="mb-4 flex items-center justify-center gap-4">
            <Link className="text-[15px] text-[#6e6e73]" href={TELEGRAM_URL}>
              Telegram
            </Link>
            <Link className="text-[15px] text-[#6e6e73]" href={INSTAGRAM_URL}>
              Instagram
            </Link>
            <Link className="text-[15px] text-[#6e6e73]" href={ROUTES.HOME}>
              LinkedIn
            </Link>
            <Link className="text-[15px] text-[#6e6e73]" href={ROUTES.HOME}>
              YouTube
            </Link>
          </div>
          <div className="text-center text-[12px] text-slate-500">© 2024 BUSA Student Association. Barcha huquqlar himoyalangan.</div>
        </div>

        <div className="hidden grid-cols-1 gap-10 text-sm leading-relaxed md:grid md:grid-cols-4 md:text-left">
          <div className="md:col-span-1">
            <Link className="mb-4 inline-block font-headline text-xl font-black text-[#E53935]" href={ROUTES.HOME}>
              BUSA
            </Link>
            <p className="max-w-xs text-slate-600">Busan shahridagi O&apos;zbekistonlik talabalar uyushmasi.</p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-900">Ijtimoiy Tarmoqlar</h4>
            <ul className="space-y-2.5">
              <li>
                <Link className="text-slate-600 transition-colors hover:text-[#0a66ff]" href={TELEGRAM_URL}>
                  Telegram
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 transition-colors hover:text-[#0a66ff]" href={INSTAGRAM_URL}>
                  Instagram
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 transition-colors hover:text-[#0a66ff]" href={ROUTES.HOME}>
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 transition-colors hover:text-[#0a66ff]" href={ROUTES.HOME}>
                  YouTube
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-900">Ma&apos;lumot</h4>
            <ul className="space-y-2.5">
              <li>
                <Link className="text-slate-600 transition-colors hover:text-[#0a66ff]" href={ROUTES.ABOUT}>
                  Bog&apos;lanish
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 transition-colors hover:text-[#0a66ff]" href={ROUTES.HOME}>
                  Maxfiylik siyosati
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-900">Manzil</h4>
            <p className="text-slate-600">South Korea, Busan, Nam-gu, Daeyeon-dong</p>
            <div className="mt-4 font-semibold text-[#0a66ff]">info@busa.uz</div>
          </div>
        </div>

        <div className="mt-10 hidden border-t border-black/5 pt-6 text-center text-xs text-slate-500 md:block">
          © 2024 BUSA Student Association. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  )
}

export default Footer
