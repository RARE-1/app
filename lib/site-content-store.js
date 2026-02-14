import 'server-only'
import { promises as fs } from 'fs'
import path from 'path'
import { defaultSiteContent } from '@/lib/site-content-defaults'

const CONTENT_PATH = path.join(process.cwd(), 'memory', 'site-content.json')

const clone = (value) => JSON.parse(JSON.stringify(value))

const asString = (value) => (typeof value === 'string' ? value.trim() : '')

const normalizeArray = (value) => (Array.isArray(value) ? value : [])

const mergeSiteContent = (raw = {}) => {
  const fallback = defaultSiteContent

  return {
    heroImage: asString(raw.heroImage) || fallback.heroImage,
    destinations: normalizeArray(raw.destinations)
      .map((item) => ({
        name: asString(item?.name),
        description: asString(item?.description),
        image: asString(item?.image),
      }))
      .filter((item) => item.name && item.description && item.image),
    vehicleCategories: normalizeArray(raw.vehicleCategories)
      .map((item) => ({
        title: asString(item?.title),
        subtitle: asString(item?.subtitle),
        icon: item?.icon === 'Bus' ? 'Bus' : 'CarFront',
      }))
      .filter((item) => item.title && item.subtitle),
    cabBookingOptions: normalizeArray(raw.cabBookingOptions)
      .map((item) => ({
        category: asString(item?.category),
        vehicles: asString(item?.vehicles),
        message: asString(item?.message),
      }))
      .filter((item) => item.category && item.vehicles && item.message),
    galleryImages: normalizeArray(raw.galleryImages)
      .map((item) => asString(item))
      .filter(Boolean),
    office: {
      address: asString(raw.office?.address) || fallback.office.address,
      email: asString(raw.office?.email) || fallback.office.email,
    },
    contact: {
      whatsappNumber: asString(raw.contact?.whatsappNumber),
      phoneNumber: asString(raw.contact?.phoneNumber),
    },
  }
}

export const getSiteContent = async () => {
  try {
    const raw = await fs.readFile(CONTENT_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    const merged = mergeSiteContent(parsed)

    return {
      ...clone(defaultSiteContent),
      ...merged,
      destinations: merged.destinations.length ? merged.destinations : clone(defaultSiteContent.destinations),
      vehicleCategories: merged.vehicleCategories.length
        ? merged.vehicleCategories
        : clone(defaultSiteContent.vehicleCategories),
      cabBookingOptions: merged.cabBookingOptions.length
        ? merged.cabBookingOptions
        : clone(defaultSiteContent.cabBookingOptions),
      galleryImages: merged.galleryImages.length ? merged.galleryImages : clone(defaultSiteContent.galleryImages),
    }
  } catch {
    return clone(defaultSiteContent)
  }
}

export const saveSiteContent = async (value) => {
  const merged = mergeSiteContent(value)
  const finalContent = {
    ...clone(defaultSiteContent),
    ...merged,
    destinations: merged.destinations.length ? merged.destinations : clone(defaultSiteContent.destinations),
    vehicleCategories: merged.vehicleCategories.length
      ? merged.vehicleCategories
      : clone(defaultSiteContent.vehicleCategories),
    cabBookingOptions: merged.cabBookingOptions.length
      ? merged.cabBookingOptions
      : clone(defaultSiteContent.cabBookingOptions),
    galleryImages: merged.galleryImages.length ? merged.galleryImages : clone(defaultSiteContent.galleryImages),
  }

  await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true })
  await fs.writeFile(CONTENT_PATH, JSON.stringify(finalContent, null, 2), 'utf8')
  return finalContent
}
