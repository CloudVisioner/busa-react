import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import {
  ADMIN_ROLE_COOKIE,
  ADMIN_SESSION_COOKIE,
  ADMIN_TOKEN_COOKIE,
  getDefaultDashboardForRole,
  isAdminSessionValue,
  isValidAdminRole,
} from '@/lib/auth/admin'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const isAdminPath = pathname.startsWith('/admin')
  const isMentorPath = pathname.startsWith('/mentor')
  if (!isAdminPath && !isMentorPath) {
    return NextResponse.next()
  }

  const isLoginPage = pathname === '/admin/login'
  const sessionValue = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value
  const roleValue = request.cookies.get(ADMIN_ROLE_COOKIE)?.value
  const role = isValidAdminRole(roleValue) ? roleValue : null
  const isAuthenticated = isAdminSessionValue(sessionValue) && Boolean(token) && Boolean(role)

  if (isLoginPage && isAuthenticated && role) {
    return NextResponse.redirect(new URL(getDefaultDashboardForRole(role), request.url))
  }

  if (!isLoginPage && !isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('next', `${pathname}${search}`)
    return NextResponse.redirect(loginUrl)
  }

  if (!isLoginPage && role === 'ADMIN' && isAdminPath) {
    return NextResponse.redirect(new URL('/mentor/dashboard', request.url))
  }

  if (role === 'SUPER_ADMIN' && isMentorPath) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/mentor/:path*'],
}
