import Link from 'next/link'
import { Inter } from 'next/font/google'
import { MdArrowForward, MdLock, MdMail, MdSchool } from 'react-icons/md'

const inter = Inter({ subsets: ['latin'] })

interface AdminLoginPageProps {
  searchParams?: Promise<{
    error?: string
    next?: string
  }>
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const resolvedParams = (await searchParams) ?? {}
  const hasError = resolvedParams.error === '1'
  const nextPath = resolvedParams.next?.startsWith('/admin') ? resolvedParams.next : '/admin/dashboard'

  return (
    <main className={`${inter.className} flex min-h-screen items-center justify-center bg-[#f5f5f7] px-4 py-10 text-[#1d1d1f]`}>
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00236f]">
            <MdSchool className="text-xl text-white" />
          </div>
          <div>
            <p className="text-base font-semibold text-[#00236f]">BUSA Admin Panel</p>
            <p className="text-xs text-[#86868b]">Secure management portal</p>
          </div>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">Kirish</h1>
        <p className="mt-1 text-sm text-[#6e6e73]">Email va parol bilan tizimga kiring.</p>

        <form action="/api/admin/login" className="mt-6 space-y-4" method="post">
          <input type="hidden" name="next" value={nextPath} />
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-[#6e6e73]">Email</span>
            <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-3 py-2.5 focus-within:border-[#00236f] focus-within:ring-2 focus-within:ring-[#00236f]/20">
              <MdMail className="text-lg text-[#6e6e73]" />
              <input
                autoComplete="email"
                className="w-full bg-transparent text-sm outline-none"
                name="email"
                placeholder="administrator@busa.uz"
                required
                type="email"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-[#6e6e73]">Password</span>
            <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-3 py-2.5 focus-within:border-[#00236f] focus-within:ring-2 focus-within:ring-[#00236f]/20">
              <MdLock className="text-lg text-[#6e6e73]" />
              <input autoComplete="current-password" className="w-full bg-transparent text-sm outline-none" name="password" placeholder="Parolni kiriting" required type="password" />
            </div>
          </label>

          {hasError ? <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">Login failed. Iltimos, qayta urinib ko&apos;ring.</p> : null}

          <button className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00236f] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95" type="submit">
            Kirish
            <MdArrowForward className="text-base" />
          </button>
        </form>

        <div className="mt-5 text-center text-sm">
          <Link className="text-[#6e6e73] hover:text-[#1d1d1f]" href="/">
            Saytga qaytish
          </Link>
        </div>
      </section>
    </main>
  )
}
