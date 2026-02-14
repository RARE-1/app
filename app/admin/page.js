'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { normalizePhoneNumber } from '@/lib/contact'

const emptyDestination = { name: '', description: '', image: '' }
const emptyVehicleCategory = { title: '', subtitle: '', icon: 'CarFront' }
const emptyCabOption = { category: '', vehicles: '', message: '' }

const asArray = (value) => (Array.isArray(value) ? value : [])

function App() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [sessionConfigured, setSessionConfigured] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')

  const [heroImage, setHeroImage] = useState('')
  const [destinations, setDestinations] = useState([emptyDestination])
  const [galleryImagesText, setGalleryImagesText] = useState('')
  const [vehicleCategories, setVehicleCategories] = useState([emptyVehicleCategory])
  const [cabOptions, setCabOptions] = useState([emptyCabOption])
  const [officeAddress, setOfficeAddress] = useState('')
  const [officeEmail, setOfficeEmail] = useState('')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const galleryImages = useMemo(
    () =>
      galleryImagesText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    [galleryImagesText]
  )

  const loadSessionAndData = async () => {
    setLoading(true)
    setStatus('')

    const sessionResponse = await fetch('/api/admin/session', { cache: 'no-store' })
    const sessionPayload = await sessionResponse.json()

    setSessionConfigured(Boolean(sessionPayload?.configured))
    setAuthenticated(Boolean(sessionPayload?.authenticated))

    if (!sessionPayload?.authenticated) {
      setLoading(false)
      return
    }

    const contentResponse = await fetch('/api/content', { cache: 'no-store' })
    const contentPayload = await contentResponse.json()

    if (!contentPayload?.ok) {
      setStatus('Failed to load content.')
      setLoading(false)
      return
    }

    const content = contentPayload.content || {}

    setHeroImage(content.heroImage || '')
    setDestinations(asArray(content.destinations).length ? content.destinations : [emptyDestination])
    setGalleryImagesText(asArray(content.galleryImages).join('\n'))
    setVehicleCategories(
      asArray(content.vehicleCategories).length ? content.vehicleCategories : [emptyVehicleCategory]
    )
    setCabOptions(asArray(content.cabBookingOptions).length ? content.cabBookingOptions : [emptyCabOption])
    setOfficeAddress(content.office?.address || '')
    setOfficeEmail(content.office?.email || '')
    setWhatsappNumber(content.contact?.whatsappNumber || '')
    setPhoneNumber(content.contact?.phoneNumber || '')

    setLoading(false)
  }

  useEffect(() => {
    loadSessionAndData()
  }, [])

  const login = async (event) => {
    event.preventDefault()
    setStatus('')

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    const payload = await response.json()

    if (!response.ok || !payload?.ok) {
      setStatus(payload?.error || 'Login failed.')
      return
    }

    setPassword('')
    await loadSessionAndData()
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAuthenticated(false)
    setStatus('Logged out.')
  }

  const updateListItem = (setter, list, index, key, value) => {
    const copy = [...list]
    copy[index] = { ...copy[index], [key]: value }
    setter(copy)
  }

  const removeItem = (setter, list, index, fallbackItem) => {
    const next = list.filter((_, idx) => idx !== index)
    setter(next.length ? next : [fallbackItem])
  }

  const save = async () => {
    setSaving(true)
    setStatus('')

    const payload = {
      heroImage,
      destinations: destinations
        .map((item) => ({
          name: item.name?.trim() || '',
          description: item.description?.trim() || '',
          image: item.image?.trim() || '',
        }))
        .filter((item) => item.name && item.description && item.image),
      galleryImages,
      vehicleCategories: vehicleCategories
        .map((item) => ({
          title: item.title?.trim() || '',
          subtitle: item.subtitle?.trim() || '',
          icon: item.icon === 'Bus' ? 'Bus' : 'CarFront',
        }))
        .filter((item) => item.title && item.subtitle),
      cabBookingOptions: cabOptions
        .map((item) => ({
          category: item.category?.trim() || '',
          vehicles: item.vehicles?.trim() || '',
          message: item.message?.trim() || '',
        }))
        .filter((item) => item.category && item.vehicles && item.message),
      office: {
        address: officeAddress.trim(),
        email: officeEmail.trim(),
      },
      contact: {
        whatsappNumber: normalizePhoneNumber(whatsappNumber),
        phoneNumber: normalizePhoneNumber(phoneNumber),
      },
    }

    const response = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok || !result?.ok) {
      setStatus(result?.error || 'Save failed.')
      setSaving(false)
      return
    }

    setStatus('Saved successfully.')
    setSaving(false)
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading admin panel...</p>
  }

  if (!sessionConfigured) {
    return (
      <Card className="p-5 text-sm text-muted-foreground">
        Admin secret is missing. Add `ADMIN_SECRET` to `.env` and restart the app.
      </Card>
    )
  }

  if (!authenticated) {
    return (
      <div className="grid gap-4">
        <div>
          <h2 className="text-3xl font-semibold">Admin Login</h2>
          <p className="text-muted-foreground">Use the secret password configured in `ADMIN_SECRET`.</p>
        </div>
        <Card className="max-w-md p-5">
          <form onSubmit={login} className="grid gap-4">
            <div>
              <label className="text-sm font-medium">Secret Password</label>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin secret"
              />
            </div>
            <Button type="submit">Login</Button>
            {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-semibold">Content Admin Panel</h2>
          <p className="text-muted-foreground">
            Manage holiday packages, gallery, vehicles, cab options, and contact details.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={logout}>Logout</Button>
          <Button onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
        </div>
      </div>

      <Card className="p-5">
        <h3 className="text-lg font-semibold">Hero & Contact</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Hero Image URL</label>
            <Input value={heroImage} onChange={(event) => setHeroImage(event.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">Office Email</label>
            <Input value={officeEmail} onChange={(event) => setOfficeEmail(event.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">WhatsApp Number</label>
            <Input value={whatsappNumber} onChange={(event) => setWhatsappNumber(event.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">Public Phone Number</label>
            <Input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium">Office Address</label>
          <textarea
            value={officeAddress}
            onChange={(event) => setOfficeAddress(event.target.value)}
            className="mt-1 min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Holiday Packages</h3>
          <Button
            type="button"
            variant="outline"
            onClick={() => setDestinations((prev) => [...prev, { ...emptyDestination }])}
          >
            Add Package
          </Button>
        </div>
        <div className="grid gap-4">
          {destinations.map((item, index) => (
            <div key={`destination-${index}`} className="grid gap-3 rounded-lg border border-border p-4">
              <Input
                value={item.name}
                onChange={(event) => updateListItem(setDestinations, destinations, index, 'name', event.target.value)}
                placeholder="Package Name"
              />
              <Input
                value={item.description}
                onChange={(event) =>
                  updateListItem(setDestinations, destinations, index, 'description', event.target.value)
                }
                placeholder="Package Description"
              />
              <Input
                value={item.image}
                onChange={(event) => updateListItem(setDestinations, destinations, index, 'image', event.target.value)}
                placeholder="Image URL"
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeItem(setDestinations, destinations, index, emptyDestination)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="text-lg font-semibold">Gallery Images</h3>
        <p className="mt-1 text-sm text-muted-foreground">Put one image URL per line.</p>
        <textarea
          value={galleryImagesText}
          onChange={(event) => setGalleryImagesText(event.target.value)}
          className="mt-3 min-h-[160px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </Card>

      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Vehicle Categories</h3>
          <Button
            type="button"
            variant="outline"
            onClick={() => setVehicleCategories((prev) => [...prev, { ...emptyVehicleCategory }])}
          >
            Add Category
          </Button>
        </div>
        <div className="grid gap-4">
          {vehicleCategories.map((item, index) => (
            <div key={`vehicle-${index}`} className="grid gap-3 rounded-lg border border-border p-4">
              <Input
                value={item.title}
                onChange={(event) =>
                  updateListItem(setVehicleCategories, vehicleCategories, index, 'title', event.target.value)
                }
                placeholder="Category Title"
              />
              <Input
                value={item.subtitle}
                onChange={(event) =>
                  updateListItem(setVehicleCategories, vehicleCategories, index, 'subtitle', event.target.value)
                }
                placeholder="Category Subtitle"
              />
              <select
                value={item.icon}
                onChange={(event) =>
                  updateListItem(setVehicleCategories, vehicleCategories, index, 'icon', event.target.value)
                }
                className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="CarFront">Car Icon</option>
                <option value="Bus">Bus Icon</option>
              </select>
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeItem(setVehicleCategories, vehicleCategories, index, emptyVehicleCategory)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Cab Booking Options</h3>
          <Button type="button" variant="outline" onClick={() => setCabOptions((prev) => [...prev, { ...emptyCabOption }])}>
            Add Option
          </Button>
        </div>
        <div className="grid gap-4">
          {cabOptions.map((item, index) => (
            <div key={`cab-${index}`} className="grid gap-3 rounded-lg border border-border p-4">
              <Input
                value={item.category}
                onChange={(event) => updateListItem(setCabOptions, cabOptions, index, 'category', event.target.value)}
                placeholder="Category"
              />
              <Input
                value={item.vehicles}
                onChange={(event) => updateListItem(setCabOptions, cabOptions, index, 'vehicles', event.target.value)}
                placeholder="Vehicles"
              />
              <Input
                value={item.message}
                onChange={(event) => updateListItem(setCabOptions, cabOptions, index, 'message', event.target.value)}
                placeholder="WhatsApp Message"
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeItem(setCabOptions, cabOptions, index, emptyCabOption)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
    </div>
  )
}

export default App
