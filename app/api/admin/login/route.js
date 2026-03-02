import { NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME, getAdminSecret, getSessionToken } from '@/lib/admin-auth'

const SEVEN_DAYS = 60 * 60 * 24 * 7

export async function POST(request) {
  const adminSecret = getAdminSecret()
  const adminUsername = process.env.ADMIN_USERNAME || ''
  const adminPassword = process.env.ADMIN_PASSWORD || ''

  if (!adminSecret || !adminUsername || !adminPassword) {
    return NextResponse.json(
      { ok: false, error: 'Admin credentials are not configured on server.' },
      { status: 500 }
    )
  }

  try {
    const payload = await request.json()
    const username = typeof payload?.username === 'string' ? payload.username : ''
    const password = typeof payload?.password === 'string' ? payload.password : ''

    if (!username || !password || username !== adminUsername || password !== adminPassword) {
      return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 })
    }

    const response = NextResponse.json({ ok: true })
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: getSessionToken(),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: SEVEN_DAYS,
    })

    return response
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 })
  }
}
