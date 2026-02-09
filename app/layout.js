import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'
import SystemTheme from '@/components/system-theme'
import AnalyticsTracker from '@/components/analytics-tracker'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Brothers Travel India (BTI) | Premium Tours & Transport',
  description:
    'Brothers Travel India offers premium group transport, cab services, luxury rentals, and custom tour planning with WhatsApp-first booking.',
  openGraph: {
    title: 'Brothers Travel India (BTI)',
    description:
      'Premium group transport, cab services, luxury rentals, and WhatsApp-first tour planning across India.',
    type: 'website',
  },
}

function App({ children }) {
  const analyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <SystemTheme />
        {analyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${analyticsId}', { page_path: window.location.pathname });`}
            </Script>
            <Suspense fallback={null}>
              <AnalyticsTracker analyticsId={analyticsId} />
            </Suspense>
          </>
        ) : null}
        {children}
      </body>
    </html>
  )
}

export default App
