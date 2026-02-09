import { notFound } from 'next/navigation'

const seoPages = {
  'bus-rental-mumbai': {
    title: 'Bus Rental in Mumbai',
    description: 'Premium 26+ seater buses and group transport services in Mumbai.',
    highlights: [
      'Corporate and event transport',
      'AC and luxury fleet options',
      'Dedicated BTI operations team',
    ],
  },
  'tempo-traveller-pune': {
    title: 'Tempo Traveller in Pune',
    description: '12-26 seater Tempo Travellers and Force Urbania rentals in Pune.',
    highlights: [
      'Comfort seating for group travel',
      'Flexible pickup & drop-off',
      'Experienced BTI drivers',
    ],
  },
  'luxury-cab-delhi': {
    title: 'Luxury Cab in Delhi',
    description: 'Mercedes, BMW, Audi, and premium cab rentals across Delhi NCR.',
    highlights: [
      'Executive airport transfers',
      'Corporate chauffeured rides',
      'Premium service assurance',
    ],
  },
}

const titleCase = (value) =>
  value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const getSeoContent = (slug) => {
  if (seoPages[slug]) {
    return seoPages[slug]
  }

  return {
    title: titleCase(slug),
    description: `Premium travel services by Brothers Travel India for ${titleCase(slug)}.`,
    highlights: [
      'WhatsApp-first booking',
      'Verified fleet and partners',
      'Dedicated operations support',
    ],
  }
}

export async function generateMetadata({ params }) {
  const slug = params?.slug

  if (!slug) {
    return {}
  }

  const content = getSeoContent(slug)

  return {
    title: `${content.title} | Brothers Travel India`,
    description: content.description,
  }
}

export function generateStaticParams() {
  return Object.keys(seoPages).map((slug) => ({ slug }))
}

function App({ params }) {
  const slug = params?.slug

  if (!slug) {
    notFound()
  }

  const content = getSeoContent(slug)

  return (
    <div className="container py-16">
      <div className="grid gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">BTI Services</p>
          <h1 className="text-4xl font-semibold">{content.title}</h1>
          <p className="mt-3 text-muted-foreground">{content.description}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {(content.highlights ?? []).map((highlight, index) => (
            <div key={`${highlight}-${index}`} className="rounded-lg border border-border p-4">
              <p className="font-semibold">{highlight}</p>
              <p className="text-sm text-muted-foreground">
                Speak to BTI for customized pricing and availability in your city.
              </p>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-muted/40 p-5 text-sm text-muted-foreground">
          Send a WhatsApp enquiry from the homepage to receive a fast callback with route and fleet
          suggestions.
        </div>
      </div>
    </div>
  )
}

export default App
