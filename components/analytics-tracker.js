'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function App({ analyticsId }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!analyticsId || typeof window === 'undefined' || typeof window.gtag !== 'function') {
      return
    }

    const query = searchParams?.toString()
    const url = query ? `${pathname}?${query}` : pathname

    window.gtag('config', analyticsId, {
      page_path: url,
    })
  }, [analyticsId, pathname, searchParams])

  return null
}

export default App
