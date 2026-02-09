import { Bus, Building2, CarFront, MapPin, PhoneCall, Route, Users } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import PlanATour from '@/components/plan-a-tour'

const heroImage = 'https://images.unsplash.com/photo-1651307114090-0fa8585aa10f'
const destinations = [
  {
    name: 'Ladakh Circuit',
    description: 'High-altitude group expeditions with premium transport.',
    image: 'https://images.unsplash.com/photo-1705744145776-8a86e3704d3d',
  },
  {
    name: 'Golden Triangle',
    description: 'Delhi, Agra, Jaipur with expert local planning.',
    image: 'https://images.unsplash.com/photo-1583140743264-18a380716cce',
  },
  {
    name: 'Kerala Backwaters',
    description: 'Luxury cab & hotel coordination across Kerala.',
    image: 'https://images.unsplash.com/photo-1592985448758-22a0d8356dd5',
  },
]

const vehicleCategories = [
  {
    title: 'Group Transport',
    subtitle: '26+ seat buses, Tempo Travellers, Force Urbania.',
    icon: Bus,
  },
  {
    title: 'Small Group Cabs',
    subtitle: 'Dzire, Aura, Innova Crysta, Hycross, Ertiga.',
    icon: CarFront,
  },
  {
    title: 'Luxury Fleet',
    subtitle: 'Audi, Mercedes, BMW, Kia Carnival and more.',
    icon: CarFront,
  },
]

const cabBookingOptions = [
  {
    category: 'Sedan',
    vehicles: 'Dzire, Aura',
    message: 'I want to book a Sedan for my trip.',
  },
  {
    category: 'MPV',
    vehicles: 'Innova Crysta, Hycross, Ertiga',
    message: 'I want to book an MPV for my trip.',
  },
  {
    category: 'Traveller',
    vehicles: 'Tempo Traveller, Force Urbania',
    message: 'I want to book a Traveller for my group.',
  },
  {
    category: 'Bus',
    vehicles: '26+ seat buses',
    message: 'I want to book a Bus for a group journey.',
  },
  {
    category: 'Luxury',
    vehicles: 'Audi, Mercedes, BMW',
    message: 'I want to book a Luxury Cab.',
  },
]

const galleryImages = [
  'https://images.unsplash.com/photo-1610698517225-78fcfe40aceb',
  'https://images.unsplash.com/photo-1654041961945-f86f6caffe53',
  'https://images.unsplash.com/photo-1583140743264-18a380716cce',
  'https://images.unsplash.com/photo-1592985448758-22a0d8356dd5',
  'https://images.unsplash.com/photo-1705744145776-8a86e3704d3d',
  'https://images.unsplash.com/photo-1651307114090-0fa8585aa10f',
]

const navItems = [
  { label: 'Booking', href: '#booking' },
  { label: 'Holiday Booking', href: '#holiday-booking' },
  { label: 'Hotel Booking', href: '#hotel-booking' },
  { label: 'Cab Booking', href: '#cab-booking' },
  { label: 'About Us', href: '#about-us' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Office Address', href: '#office-address' },
  { label: 'Plan a Tour', href: '#plan-a-tour' },
]

function App() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || ''
  const isAnalyticsReady = Boolean(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID)
  const isWhatsAppReady = Boolean(whatsappNumber)

  const buildWhatsAppLink = (message) => {
    if (!isWhatsAppReady) {
      return '#'
    }
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/90 backdrop-blur">
        <div className="container flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Route className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Brothers Travel India
              </p>
              <h1 className="text-2xl font-semibold">BTI Premium Tours & Transport</h1>
            </div>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            {(navItems ?? []).map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full border border-border px-3 py-1 transition hover:border-primary hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden" id="booking">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Scenic travel landscape"
              className="h-full w-full object-cover opacity-40"
              loading="lazy"
            />
          </div>
          <div className="relative">
            <div className="container grid gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  WhatsApp-first bookings across India
                </p>
                <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
                  Premium transport, holiday planning, and luxury rentals for every journey.
                </h2>
                <p className="text-lg text-muted-foreground">
                  BTI manages end-to-end travel logistics: group transport, cab services, luxury fleets,
                  hotels, flights, and custom itineraries. Send your plan on WhatsApp and we respond fast.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground">
                    <a href="#plan-a-tour">Plan a Tour on WhatsApp</a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a
                      href={phoneNumber ? `tel:${phoneNumber}` : '#'}
                      aria-disabled={!phoneNumber}
                    >
                      <PhoneCall className="mr-2 h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                </div>
                {!isWhatsAppReady ? (
                  <p className="text-sm text-muted-foreground">
                    WhatsApp number not configured yet. Add NEXT_PUBLIC_WHATSAPP_NUMBER in .env to enable
                    booking.
                  </p>
                ) : null}
              </div>
              <Card className="bg-card/80 p-6">
                <div className="grid gap-6">
                  <div className="flex items-center gap-4">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Group transport capacity</p>
                      <p className="text-2xl font-semibold">26 to 52 seater buses</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <CarFront className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Premium cab fleet</p>
                      <p className="text-2xl font-semibold">Sedan to Luxury</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Building2 className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Complete travel stack</p>
                      <p className="text-2xl font-semibold">Hotels, Flights, Rail, Dining</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="container py-16" id="about-us">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              <h3 className="text-3xl font-semibold">Why BTI</h3>
              <p className="text-muted-foreground">
                Brothers Travel India delivers premium travel operations with a WhatsApp-first workflow.
                We combine curated transport, trusted partners, and a dedicated operations team to keep
                every journey smooth, safe, and on time.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {vehicleCategories?.map((item) => (
                  <Card key={item.title} className="p-4">
                    <div className="flex items-start gap-3">
                      <item.icon className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">Additional services</p>
                <ul className="mt-4 grid gap-2 text-sm">
                  <li>Flight ticket booking</li>
                  <li>E-rail ticket booking</li>
                  <li>Hotel & resort reservations</li>
                  <li>Restaurant arrangements</li>
                  <li>Holiday packages across India</li>
                </ul>
              </Card>
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">WhatsApp-first operations</p>
                <p className="mt-2 text-sm">
                  Share your trip plan once, receive confirmations, vehicle details, and itinerary updates
                  directly in WhatsApp.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-16" id="holiday-booking">
          <div className="container grid gap-8">
            <div>
              <h3 className="text-3xl font-semibold">Holiday Booking</h3>
              <p className="text-muted-foreground">
                Curated packages, verified stays, and local experiences. Browse and message us directly.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {(destinations ?? []).map((destination) => (
                <Card key={destination.name} className="overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="space-y-2 p-4">
                    <h4 className="text-lg font-semibold">{destination.name}</h4>
                    <p className="text-sm text-muted-foreground">{destination.description}</p>
                    <Button asChild variant="outline" size="sm">
                      <a href={buildWhatsAppLink(`I want holiday package details for ${destination.name}.`)}>
                        Enquire on WhatsApp
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-16" id="hotel-booking">
          <div className="grid gap-8">
            <div>
              <h3 className="text-3xl font-semibold">Hotel Booking</h3>
              <p className="text-muted-foreground">
                Tell us your destination and budget. BTI handles verified hotel confirmations.
              </p>
            </div>
            <Card className="p-6">
              <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Popular requests</p>
                  <ul className="grid gap-2 text-sm">
                    <li>Premium stays for corporate groups</li>
                    <li>Luxury resorts for family vacations</li>
                    <li>Business-class hotel partnerships</li>
                  </ul>
                </div>
                <div className="flex flex-col justify-between gap-3">
                  <Button asChild>
                    <a href={buildWhatsAppLink('I need hotel booking assistance.')}>Book via WhatsApp</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={phoneNumber ? `tel:${phoneNumber}` : '#'} aria-disabled={!phoneNumber}>
                      Call Now
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="bg-muted/40 py-16" id="cab-booking">
          <div className="container grid gap-8">
            <div>
              <h3 className="text-3xl font-semibold">Cab Booking</h3>
              <p className="text-muted-foreground">
                Choose your category and book instantly on WhatsApp. We confirm vehicles quickly.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {(cabBookingOptions ?? []).map((option) => (
                <Card key={option.category} className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">{option.category}</p>
                      <p className="text-sm text-muted-foreground">{option.vehicles}</p>
                    </div>
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button asChild size="sm">
                      <a href={buildWhatsAppLink(option.message)}>Book on WhatsApp</a>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <a href={phoneNumber ? `tel:${phoneNumber}` : '#'} aria-disabled={!phoneNumber}>
                        Call Now
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            {!isWhatsAppReady ? (
              <p className="text-sm text-muted-foreground">
                WhatsApp booking is disabled until NEXT_PUBLIC_WHATSAPP_NUMBER is configured.
              </p>
            ) : null}
          </div>
        </section>

        <section className="container py-16" id="plan-a-tour">
          <div className="grid gap-6">
            <div>
              <h3 className="text-3xl font-semibold">Plan a Tour</h3>
              <p className="text-muted-foreground">
                Add multiple stops, dates, people count, and vehicle preferences. Send the complete plan
                on WhatsApp in one click.
              </p>
            </div>
            <PlanATour whatsappNumber={whatsappNumber} mapsReady={Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)} />
          </div>
        </section>

        <section className="bg-muted/40 py-16" id="gallery">
          <div className="container grid gap-8">
            <div>
              <h3 className="text-3xl font-semibold">Gallery</h3>
              <p className="text-muted-foreground">Premium experiences curated by BTI.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {(galleryImages ?? []).map((image, index) => (
                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt="BTI travel highlight"
                  className="h-52 w-full rounded-lg object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="container py-16" id="office-address">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h3 className="text-3xl font-semibold">Office Address</h3>
              <p className="text-muted-foreground">
                BTI Operations Hub, New Delhi (exact address will appear once confirmed).
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <p>Phone: {phoneNumber || 'Add NEXT_PUBLIC_PHONE_NUMBER to enable call links.'}</p>
                <p>WhatsApp: {whatsappNumber || 'Add NEXT_PUBLIC_WHATSAPP_NUMBER to enable WhatsApp links.'}</p>
                <p>Email: info@brotherstravelindia.com</p>
              </div>
            </div>
            <Card className="p-5">
              <h4 className="font-semibold">Operations & Booking</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                We respond quickly on WhatsApp with confirmations, itinerary updates, and vehicle
                allocations.
              </p>
              <Button asChild className="mt-4">
                <a href={buildWhatsAppLink('I want to speak with BTI about a booking.')}>Chat on WhatsApp</a>
              </Button>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="container flex flex-col gap-3 py-6 text-sm text-muted-foreground">
          <p>© 2025 Brothers Travel India. All rights reserved.</p>
          {!isAnalyticsReady ? (
            <p>Analytics disabled. Set NEXT_PUBLIC_GOOGLE_ANALYTICS_ID to enable tracking.</p>
          ) : null}
        </div>
      </footer>
    </div>
  )
}

export default App
