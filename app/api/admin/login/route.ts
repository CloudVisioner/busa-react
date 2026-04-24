import { NextResponse } from 'next/server'
import {
  ADMIN_ROLE_COOKIE,
  ADMIN_SESSION_COOKIE,
  ADMIN_TOKEN_COOKIE,
  getAdminRole,
  getAdminSessionValue,
  getDefaultDashboardForRole,
  isValidAdminCredentials,
  isValidAdminRole,
} from '@/lib/auth/admin'

const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      user {
        id
        email
        role
      }
    }
  }
`

interface LoginResponse {
  data?: {
    login?: {
      access_token?: string
      user?: {
        id?: string
        email?: string
        role?: string
      }
    }
  }
  errors?: Array<{ message?: string }>
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const nextPathRaw = String(formData.get('next') ?? '')

  const graphqlEndpoint = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/graphql'

  let payload: LoginResponse | null = null
  try {
    const response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: LOGIN_MUTATION,
        variables: { email, password },
      }),
      cache: 'no-store',
    })
    payload = (await response.json()) as LoginResponse
  } catch (error) {
    console.error('Admin login request failed:', error)
  }

  const tokenFromApi = payload?.data?.login?.access_token
  const roleFromApi = payload?.data?.login?.user?.role
  const apiLoginSucceeded = Boolean(tokenFromApi) && isValidAdminRole(roleFromApi)

  let token = tokenFromApi ?? ''
  let role = roleFromApi

  if (!apiLoginSucceeded && isValidAdminCredentials(email, password)) {
    role = getAdminRole()
    token = `local-admin-${Date.now()}`
  }

  if (!token || !isValidAdminRole(role)) {
    return NextResponse.redirect(new URL('/admin/login?error=1', request.url), { status: 303 })
  }

  const defaultPath = getDefaultDashboardForRole(role)
  const isAllowedNext = role === 'SUPER_ADMIN' ? nextPathRaw.startsWith('/admin') : nextPathRaw.startsWith('/mentor')
  const redirectPath = isAllowedNext ? nextPathRaw : defaultPath

  const response = NextResponse.redirect(new URL(redirectPath, request.url), { status: 303 })
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: getAdminSessionValue(),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  response.cookies.set({
    name: ADMIN_TOKEN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  response.cookies.set({
    name: ADMIN_ROLE_COOKIE,
    value: role,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  return response
}
