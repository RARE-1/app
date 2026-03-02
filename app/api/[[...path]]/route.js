import { NextResponse } from 'next/server'

const allowedOrigin = process.env.CORS_ORIGINS || 'https://btiweb.vercel.app'

const buildPath = (params) => {
  if (!params?.path || params.path.length === 0) {
    return ''
  }
  return params.path.join('/')
}

const withCors = (response) => {
  response.headers.set('Access-Control-Allow-Origin', allowedOrigin)
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

export async function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }))
}

export async function GET(request, { params }) {
  const path = buildPath(params)

  if (!path || path === 'health') {
    return withCors(NextResponse.json({
      ok: true,
      service: 'Brothers Travel India API',
      timestamp: new Date().toISOString(),
    }))
  }

  return withCors(NextResponse.json(
    {
      ok: false,
      error: 'Not Found',
      path,
    },
    { status: 404 }
  ))
}

export async function POST(request, { params }) {
  const path = buildPath(params)

  if (path === 'enquiries') {
    return withCors(NextResponse.json(
      {
        ok: false,
        message: 'Enquiries endpoint is not connected yet. Connect Firebase to enable persistence.',
      },
      { status: 501 }
    ))
  }

  return withCors(NextResponse.json(
    {
      ok: false,
      error: 'Not Found',
      path,
    },
    { status: 404 }
  ))
}
