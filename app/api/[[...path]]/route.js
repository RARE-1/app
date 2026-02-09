import { NextResponse } from 'next/server'

const buildPath = (params) => {
  if (!params?.path || params.path.length === 0) {
    return ''
  }
  return params.path.join('/')
}

export async function GET(request, { params }) {
  const path = buildPath(params)

  if (!path || path === 'health') {
    return NextResponse.json({
      ok: true,
      service: 'Brothers Travel India API',
      timestamp: new Date().toISOString(),
    })
  }

  return NextResponse.json(
    {
      ok: false,
      error: 'Not Found',
      path,
    },
    { status: 404 }
  )
}

export async function POST(request, { params }) {
  const path = buildPath(params)

  if (path === 'enquiries') {
    return NextResponse.json(
      {
        ok: false,
        message: 'Enquiries endpoint is not connected yet. Connect Firebase to enable persistence.',
      },
      { status: 501 }
    )
  }

  return NextResponse.json(
    {
      ok: false,
      error: 'Not Found',
      path,
    },
    { status: 404 }
  )
}
