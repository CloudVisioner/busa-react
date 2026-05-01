import { NextResponse } from 'next/server'
import {
  ADMIN_ROLE_COOKIE,
  ADMIN_SESSION_COOKIE,
  ADMIN_TOKEN_COOKIE,
  getAdminSessionValue,
  getDefaultDashboardForRole,
  isValidAdminRole,
} from '@/lib/auth/admin'

const SIGNUP_MUTATION = `
  mutation Signup($email: String!, $password: String!) {
    signup(input: { email: $email, password: $password }) {
      token
      email
      role
    }
  }
`

interface SignupResponse {
  data?: {
    signup?: {
      token?: string
      email?: string
      role?: string
    }
  }
  errors?: Array<{ message?: string }>
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const nextPathRaw = String(formData.get('next') ?? '')

  if (!email || password.length < 8) {
    return NextResponse.redirect(new URL('/signup?error=1', request.url), { status: 303 })
  }

  const graphqlEndpoint = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/graphql'

  let payload: SignupResponse | null = null
  try {
    const response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: SIGNUP_MUTATION,
        variables: { email, password },
      }),
      cache: 'no-store',
    })
    payload = (await response.json()) as SignupResponse
  } catch (error) {
    console.error('Signup request failed:', error)
  }

  const token = payload?.data?.signup?.token ?? ''
  const roleValue = payload?.data?.signup?.role
  if (!token || !isValidAdminRole(roleValue)) {
    return NextResponse.redirect(new URL('/signup?error=1', request.url), { status: 303 })
  }

  const role = roleValue
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
    httpOnly: false,
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
