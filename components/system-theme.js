'use client'

import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = () => {
      if (media.matches) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }

    applyTheme()
    media.addEventListener('change', applyTheme)

    return () => {
      media.removeEventListener('change', applyTheme)
    }
  }, [])

  return null
}

export default App
