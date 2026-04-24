import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_SESSION_COOKIE, ADMIN_TOKEN_COOKIE, isAdminSessionValue } from '@/lib/auth/admin'

function resolveBackendUploadUrl(): string {
  const explicit = process.env.UPLOAD_API_URL?.trim()
  if (explicit) return explicit.replace(/\/$/, '')
  const gql = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/graphql'
  const parsed = new URL(gql)
  return `${parsed.origin}/upload`
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  if (!isAdminSessionValue(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const target = resolveBackendUploadUrl()
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value

  const formData = await request.formData()

  const headers = new Headers()
  if (token && !token.startsWith('local-admin-')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const upstream = await fetch(target, {
    method: 'POST',
    body: formData,
    headers,
    cache: 'no-store',
  })

  const contentType = upstream.headers.get('content-type') ?? 'application/json'
  const body = await upstream.arrayBuffer()
  return new NextResponse(body, { status: upstream.status, headers: { 'Content-Type': contentType } })
}
