import { ShieldCheck } from 'lucide-react'
import { Card } from '@/components/ui/card'

function App({ children }) {
  const adminReady = Boolean(
    process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && process.env.ADMIN_SECRET
  )

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
          {!adminReady ? (
            <Card className="border border-dashed border-border bg-muted/40 p-3 text-sm text-muted-foreground">
              Admin auth is not fully configured. Add ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SECRET in
              .env to enable secure admin access.
            </Card>
          ) : null}
        </div>
      </header>
      <main className="container py-8">{children}</main>
    </div>
  )
}

export default App
