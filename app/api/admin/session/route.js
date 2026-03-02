import { NextResponse } from 'next/server'
import { getAdminSecret, isAdminRequest } from '@/lib/admin-auth'

export async function GET(request) {
  const configured = Boolean(
    getAdminSecret() && process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD
  )

  return NextResponse.json({
    ok: true,
    configured,
    authenticated: isAdminRequest(request),
  })
}
