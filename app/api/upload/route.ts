import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_SESSION_COOKIE, ADMIN_TOKEN_COOKIE, isAdminSessionValue } from '@/lib/auth/admin'

function resolveBackendUploadUrl(): string {
  const explicit = process.env.UPLOAD_API_URL?.trim()
  if (explicit) return explicit.replace(/\/$/, '')
  const gql = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/graphql'
  const parsed = new URL(gql)
  return `${parsed.origin}/upload/image`
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  if (!isAdminSessionValue(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const target = resolveBackendUploadUrl()
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const headers = new Headers()
  if (token && token.startsWith('local-admin-')) {
    return NextResponse.json(
      { error: 'Upload requires backend auth token. Please sign in with API-backed admin account.' },
      { status: 401 }
    )
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  let upstream: Response
  try {
    upstream = await fetch(target, {
      method: 'POST',
      body: formData,
      headers,
      cache: 'no-store',
    })
  } catch (error) {
    console.error('Upload upstream request failed:', error)
    return NextResponse.json({ error: 'Upload service unreachable' }, { status: 502 })
  }

  const contentType = upstream.headers.get('content-type') ?? 'application/json'
  const body = await upstream.arrayBuffer()
  return new NextResponse(body, { status: upstream.status, headers: { 'Content-Type': contentType } })
}
