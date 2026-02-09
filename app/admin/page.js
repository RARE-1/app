import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const adminSections = [
  {
    title: 'Vehicles',
    description: 'Manage fleet categories, pricing, and availability.',
  },
  {
    title: 'Hotels',
    description: 'Add hotel partners and room inventory.',
  },
  {
    title: 'Holiday Packages',
    description: 'Create curated packages and seasonal offers.',
  },
  {
    title: 'Cities & Destinations',
    description: 'Manage programmatic SEO pages and destinations.',
  },
  {
    title: 'Enquiries',
    description: 'View WhatsApp and call enquiries in one queue.',
  },
]

function App() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-semibold">Admin Overview</h2>
        <p className="text-muted-foreground">
          Manage all content for BTI. Firebase authentication and Firestore persistence will be connected
          once keys are available.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {(adminSections ?? []).map((section) => (
          <Card key={section.title} className="flex flex-col justify-between gap-4 p-5">
            <div>
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </div>
            <Button variant="outline">Configure</Button>
          </Card>
        ))}
      </div>
      <Card className="p-5 text-sm text-muted-foreground">
        Firebase Auth, Firestore, and admin CRUD will activate once keys are added. Until then, this UI
        reflects the final structure.
      </Card>
    </div>
  )
}

export default App
