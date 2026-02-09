import { ShieldCheck } from 'lucide-react'
import { Card } from '@/components/ui/card'

function App({ children }) {
  const firebaseReady = Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)

  return (
    <div className="min-h-screen bg-muted/30 text-foreground">
      <header className="border-b border-border bg-background">
        <div className="container flex flex-col gap-2 py-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">BTI Admin</p>
              <h1 className="text-2xl font-semibold">Control Center</h1>
            </div>
          </div>
          {!firebaseReady ? (
            <Card className="border border-dashed border-border bg-muted/40 p-3 text-sm text-muted-foreground">
              Firebase is not configured yet. Add Firebase keys in .env to enable authentication and data
              management.
            </Card>
          ) : null}
        </div>
      </header>
      <main className="container py-8">{children}</main>
    </div>
  )
}

export default App
