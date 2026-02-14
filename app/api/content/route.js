import { NextResponse } from 'next/server'
import { getSiteContent, saveSiteContent } from '@/lib/site-content-store'
import { isAdminRequest } from '@/lib/admin-auth'

export async function GET() {
  const content = await getSiteContent()
  return NextResponse.json({ ok: true, content })
}

export async function PUT(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await request.json()
    const content = await saveSiteContent(payload)
    return NextResponse.json({ ok: true, content })
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 })
  }
}
