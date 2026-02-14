import { NextResponse } from 'next/server'
import { getAdminSecret, isAdminRequest } from '@/lib/admin-auth'

export async function GET(request) {
  return NextResponse.json({
    ok: true,
    configured: Boolean(getAdminSecret()),
    authenticated: isAdminRequest(request),
  })
}
