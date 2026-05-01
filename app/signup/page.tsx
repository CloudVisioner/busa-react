import Link from 'next/link'
import { Inter } from 'next/font/google'
import { MdArrowForward, MdLock, MdMail, MdSchool } from 'react-icons/md'

const inter = Inter({ subsets: ['latin'] })

interface SignupPageProps {
  searchParams?: Promise<{
    error?: string
    next?: string
  }>
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const resolvedParams = (await searchParams) ?? {}
  const hasError = resolvedParams.error === '1'
  const nextPath = resolvedParams.next?.startsWith('/admin') || resolvedParams.next?.startsWith('/mentor') ? resolvedParams.next : '/admin/dashboard'

  return (
    <main className={`${inter.className} flex min-h-screen items-center justify-center bg-[#f5f5f7] px-4 py-8 text-[#1d1d1f]`}>
      <section className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-[0_20px_52px_rgba(15,23,42,0.12)]">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00236f]">
            <MdSchool className="text-xl text-white" />
          </div>
          <div>
            <p className="text-base font-semibold text-[#00236f]">BUSA Auth</p>
            <p className="text-xs text-[#86868b]">JWT signup</p>
          </div>
        </div>

        <h1 className="text-xl font-semibold tracking-tight">Signup</h1>
        <p className="mt-1 text-sm text-[#6e6e73]">Create your account (password min 8 chars).</p>

        <form action="/api/admin/signup" className="mt-5 space-y-3.5" method="post">
          <input type="hidden" name="next" value={nextPath} />
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-[#6e6e73]">Email</span>
            <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-3 py-2.5 focus-within:border-[#00236f] focus-within:ring-2 focus-within:ring-[#00236f]/20">
              <MdMail className="text-lg text-[#6e6e73]" />
              <input autoComplete="email" className="w-full bg-transparent text-sm outline-none" name="email" placeholder="you@busa.uz" required type="email" />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-[#6e6e73]">Password</span>
            <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-3 py-2.5 focus-within:border-[#00236f] focus-within:ring-2 focus-within:ring-[#00236f]/20">
              <MdLock className="text-lg text-[#6e6e73]" />
              <input autoComplete="new-password" className="w-full bg-transparent text-sm outline-none" minLength={8} name="password" placeholder="Minimum 8 characters" required type="password" />
            </div>
          </label>

          {hasError ? <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">Signup failed. Email might already exist, or backend is unavailable.</p> : null}

          <button className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00236f] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95" type="submit">
            Create account
            <MdArrowForward className="text-base" />
          </button>
        </form>

        <div className="mt-5 flex items-center justify-between text-sm">
          <Link className="text-[#6e6e73] hover:text-[#1d1d1f]" href="/">
            Back to site
          </Link>
          <Link className="text-[#00236f] hover:opacity-80" href="/login">
            I already have an account
          </Link>
        </div>
      </section>
    </main>
  )
}
