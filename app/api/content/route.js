import { NextResponse } from 'next/server'
import { getSiteContent, saveSiteContent } from '@/lib/site-content-store'
import { isAdminRequest } from '@/lib/admin-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const content = await getSiteContent()
  return NextResponse.json({ ok: true, content })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: 'GET, PUT, OPTIONS',
    },
  })
}

export async function PUT(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON payload' }, { status: 400 })
  }

  try {
    const content = await saveSiteContent(payload)
    return NextResponse.json({ ok: true, content })
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Failed to save content. Check Firebase admin environment variables.' },
      { status: 500 }
    )
  }
}
