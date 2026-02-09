'use client'

import { useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CalendarClock, MapPin, Users } from 'lucide-react'

const initialStop = () => ({ id: `${Date.now()}-${Math.random()}`, value: '' })

function App({ whatsappNumber, mapsReady }) {
  const [startLocation, setStartLocation] = useState('')
  const [stops, setStops] = useState([initialStop()])
  const [endLocation, setEndLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [time, setTime] = useState('')
  const [peopleCount, setPeopleCount] = useState('')
  const [vehiclePreference, setVehiclePreference] = useState('')
  const [notes, setNotes] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  const whatsappReady = Boolean(whatsappNumber)

  const message = useMemo(() => {
    const locations = [
      startLocation ? `Start: ${startLocation}` : null,
      ...(stops ?? [])
        .map((stop, index) => (stop.value ? `Stop ${index + 1}: ${stop.value}` : null))
        .filter(Boolean),
      endLocation ? `End: ${endLocation}` : null,
    ].filter(Boolean)

    const lines = [
      'Hello BTI Team, I want to plan a tour.',
      locations.length ? `Locations:\n${locations.join('\n')}` : null,
      startDate ? `Start Date: ${startDate}` : null,
      endDate ? `End Date: ${endDate}` : null,
      time ? `Preferred Time: ${time}` : null,
      peopleCount ? `People: ${peopleCount}` : null,
      vehiclePreference ? `Vehicle Preference: ${vehiclePreference}` : null,
      notes ? `Notes: ${notes}` : null,
    ].filter(Boolean)

    return lines.join('\n')
  }, [startLocation, stops, endLocation, startDate, endDate, time, peopleCount, vehiclePreference, notes])

  const handleStopChange = (id, value) => {
    setStops((prev) => (prev ?? []).map((stop) => (stop.id === id ? { ...stop, value } : stop)))
  }

  const addStop = () => {
    setStops((prev) => [...(prev ?? []), initialStop()])
  }

  const removeStop = (id) => {
    setStops((prev) => (prev ?? []).filter((stop) => stop.id !== id))
  }

  const handleSend = () => {
    if (!whatsappReady) {
      setStatusMessage('WhatsApp number is not configured yet. Add NEXT_PUBLIC_WHATSAPP_NUMBER in .env.')
      return
    }

    if (!startLocation || !endLocation) {
      setStatusMessage('Please provide at least a start and end location.')
      return
    }

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setStatusMessage('Opening WhatsApp with your tour details...')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card className="p-6">
        <div className="grid gap-5">
          <div>
            <label className="text-sm font-medium">Start Location</label>
            <Input
              value={startLocation}
              onChange={(event) => setStartLocation(event.target.value)}
              placeholder="City or pickup point"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Stops (optional)</label>
            <div className="mt-2 grid gap-3">
              {(stops ?? []).map((stop, index) => (
                <div key={stop.id} className="flex items-center gap-2">
                  <Input
                    value={stop.value}
                    onChange={(event) => handleStopChange(stop.id, event.target.value)}
                    placeholder={`Stop ${index + 1}`}
                  />
                  <Button type="button" variant="outline" onClick={() => removeStop(stop.id)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <Button type="button" variant="secondary" className="mt-3" onClick={addStop}>
              Add Another Stop
            </Button>
          </div>
          <div>
            <label className="text-sm font-medium">End Location</label>
            <Input
              value={endLocation}
              onChange={(event) => setEndLocation(event.target.value)}
              placeholder="Final destination"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Preferred Time</label>
              <Input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Number of People</label>
              <Input
                type="number"
                min="1"
                value={peopleCount}
                onChange={(event) => setPeopleCount(event.target.value)}
                placeholder="e.g., 12"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Vehicle Preference</label>
            <select
              value={vehiclePreference}
              onChange={(event) => setVehiclePreference(event.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="">Select preferred vehicle</option>
              <option value="Sedan">Sedan</option>
              <option value="MPV">MPV</option>
              <option value="Traveller">Traveller</option>
              <option value="Bus">Bus</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Additional Notes</label>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Budget, hotel preference, special requests"
              className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleSend}>Send on WhatsApp</Button>
            <Button variant="outline" type="button" onClick={() => setStatusMessage('')}>Reset message</Button>
          </div>
          {statusMessage ? <p className="text-sm text-muted-foreground">{statusMessage}</p> : null}
        </div>
      </Card>

      <div className="grid gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Interactive Map</p>
              <p className="text-xs text-muted-foreground">
                {mapsReady
                  ? 'Map key detected. Interactive routing will be activated once Google Maps integration is enabled.'
                  : 'Google Maps API key not configured. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable maps.'}
              </p>
            </div>
          </div>
          <div className="mt-4 flex h-48 items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
            Map preview placeholder
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <CalendarClock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">WhatsApp Preview</p>
              <p className="text-xs text-muted-foreground">Your message will look like this:</p>
            </div>
          </div>
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
            {message || 'Add details to generate a preview.'}
          </pre>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Response SLA</p>
              <p className="text-xs text-muted-foreground">
                BTI responds to WhatsApp enquiries quickly with vehicle availability and pricing.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default App
